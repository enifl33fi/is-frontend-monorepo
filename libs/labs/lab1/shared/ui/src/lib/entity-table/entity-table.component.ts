import {AsyncPipe, NgForOf} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Input,
  input,
  output,
  signal,
} from '@angular/core';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TableEntity} from '@is/labs/lab1/shared/types';
import {fullFilterFn, paginateFn, sortFn} from '@is/labs/lab1/shared/utils';
import {
  TuiTable,
  TuiTablePagination,
  TuiTablePaginationEvent,
} from '@taiga-ui/addon-table';
import {TuiButton, TuiHintDirective, TuiLabel, TuiTextfield} from '@taiga-ui/core';
import {TuiAccordion} from '@taiga-ui/kit';
import {debounceTime, map, startWith, switchMap} from 'rxjs';

@Component({
  standalone: true,
  selector: 'lab1-entity-table',
  imports: [
    AsyncPipe,
    NgForOf,
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
export class EntityTableComponent {
  private readonly fb = inject(FormBuilder);

  protected readonly page = signal(0);

  public readonly entities = input<TableEntity[]>([]);
  public readonly filterColumns = input<string[]>([]);
  public readonly columns = input<string[]>([]);
  public readonly actionColumnName = input('actions');
  public readonly sizeSignal = signal(10);

  public readonly sortBySignal = signal('');
  public readonly sortDirectionSignal = signal<-1 | 1>(1);

  public readonly handleAddClick = output();
  public readonly handleViewClick = output<number>();
  public readonly handleDeleteClick = output<number>();

  public readonly filtersFormSignal = computed(() => {
    const filtersForm: FormGroup<Record<string, FormControl<string | null>>> =
      this.fb.group({});
    const filterColumns = this.filterColumns();

    filterColumns.forEach((column) => {
      filtersForm.addControl(column, this.fb.control(''));
    });

    return filtersForm;
  });

  public readonly filtersValuesSignal = toSignal(
    toObservable(this.filtersFormSignal).pipe(
      switchMap((form) =>
        form.valueChanges.pipe(
          debounceTime(300),
          map(() => form.getRawValue()),
          startWith(form.getRawValue()),
        ),
      ),
    ),
    {initialValue: this.filtersFormSignal().getRawValue()},
  );

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

  public readonly actualDataSignal = computed(() => {
    const entities = this.entities();
    const filtersValues = this.filtersValuesSignal();
    const sortBy = this.sortBySignal();
    const sortDirection = this.sortDirectionSignal();
    const page = this.page();
    const size = this.sizeSignal();

    return paginateFn(
      entities
        .filter((entity) =>
          Object.keys(filtersValues).every((key) =>
            fullFilterFn(entity[key], filtersValues[key]),
          ),
        )
        .sort(sortFn(sortBy, sortDirection)),
      size,
      page,
    );
  });

  @Input()
  public set size(size: number) {
    this.sizeSignal.set(size);
  }

  public onPaginationChange({page, size}: TuiTablePaginationEvent) {
    this.page.set(page);
    this.sizeSignal.set(size);
  }
}
