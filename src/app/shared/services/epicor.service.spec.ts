import { TestBed } from '@angular/core/testing';

import { EpicorService } from './epicor.service';

describe('EpicorService', () => {
  let service: EpicorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpicorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
