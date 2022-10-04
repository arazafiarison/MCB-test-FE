import { TestBed } from '@angular/core/testing';

import { RegionRestService } from './region-rest.service';

describe('RegionRestService', () => {
  let service: RegionRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegionRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
