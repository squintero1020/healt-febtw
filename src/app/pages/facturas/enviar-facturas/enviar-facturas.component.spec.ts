import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarFacturasComponent } from './enviar-facturas.component';

describe('EnviarFacturasComponent', () => {
  let component: EnviarFacturasComponent;
  let fixture: ComponentFixture<EnviarFacturasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviarFacturasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviarFacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
