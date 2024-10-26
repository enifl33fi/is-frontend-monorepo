import type {ApplicationConfig} from '@angular/core';
import {importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideRouter} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {NG_EVENT_PLUGINS} from '@taiga-ui/event-plugins';

import {appRoutes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(appRoutes),
    NG_EVENT_PLUGINS,
    importProvidersFrom(EffectsModule.forRoot([]), StoreModule.forRoot([])),
  ],
};
