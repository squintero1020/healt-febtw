import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SppinerloadingComponent } from './sppinerloading.component';

describe('SppinerloadingComponent', () => {
  let component: SppinerloadingComponent;
  let fixture: ComponentFixture<SppinerloadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SppinerloadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SppinerloadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
