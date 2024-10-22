import { TestBed } from '@angular/core/testing';

import { CreditDecisionServiceService } from './credit-decision-service.service';

describe('CreditDecisionServiceService', () => {
  let service: CreditDecisionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditDecisionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
