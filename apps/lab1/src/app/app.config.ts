import type {ApplicationConfig} from '@angular/core';
import {importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideRouter} from '@angular/router';
import {routerEffectsProvider} from '@is/labs/lab1/shared/router/effects';
import {userEffectsProvider} from '@is/labs/lab1/shared/user/effects';
import {userStoreProvider} from '@is/labs/lab1/shared/user/store';
import {provideTaigaErrorKeys} from '@is/labs/lab1/shared/utils';
import {welcomePageEffectsProvider} from '@is/labs/lab1/welcome-page/effects';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {NG_EVENT_PLUGINS} from '@taiga-ui/event-plugins';

import {appRoutes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(EffectsModule.forRoot([]), StoreModule.forRoot([])),
    provideAnimations(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(appRoutes),
    provideTaigaErrorKeys(),
    NG_EVENT_PLUGINS,
    routerEffectsProvider,
    userEffectsProvider,
    userStoreProvider,
    welcomePageEffectsProvider,
  ],
};
