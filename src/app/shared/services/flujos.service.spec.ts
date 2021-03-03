import { TestBed } from '@angular/core/testing';

import { FlujosService } from './flujos.service';

describe('FlujosService', () => {
  let service: FlujosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlujosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
