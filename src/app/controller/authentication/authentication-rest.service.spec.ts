import { TestBed } from '@angular/core/testing';

import { AuthenticationRestService } from './authentication-rest.service';

describe('AuthenticationRestService', () => {
  let service: AuthenticationRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
