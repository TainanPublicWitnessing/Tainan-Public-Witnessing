import { TestBed } from '@angular/core/testing';

import { CongregationsService } from './congregations.service';

describe('CongregationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CongregationsService = TestBed.get(CongregationsService);
    expect(service).toBeTruthy();
  });
});
