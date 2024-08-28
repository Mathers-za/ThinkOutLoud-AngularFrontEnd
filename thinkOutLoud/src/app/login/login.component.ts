import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ILoginForm } from '../Interfaces/Users';
import { UsersService } from '../services/users.service';
import { ConfirmPasswordDirective } from '../shared/custom directives/confirm-password.directive';
import { Router } from '@angular/router';
import { catchError, EMPTY, EmptyError, tap, throwError } from 'rxjs';
import { HttpEvent, HttpResponse } from '@angular/common/http';
import { FeedbackMessageComponent } from '../feedback-message/feedback-message.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgClass,
    ConfirmPasswordDirective,
    FeedbackMessageComponent,
  ],
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
  successRegistrationMessage = '';
  isRegistered = true;

  constructor(private usersService: UsersService, private router: Router) {}

  toggleIsRegistered() {
    this.isRegistered = !this.isRegistered;
    this.serverErrorMessage = '';
  }

  resetLoginFormValidation(loginFormTemplateVariable: NgForm) {
    loginFormTemplateVariable.resetForm();
    this.resetFormData();

    this.successRegistrationMessage = '';
  }

  handleSuccessfullRegistration() {
    let timeoutId;
    clearTimeout(timeoutId);

    this.successRegistrationMessage =
      'Successfully created your account. You can now login';
    this.toggleIsRegistered();
  }

  login() {
    this.usersService
      .loginUser(this.formData)
      .pipe(
        tap((response) => {
          console.log(response.status);
          if (response.status === 200) {
            this.router.navigate(['dashboard']);
          }
        }),
        catchError((err) => {
          this.serverErrorMessage = err.message;
          return EMPTY;
        })
      )
      .subscribe();
  }
  register() {
    this.usersService
      .registerUser(this.formData)
      .pipe(
        tap((httpResponse) =>
          httpResponse.status === 201
            ? this.handleSuccessfullRegistration()
            : null
        ),
        catchError((err) => {
          this.serverErrorMessage = err;
          return EMPTY;
        })
      )
      .subscribe();
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
