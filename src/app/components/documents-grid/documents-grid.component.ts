import { Component, OnInit } from '@angular/core';
import IDocument from '../../../interfaces/IDocument';
import { DocumentsService } from '../../services/documents.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import OpenMode from '../../../enums/OpenMode';
import { FormModalComponent } from '../form-modal/form-modal.component';
import IFormCloseCause from '../../../interfaces/IFormCloseCause'

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
    private modalService: NgbModal, private fb: FormBuilder) { }


  ngOnInit() {
    // подписка на изменение состояния
    this.documentsService.documentsStream$$
      .subscribe(docs => this.documents = docs);

    this.initForm();
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

  // функция загрузки всех документов
  loadDocuments(): void {
    this.documentsService.loadAllDocuments();
  }

  // обработчик кнопки "Применить"
  applyChanges(): void {
    this.removeDocuments(this.selectedRows);
  }

  // функция удаления нескольких документов
  removeDocuments(selected: IDocument[]): void {
    this.documentsService.removeDocuments(selected);
  }

  // функция-обработчик добавления нового документа
  newDocument(): void {
    this.showForm(OpenMode.new);
  }

  // функция открывает форму для модификации документа
  // параметр ev.key, возвращенный DevExtrem,
  // в нем содержатся данные выделенной строки 
  editDocument(ev: any): void {
    ev.cancel = true;
    this.showForm(OpenMode.modify, { data: ev.key });
  }

  // функция-обработчик удаления документа
  removeDocument(ev: any): void {
    ev.cancel = true;
    this.documentsService.removeDocumentById(ev.key.id);
  }

  // функция открытия модальной формы
  showForm(mode: OpenMode, opts?: any): void {
    this.formMode = mode;

    const modalRef = this.modalService.open(FormModalComponent);

    if (this.formMode === OpenMode.modify) {
      modalRef.componentInstance.document = opts.data;
    }

    modalRef.result
      .then((result: IFormCloseCause) => {
        this.handleFormClosing(result);
      })
      .catch(err => console.log(err));
  }

  // функция обработки результата закрытия модальной формы
  handleFormClosing(result: IFormCloseCause): void {
    const closingCause = result.cause;

    switch (closingCause) {
      case 'save':
        if (this.formMode === OpenMode.new) {
          this.documentsService.addDocument(result.opts);
        } else {
          this.documentsService.modifyDocument(result.opts)
        }

        this.formGroup.reset();
        break;

      case 'delete':
        this.documentsService.removeDocumentById(result.opts.id)
        break;
    }
  }
}
