import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormsModule, NgForm, NgModel } from '@angular/forms';
import { ILoginForm, iUser } from '../Interfaces/Users';
import { UsersService } from '../services/users.service';
import { ConfirmPasswordDirective } from '../shared/custom directives/confirm-password.directive';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule, NgClass, ConfirmPasswordDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formData: ILoginForm = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  serverErrorMessage: string = '';

  isRegistered = true;

  constructor(private usersService: UsersService) {}

  toggleIsRegistered() {
    this.isRegistered = !this.isRegistered;
  }

  resetLoginFormValidation(loginFormTemplateVariable: NgForm) {
    loginFormTemplateVariable.resetForm();
  }

  login() {
    this.usersService.loginUser(this.formData).subscribe((value) => {
      console.log(value);
    });
    console.log('ran once');
  }
  register() {
    console.log('register fn ran ');
    this.usersService.registerUser(this.formData).subscribe({
      next: (value) => {
        console.log(value);
        this.isRegistered = true;
        this.resetFormData();
      },
      error: (error) => (this.serverErrorMessage = error.message),
    });
  }

  resetFormData() {
    console.log('email is ' + this.formData.email);
    this.formData = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    };
  }
}
