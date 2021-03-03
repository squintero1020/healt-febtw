import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioFlujosComponent } from './formulario-flujos.component';

describe('FormularioFlujosComponent', () => {
  let component: FormularioFlujosComponent;
  let fixture: ComponentFixture<FormularioFlujosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioFlujosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioFlujosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
