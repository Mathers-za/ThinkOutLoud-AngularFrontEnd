import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginForm, iUser } from '../Interfaces/Users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  registerUser(formData: ILoginForm) {
    return this.http.post('/users/register', formData, {
      withCredentials: true,
    });
  }

  loginUser(formData: ILoginForm) {
    return this.http.post('/user/login', formData, { withCredentials: true });
  }
}
