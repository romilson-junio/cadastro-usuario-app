import { ValidationErrors, AbstractControl } from '@angular/forms';

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const passwordConfirmation = control.get('passwordConfirmation');
  return password && passwordConfirmation && password.value !== passwordConfirmation.value ? { 'passwordMismatch': true } : null;
}
