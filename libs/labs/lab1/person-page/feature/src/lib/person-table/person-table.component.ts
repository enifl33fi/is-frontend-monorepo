import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {
  lab1PersonActions,
  selectFiltersValues,
  selectPage,
  selectPersons,
  selectSize,
  selectSortBy,
  selectSortDirection,
  selectTotalElements,
} from '@is/labs/lab1/shared/person/store';
import {EntityQueryParams, TableEntity} from '@is/labs/lab1/shared/types';
import {EntityTableComponent} from '@is/labs/lab1/shared/ui';
import {Store} from '@ngrx/store';

@Component({
  standalone: true,
  selector: 'lab1-person-table',
  imports: [EntityTableComponent],
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonTableComponent {
  private readonly store = inject(Store);

  public columns: string[] = [
    'id',
    'locationId',
    'name',
    'eyeColor',
    'hairColor',
    'weight',
    'nationality',
  ];

  public filterColumns: string[] = ['name', 'eyeColor', 'hairColor', 'nationality'];

  public readonly personsSignal = this.store.selectSignal(
    selectPersons,
  ) as unknown as Signal<TableEntity[]>;

  public readonly total = this.store.selectSignal(selectTotalElements);
  public readonly size = this.store.selectSignal(selectSize);
  public readonly page = this.store.selectSignal(selectPage);
  public readonly sortDirection = this.store.selectSignal(selectSortDirection);
  public readonly sortBy = this.store.selectSignal(selectSortBy);
  public readonly filtersValues = this.store.selectSignal(selectFiltersValues);

  public onAddClick() {
    this.store.dispatch(lab1PersonActions.showAddDialog());
  }

  public onViewClick(id: number) {
    this.store.dispatch(lab1PersonActions.showViewDialog({id}));
  }

  public onDeleteClick(id: number) {
    this.store.dispatch(lab1PersonActions.deletePerson({id}));
  }

  public onQueryChange(queryParams: EntityQueryParams) {
    this.store.dispatch(lab1PersonActions.queryParamsFetched({queryParams}));
  }
}
