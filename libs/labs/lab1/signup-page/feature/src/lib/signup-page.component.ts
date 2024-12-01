import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, effect, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {selectRawUsername} from '@is/labs/lab1/shared/user/store';
import {usernameValidator} from '@is/labs/lab1/shared/user/utils';
import {notBlankValidator} from '@is/shared/utils';
import {Store} from '@ngrx/store';
import {
  TuiAppearance,
  TuiButton,
  TuiError,
  TuiIcon,
  TuiLoader,
  TuiTextfield,
} from '@taiga-ui/core';
import {TuiFieldErrorPipe, TuiPassword, TuiSwitch} from '@taiga-ui/kit';
import {TuiCardLarge} from '@taiga-ui/layout';

@Component({
  standalone: true,
  selector: 'lab1-signup-page',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    TuiAppearance,
    TuiButton,
    TuiCardLarge,
    TuiError,
    TuiFieldErrorPipe,
    TuiIcon,
    TuiLoader,
    TuiPassword,
    TuiPassword,
    TuiSwitch,
    TuiTextfield,
    TuiTextfield,
  ],
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);

  private readonly rawUsernameSignal = this.store.selectSignal(selectRawUsername);

  public readonly form = this.fb.group({
    username: this.fb.control('', [Validators.required, usernameValidator()]),
    password: this.fb.control('', [Validators.required, notBlankValidator()]),
    isAdmin: this.fb.control(false),
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
}