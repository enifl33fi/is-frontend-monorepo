import {ChangeDetectionStrategy, Component} from '@angular/core';

import {PersonTableComponent} from './person-table/person-table.component';

@Component({
  standalone: true,
  selector: 'lab1-person-page',
  imports: [PersonTableComponent],
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonPageComponent {}
