import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {
  lab1ProductActions,
  selectFiltersValues,
  selectPage,
  selectProducts,
  selectSize,
  selectSortBy,
  selectSortDirection,
  selectTotalElements,
} from '@is/labs/lab1/shared/product/store';
import {EntityQueryParams, TableEntity} from '@is/labs/lab1/shared/types';
import {EntityTableComponent} from '@is/labs/lab1/shared/ui';
import {Store} from '@ngrx/store';

@Component({
  standalone: true,
  selector: 'lab1-product-table',
  imports: [EntityTableComponent],
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTableComponent {
  private readonly store = inject(Store);

  public columns: string[] = [
    'id',
    'coordinatesId',
    'manufacturerId',
    'ownerId',
    'name',
    'unitOfMeasure',
    'price',
    'manufactureCost',
    'rating',
    'creationDate',
  ];

  public filterColumns: string[] = ['name', 'unitOfMeasure'];

  public readonly productsSignal = this.store.selectSignal(
    selectProducts,
  ) as unknown as Signal<TableEntity[]>;

  public readonly total = this.store.selectSignal(selectTotalElements);
  public readonly size = this.store.selectSignal(selectSize);
  public readonly page = this.store.selectSignal(selectPage);
  public readonly sortDirection = this.store.selectSignal(selectSortDirection);
  public readonly sortBy = this.store.selectSignal(selectSortBy);
  public readonly filtersValues = this.store.selectSignal(selectFiltersValues);

  public onAddClick() {
    this.store.dispatch(lab1ProductActions.showAddDialog());
  }

  public onViewClick(id: number) {
    this.store.dispatch(lab1ProductActions.showViewDialog({id}));
  }

  public onDeleteClick(id: number) {
    this.store.dispatch(lab1ProductActions.deleteProduct({id}));
  }

  public onQueryChange(queryParams: EntityQueryParams) {
    this.store.dispatch(lab1ProductActions.queryParamsFetched({queryParams}));
  }
}
