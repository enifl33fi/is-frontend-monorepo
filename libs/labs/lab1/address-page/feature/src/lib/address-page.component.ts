import {ChangeDetectionStrategy, Component} from '@angular/core';

import {AddressTableComponent} from './address-table/address-table.component';

@Component({
  standalone: true,
  selector: 'lab1-address-page',
  imports: [AddressTableComponent],
  templateUrl: './address-page.component.html',
  styleUrls: ['./address-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressPageComponent {}
