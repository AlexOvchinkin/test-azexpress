import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import IDocument from '../../../interfaces/IDocument';
import status from '../../../enums/Status';
import IFormCloseCause from '../../../interfaces/IFormCloseCause';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent implements OnInit {

  @Input() document: IDocument;
  formGroup: FormGroup;
  statusOptions: string[] = [];


  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) { }


  ngOnInit() {
    this.initForm();
    this.setOptions();
  }

  // функция инициализации формы
  initForm(): void {
    this.formGroup = this.fb.group({
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      customer: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });

    if (this.document) this.formGroup.patchValue(this.document);
  }

  // функция инициализирует список возможных статусов товара
  setOptions(): void {
    this.statusOptions = status;
  }

  // функция-обработчик закрытия формы
  closeModal(cause: string): void {
    if (cause === 'dismiss') {
      this.formGroup.reset();
      this.activeModal.close({ cause: cause });
      return;
    }

    if (this.formGroup.valid) {
      const returnData: IDocument = this.formGroup.value;

      if(this.document) returnData.id = this.document.id;

      const closingCause: IFormCloseCause = {
        cause: cause,
        opts: returnData
      }

      this.activeModal.close(closingCause);
    }
  }

  // функция-обработчик выбора статуса товара
  formSelectOption(option: string): void {
    this.formGroup.get('status').setValue(option);
  }
}
