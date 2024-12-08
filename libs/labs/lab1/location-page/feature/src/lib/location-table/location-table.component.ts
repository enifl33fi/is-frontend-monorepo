import {ChangeDetectionStrategy, Component} from '@angular/core';
import {EntityTableComponent} from '@is/labs/lab1/shared/ui';

@Component({
  standalone: true,
  selector: 'lab1-location-table',
  imports: [EntityTableComponent],
  templateUrl: './location-table.component.html',
  styleUrls: ['./location-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationTableComponent {
  public columns: string[] = ['id', 'x', 'y', 'z', 'name'];
  public filterColumns: string[] = ['name'];
}
