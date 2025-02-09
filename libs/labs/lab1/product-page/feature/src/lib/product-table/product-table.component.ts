import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {lab1ProductActions, selectProducts} from '@is/labs/lab1/shared/product/store';
import {TableEntity} from '@is/labs/lab1/shared/types';
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
    'partNumber',
  ];

  public filterColumns: string[] = ['name', 'unitOfMeasure', 'partNumber'];

  public readonly productsSignal = this.store.selectSignal(
    selectProducts,
  ) as unknown as Signal<TableEntity[]>;

  public onAddClick() {
    this.store.dispatch(lab1ProductActions.showAddDialog());
  }

  public onViewClick(id: number) {
    this.store.dispatch(lab1ProductActions.showViewDialog({id}));
  }

  public onDeleteClick(id: number) {
    this.store.dispatch(lab1ProductActions.deleteProduct({id}));
  }
}
