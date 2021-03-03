import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarComentariosFacturaComponent } from './agregar-comentarios-factura.component';

describe('AgregarComentariosFacturaComponent', () => {
  let component: AgregarComentariosFacturaComponent;
  let fixture: ComponentFixture<AgregarComentariosFacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarComentariosFacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarComentariosFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
