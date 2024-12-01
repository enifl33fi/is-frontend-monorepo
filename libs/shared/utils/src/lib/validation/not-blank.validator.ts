import type {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function notBlankValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value?.trim()?.length === 0
      ? {
          notBlank: true,
        }
      : null;
  };
}
