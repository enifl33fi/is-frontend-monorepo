import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {selectAddresses} from '@is/labs/lab1/shared/address/store';
import {TableEntity} from '@is/labs/lab1/shared/types';
import {EntityTableComponent} from '@is/labs/lab1/shared/ui';
import {Store} from '@ngrx/store';

@Component({
  standalone: true,
  selector: 'lab1-address-table',
  imports: [EntityTableComponent],
  templateUrl: './address-table.component.html',
  styleUrls: ['./address-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressTableComponent {
  private readonly store = inject(Store);

  public columns: string[] = ['id', 'townId', 'zipCode'];
  public filterColumns: string[] = ['zipCode'];

  public readonly addressesSignal = this.store.selectSignal(
    selectAddresses,
  ) as unknown as Signal<TableEntity[]>;
}
