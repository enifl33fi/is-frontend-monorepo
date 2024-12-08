import {ChangeDetectionStrategy, Component} from '@angular/core';

import {LocationTableComponent} from './location-table/location-table.component';

@Component({
  standalone: true,
  selector: 'lab1-location-page',
  imports: [LocationTableComponent],
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationPageComponent {}
