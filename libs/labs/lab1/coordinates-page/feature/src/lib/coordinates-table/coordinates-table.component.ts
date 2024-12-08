import {ChangeDetectionStrategy, Component} from '@angular/core';
import {EntityTableComponent} from '@is/labs/lab1/shared/ui';

@Component({
  standalone: true,
  selector: 'lab1-coordinates-table',
  imports: [EntityTableComponent],
  templateUrl: './coordinates-table.component.html',
  styleUrls: ['./coordinates-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoordinatesTableComponent {
  public columns: string[] = ['id', 'x', 'y'];
}
