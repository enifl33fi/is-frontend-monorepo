import {AsyncPipe} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  lab1ProductActions,
  selectAverageRating,
  selectCountByRating,
  selectDistinctOwners,
  selectProductsByUnitOfMeasure,
} from '@is/labs/lab1/shared/product/store';
import {UnitOfMeasure, UNITS_OF_MEASURES} from '@is/labs/lab1/shared/product/types';
import {lab1RootActions} from '@is/labs/lab1/shared/root/store';
import {TableEntity} from '@is/labs/lab1/shared/types';
import {EntityTableComponent} from '@is/labs/lab1/shared/ui';
import {Store} from '@ngrx/store';
import {TUI_DEFAULT_MATCHER, tuiPure} from '@taiga-ui/cdk';
import {TuiButton, TuiError, TuiTextfield} from '@taiga-ui/core';
import {TuiFieldErrorPipe} from '@taiga-ui/kit';
import {
  TuiComboBoxModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiMultiSelectModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';

import {ProductTableComponent} from './product-table/product-table.component';

@Component({
  standalone: true,
  selector: 'lab1-product-page',
  imports: [
    AsyncPipe,
    EntityTableComponent,
    ProductTableComponent,
    ReactiveFormsModule,
    TuiButton,
    TuiComboBoxModule,
    TuiError,
    TuiFieldErrorPipe,
    TuiInputModule,
    TuiInputNumberModule,
    TuiMultiSelectModule,
    TuiTextfield,
    TuiTextfieldControllerModule,
  ],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  protected search = signal<string | null>(null);
  protected readonly UNITS_OF_MEASURES = UNITS_OF_MEASURES;

  protected readonly obj = Object;

  public readonly formCountByRating = this.fb.group({
    rating: this.fb.control<number | null>(null, [
      Validators.required,
      Validators.min(0),
    ]),
  });

  public readonly formProductsByUnit = this.fb.group({
    unitOfMeasures: this.fb.control<UnitOfMeasure[]>([], [Validators.required]),
  });

  public readonly formDecreaseAllPrices = this.fb.group({
    percent: this.fb.control<number | null>(null, [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
  });

  public readonly averageRatingSignal = this.store.selectSignal(selectAverageRating);
  public readonly countByRatingSignal = this.store.selectSignal(selectCountByRating);
  public readonly distinctOwnersSignal = this.store.selectSignal(
    selectDistinctOwners,
  ) as unknown as Signal<TableEntity[]>;

  public readonly productsByUnitOfMeasureSignal = this.store.selectSignal(
    selectProductsByUnitOfMeasure,
  ) as unknown as Signal<TableEntity[]>;

  public ngOnInit() {
    this.store.dispatch(lab1RootActions.setActiveTab({activeTab: 'product'}));
  }

  public onShowAvgRatingClick() {
    this.store.dispatch(lab1ProductActions.fetchAverageRating());
  }

  public onSubmitCountByRatingForm() {
    if (this.formCountByRating.valid) {
      this.store.dispatch(
        lab1ProductActions.fetchCountByRating({
          rating: this.formCountByRating.value.rating ?? 0,
        }),
      );
    }
  }

  public onSubmitProductsByUnitForm() {
    if (this.formProductsByUnit.valid) {
      this.store.dispatch(
        lab1ProductActions.fetchProductsByUnitOfMeasure({
          unitOfMeasures: this.formProductsByUnit.value.unitOfMeasures ?? [],
        }),
      );
    }
  }

  public onFetchDistinctOwnersClick() {
    this.store.dispatch(lab1ProductActions.fetchDistinctOwners());
  }

  public onSubmitDecreaseAllPricesForm() {
    if (this.formDecreaseAllPrices.valid) {
      this.store.dispatch(
        lab1ProductActions.decreaseAllPrices({
          percent: this.formDecreaseAllPrices.value.percent ?? 0,
        }),
      );
    }
  }

  @tuiPure
  protected filter(search?: string | null): readonly string[] {
    return this.UNITS_OF_MEASURES.filter((unitOfMeasure) =>
      TUI_DEFAULT_MATCHER(unitOfMeasure, search ?? ''),
    );
  }
}
