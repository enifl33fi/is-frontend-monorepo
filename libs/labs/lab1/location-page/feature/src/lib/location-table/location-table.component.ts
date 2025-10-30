import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {
  lab1LocationActions,
  selectFiltersValues,
  selectLocations,
  selectPage,
  selectSize,
  selectSortBy,
  selectSortDirection,
  selectTotalElements,
} from '@is/labs/lab1/shared/location/store';
import {EntityQueryParams, TableEntity} from '@is/labs/lab1/shared/types';
import {EntityTableComponent} from '@is/labs/lab1/shared/ui';
import {Store} from '@ngrx/store';

@Component({
  standalone: true,
  selector: 'lab1-location-table',
  imports: [EntityTableComponent],
  templateUrl: './location-table.component.html',
  styleUrls: ['./location-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationTableComponent {
  private readonly store = inject(Store);

  public readonly columns: string[] = ['id', 'x', 'y', 'z'];

  public readonly locationsSignal = this.store.selectSignal(
    selectLocations,
  ) as unknown as Signal<TableEntity[]>;

  public readonly total = this.store.selectSignal(selectTotalElements);
  public readonly size = this.store.selectSignal(selectSize);
  public readonly page = this.store.selectSignal(selectPage);
  public readonly sortDirection = this.store.selectSignal(selectSortDirection);
  public readonly sortBy = this.store.selectSignal(selectSortBy);
  public readonly filtersValues = this.store.selectSignal(selectFiltersValues);

  public onAddClick() {
    this.store.dispatch(lab1LocationActions.showAddDialog());
  }

  public onViewClick(id: number) {
    this.store.dispatch(lab1LocationActions.showViewDialog({id}));
  }

  public onDeleteClick(id: number) {
    this.store.dispatch(lab1LocationActions.deleteLocation({id}));
  }

  public onQueryChange(queryParams: EntityQueryParams) {
    this.store.dispatch(lab1LocationActions.queryParamsFetched({queryParams}));
  }
}
