import { TestBed } from '@angular/core/testing';

import { ItService } from './it.service';

describe('ItService', () => {
  let service: ItService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
