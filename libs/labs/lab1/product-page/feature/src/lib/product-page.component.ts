import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {lab1RootActions} from '@is/labs/lab1/shared/root/store';
import {Store} from '@ngrx/store';

import {ProductTableComponent} from './product-table/product-table.component';

@Component({
  standalone: true,
  selector: 'lab1-product-page',
  imports: [ProductTableComponent],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPageComponent implements OnInit {
  private readonly store = inject(Store);

  public ngOnInit() {
    this.store.dispatch(lab1RootActions.setActiveTab({activeTab: 'product'}));
  }
}
