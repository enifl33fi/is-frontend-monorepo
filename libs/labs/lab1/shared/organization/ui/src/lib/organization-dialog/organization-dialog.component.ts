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
import {selectOwnAddressesIds} from '@is/labs/lab1/shared/address/store';
import {
  lab1OrganizationActions,
  selectDialogLoading,
  selectSelectedOrganization,
} from '@is/labs/lab1/shared/organization/store';
import {FormOrganization, Organization} from '@is/labs/lab1/shared/organization/types';
import {Store} from '@ngrx/store';
import {TuiButton, TuiDialogContext} from '@taiga-ui/core';
import {TuiButtonLoading} from '@taiga-ui/kit';
import {POLYMORPHEUS_CONTEXT} from '@taiga-ui/polymorpheus';

import {OrganizationFormComponent} from '../organization-form/organization-form.component';

@Component({
  standalone: true,
  selector: 'lab1-organization-dialog',
  imports: [CommonModule, OrganizationFormComponent, TuiButton, TuiButtonLoading],
  templateUrl: './organization-dialog.component.html',
  styleUrls: ['./organization-dialog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationDialogComponent {
  private readonly store = inject(Store);
  private readonly context =
    inject<TuiDialogContext<void, OrganizationDialogContext>>(POLYMORPHEUS_CONTEXT);

  public formOrganizationSignal: WritableSignal<FormOrganization | null> = signal(null);
  public readonly locked: WritableSignal<boolean> = signal(
    this.context.data.locked ?? true,
  );

  public readonly entity: Signal<Organization | null> = this.store.selectSignal(
    selectSelectedOrganization,
  );

  public readonly addressIds: Signal<number[]> =
    this.store.selectSignal(selectOwnAddressesIds);

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

  public updateOrganization(organization: FormOrganization) {
    this.formOrganizationSignal.set(organization);
  }

  public onAddClick() {
    const organization = this.formOrganizationSignal();

    if (organization) {
      this.store.dispatch(lab1OrganizationActions.addOrganization({organization}));
    }
  }

  public onSaveChangesClick() {
    const organization = this.formOrganizationSignal();

    if (organization) {
      this.store.dispatch(lab1OrganizationActions.updateOrganization({organization}));
    }
  }

  public onUpdateClick() {
    this.locked.set(false);
  }

  public onCloseClick() {
    this.context.completeWith();
  }
}
export interface OrganizationDialogContext {
  locked?: boolean;
}
