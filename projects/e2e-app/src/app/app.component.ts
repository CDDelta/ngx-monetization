import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MonetizationService,
  MonetizationEvent,
  MonetizationProgressEvent,
} from 'ngx-monetization';
import { Observable } from 'rxjs';
import { scan, filter, startWith, debounceTime } from 'rxjs/operators';

export interface PaidTotal {
  amount: number;
  formattedAmount: string;
  currency: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public events$: Observable<MonetizationEvent[]>;
  public paidTotal$: Observable<PaidTotal>;

  public paymentPointerControl = new FormControl('$wallet.example.com/alice');

  constructor(public monetization: MonetizationService) {
    this.monetization.setPaymentPointer(this.paymentPointerControl.value);

    this.paymentPointerControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((pointer) => this.monetization.setPaymentPointer(pointer));

    this.events$ = monetization.events.pipe(
      scan((eventsList, e) => {
        // Unroll the event manually as JSON.stringify() will not properly serialise the event.
        eventsList.push({
          type: e.type,
          detail: {
            ...e.detail,
          },
        });
        return eventsList.slice(-10);
      }, []),
      startWith([])
    );

    const startTotal = {
      amount: 0,
      formattedAmount: '',
      currency: '',
    };

    this.paidTotal$ = monetization.events.pipe(
      filter((e) => e.type === 'monetizationprogress'),
      scan((total, e: MonetizationProgressEvent) => {
        const scale = e.detail.assetScale;
        const amount = total.amount + Number(e.detail.amount);

        return {
          amount,
          formattedAmount: (amount * Math.pow(10, -scale)).toFixed(scale),
          currency: e.detail.assetCode,
        };
      }, startTotal),
      startWith(startTotal)
    );
  }
}
