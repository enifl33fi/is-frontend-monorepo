import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import type {ApplicationConfig} from '@angular/core';
import {importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideRouter} from '@angular/router';
import {addressEffectsProvider} from '@is/labs/lab1/shared/address/effects';
import {addressStoreProvider} from '@is/labs/lab1/shared/address/store';
import {coordinatesEffectsProvider} from '@is/labs/lab1/shared/coordinates/effects';
import {coordinatesStoreProvider} from '@is/labs/lab1/shared/coordinates/store';
import {locationEffectsProvider} from '@is/labs/lab1/shared/location/effects';
import {locationStoreProvider} from '@is/labs/lab1/shared/location/store';
import {organizationEffectsProvider} from '@is/labs/lab1/shared/organization/effects';
import {organizationStoreProvider} from '@is/labs/lab1/shared/organization/store';
import {personEffectsProvider} from '@is/labs/lab1/shared/person/effects';
import {personStoreProvider} from '@is/labs/lab1/shared/person/store';
import {productEffectsProvider} from '@is/labs/lab1/shared/product/effects';
import {productStoreProvider} from '@is/labs/lab1/shared/product/store';
import {rootEffectsProvider} from '@is/labs/lab1/shared/root/effects';
import {rootStoreProvider} from '@is/labs/lab1/shared/root/store';
import {routerEffectsProvider} from '@is/labs/lab1/shared/router/effects';
import {userEffectsProvider} from '@is/labs/lab1/shared/user/effects';
import {userStoreProvider} from '@is/labs/lab1/shared/user/store';
import {TokenInterceptor} from '@is/labs/lab1/shared/user/utils';
import {provideTaigaErrorKeys, WS_URL_TOKEN} from '@is/labs/lab1/shared/utils';
import {signinPageEffectsProvider} from '@is/labs/lab1/signin-page/effects';
import {signupPageEffectsProvider} from '@is/labs/lab1/signup-page/effects';
import {welcomePageEffectsProvider} from '@is/labs/lab1/welcome-page/effects';
import {BACK_URL_TOKEN} from '@is/shared/utils';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {NG_EVENT_PLUGINS} from '@taiga-ui/event-plugins';
import {BehaviorSubject} from 'rxjs';

import {appRoutes} from './app.routes';
import {environment} from './environment/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(EffectsModule.forRoot([]), StoreModule.forRoot([])),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(appRoutes),
    provideTaigaErrorKeys(),
    NG_EVENT_PLUGINS,
    addressEffectsProvider,
    addressStoreProvider,
    coordinatesEffectsProvider,
    coordinatesStoreProvider,
    locationEffectsProvider,
    locationStoreProvider,
    organizationEffectsProvider,
    organizationStoreProvider,
    personEffectsProvider,
    personStoreProvider,
    productEffectsProvider,
    productStoreProvider,
    rootEffectsProvider,
    rootStoreProvider,
    routerEffectsProvider,
    signinPageEffectsProvider,
    signupPageEffectsProvider,
    userEffectsProvider,
    userStoreProvider,
    welcomePageEffectsProvider,
    {
      provide: BACK_URL_TOKEN,
      useValue: new BehaviorSubject<string>(environment.backUrl),
    },
    {
      provide: WS_URL_TOKEN,
      useValue: new BehaviorSubject<string>(environment.wsUrl),
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
};
