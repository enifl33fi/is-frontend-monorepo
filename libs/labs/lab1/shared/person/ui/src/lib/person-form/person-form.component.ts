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
import {
  Color,
  COLORS,
  COUNTRIES,
  Country,
  FormPerson,
  Person,
} from '@is/labs/lab1/shared/person/types';
import {notBlankValidator} from '@is/shared/utils';
import {TuiError, TuiLabel} from '@taiga-ui/core';
import {
  TuiDataListWrapper,
  TuiDataListWrapperComponent,
  TuiFieldErrorPipe,
  TuiFilterByInputPipe,
  TuiSwitch,
} from '@taiga-ui/kit';
import {
  TuiComboBoxModule,
  TuiInputDateModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import {tap} from 'rxjs';

@Component({
  standalone: true,
  selector: 'lab1-person-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiComboBoxModule,
    TuiDataListWrapper,
    TuiDataListWrapperComponent,
    TuiError,
    TuiFieldErrorPipe,
    TuiFilterByInputPipe,
    TuiInputDateModule,
    TuiInputModule,
    TuiInputNumberModule,
    TuiLabel,
    TuiSwitch,
    TuiTextfieldControllerModule,
  ],
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly COLORS = COLORS;
  protected readonly COUNTRIES = COUNTRIES;

  public readonly locked = input(false);
  public readonly entity = input<Person | null>(null);
  public readonly locationIds = input<number[]>([]);

  public readonly handleForm = output<FormPerson>();

  public readonly form = this.fb.group({
    locationId: this.fb.control<number | null>(null),
    name: this.fb.control<string>('', [notBlankValidator()]),
    eyeColor: this.fb.control<Color | null>(null, [Validators.required]),
    hairColor: this.fb.control<Color | null>(null),
    weight: this.fb.control<number | null>(null, [Validators.min(0)]),
    nationality: this.fb.control<Country | null>(null, [Validators.required]),
    adminPermission: this.fb.control<boolean | null>(null),
  });

  constructor() {
    effect(() => {
      const entityValue = this.entity();

      if (entityValue) {
        this.form.patchValue({
          locationId: entityValue.location?.id ?? null,
          name: entityValue.name,
          eyeColor: entityValue.eyeColor,
          hairColor: entityValue.hairColor,
          weight: entityValue.weight,
          nationality: entityValue.nationality,
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
      const {
        locationId,
        name,
        eyeColor,
        hairColor,
        weight,
        nationality,
        adminPermission,
      } = formValue;

      this.handleForm.emit({
        id: this.entity()?.id,
        locationId: locationId ?? 0,
        name: name ?? '',
        eyeColor: eyeColor ?? 'BLACK',
        hairColor: hairColor ?? null,
        weight: weight ?? null,
        nationality: nationality ?? 'VATICAN',
        adminPermission: adminPermission ?? undefined,
      });
    }
  }
}
