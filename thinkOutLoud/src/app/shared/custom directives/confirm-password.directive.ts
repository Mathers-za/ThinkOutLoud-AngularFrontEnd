import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  ValidationErrors,
  Validator,
  NG_VALIDATORS,
  NgModel,
} from '@angular/forms';

@Directive({
  selector: '[appConfirmPassword]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ConfirmPasswordDirective,
      multi: true,
    },
  ],
})
export class ConfirmPasswordDirective implements Validator {
  @Input('appConfirmPassword') password: NgModel | null = null;

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.password || !control.value) {
      return null;
    }

    const password = this.password.value;
    const passwordConfirm = control.value;

    return password === passwordConfirm ? null : { passwordMismatch: true };
  }
}
