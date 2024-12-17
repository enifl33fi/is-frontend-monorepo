import type {Address, TableAddress} from '@is/labs/lab1/shared/address/types';

export function convertAddressToTableAddress(address: Address): TableAddress {
  return {
    id: address.id,
    hasAccess: address.hasAccess,
    zipCode: address.zipCode,
    townId: address.town.id,
  };
}
