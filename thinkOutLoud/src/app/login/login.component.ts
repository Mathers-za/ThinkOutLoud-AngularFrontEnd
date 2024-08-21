import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ILoginForm, iUser } from '../Interfaces/Users';
import { UsersService } from '../services/users.service';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule, InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isRegistered = false;
  formData: ILoginForm = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };
  apiRegisterResponse = {};

  constructor(private usersService: UsersService) {}

  toggleIsRegistered() {
    this.isRegistered = !this.isRegistered;
    this.resetFormData();
  }

  login() {
    console.log('logged fn ran');
    this.usersService.loginUser(this.formData).subscribe((value) => {
      this.apiRegisterResponse = value;
      console.log('the response from the register observable is ');
      console.log(JSON.stringify(this.apiRegisterResponse));
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

    console.log('teh last name is ' + this.formData.lastName);
  }

  onSubmit() {}
}
