import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  model,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {takeUntilDestroyed, toObservable} from '@angular/core/rxjs-interop';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {EntityQueryParams, TableEntity} from '@is/labs/lab1/shared/types';
import {objectCompareFn} from '@is/labs/lab1/shared/utils';
import {
  TuiTable,
  TuiTablePagination,
  TuiTablePaginationEvent,
} from '@taiga-ui/addon-table';
import {TuiButton, TuiHintDirective, TuiLabel, TuiTextfield} from '@taiga-ui/core';
import {TuiAccordion} from '@taiga-ui/kit';
import {
  asyncScheduler,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  observeOn,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs';

@Component({
  standalone: true,
  selector: 'lab1-entity-table',
  imports: [
    ReactiveFormsModule,
    TuiAccordion,
    TuiButton,
    TuiHintDirective,
    TuiLabel,
    TuiTable,
    TuiTablePagination,
    TuiTextfield,
  ],
  templateUrl: './entity-table.component.html',
  styleUrls: ['./entity-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityTableComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  public readonly page = model(0);
  public readonly size = model(10);
  public readonly filtersValues = model<Record<string, string | null>>({});
  public readonly sortBy = model('');
  public readonly sortDirection = model<-1 | 1>(1);

  public readonly total = input(0);

  public readonly entities = input<TableEntity[]>([]);
  public readonly filterColumns = input<string[]>([]);
  public readonly columns = input<string[]>([]);
  public readonly actionColumnName = input('actions');

  public readonly initialized = signal(false);

  public readonly handleAddClick = output();
  public readonly handleViewClick = output<number>();
  public readonly handleDeleteClick = output<number>();

  public readonly queryChanged = output<EntityQueryParams>();

  public readonly filtersFormSignal = computed(() => {
    const filtersForm: FormGroup<Record<string, FormControl<string | null>>> =
      this.fb.group({});
    const filterColumns = this.filterColumns();

    filterColumns.forEach((column) => {
      filtersForm.addControl(column, this.fb.control(''));
    });

    return filtersForm;
  });

  public readonly filtersForm$ = toObservable(this.filtersFormSignal);
  public readonly filtersValues$ = toObservable(this.filtersValues);

  public readonly actualColumns = computed(() => {
    const columns = this.columns();
    const actionColumnName = this.actionColumnName();

    if (columns.length) {
      columns.push(actionColumnName);
    }

    return columns;
  });

  public readonly isFiltersEnabled = computed(() => {
    const filterColumns = this.filterColumns();

    return !!filterColumns.length;
  });

  constructor() {
    effect(() => {
      const initialized = this.initialized();

      if (initialized) {
        const filtersValues = this.filtersValues();
        const sortBy = this.sortBy();
        const sortDirection = this.sortDirection();
        const page = this.page();
        const size = this.size();

        this.queryChanged.emit({
          filtersValues,
          sortBy,
          sortDirection,
          page,
          size,
        });
      }
    });
  }

  public onPaginationChange({page, size}: TuiTablePaginationEvent) {
    this.page.set(page);
    this.size.set(size);
  }

  public ngOnInit() {
    this.filtersValues$
      .pipe(
        filter((data) => Object.keys(data).length > 0),
        tap((data) => this.filtersFormSignal().setValue(data)),
        take(1),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();

    this.filtersForm$
      .pipe(
        observeOn(asyncScheduler),
        switchMap((form) =>
          form.valueChanges.pipe(
            startWith(form.getRawValue()),
            distinctUntilChanged(objectCompareFn),
            debounceTime(500),
            map(() => form.getRawValue()),
            tap((data) => {
              this.filtersValues.set(data);
              this.initialized.set(true);
            }),
            takeUntilDestroyed(this.destroyRef),
          ),
        ),
      )
      .subscribe();
  }
}
