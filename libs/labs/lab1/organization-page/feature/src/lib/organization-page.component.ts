import {ChangeDetectionStrategy, Component} from '@angular/core';

import {OrganizationTableComponent} from './organization-table/organization-table.component';

@Component({
  standalone: true,
  selector: 'lab1-organization-page',
  imports: [OrganizationTableComponent],
  templateUrl: './organization-page.component.html',
  styleUrls: ['./organization-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationPageComponent {}
