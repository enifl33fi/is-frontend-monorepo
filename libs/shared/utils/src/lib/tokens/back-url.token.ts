import {InjectionToken} from '@angular/core';
import type {BehaviorSubject} from 'rxjs';

export const BACK_URL_TOKEN = new InjectionToken<BehaviorSubject<string>>(
  'BACK_URL_TOKEN',
);
