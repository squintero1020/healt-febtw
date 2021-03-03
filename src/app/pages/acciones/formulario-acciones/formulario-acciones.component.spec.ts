import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAccionesComponent } from './formulario-acciones.component';

describe('FormularioAccionesComponent', () => {
  let component: FormularioAccionesComponent;
  let fixture: ComponentFixture<FormularioAccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioAccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioAccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
