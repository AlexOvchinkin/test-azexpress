import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsGridComponent } from '../../components/documents-grid/documents-grid.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    DocumentsGridComponent
  ],
  declarations: [DocumentsGridComponent]
})
export class DocumentsModule { }
