import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {
  lab1OrganizationActions,
  selectOrganizations,
} from '@is/labs/lab1/shared/organization/store';
import {TableEntity} from '@is/labs/lab1/shared/types';
import {EntityTableComponent} from '@is/labs/lab1/shared/ui';
import {Store} from '@ngrx/store';

@Component({
  standalone: true,
  selector: 'lab1-organization-table',
  imports: [EntityTableComponent],
  templateUrl: './organization-table.component.html',
  styleUrls: ['./organization-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationTableComponent {
  private readonly store = inject(Store);

  public columns: string[] = [
    'id',
    'officialAddressId',
    'name',
    'annualTurnover',
    'employeesCount',
    'type',
    'rating',
  ];

  public filterColumn: string[] = ['name', 'type'];

  public readonly organizationsSignal = this.store.selectSignal(
    selectOrganizations,
  ) as unknown as Signal<TableEntity[]>;

  public onAddClick() {
    this.store.dispatch(lab1OrganizationActions.showAddDialog());
  }

  public onViewClick(id: number) {
    this.store.dispatch(lab1OrganizationActions.showViewDialog({id}));
  }

  public onDeleteClick(id: number) {
    this.store.dispatch(lab1OrganizationActions.deleteOrganization({id}));
  }
}
