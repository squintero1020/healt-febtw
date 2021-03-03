import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarFlujoComponent } from './cambiar-flujo.component';

describe('CambiarFlujoComponent', () => {
  let component: CambiarFlujoComponent;
  let fixture: ComponentFixture<CambiarFlujoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambiarFlujoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarFlujoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
