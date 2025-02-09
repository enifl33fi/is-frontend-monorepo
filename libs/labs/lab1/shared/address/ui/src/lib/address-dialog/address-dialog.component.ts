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
import {
  lab1AddressActions,
  selectDialogLoading,
  selectSelectedAddress,
} from '@is/labs/lab1/shared/address/store';
import {Address, FormAddress} from '@is/labs/lab1/shared/address/types';
import {selectOwnLocationIds} from '@is/labs/lab1/shared/location/store';
import {Store} from '@ngrx/store';
import {TuiButton, TuiDialogContext} from '@taiga-ui/core';
import {TuiButtonLoading} from '@taiga-ui/kit';
import {POLYMORPHEUS_CONTEXT} from '@taiga-ui/polymorpheus';

import {AddressFormComponent} from '../address-form/address-form.component';

@Component({
  standalone: true,
  selector: 'lab1-address-dialog',
  imports: [AddressFormComponent, CommonModule, TuiButton, TuiButtonLoading],
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressDialogComponent {
  private readonly store = inject(Store);
  private readonly context =
    inject<TuiDialogContext<void, AddressDialogContext>>(POLYMORPHEUS_CONTEXT);

  public formAddressSignal: WritableSignal<FormAddress | null> = signal(null);
  public readonly locked: WritableSignal<boolean> = signal(
    this.context.data.locked ?? true,
  );

  public readonly entity: Signal<Address | null> =
    this.store.selectSignal(selectSelectedAddress);

  public readonly locationIds: Signal<number[]> =
    this.store.selectSignal(selectOwnLocationIds);

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

  public updateAddress(address: FormAddress) {
    this.formAddressSignal.set(address);
  }

  public onAddClick() {
    const address = this.formAddressSignal();

    if (address) {
      this.store.dispatch(lab1AddressActions.addAddress({address}));
    }
  }

  public onSaveChangesClick() {
    const address = this.formAddressSignal();

    if (address) {
      this.store.dispatch(lab1AddressActions.updateAddress({address}));
    }
  }

  public onUpdateClick() {
    this.locked.set(false);
  }

  public onCloseClick() {
    this.context.completeWith();
  }
}

export interface AddressDialogContext {
  locked?: boolean;
}
