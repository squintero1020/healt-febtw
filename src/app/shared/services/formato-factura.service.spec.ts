import { TestBed } from '@angular/core/testing';

import { FormatoFacturaService } from './formato-factura.service';

describe('FormatoFacturaService', () => {
  let service: FormatoFacturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatoFacturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
