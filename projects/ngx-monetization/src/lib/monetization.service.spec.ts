import { TestBed } from '@angular/core/testing';

import { MonetizationService as MonetizationService } from './monetization.service';

describe('NgxMonetizationService', () => {
  let service: MonetizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonetizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
