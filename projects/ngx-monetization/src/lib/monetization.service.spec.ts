import { ɵgetDOM as getDOM } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Meta } from '@angular/platform-browser';
import { MonetizationService } from './monetization.service';

describe('MonetizationService', () => {
  let service: MonetizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonetizationService);
  });

  describe('setPaymentPointer', () => {
    let doc: Document;
    let metaService: Meta; 

    beforeEach(() => {
      doc = getDOM().createHtmlDocument();
      metaService = new Meta(doc);
    });

    it('should set payment pointer correctly', () => {
      const paymentPointer = '$$wallet.example.com/alice';
      service.setPaymentPointer(paymentPointer);

      const tag = metaService.getTag('name=monetization');
      expect(tag).toBeTruthy();
      expect(tag.content).toBe(paymentPointer);
    });
  });
});
