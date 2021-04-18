import { TestBed } from '@angular/core/testing';

import { CredentialsDianService } from './credentials-dian.service';

describe('CredentialsDianService', () => {
  let service: CredentialsDianService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CredentialsDianService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
