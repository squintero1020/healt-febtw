import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogClienteComponent } from './log-cliente.component';

describe('LogClienteComponent', () => {
  let component: LogClienteComponent;
  let fixture: ComponentFixture<LogClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
