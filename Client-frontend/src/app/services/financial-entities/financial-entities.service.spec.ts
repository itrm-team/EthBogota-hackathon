import { TestBed } from '@angular/core/testing';

import { FinancialEntitiesService } from './financial-entities.service';

describe('FinancialEntitiesService', () => {
  let service: FinancialEntitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialEntitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
