import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {
  lab1CoordinatesActions,
  selectCoordinates,
  selectFiltersValues,
  selectPage,
  selectSize,
  selectSortBy,
  selectSortDirection,
  selectTotalElements,
} from '@is/labs/lab1/shared/coordinates/store';
import {EntityQueryParams, TableEntity} from '@is/labs/lab1/shared/types';
import {EntityTableComponent} from '@is/labs/lab1/shared/ui';
import {Store} from '@ngrx/store';

@Component({
  standalone: true,
  selector: 'lab1-coordinates-table',
  imports: [EntityTableComponent],
  templateUrl: './coordinates-table.component.html',
  styleUrls: ['./coordinates-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoordinatesTableComponent {
  private readonly store = inject(Store);

  public readonly columns: string[] = ['id', 'x', 'y'];
  public readonly coordinatesSignal = this.store.selectSignal(
    selectCoordinates,
  ) as unknown as Signal<TableEntity[]>;

  public readonly total = this.store.selectSignal(selectTotalElements);
  public readonly size = this.store.selectSignal(selectSize);
  public readonly page = this.store.selectSignal(selectPage);
  public readonly sortDirection = this.store.selectSignal(selectSortDirection);
  public readonly sortBy = this.store.selectSignal(selectSortBy);
  public readonly filtersValues = this.store.selectSignal(selectFiltersValues);

  public onAddClick() {
    this.store.dispatch(lab1CoordinatesActions.showAddDialog());
  }

  public onViewClick(id: number) {
    this.store.dispatch(lab1CoordinatesActions.showViewDialog({id}));
  }

  public onDeleteClick(id: number) {
    this.store.dispatch(lab1CoordinatesActions.deleteCoordinates({id}));
  }

  public onQueryChange(queryParams: EntityQueryParams) {
    this.store.dispatch(lab1CoordinatesActions.queryParamsFetched({queryParams}));
  }
}
