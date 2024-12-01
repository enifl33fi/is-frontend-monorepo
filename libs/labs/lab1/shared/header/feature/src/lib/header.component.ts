import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {lab1RouterActions} from '@is/labs/lab1/shared/router/store';
import {Store} from '@ngrx/store';
import {TuiButton} from '@taiga-ui/core';

@Component({
  standalone: true,
  selector: 'lab1-header',
  imports: [CommonModule, TuiButton],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly store = inject(Store);

  public onSignUpClick() {
    this.store.dispatch(lab1RouterActions.navigateToSignUp());
  }

  public onSignInClick() {
    this.store.dispatch(lab1RouterActions.navigateToSignIn());
  }
}
