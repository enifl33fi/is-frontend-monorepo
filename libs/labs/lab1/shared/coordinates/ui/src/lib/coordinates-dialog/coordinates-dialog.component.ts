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
  lab1CoordinatesActions,
  selectDialogLoading,
  selectSelectedCoordinates,
} from '@is/labs/lab1/shared/coordinates/store';
import {Coordinates, FormCoordinates} from '@is/labs/lab1/shared/coordinates/types';
import {Store} from '@ngrx/store';
import {TuiButton, TuiDialogContext} from '@taiga-ui/core';
import {TuiButtonLoading} from '@taiga-ui/kit';
import {POLYMORPHEUS_CONTEXT} from '@taiga-ui/polymorpheus';

import {CoordinatesFormComponent} from '../coordinates-form/coordinates-form.component';

@Component({
  standalone: true,
  selector: 'lab1-coordinates-dialog',
  imports: [CommonModule, CoordinatesFormComponent, TuiButton, TuiButtonLoading],
  templateUrl: './coordinates-dialog.component.html',
  styleUrls: ['./coordinates-dialog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoordinatesDialogComponent {
  private readonly store = inject(Store);
  private readonly context =
    inject<TuiDialogContext<void, CoordinatesDialogContext>>(POLYMORPHEUS_CONTEXT);

  public formCoordinatesSignal: WritableSignal<FormCoordinates | null> = signal(null);

  public readonly locked: WritableSignal<boolean> = signal(
    this.context.data.locked ?? true,
  );

  public readonly entity: Signal<Coordinates | null> = this.store.selectSignal(
    selectSelectedCoordinates,
  );

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

  public updateCoordinates(coordinates: FormCoordinates) {
    this.formCoordinatesSignal.set(coordinates);
  }

  public onAddClick() {
    const coordinates = this.formCoordinatesSignal();

    if (coordinates) {
      this.store.dispatch(lab1CoordinatesActions.addCoordinates({coordinates}));
    }
  }

  public onSaveChangesClick() {
    const coordinates = this.formCoordinatesSignal();

    if (coordinates) {
      this.store.dispatch(lab1CoordinatesActions.updateCoordinates({coordinates}));
    }
  }

  public onUpdateClick() {
    this.locked.set(false);
  }

  public onCloseClick() {
    this.context.completeWith();
  }
}

export interface CoordinatesDialogContext {
  locked?: boolean;
}
