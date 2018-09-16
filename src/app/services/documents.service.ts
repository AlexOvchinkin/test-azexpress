import { Injectable } from '@angular/core';
import IDocument from '../../interfaces/IDocument';
import documentsMock from '../../mocks/documents';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  documentsStream$$: Subject<IDocument[]> = new Subject<IDocument[]>();
  documents: IDocument[] = documentsMock;

  constructor() { }

  loadAllDocuments(): void {
    this.documentsStream$$.next(this.documents);
  }


  removeDocuments(selected: IDocument[]): void {
    this.documents = this.documents.filter(item => {
      return !selected.includes(item)
    });

    this.documentsStream$$.next(this.documents);
  }

  
  addDocument(doc: IDocument): void {
    // планируется, что на сервер будут передаваться
    // данные без id, при записи в БД id будет назначен
    doc.id = new Date().getTime(); // пока - уникальное число
    this.documents.push(doc);
    this.documentsStream$$.next(this.documents);
  }


  modifyDocument(doc: IDocument): void {
    const index = this.documents.findIndex((item: IDocument) => {
      return item.id === doc.id;
    });

    if(index > -1) {
      this.documents[index] = doc;
    }
    
    this.documentsStream$$.next(this.documents);
  }


  removeDocumentById(id: number): void {
    const index = this.documents.findIndex((item: IDocument) => {
      return item.id === id;
    });

    if(index > -1) {
      this.documents.splice(index, 1);
    }
    
    this.documentsStream$$.next(this.documents);
  } 
}
