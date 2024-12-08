import {ChangeDetectionStrategy, Component} from '@angular/core';
import {EntityTableComponent} from '@is/labs/lab1/shared/ui';

@Component({
  standalone: true,
  selector: 'lab1-person-table',
  imports: [EntityTableComponent],
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonTableComponent {
  public columns: string[] = [
    'id',
    'locationId',
    'name',
    'eyeColor',
    'hairColor',
    'birthday',
    'nationality',
  ];

  public filterColumns: string[] = ['name', 'eyeColor', 'hairColor', 'nationality'];
}
