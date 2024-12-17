import type {HttpErrorResponse} from '@angular/common/http';
import type {TableAddress} from '@is/labs/lab1/shared/address/types';
import {createActionGroup, emptyProps, props} from '@ngrx/store';

export const addressFeatureKey = 'address';

export const lab1AddressActions = createActionGroup({
  source: addressFeatureKey,
  events: {
    addressesFetched: props<{addresses: TableAddress[]}>(),
    addressFetchFailed: props<{error: HttpErrorResponse}>(),
    fetchAddresses: emptyProps(),
  },
});
