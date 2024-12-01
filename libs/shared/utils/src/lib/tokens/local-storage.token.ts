import {inject, InjectionToken} from '@angular/core';
import {WA_LOCAL_STORAGE} from '@ng-web-apis/common';

import {MockLocalStorage} from '../mocks/mock-local-storage';

export const LOCAL_STORAGE_TOKEN = new InjectionToken<Storage>('LOCAL_STORAGE_TOKEN', {
  providedIn: 'root',
  factory: () => {
    try {
      const storage = inject(WA_LOCAL_STORAGE);

      return storage || MockLocalStorage.getInstance();
    } catch {
      return MockLocalStorage.getInstance();
    }
  },
});
