import { TestBed } from '@angular/core/testing';

import { FacturaarService } from './facturaar.service';

describe('FacturaarService', () => {
  let service: FacturaarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturaarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
