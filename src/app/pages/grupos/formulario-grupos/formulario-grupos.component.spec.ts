import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioGruposComponent } from './formulario-grupos.component';

describe('FormularioGruposComponent', () => {
  let component: FormularioGruposComponent;
  let fixture: ComponentFixture<FormularioGruposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioGruposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
