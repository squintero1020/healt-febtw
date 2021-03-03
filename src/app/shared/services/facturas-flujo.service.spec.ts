import { TestBed } from '@angular/core/testing';

import { FacturasFlujoService } from './facturas-flujo.service';

describe('FacturasFlujoService', () => {
  let service: FacturasFlujoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturasFlujoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
