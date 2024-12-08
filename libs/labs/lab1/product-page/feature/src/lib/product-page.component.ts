import {ChangeDetectionStrategy, Component} from '@angular/core';

import {ProductTableComponent} from './product-table/product-table.component';

@Component({
  standalone: true,
  selector: 'lab1-product-page',
  imports: [ProductTableComponent],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPageComponent {}
