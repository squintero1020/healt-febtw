import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptarRechazarComponent } from './aceptar-rechazar.component';

describe('AceptarRechazarComponent', () => {
  let component: AceptarRechazarComponent;
  let fixture: ComponentFixture<AceptarRechazarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AceptarRechazarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AceptarRechazarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
