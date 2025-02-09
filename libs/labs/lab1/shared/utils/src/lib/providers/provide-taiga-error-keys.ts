import type {Provider} from '@angular/core';
import {tuiValidationErrorsProvider} from '@taiga-ui/kit';

export function provideTaigaErrorKeys(): Provider {
  return tuiValidationErrorsProvider({
    required: "Field can't be empty",
    notBlank: "Field can't be blank",
    invalidUsername: 'Username can only contain latin letters, numbers, and the symbol _',
    min: 'Insert bigger number',
    maxLength: 'Insert less characters',
    minLength: 'Insert more characters',
  });
}
