import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormModalComponent } from '../../components/form-modal/form-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [],
  declarations: [FormModalComponent]
})
export class DocumentsModule { }
