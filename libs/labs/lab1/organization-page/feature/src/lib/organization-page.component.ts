import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {lab1RootActions} from '@is/labs/lab1/shared/root/store';
import {Store} from '@ngrx/store';

import {OrganizationTableComponent} from './organization-table/organization-table.component';

@Component({
  standalone: true,
  selector: 'lab1-organization-page',
  imports: [OrganizationTableComponent],
  templateUrl: './organization-page.component.html',
  styleUrls: ['./organization-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationPageComponent implements OnInit {
  private readonly store = inject(Store);

  public ngOnInit() {
    this.store.dispatch(lab1RootActions.setActiveTab({activeTab: 'organization'}));
  }
}
