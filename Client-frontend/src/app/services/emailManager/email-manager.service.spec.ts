import { TestBed } from '@angular/core/testing';

import { EmailManagerService } from './email-manager.service';

describe('EmailManagerService', () => {
  let service: EmailManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
