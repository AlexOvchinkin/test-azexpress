import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { DxDataGridModule } from 'devextreme-angular';
import { AppComponent } from './app.component';
import { DocumentsGridComponent } from './components/documents-grid/documents-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    DocumentsGridComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    DxDataGridModule,
    ReactiveFormsModule
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
