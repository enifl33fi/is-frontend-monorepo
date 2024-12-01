import type {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

const usernameRegExp = /^\w{1,25}$/;

export function usernameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return usernameRegExp.test(control.value) ? null : {invalidUsername: true};
  };
}
