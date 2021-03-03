import { TestBed } from '@angular/core/testing';

import { DisparadoresService } from './disparadores.service';

describe('DeisparadoresService', () => {
  let service: DisparadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisparadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
