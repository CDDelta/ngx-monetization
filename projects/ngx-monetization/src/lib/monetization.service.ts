import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { fromEvent, merge, Observable, empty } from 'rxjs';
import { map } from 'rxjs/operators';
import { MonetizationEvent, MonetizationState } from 'types-wm';

@Injectable({
  providedIn: 'root',
})
export class MonetizationService {
  public events: Observable<MonetizationEvent>;
  public state: Observable<MonetizationState | undefined>;

  constructor(@Inject(DOCUMENT) private document: Document) {
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

  public isAvailable(): boolean {
    return !!this.document && !!this.document.monetization;
  }
}
