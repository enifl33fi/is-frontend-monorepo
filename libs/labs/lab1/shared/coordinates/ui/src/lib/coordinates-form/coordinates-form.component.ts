import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Coordinates, FormCoordinates} from '@is/labs/lab1/shared/coordinates/types';
import {TuiError, TuiLabel, TuiNumberFormat} from '@taiga-ui/core';
import {TuiFieldErrorPipe, TuiSwitch} from '@taiga-ui/kit';
import {TuiInputNumberModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';
import {tap} from 'rxjs';

@Component({
  standalone: true,
  selector: 'lab1-coordinates-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiError,
    TuiFieldErrorPipe,
    TuiInputNumberModule,
    TuiLabel,
    TuiNumberFormat,
    TuiSwitch,
    TuiTextfieldControllerModule,
  ],
  templateUrl: './coordinates-form.component.html',
  styleUrls: ['./coordinates-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoordinatesFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  public readonly locked = input(false);
  public readonly entity = input<Coordinates | null>(null);

  public readonly handleForm = output<FormCoordinates>();

  public readonly form = this.fb.group({
    x: this.fb.control<number | null>(null, [Validators.required, Validators.min(-372)]),
    y: this.fb.control<number | null>(null, [Validators.required]),
    adminPermission: this.fb.control<boolean | null>(null),
  });

  constructor() {
    effect(() => {
      const entityValue = this.entity();

      if (entityValue) {
        this.form.patchValue({
          x: entityValue.x,
          y: entityValue.y,
        });
      }
    });

    effect(() => {
      const locked = this.locked();

      if (locked) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    });
  }

  public ngOnInit() {
    this.form.valueChanges
      .pipe(
        tap((value) => {
          this.emitForm(value);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  private emitForm(formValue: typeof this.form.value) {
    if (this.form.valid) {
      const {x, y, adminPermission} = formValue;

      this.handleForm.emit({
        id: this.entity()?.id,
        x: x ?? 0,
        y: y ?? 0,
        adminPermission: adminPermission ?? undefined,
      });
    }
  }
}
