import { ɵgetDOM as getDOM, DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Meta } from '@angular/platform-browser';
import { MonetizationService } from './monetization.service';

describe('MonetizationService', () => {
  let service: MonetizationService;

  describe('setPaymentPointer', () => {
    let doc: Document;
    let metaService: Meta;

    beforeEach(() => {
      doc = getDOM().createHtmlDocument();
      metaService = new Meta(doc);

      TestBed.configureTestingModule({
        providers: [
          {
            provide: DOCUMENT,
            useValue: doc,
          },
        ],
      });

      service = TestBed.inject(MonetizationService);
    });

    it('should set payment pointer correctly', () => {
      const paymentPointer = '$$wallet.example.com/alice';
      service.setPaymentPointer(paymentPointer);

      const tag = metaService.getTag('name="monetization"');
      expect(tag).toBeTruthy();
      expect(tag.content).toBe(paymentPointer);
    });

    it('should remove payment pointer if set to falsy', () => {
      service.setPaymentPointer(null);

      const tag = metaService.getTag('name="monetization"');
      expect(tag).toBeFalsy();
    });
  });
});
