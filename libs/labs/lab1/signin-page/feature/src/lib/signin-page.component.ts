import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, effect, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {selectRawUsername} from '@is/labs/lab1/shared/user/store';
import {usernameValidator} from '@is/labs/lab1/shared/user/utils';
import {lab1SigninPageActions} from '@is/labs/lab1/signin-page/store';
import {notBlankValidator} from '@is/shared/utils';
import {Store} from '@ngrx/store';
import {
  TuiAppearance,
  TuiButton,
  TuiError,
  TuiIcon,
  TuiLabel,
  TuiTextfieldComponent,
  TuiTextfieldDirective,
} from '@taiga-ui/core';
import {TuiFieldErrorPipe, TuiPassword, TuiSwitch} from '@taiga-ui/kit';
import {TuiCardLarge} from '@taiga-ui/layout';

@Component({
  standalone: true,
  selector: 'lab1-signin-page',
  imports: [
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    TuiAppearance,
    TuiButton,
    TuiCardLarge,
    TuiError,
    TuiFieldErrorPipe,
    TuiIcon,
    TuiLabel,
    TuiPassword,
    TuiSwitch,
    TuiTextfieldComponent,
    TuiTextfieldDirective,
  ],
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);

  private readonly rawUsernameSignal = this.store.selectSignal(selectRawUsername);

  public readonly form = this.fb.group({
    username: this.fb.control('', [Validators.required, usernameValidator()]),
    password: this.fb.control('', [Validators.required, notBlankValidator()]),
  });

  constructor() {
    effect(() => {
      const rawUsername = this.rawUsernameSignal();

      if (rawUsername) {
        this.form.patchValue({username: rawUsername});
        this.form.controls.username.markAsTouched();
        this.form.updateValueAndValidity();
      }
    });
  }

  public onSubmit() {
    if (this.form.valid) {
      const {username, password} = this.form.value;

      if (username && password) {
        this.store.dispatch(
          lab1SigninPageActions.formSubmitted({user: {username, password}}),
        );
      }
    }
  }
}
