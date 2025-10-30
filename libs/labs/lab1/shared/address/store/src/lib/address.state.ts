import type {Address, TableAddress} from '@is/labs/lab1/shared/address/types';
import type {EntityQueryParams} from '@is/labs/lab1/shared/types';

export interface AddressState {
  addresses: TableAddress[];
  selectedAddress: Address | null;
  dialogLoading: boolean;
  ownAddressesIds: number[];
  queryParams: EntityQueryParams;
  totalElements: number;
  totalPages: number;
}
