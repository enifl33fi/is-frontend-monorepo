import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import type {ApplicationConfig} from '@angular/core';
import {importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideRouter} from '@angular/router';
import {rootEffectsProvider} from '@is/labs/lab1/root/effects';
import {rootStoreProvider} from '@is/labs/lab1/root/store';
import {routerEffectsProvider} from '@is/labs/lab1/shared/router/effects';
import {userEffectsProvider} from '@is/labs/lab1/shared/user/effects';
import {userStoreProvider} from '@is/labs/lab1/shared/user/store';
import {provideTaigaErrorKeys} from '@is/labs/lab1/shared/utils';
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
  ],
};
