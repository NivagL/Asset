import { TestBed } from '@angular/core/testing';

import { AssetsLibService } from './assets-lib.service';

describe('AssetsLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetsLibService = TestBed.get(AssetsLibService);
    expect(service).toBeTruthy();
  });
});
