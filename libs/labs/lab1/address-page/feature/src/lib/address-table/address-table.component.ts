import {ChangeDetectionStrategy, Component} from '@angular/core';
import {EntityTableComponent} from '@is/labs/lab1/shared/ui';

@Component({
  standalone: true,
  selector: 'lab1-address-table',
  imports: [EntityTableComponent],
  templateUrl: './address-table.component.html',
  styleUrls: ['./address-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressTableComponent {
  public columns: string[] = ['id', 'townId', 'zipCode'];
  public filterColumns: string[] = ['zipCode'];
}
