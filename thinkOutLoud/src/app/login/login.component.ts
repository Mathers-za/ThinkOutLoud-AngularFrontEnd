import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ILogin } from '../Interfaces/Users';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isRegistered = false;
  registrationFormData: ILogin = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  toggleIsRegistered() {
    this.isRegistered = !this.isRegistered;
  }

  login() {}
  register() {}

  onSubmit() {}
}
