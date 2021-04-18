import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogDianComponent } from './log-dian.component';

describe('LogDianComponent', () => {
  let component: LogDianComponent;
  let fixture: ComponentFixture<LogDianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogDianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogDianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
