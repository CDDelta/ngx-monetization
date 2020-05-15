import { TestBed } from '@angular/core/testing';

import { NgxMonetizationService } from './ngx-monetization.service';

describe('NgxMonetizationService', () => {
  let service: NgxMonetizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxMonetizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
