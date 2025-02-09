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
import {FormLocation, Location} from '@is/labs/lab1/shared/location/types';
import {TuiError, TuiLabel} from '@taiga-ui/core';
import {TuiFieldErrorPipe, TuiSwitch} from '@taiga-ui/kit';
import {
  TuiInputModule,
  TuiInputNumberModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import {tap} from 'rxjs';

@Component({
  standalone: true,
  selector: 'lab1-location-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiError,
    TuiFieldErrorPipe,
    TuiInputModule,
    TuiInputNumberModule,
    TuiLabel,
    TuiSwitch,
    TuiTextfieldControllerModule,
  ],
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  public readonly locked = input(false);
  public readonly entity = input<Location | null>(null);

  public readonly handleForm = output<FormLocation>();

  public readonly form = this.fb.group({
    x: this.fb.control<number | null>(null, [Validators.required]),
    y: this.fb.control<number | null>(null, [Validators.required]),
    z: this.fb.control<number | null>(null, [Validators.required]),
    name: this.fb.control<string>('', [Validators.required, Validators.maxLength(779)]),
    adminPermission: this.fb.control<boolean | null>(null),
  });

  constructor() {
    effect(() => {
      const entityValue = this.entity();

      if (entityValue) {
        this.form.patchValue({
          x: entityValue.x,
          y: entityValue.y,
          z: entityValue.z,
          name: entityValue.name,
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
      const {x, y, z, name, adminPermission} = formValue;

      this.handleForm.emit({
        id: this.entity()?.id,
        x: x ?? 0,
        y: y ?? 0,
        z: z ?? 0,
        name: name ?? '',
        adminPermission: adminPermission ?? undefined,
      });
    }
  }
}
