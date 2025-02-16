import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  lab1ProductActions,
  selectCountOwnerLessThan,
  selectProductsByPartNumber,
  selectRatings,
} from '@is/labs/lab1/shared/product/store';
import {lab1RootActions} from '@is/labs/lab1/shared/root/store';
import {notBlankValidator} from '@is/shared/utils';
import {Store} from '@ngrx/store';
import {TuiButton, TuiError} from '@taiga-ui/core';
import {TuiButtonLoading, TuiFieldErrorPipe} from '@taiga-ui/kit';
import {
  TuiComboBoxModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';

import {ProductTableComponent} from './product-table/product-table.component';

@Component({
  standalone: true,
  selector: 'lab1-product-page',
  imports: [
    AsyncPipe,
    ProductTableComponent,
    ReactiveFormsModule,
    TuiButton,
    TuiButtonLoading,
    TuiComboBoxModule,
    TuiError,
    TuiFieldErrorPipe,
    TuiInputModule,
    TuiInputNumberModule,
    TuiTextfieldControllerModule,
  ],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);

  protected readonly JSON = JSON;

  public readonly formCount = this.fb.group({
    ownerId: this.fb.control<number | null>(null, [Validators.required]),
  });

  public readonly formPartNumber = this.fb.group({
    partNumber: this.fb.control<string>('', [notBlankValidator()]),
  });

  public readonly formDecreasePrice = this.fb.group({
    manufacturerId: this.fb.control<number | null>(null, [Validators.required]),
    percent: this.fb.control<number | null>(null, [Validators.required]),
  });

  public readonly ratingsSignal = this.store.selectSignal(selectRatings);
  public readonly productsSignal = this.store.selectSignal(selectProductsByPartNumber);
  public readonly ownerLessThanSignal = this.store.selectSignal(selectCountOwnerLessThan);

  public ngOnInit() {
    this.store.dispatch(lab1RootActions.setActiveTab({activeTab: 'product'}));
  }

  public onSubmitCountForm() {
    if (this.formCount.valid) {
      this.store.dispatch(
        lab1ProductActions.fetchOwnerCountLessThan({
          ownerId: this.formCount.value.ownerId ?? 0,
        }),
      );
    }
  }

  public onSubmitPartNumberForm() {
    if (this.formPartNumber.valid) {
      this.store.dispatch(
        lab1ProductActions.fetchProductsByPartNumber({
          partNumber: this.formPartNumber.value.partNumber ?? '',
        }),
      );
    }
  }

  public onFindRatingsClick() {
    this.store.dispatch(lab1ProductActions.fetchRatings());
  }

  public onSubmitDecreasePriceForm() {
    if (this.formDecreasePrice.valid) {
      this.store.dispatch(
        lab1ProductActions.decreasePrice({
          manufacturerId: this.formDecreasePrice.value.manufacturerId ?? 0,
          percent: this.formDecreasePrice.value.percent ?? 0,
        }),
      );
    }
  }
}
