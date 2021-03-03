import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioProveedoresComponent } from './formulario-proveedores.component';

describe('FormularioProveedoresComponent', () => {
  let component: FormularioProveedoresComponent;
  let fixture: ComponentFixture<FormularioProveedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioProveedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
