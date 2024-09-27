import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { ILoginForm } from '../Interfaces/Users';
import { UsersService } from '../services/users.service';
import { ConfirmPasswordDirective } from '../shared/custom directives/confirm-password.directive';
import { Router } from '@angular/router';
import { catchError, EMPTY, EmptyError, tap, throwError } from 'rxjs';
import { HttpEvent, HttpResponse } from '@angular/common/http';
import { FeedbackMessageComponent } from '../feedback-message/feedback-message.component';

interface formTypes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm?: string;
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgClass,
    ConfirmPasswordDirective,
    FeedbackMessageComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formData = this.fb.nonNullable.group<formTypes>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  successfulRegistrationTimeout: ReturnType<typeof setTimeout> | null = null;
  serverErrorMessage: string = '';
  successRegistrationMessage = '';
  isRegistered = true;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  toggleIsRegistered() {
    this.formData.addControl(
      'passwordConfirm',
      this.fb.nonNullable.control('')
    );
  }
  resetLoginFormValidation() {
    this.formData.reset();

    this.successRegistrationMessage = '';
  }

  handleSuccessfulRegistration() {
    if (this.successfulRegistrationTimeout) {
      clearTimeout(this.successfulRegistrationTimeout);
    }

    this.successfulRegistrationTimeout = setTimeout(() => {
      this.successRegistrationMessage =
        'Successfully created your account. You can now login';
      this.toggleIsRegistered();
    }, 1000);
  }

  login() {
    this.usersService
      .loginUser(this.formData.getRawValue())
      .pipe(
        tap((response) => {
          if (response.success) {
            sessionStorage.setItem('userId', response.data._id.toString());
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
      .registerUser(this.formData.getRawValue())
      .pipe(
        tap((response) => {
          if (response.success) {
            this.handleSuccessfulRegistration();
          }
        }),
        catchError((err) => {
          this.serverErrorMessage = err;
          return EMPTY;
        })
      )
      .subscribe();
  }
}
