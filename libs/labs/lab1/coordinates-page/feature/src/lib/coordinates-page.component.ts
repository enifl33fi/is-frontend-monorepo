import {ChangeDetectionStrategy, Component} from '@angular/core';

import {CoordinatesTableComponent} from './coordinates-table/coordinates-table.component';

@Component({
  standalone: true,
  selector: 'lab1-coordinates-page',
  imports: [CoordinatesTableComponent],
  templateUrl: './coordinates-page.component.html',
  styleUrls: ['./coordinates-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoordinatesPageComponent {}
