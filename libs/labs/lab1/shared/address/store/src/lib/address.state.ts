import type {Address, TableAddress} from '@is/labs/lab1/shared/address/types';

export interface AddressState {
  addresses: TableAddress[];
  selectedAddress: Address | null;
  dialogLoading: boolean;
  ownAddressesIds: number[];
}
