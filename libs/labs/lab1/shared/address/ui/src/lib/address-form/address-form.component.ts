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
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Address, FormAddress} from '@is/labs/lab1/shared/address/types';
import {TuiError, TuiLabel} from '@taiga-ui/core';
import {
  TuiDataListWrapper,
  TuiFieldErrorPipe,
  TuiFilterByInputPipe,
  TuiSwitch,
} from '@taiga-ui/kit';
import {
  TuiComboBoxModule,
  TuiInputCopyModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import {tap} from 'rxjs';

@Component({
  standalone: true,
  selector: 'lab1-address-form',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiComboBoxModule,
    TuiDataListWrapper,
    TuiError,
    TuiFieldErrorPipe,
    TuiFilterByInputPipe,
    TuiInputCopyModule,
    TuiInputModule,
    TuiInputNumberModule,
    TuiLabel,
    TuiSwitch,
    TuiTextfieldControllerModule,
  ],
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  public readonly locked = input(false);
  public readonly entity = input<Address | null>(null);
  public readonly locationIds = input<number[]>([]);

  public readonly handleForm = output<FormAddress>();

  public readonly form = this.fb.group({
    townId: this.fb.control<number | null>(null),
    zipCode: this.fb.control<string>('', [Validators.required]),
    adminPermission: this.fb.control<boolean | null>(null),
  });

  constructor() {
    effect(() => {
      const entityValue = this.entity();

      if (entityValue) {
        this.form.patchValue({
          zipCode: entityValue.zipCode,
          townId: entityValue.town?.id ?? null,
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
      const {zipCode, townId, adminPermission} = formValue;

      this.handleForm.emit({
        id: this.entity()?.id,
        zipCode: zipCode ?? '',
        townId: townId ?? null,
        adminPermission: adminPermission ?? undefined,
      });
    }
  }
}
