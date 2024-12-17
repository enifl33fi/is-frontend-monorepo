import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {lab1RootActions} from '@is/labs/lab1/shared/root/store';
import {Store} from '@ngrx/store';

import {AddressTableComponent} from './address-table/address-table.component';

@Component({
  standalone: true,
  selector: 'lab1-address-page',
  imports: [AddressTableComponent],
  templateUrl: './address-page.component.html',
  styleUrls: ['./address-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressPageComponent implements OnInit {
  private readonly store = inject(Store);

  public ngOnInit() {
    this.store.dispatch(lab1RootActions.setActiveTab({activeTab: 'address'}));
  }
}
