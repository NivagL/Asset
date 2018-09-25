import { TestBed } from '@angular/core/testing';

import { SharedCompLibService } from './shared-comp-lib.service';

describe('SharedCompLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedCompLibService = TestBed.get(SharedCompLibService);
    expect(service).toBeTruthy();
  });
});
