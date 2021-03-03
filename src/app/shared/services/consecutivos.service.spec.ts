import { TestBed } from '@angular/core/testing';

import { ConsecutivosService } from './consecutivos.service';

describe('ConsecutivosService', () => {
  let service: ConsecutivosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsecutivosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
