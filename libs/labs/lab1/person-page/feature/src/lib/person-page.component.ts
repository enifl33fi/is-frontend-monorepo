import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {lab1RootActions} from '@is/labs/lab1/shared/root/store';
import {Store} from '@ngrx/store';

import {PersonTableComponent} from './person-table/person-table.component';

@Component({
  standalone: true,
  selector: 'lab1-person-page',
  imports: [PersonTableComponent],
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonPageComponent implements OnInit {
  private readonly store = inject(Store);

  public ngOnInit() {
    this.store.dispatch(lab1RootActions.setActiveTab({activeTab: 'person'}));
  }
}
