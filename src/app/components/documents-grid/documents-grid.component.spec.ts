import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsGridComponent } from './documents-grid.component';

describe('DocumentsGridComponent', () => {
  let component: DocumentsGridComponent;
  let fixture: ComponentFixture<DocumentsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
