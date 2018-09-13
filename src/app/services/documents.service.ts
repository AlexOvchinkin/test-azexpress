import { Injectable } from '@angular/core';
import IDocument from '../../interfaces/IDocument';
import documentsMock from '../../mocks/documents';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  _documents: IDocument[] = documentsMock;

  constructor() { }

  get documents(): Observable<IDocument[]> {
    return of(this._documents);
  }


  removeDocuments(selected: IDocument[]): Observable<IDocument[]> {
    this._documents = this._documents.filter(item => {
      return !selected.includes(item)
    });

    return this.documents;
  }

  
  addDocument(doc: IDocument): Observable<IDocument[]> {
    // планируется, что на сервер будут передаваться
    // данные без id, при записи в БД id будет назначен
    doc.id = new Date().getTime(); // пока - уникальное число
    this._documents.push(doc);
    return this.documents;
  }


  modifyDocument(doc: IDocument): Observable<IDocument[]> {
    const index = this._documents.findIndex((item: IDocument) => {
      return item.id === doc.id;
    });

    if(index > -1) {
      this._documents[index] = doc;
    }
    
    return this.documents;
  }

  removeDocumentById(id: number): Observable<IDocument[]> {
    const index = this._documents.findIndex((item: IDocument) => {
      return item.id === id;
    });

    if(index > -1) {
      this._documents.splice(index, 1);
    }
    
    return this.documents;
  } 
}
