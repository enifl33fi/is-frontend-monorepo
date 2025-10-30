import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {
  lab1AddressActions,
  selectAddresses,
  selectFiltersValues,
  selectPage,
  selectSize,
  selectSortBy,
  selectSortDirection,
  selectTotalElements,
} from '@is/labs/lab1/shared/address/store';
import {EntityQueryParams, TableEntity} from '@is/labs/lab1/shared/types';
import {EntityTableComponent} from '@is/labs/lab1/shared/ui';
import {Store} from '@ngrx/store';

@Component({
  standalone: true,
  selector: 'lab1-address-table',
  imports: [EntityTableComponent],
  templateUrl: './address-table.component.html',
  styleUrls: ['./address-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressTableComponent {
  private readonly store = inject(Store);

  public columns: string[] = ['id', 'townId', 'zipCode'];
  public filterColumns: string[] = ['zipCode'];

  public readonly addressesSignal = this.store.selectSignal(
    selectAddresses,
  ) as unknown as Signal<TableEntity[]>;

  public readonly total = this.store.selectSignal(selectTotalElements);
  public readonly size = this.store.selectSignal(selectSize);
  public readonly page = this.store.selectSignal(selectPage);
  public readonly sortDirection = this.store.selectSignal(selectSortDirection);
  public readonly sortBy = this.store.selectSignal(selectSortBy);
  public readonly filtersValues = this.store.selectSignal(selectFiltersValues);

  public onAddClick() {
    this.store.dispatch(lab1AddressActions.showAddDialog());
  }

  public onViewClick(id: number) {
    this.store.dispatch(lab1AddressActions.showViewDialog({id}));
  }

  public onDeleteClick(id: number) {
    this.store.dispatch(lab1AddressActions.deleteAddress({id}));
  }

  public onQueryChange(queryParams: EntityQueryParams) {
    this.store.dispatch(lab1AddressActions.queryParamsFetched({queryParams}));
  }
}
