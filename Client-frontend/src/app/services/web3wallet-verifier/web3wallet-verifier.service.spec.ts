import { TestBed } from '@angular/core/testing';

import { Web3walletVerifierService } from './web3wallet-verifier.service';

describe('Web3walletVerifierService', () => {
  let service: Web3walletVerifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Web3walletVerifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
