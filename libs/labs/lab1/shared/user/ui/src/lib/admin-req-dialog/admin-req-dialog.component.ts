import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {lab1UserActions, selectAdminRequests} from '@is/labs/lab1/shared/user/store';
import {AdminRequest} from '@is/labs/lab1/shared/user/types';
import {prefixFilterFn} from '@is/labs/lab1/shared/utils';
import {Store} from '@ngrx/store';
import {TuiButton, TuiHint, TuiTextfield} from '@taiga-ui/core';
import {debounceTime, startWith} from 'rxjs';

@Component({
  standalone: true,
  selector: 'lab1-admin-req-dialog',
  imports: [CommonModule, ReactiveFormsModule, TuiButton, TuiHint, TuiTextfield],
  templateUrl: './admin-req-dialog.component.html',
  styleUrls: ['./admin-req-dialog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminReqDialogComponent {
  private readonly store = inject(Store);
  private readonly fb = inject(FormBuilder);

  public readonly searchForm = this.fb.group({
    usernamePrefix: this.fb.control(''),
  });

  public readonly searchSignal = toSignal(
    this.searchForm.controls.usernamePrefix.valueChanges.pipe(
      debounceTime(300),
      startWith(this.searchForm.value.usernamePrefix),
    ),
  );

  public readonly adminRequestsSignal = this.store.selectSignal(selectAdminRequests);

  public readonly filteredAdminRequestsSignal = computed(() => {
    const adminRequests = this.adminRequestsSignal();
    const search = this.searchSignal();

    return adminRequests.filter((request) => prefixFilterFn(request.username, search));
  });

  public onApproveRequestClick(request: AdminRequest) {
    this.store.dispatch(lab1UserActions.approveRequest({request}));
  }

  public onRejectRequestClick(request: AdminRequest) {
    this.store.dispatch(lab1UserActions.rejectRequest({request}));
  }
}
