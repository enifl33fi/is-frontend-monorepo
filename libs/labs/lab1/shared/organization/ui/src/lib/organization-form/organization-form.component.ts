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
  FormOrganization,
  Organization,
  ORGANIZATION_TYPES,
  OrganizationType,
} from '@is/labs/lab1/shared/organization/types';
import {notBlankValidator} from '@is/shared/utils';
import {TuiError, TuiLabel, TuiNumberFormat} from '@taiga-ui/core';
import {
  TuiDataListWrapper,
  TuiDataListWrapperComponent,
  TuiFieldErrorPipe,
  TuiFilterByInputPipe,
  TuiSwitch,
} from '@taiga-ui/kit';
import {
  TuiComboBoxModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import {tap} from 'rxjs';

@Component({
  standalone: true,
  selector: 'lab1-organization-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiComboBoxModule,
    TuiDataListWrapper,
    TuiDataListWrapperComponent,
    TuiError,
    TuiFieldErrorPipe,
    TuiFilterByInputPipe,
    TuiInputModule,
    TuiInputNumberModule,
    TuiLabel,
    TuiNumberFormat,
    TuiSwitch,
    TuiTextfieldControllerModule,
  ],
  templateUrl: './organization-form.component.html',
  styleUrl: './organization-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly ORGANIZATION_TYPES = ORGANIZATION_TYPES;

  public readonly locked = input(false);
  public readonly entity = input<Organization | null>(null);
  public readonly addressIds = input<number[]>([]);

  public readonly handleForm = output<FormOrganization>();

  public readonly form = this.fb.group({
    officialAddressId: this.fb.control<number | null>(null, [Validators.required]),
    name: this.fb.control<string>('', [notBlankValidator()]),
    annualTurnover: this.fb.control<number | null>(null, [Validators.min(0)]),
    employeesCount: this.fb.control<number | null>(null, [
      Validators.required,
      Validators.min(0),
    ]),
    type: this.fb.control<OrganizationType | null>(null, [Validators.required]),
    rating: this.fb.control<number | null>(null, [
      Validators.required,
      Validators.min(0),
    ]),
    adminPermission: this.fb.control<boolean | null>(null),
  });

  constructor() {
    effect(() => {
      const entityValue = this.entity();

      if (entityValue) {
        this.form.patchValue({
          officialAddressId: entityValue.officialAddress.id,
          name: entityValue.name,
          annualTurnover: entityValue.annualTurnover,
          employeesCount: entityValue.employeesCount,
          type: entityValue.type,
          rating: entityValue.rating,
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
        rating,
        type,
        employeesCount,
        annualTurnover,
        name,
        officialAddressId,
        adminPermission,
      } = formValue;

      this.handleForm.emit({
        id: this.entity()?.id,
        rating: rating ?? 0,
        type: type ?? '',
        employeesCount: employeesCount ?? 0,
        annualTurnover: annualTurnover ?? null,
        name: name ?? '',
        officialAddressId: officialAddressId ?? 0,
        adminPermission: adminPermission ?? undefined,
      });
    }
  }
}
