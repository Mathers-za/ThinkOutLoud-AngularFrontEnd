import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function isOneOfSelection(selection: any[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return selection.includes(control.value)
      ? null
      : { isOneOf: { value: control.value } };
  };
}
