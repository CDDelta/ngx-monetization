# ngx-monetization

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/cddelta/ngx-monetization/issues)

[![https://nodei.co/npm/ngx-monetization.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/ngx-monetization.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/ngx-monetization)

Web Monetization API for Angular!

`ngx-monetization` helps you interact with the Web Monetization API with an observable-based API.

The Web Monetization API is
**a JavaScript browser API which allows the creation of a payment stream from the user agent to the website**, read more about it [here](https://webmonetization.org/).

Check out the demo [here](https://cddelta.github.io/ngx-monetization/).

## Install

To use `ngx-monetization` in your project run:

```bash
ng add ngx-monetization
```

or install it via npm:

```bash
npm install ngx-monetization --save
```

and add your payment pointer to `index.html`, see [here](https://webmonetization.org/docs/getting-started).

## Example Use

```typescript
import { Component } from "@angular/core";
import { MonetizationService } from "ngx-monetization";

@Component({
  selector: "app-root",
  template: `
    <p>State: {{ monetization.state | async }}</p>
    <ul>
      <li *ngFor="let event of monetization.events | async">
        {{ event | json }}
      </li>
    </ul>
  `,
})
export class AppComponent {
  constructor(public monetization: MonetizationService) {
    monetization.setPaymentPointer("$wallet.example.com/alice");
  }
}
```

## Contributing

To contribute to this library, clone it locally and run `npm install`.

To build the library run:

```bash
npm run build
```

To run tests run:

```bash
npm run test
```

To test the demo app run:

```bash
npm run start
```
