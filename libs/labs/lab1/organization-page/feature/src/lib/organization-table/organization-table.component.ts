import {ChangeDetectionStrategy, Component} from '@angular/core';
import {EntityTableComponent} from '@is/labs/lab1/shared/ui';

@Component({
  standalone: true,
  selector: 'lab1-organization-table',
  imports: [EntityTableComponent],
  templateUrl: './organization-table.component.html',
  styleUrls: ['./organization-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationTableComponent {
  public columns: string[] = [
    'id',
    'officialAddressId',
    'postalAddressId',
    'name',
    'annualTurnover',
    'employeesCount',
    'fullName',
    'rating',
  ];

  public filterColumn: string[] = ['name', 'fullName'];
}
