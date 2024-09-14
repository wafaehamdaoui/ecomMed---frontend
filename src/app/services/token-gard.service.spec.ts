import { TestBed } from '@angular/core/testing';

import { TokenGardService } from './token-gard.service';

describe('TokenGardService', () => {
  let service: TokenGardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenGardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
