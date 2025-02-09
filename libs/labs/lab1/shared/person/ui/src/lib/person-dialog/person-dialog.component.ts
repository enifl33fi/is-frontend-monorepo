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
import {selectOwnLocationIds} from '@is/labs/lab1/shared/location/store';
import {OrganizationFormComponent} from '@is/labs/lab1/shared/organization/ui';
import {
  lab1PersonActions,
  selectDialogLoading,
  selectSelectedPerson,
} from '@is/labs/lab1/shared/person/store';
import {FormPerson, Person} from '@is/labs/lab1/shared/person/types';
import {Store} from '@ngrx/store';
import {TuiButton, TuiDialogContext} from '@taiga-ui/core';
import {TuiButtonLoading} from '@taiga-ui/kit';
import {POLYMORPHEUS_CONTEXT} from '@taiga-ui/polymorpheus';

import {PersonFormComponent} from '../person-form/person-form.component';

@Component({
  standalone: true,
  selector: 'lab1-person-dialog',
  imports: [
    CommonModule,
    OrganizationFormComponent,
    PersonFormComponent,
    TuiButton,
    TuiButtonLoading,
  ],
  templateUrl: './person-dialog.component.html',
  styleUrls: ['./person-dialog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonDialogComponent {
  private readonly store = inject(Store);
  private readonly context =
    inject<TuiDialogContext<void, PersonDialogContext>>(POLYMORPHEUS_CONTEXT);

  public formPersonSignal: WritableSignal<FormPerson | null> = signal(null);
  public readonly locked: WritableSignal<boolean> = signal(
    this.context.data.locked ?? true,
  );

  public readonly entity: Signal<Person | null> =
    this.store.selectSignal(selectSelectedPerson);

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

  public updatePerson(person: FormPerson) {
    this.formPersonSignal.set(person);
  }

  public onAddClick() {
    const person = this.formPersonSignal();

    if (person) {
      this.store.dispatch(lab1PersonActions.addPerson({person}));
    }
  }

  public onSaveChangesClick() {
    const person = this.formPersonSignal();

    if (person) {
      this.store.dispatch(lab1PersonActions.updatePerson({person}));
    }
  }

  public onUpdateClick() {
    this.locked.set(false);
  }

  public onCloseClick() {
    this.context.completeWith();
  }
}
export interface PersonDialogContext {
  locked?: boolean;
}
