import {createFeature, createReducer, on} from '@ngrx/store';

import type {AddressState} from './address.state';
import {addressFeatureKey, lab1AddressActions} from './lab1-address.actions';

export const initialAddressState: AddressState = {
  addresses: [],
  selectedAddress: null,
  dialogLoading: false,
  ownAddressesIds: [],
  queryParams: {},
  totalPages: 0,
  totalElements: 0,
};

export const addressStore = createFeature({
  name: addressFeatureKey,
  reducer: createReducer<AddressState>(
    initialAddressState,
    on(
      lab1AddressActions.addressesFetched,
      (state, {response}): AddressState => ({
        ...state,
        addresses: response.content,
        totalElements: response.totalElements,
        totalPages: response.totalPages,
        queryParams: {
          ...state.queryParams,
          page: response.number,
          size: response.size,
        },
      }),
    ),
    on(
      lab1AddressActions.queryParamsUpdated,
      (state, {queryParams}): AddressState => ({
        ...state,
        queryParams,
      }),
    ),
    on(
      lab1AddressActions.setDialogLoading,
      (state, {dialogLoading}): AddressState => ({
        ...state,
        dialogLoading,
      }),
    ),
    on(
      lab1AddressActions.addAddress,
      lab1AddressActions.updateAddress,
      (state): AddressState => ({
        ...state,
        dialogLoading: true,
      }),
    ),
    on(
      lab1AddressActions.addAddressCompleted,
      lab1AddressActions.updateAddressCompleted,
      (state, {address}): AddressState => ({
        ...state,
        dialogLoading: false,
        selectedAddress: address,
      }),
    ),
    on(
      lab1AddressActions.addressByIdFetched,
      (state, {address}): AddressState => ({
        ...state,
        selectedAddress: address,
      }),
    ),
    on(
      lab1AddressActions.addressRequestFailed,
      (state): AddressState => ({
        ...state,
        dialogLoading: false,
      }),
    ),
    on(
      lab1AddressActions.showAddDialog,
      (state): AddressState => ({
        ...state,
        selectedAddress: null,
      }),
    ),
    on(
      lab1AddressActions.ownAddressIdsFetched,
      (state, {ids}): AddressState => ({
        ...state,
        ownAddressesIds: ids,
      }),
    ),
  ),
});
