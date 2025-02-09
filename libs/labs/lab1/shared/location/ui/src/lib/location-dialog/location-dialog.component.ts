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
  lab1LocationActions,
  selectDialogLoading,
  selectSelectedLocation,
} from '@is/labs/lab1/shared/location/store';
import {FormLocation, Location} from '@is/labs/lab1/shared/location/types';
import {Store} from '@ngrx/store';
import {TuiButton, TuiDialogContext} from '@taiga-ui/core';
import {TuiButtonLoading} from '@taiga-ui/kit';
import {POLYMORPHEUS_CONTEXT} from '@taiga-ui/polymorpheus';

import {LocationFormComponent} from '../location-form/location-form.component';

@Component({
  standalone: true,
  selector: 'lab1-location-dialog',
  imports: [CommonModule, LocationFormComponent, TuiButton, TuiButtonLoading],
  templateUrl: './location-dialog.component.html',
  styleUrls: ['./location-dialog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationDialogComponent {
  private readonly store = inject(Store);
  private readonly context =
    inject<TuiDialogContext<void, LocationDialogContext>>(POLYMORPHEUS_CONTEXT);

  public formLocationSignal: WritableSignal<FormLocation | null> = signal(null);
  public readonly locked: WritableSignal<boolean> = signal(
    this.context.data.locked ?? true,
  );

  public readonly entity: Signal<Location | null> =
    this.store.selectSignal(selectSelectedLocation);

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

  public updateLocation(location: FormLocation) {
    this.formLocationSignal.set(location);
  }

  public onAddClick() {
    const location = this.formLocationSignal();

    if (location) {
      this.store.dispatch(lab1LocationActions.addLocation({location}));
    }
  }

  public onSaveChangesClick() {
    const location = this.formLocationSignal();

    if (location) {
      this.store.dispatch(lab1LocationActions.updateLocation({location}));
    }
  }

  public onUpdateClick() {
    this.locked.set(false);
  }

  public onCloseClick() {
    this.context.completeWith();
  }
}

export interface LocationDialogContext {
  locked?: boolean;
}
