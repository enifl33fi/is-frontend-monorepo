import {ChangeDetectionStrategy, Component} from '@angular/core';
import {EntityTableComponent} from '@is/labs/lab1/shared/ui';

@Component({
  standalone: true,
  selector: 'lab1-product-table',
  imports: [EntityTableComponent],
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTableComponent {
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
}
