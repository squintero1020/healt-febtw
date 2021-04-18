import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarAdjuntoComponent } from './asociar-adjunto.component';

describe('AsociarAdjuntoComponent', () => {
  let component: AsociarAdjuntoComponent;
  let fixture: ComponentFixture<AsociarAdjuntoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsociarAdjuntoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsociarAdjuntoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
