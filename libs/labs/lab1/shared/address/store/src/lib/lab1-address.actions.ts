import type {HttpErrorResponse} from '@angular/common/http';
import type {
  Address,
  FormAddress,
  TableAddress,
} from '@is/labs/lab1/shared/address/types';
import type {EntityQueryParams, PageResponse} from '@is/labs/lab1/shared/types';
import {createActionGroup, emptyProps, props} from '@ngrx/store';

export const addressFeatureKey = 'address';

export const lab1AddressActions = createActionGroup({
  source: addressFeatureKey,
  events: {
    addressesFetched: props<{response: PageResponse<TableAddress>}>(),
    addressRequestFailed: props<{error: HttpErrorResponse}>(),
    fetchAddresses: emptyProps(),
    fetchAddressesById: props<{id: number}>(),
    fetchOwnAddressIds: emptyProps(),
    setDialogLoading: props<{dialogLoading: boolean}>(),
    addAddress: props<{address: FormAddress}>(),
    updateAddress: props<{address: FormAddress}>(),
    deleteAddress: props<{id: number}>(),
    ownAddressIdsFetched: props<{ids: number[]}>(),
    addressByIdFetched: props<{address: Address}>(),
    addAddressCompleted: props<{address: Address}>(),
    updateAddressCompleted: props<{address: Address}>(),
    deleteAddressCompleted: emptyProps(),
    showViewDialog: props<{id: number}>(),
    showAddDialog: emptyProps(),

    queryParamsFetched: props<{queryParams: EntityQueryParams}>(),
    queryParamsUpdated: props<{queryParams: EntityQueryParams}>(),
  },
});
