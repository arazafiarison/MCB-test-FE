import { TestBed } from '@angular/core/testing';

import { TransactionRestService } from './transaction-rest.service';

describe('TransactionRestService', () => {
  let service: TransactionRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
