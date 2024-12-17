import {createFeature, createReducer, on} from '@ngrx/store';

import type {AddressState} from './address.state';
import {addressFeatureKey, lab1AddressActions} from './lab1-address.actions';

export const initialAddressState: AddressState = {
  addresses: [],
};

export const addressStore = createFeature({
  name: addressFeatureKey,
  reducer: createReducer<AddressState>(
    initialAddressState,
    on(
      lab1AddressActions.addressesFetched,
      (state, {addresses}): AddressState => ({
        ...state,
        addresses,
      }),
    ),
  ),
});
