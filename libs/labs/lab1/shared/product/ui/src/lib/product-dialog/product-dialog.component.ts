import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import {selectOwnCoordinatesIds} from '@is/labs/lab1/shared/coordinates/store';
import {selectOwnOrganizationIds} from '@is/labs/lab1/shared/organization/store';
import {selectDialogLoading, selectOwnPersonIds} from '@is/labs/lab1/shared/person/store';
import {
  lab1ProductActions,
  selectSelectedProduct,
} from '@is/labs/lab1/shared/product/store';
import {FormProduct, Product} from '@is/labs/lab1/shared/product/types';
import {Store} from '@ngrx/store';
import {TuiButton, TuiDialogContext} from '@taiga-ui/core';
import {TuiButtonLoading} from '@taiga-ui/kit';
import {POLYMORPHEUS_CONTEXT} from '@taiga-ui/polymorpheus';

import {ProductFormComponent} from '../product-form/product-form.component';

@Component({
  standalone: true,
  selector: 'lab1-product-dialog',
  imports: [CommonModule, ProductFormComponent, TuiButton, TuiButtonLoading],
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDialogComponent {
  private readonly store = inject(Store);
  private readonly context =
    inject<TuiDialogContext<void, ProductDialogContext>>(POLYMORPHEUS_CONTEXT);

  public formProductSignal: WritableSignal<FormProduct | null> = signal(null);
  public readonly locked: WritableSignal<boolean> = signal(
    this.context.data.locked ?? true,
  );

  public readonly entity: Signal<Product | null> =
    this.store.selectSignal(selectSelectedProduct);

  public readonly coordinatesIds: Signal<number[]> = this.store.selectSignal(
    selectOwnCoordinatesIds,
  );

  public readonly manufacturerIds: Signal<number[]> = this.store.selectSignal(
    selectOwnOrganizationIds,
  );

  public readonly ownerIds: Signal<number[]> =
    this.store.selectSignal(selectOwnPersonIds);

  public readonly loadingSignal = this.store.selectSignal(selectDialogLoading);

  constructor() {
    effect(
      () => {
        const entityVal = this.entity();

        if (entityVal) {
          this.locked.set(true);
        }
      },
      {
        allowSignalWrites: true,
      },
    );
  }

  public updateProduct(product: FormProduct) {
    this.formProductSignal.set(product);
  }

  public onAddClick() {
    const product = this.formProductSignal();

    if (product) {
      this.store.dispatch(lab1ProductActions.addProduct({product}));
    }
  }

  public onSaveChangesClick() {
    const product = this.formProductSignal();

    if (product) {
      this.store.dispatch(lab1ProductActions.updateProduct({product}));
    }
  }

  public onUpdateClick() {
    this.locked.set(false);
  }

  public onCloseClick() {
    this.context.completeWith();
  }
}
export interface ProductDialogContext {
  locked?: boolean;
}
