import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ILoginForm, iUser } from '../Interfaces/Users';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule, NgClass],
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

  isRegistered = true;

  constructor(private usersService: UsersService) {}

  toggleIsRegistered() {
    this.isRegistered = !this.isRegistered;
    this.resetFormData();
  }

  login() {
    this.usersService.loginUser(this.formData).subscribe((value) => {
      console.log(value);
    });
  }
  register() {
    console.log('register fn ran ');
    this.usersService.registerUser(this.formData).subscribe({
      next: (value) => {
        console.log(value);
        this.isRegistered = true;
      },
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

  onSubmit() {}
}
