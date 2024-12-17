import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {selectCoordinates} from '@is/labs/lab1/shared/coordinates/store';
import {TableEntity} from '@is/labs/lab1/shared/types';
import {EntityTableComponent} from '@is/labs/lab1/shared/ui';
import {Store} from '@ngrx/store';

@Component({
  standalone: true,
  selector: 'lab1-coordinates-table',
  imports: [EntityTableComponent],
  templateUrl: './coordinates-table.component.html',
  styleUrls: ['./coordinates-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoordinatesTableComponent {
  private readonly store = inject(Store);

  public readonly columns: string[] = ['id', 'x', 'y'];
  public readonly coordinatesSignal = this.store.selectSignal(
    selectCoordinates,
  ) as unknown as Signal<TableEntity[]>;
}
