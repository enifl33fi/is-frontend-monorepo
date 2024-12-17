import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {lab1RootActions} from '@is/labs/lab1/shared/root/store';
import {Store} from '@ngrx/store';

import {CoordinatesTableComponent} from './coordinates-table/coordinates-table.component';

@Component({
  standalone: true,
  selector: 'lab1-coordinates-page',
  imports: [CoordinatesTableComponent],
  templateUrl: './coordinates-page.component.html',
  styleUrls: ['./coordinates-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoordinatesPageComponent implements OnInit {
  private readonly store = inject(Store);

  public ngOnInit() {
    this.store.dispatch(lab1RootActions.setActiveTab({activeTab: 'coordinates'}));
  }
}
