import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerglobalComponent } from './spinnerglobal.component';

describe('SpinnerglobalComponent', () => {
  let component: SpinnerglobalComponent;
  let fixture: ComponentFixture<SpinnerglobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinnerglobalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerglobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
