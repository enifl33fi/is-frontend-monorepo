import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {lab1RootActions} from '@is/labs/lab1/shared/root/store';
import {Store} from '@ngrx/store';

import {LocationTableComponent} from './location-table/location-table.component';

@Component({
  standalone: true,
  selector: 'lab1-location-page',
  imports: [LocationTableComponent],
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationPageComponent implements OnInit {
  private readonly store = inject(Store);

  public ngOnInit() {
    this.store.dispatch(lab1RootActions.setActiveTab({activeTab: 'location'}));
  }
}
