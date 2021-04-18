import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasTimbradasComponent } from './facturas-timbradas.component';

describe('FacturasTimbradasComponent', () => {
  let component: FacturasTimbradasComponent;
  let fixture: ComponentFixture<FacturasTimbradasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturasTimbradasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturasTimbradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
