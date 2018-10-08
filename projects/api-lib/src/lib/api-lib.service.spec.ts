import { TestBed } from '@angular/core/testing';

import { ApiLibService } from './api-lib.service';

describe('ApiLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiLibService = TestBed.get(ApiLibService);
    expect(service).toBeTruthy();
  });
});
