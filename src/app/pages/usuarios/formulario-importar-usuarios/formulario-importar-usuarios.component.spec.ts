import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioImportarUsuariosComponent } from './formulario-importar-usuarios.component';

describe('FormularioImportarUsuariosComponent', () => {
  let component: FormularioImportarUsuariosComponent;
  let fixture: ComponentFixture<FormularioImportarUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioImportarUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioImportarUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
