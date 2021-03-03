import { TestBed } from '@angular/core/testing';

import { DetallesFlujosService } from './detalles-flujos.service';

describe('DetallesFlujosService', () => {
  let service: DetallesFlujosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetallesFlujosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
