import { TestBed } from '@angular/core/testing';

import { ConfCorrClientesService } from './conf-corr-clientes.service';

describe('ConfCorrClientesService', () => {
  let service: ConfCorrClientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfCorrClientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
