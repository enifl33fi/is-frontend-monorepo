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
import type {UnitOfMeasure} from '@is/labs/lab1/shared/product/types';
import {
  FormProduct,
  Product,
  UNITS_OF_MEASURES,
} from '@is/labs/lab1/shared/product/types';
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
  selector: 'lab1-product-form',
  imports: [
    CommonModule,
    FormsModule,
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
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly UNITS_OF_MEASURES = UNITS_OF_MEASURES;

  public readonly locked = input(false);
  public readonly entity = input<Product | null>(null);
  public readonly coordinatesIds = input<number[]>([]);
  public readonly manufacturerIds = input<number[]>([]);
  public readonly ownerIds = input<number[]>([]);

  public readonly handleForm = output<FormProduct>();

  public readonly form = this.fb.group({
    coordinatesId: this.fb.control<number | null>(null, [Validators.required]),
    manufacturerId: this.fb.control<number | null>(null),
    ownerId: this.fb.control<number | null>(null),
    name: this.fb.control<string>('', [notBlankValidator()]),
    unitOfMeasure: this.fb.control<UnitOfMeasure | null>(null, [Validators.required]),
    price: this.fb.control<number | null>(null, [Validators.required, Validators.min(0)]),
    manufactureCost: this.fb.control<number | null>(null, [Validators.required]),
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
          coordinatesId: entityValue.coordinates.id,
          manufacturerId: entityValue.manufacturer?.id ?? null,
          ownerId: entityValue.owner?.id ?? null,
          name: entityValue.name,
          unitOfMeasure: entityValue.unitOfMeasure,
          price: entityValue.price,
          manufactureCost: entityValue.manufactureCost,
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
        coordinatesId,
        manufacturerId,
        ownerId,
        name,
        unitOfMeasure,
        price,
        manufactureCost,
        rating,
        adminPermission,
      } = formValue;

      this.handleForm.emit({
        id: this.entity()?.id,
        coordinatesId: coordinatesId ?? 0,
        manufacturerId: manufacturerId ?? null,
        ownerId: ownerId ?? null,
        name: name ?? '',
        unitOfMeasure: unitOfMeasure ?? 'CENTIMETERS',
        price: price ?? 0,
        manufactureCost: manufactureCost ?? 0,
        rating: rating ?? 0,
        adminPermission: adminPermission ?? undefined,
      });
    }
  }
}
