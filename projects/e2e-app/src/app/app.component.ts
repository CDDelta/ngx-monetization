import { Component } from '@angular/core';
import { MonetizationService, MonetizationEvent } from 'ngx-monetization';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public events$: Observable<MonetizationEvent[]>;

  constructor(public monetization: MonetizationService) {
    monetization.setPaymentPointer("$wallet.example.com/alice");

    this.events$ = monetization.events.pipe(
      scan((acc, val) => {
        acc.push(val);
        return acc.slice(-3);
      }, [])
    );
  }
}
