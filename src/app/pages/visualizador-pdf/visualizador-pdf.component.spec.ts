import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizadorPDFComponent } from './visualizador-pdf.component';

describe('VisualizadorPDFComponent', () => {
  let component: VisualizadorPDFComponent;
  let fixture: ComponentFixture<VisualizadorPDFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizadorPDFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizadorPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
