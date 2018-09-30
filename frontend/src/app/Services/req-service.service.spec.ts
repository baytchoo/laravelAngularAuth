import { TestBed } from '@angular/core/testing';

import { ReqServiceService } from './req-service.service';

describe('ReqServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReqServiceService = TestBed.get(ReqServiceService);
    expect(service).toBeTruthy();
  });
});
