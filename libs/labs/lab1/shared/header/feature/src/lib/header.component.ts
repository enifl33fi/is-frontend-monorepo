import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {lab1RouterActions} from '@is/labs/lab1/shared/router/store';
import {lab1UserActions, selectUser} from '@is/labs/lab1/shared/user/store';
import {Store} from '@ngrx/store';
import {TuiButton, TuiHint} from '@taiga-ui/core';

@Component({
  standalone: true,
  selector: 'lab1-header',
  imports: [CommonModule, TuiButton, TuiHint],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly store = inject(Store);

  public readonly userSignal = this.store.selectSignal(selectUser);

  public onSignUpClick() {
    this.store.dispatch(lab1RouterActions.navigateToSignUp());
  }

  public onSignInClick() {
    this.store.dispatch(lab1RouterActions.navigateToSignIn());
  }

  public onLogoutClick() {
    this.store.dispatch(lab1UserActions.logout());
  }
}
