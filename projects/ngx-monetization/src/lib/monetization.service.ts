import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { empty, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MonetizationEvent, MonetizationState } from 'types-wm';

/** @dynamic */
@Injectable({
  providedIn: 'root',
})
export class MonetizationService {
  /**
   * An event stream for web monetization events.
   */
  public readonly events: Observable<MonetizationEvent>;

  /**
   * An event stream for web monetization state changes.
   */
  public readonly state: Observable<MonetizationState>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private meta: Meta
  ) {
    if (this.isAvailable()) {
      this.events = merge(
        fromEvent(this.document.monetization, 'monetizationpending'),
        fromEvent(this.document.monetization, 'monetizationstart'),
        fromEvent(this.document.monetization, 'monetizationstop'),
        fromEvent(this.document.monetization, 'monetizationprogress')
      );

      this.state = this.events.pipe(
        map((_) => this.document.monetization.state)
      );
    } else {
      this.events = empty();
      this.state = empty();
    }
  }

  /**
   * Sets the payment pointer on the document.
   * If a falsy value is provided, the old pointer is removed.
   */
  public setPaymentPointer(paymentPointer: string): void {
    if (paymentPointer)
      this.meta.updateTag({ name: 'monetization', content: paymentPointer });
    else this.meta.removeTag('name="monetization"');
  }

  /**
   * Returns true if web monetization is available.
   */
  public isAvailable(): boolean {
    return !!this.document && !!this.document.monetization;
  }
}
