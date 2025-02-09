import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {lab1LocationActions, selectLocations} from '@is/labs/lab1/shared/location/store';
import {TableEntity} from '@is/labs/lab1/shared/types';
import {EntityTableComponent} from '@is/labs/lab1/shared/ui';
import {Store} from '@ngrx/store';

@Component({
  standalone: true,
  selector: 'lab1-location-table',
  imports: [EntityTableComponent],
  templateUrl: './location-table.component.html',
  styleUrls: ['./location-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationTableComponent {
  private readonly store = inject(Store);

  public readonly columns: string[] = ['id', 'x', 'y', 'z', 'name'];
  public readonly filterColumns: string[] = ['name'];

  public readonly locationsSignal = this.store.selectSignal(
    selectLocations,
  ) as unknown as Signal<TableEntity[]>;

  public onAddClick() {
    this.store.dispatch(lab1LocationActions.showAddDialog());
  }

  public onViewClick(id: number) {
    this.store.dispatch(lab1LocationActions.showViewDialog({id}));
  }

  public onDeleteClick(id: number) {
    this.store.dispatch(lab1LocationActions.deleteLocation({id}));
  }
}
