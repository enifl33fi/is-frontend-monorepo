import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {lab1WelcomePageActions} from '@is/labs/lab1/welcome-page/store';
import {Store} from '@ngrx/store';
import {TuiAppearance, TuiButton, TuiTextfield, TuiTitle} from '@taiga-ui/core';
import {TuiCardLarge, TuiHeader} from '@taiga-ui/layout';

@Component({
  standalone: true,
  selector: 'lab1-welcome-page',
  imports: [
    ReactiveFormsModule,
    TuiAppearance,
    TuiButton,
    TuiCardLarge,
    TuiHeader,
    TuiTextfield,
    TuiTitle,
  ],
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomePageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  public readonly form = this.fb.group({
    username: this.fb.control(''),
  });

  public handleSignUpClick() {
    this.store.dispatch(
      lab1WelcomePageActions.formSubmitted({username: this.form.value.username ?? ''}),
    );
  }
}
