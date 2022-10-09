import { TestBed } from '@angular/core/testing';

import { PriceFinderService } from './price-finder.service';

describe('PriceFinderService', () => {
  let service: PriceFinderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceFinderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
