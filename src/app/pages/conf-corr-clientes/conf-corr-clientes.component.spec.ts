import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfCorrClientesComponent } from './conf-corr-clientes.component';

describe('ConfCorrClientesComponent', () => {
  let component: ConfCorrClientesComponent;
  let fixture: ComponentFixture<ConfCorrClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfCorrClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfCorrClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
