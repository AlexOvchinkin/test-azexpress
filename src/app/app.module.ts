import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { DxDataGridModule } from 'devextreme-angular';
import { AppComponent } from './app.component';
import { DocumentsGridComponent } from './components/documents-grid/documents-grid.component';
import { FormModalComponent } from './components/form-modal/form-modal.component';
import { DocumentsModule } from './modules/documents/documents.module';

@NgModule({
  declarations: [
    AppComponent,
    DocumentsGridComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    DocumentsModule,
    DxDataGridModule,
    ReactiveFormsModule
  ],
  entryComponents: [FormModalComponent],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
