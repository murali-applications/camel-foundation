import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideNgxStripe } from 'ngx-stripe';
import { PLUTO_ID } from './payment-gateway/pluto.service';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection(
    { eventCoalescing: true }),
  provideRouter(routes),
  provideHttpClient(),
  provideNgxStripe(),
  {
    provide: PLUTO_ID,
    useValue: '449f8516-791a-49ab-a09d-50f79a0678b6',
  }, provideAnimationsAsync(),
  ]
};
