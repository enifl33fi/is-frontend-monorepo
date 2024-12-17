import {InjectionToken} from '@angular/core';
import type {BehaviorSubject} from 'rxjs';

export const WS_URL_TOKEN = new InjectionToken<BehaviorSubject<string>>('WS_URL_TOKEN');
