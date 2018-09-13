import { Component, OnInit } from '@angular/core';
import IDocument from '../../../interfaces/IDocument';
import { DocumentsService } from '../../services/documents.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Status from '../../../enums/Status';
import { Observable } from 'rxjs';
import OpenMode from '../../../enums/OpenMode';

@Component({
  selector: 'app-documents-grid',
  templateUrl: './documents-grid.component.html',
  styleUrls: ['./documents-grid.component.css']
})
export class DocumentsGridComponent implements OnInit {

  documents: IDocument[] = [];
  selectedRows: IDocument[] = [];
  formGroup: FormGroup;
  options: string[] = [];
  formMode: OpenMode = OpenMode.new;

  constructor(private documentsService: DocumentsService,
    private modalService: NgbModal, public activeModal: NgbActiveModal, 
    private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.setOptions();
    this.loadDocuments();
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      customer: ['', [Validators.required]],
      status: ['']
    });
  }

  setOptions(): void {
    for (let option of Object.values(Status)) {
      if (isNaN(Number(option))) {
        this.options.push(option);
      }
    }
  }

  loadDocuments(): void {
    this.documentsService.documents
      .subscribe(
        data => this.documents = data,
        err => console.log(err));
  }

  // обработчик кнопки "Применить"
  applyHandler(): void {
    this.removeDocuments(this.selectedRows);
  }

  // функция удаления нескольких документов
  removeDocuments(selected: IDocument[]): void {
    this.documentsService.removeDocuments(this.selectedRows)
      .subscribe(
        data => this.documents = data,
        err => console.log(err)
      );
  }

  // функция-обработчик добавления нового документа
  addHandler(content) {
    this.formMode = OpenMode.new;

    this.modalService
      .open(content)
      .result
      .then((result: string) => {
        this.handleFormClosing(result);
      })
      .catch(err => console.log(err));
  }

  // обработчик закрытия формы
  handleFormClosing(closingStatus: string, options?: any): void {
    switch (closingStatus) {
      case 'save':
        let stream = new Observable<IDocument[]>();

        if (this.formMode === OpenMode.new) {
          stream = this.addDocument(this.formGroup.value);
        } else {
          if (options && options.id !== undefined) {
            stream = this.modifyDocument(this.formGroup.value, options.id)
          }
        }

        stream.subscribe(
          data => this.documents = data,
          err => console.log(err)
        );

        this.formGroup.reset();
        break;

      case 'delete':
        if (options && options.id !== undefined) {
          this.documentsService.removeDocumentById(options.id)
            .subscribe(
              data => this.documents = data,
              err => console.log(err)
            );
        }
        break;
    }
  }

  // функция инициирует добавление документа
  addDocument(formValue: any): Observable<IDocument[]> {
    const doc: IDocument = this.getDocumentFromFormValue(formValue);
    return this.documentsService.addDocument(doc);
  }

  // функция инициирует модификацию документа
  modifyDocument(formValue: any, id: number): Observable<IDocument[]> {
    const doc: IDocument = this.getDocumentFromFormValue(formValue);
    doc.id = id;

    return this.documentsService.modifyDocument(doc);
  }

  // функция получает объект типа IDocument из значения формы
  getDocumentFromFormValue(formValue: any): IDocument {
    return {
      from: formValue.from,
      to: formValue.to,
      customer: formValue.customer,
      status: formValue.status
    };
  }

  // функция открывает форму для модификации документа
  modifyHandler(ev: any, content: any): void {
    ev.cancel = true;

    this.formMode = OpenMode.modify;
    this.formGroup.patchValue(ev.key);

    this.modalService
      .open(content)
      .result
      .then((result: string) => {
        this.handleFormClosing(result, { id: ev.key.id });
      })
      .catch(err => console.log(err));
  }

  // функция инициирует удаление документа
  removeHandler(ev: any): void {
    ev.cancel = true;

    this.documentsService.removeDocumentById(ev.key.id)
      .subscribe(
        data => this.documents = data,
        err => console.log(err)
      );
  }

  formSelectOption(option: string): void {
    this.formGroup.get('status').setValue(option);
  }
}
