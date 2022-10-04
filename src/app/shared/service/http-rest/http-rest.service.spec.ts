import { TestBed } from '@angular/core/testing';

import { HttpRestService } from './http-rest.service';

describe('HttpRestService', () => {
  let service: HttpRestService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
