import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginForm, iUser } from '../Interfaces/Users';
import { Observable, of, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  userCache$?: Observable<iUser | null> | null | undefined;
  constructor(private http: HttpClient) {}

  registerUser(formData: ILoginForm) {
    return this.http.post('/users/register', formData, {
      withCredentials: true,
    });
  }

  loginUser(formData: ILoginForm) {
    return this.http.post('/user/login', formData, { withCredentials: true });
  }

  invalidateUserCache() {
    this.userCache$ = null;
  }

  refreshUserCache() {
    this.invalidateUserCache();
    return this.getLoggedInUserData();
  }

  getLoggedInUserData() {
    if (!this.userCache$) {
      this.userCache$ = this.http
        .get<iUser | null>('/users/getUserOnlogin', {
          withCredentials: true,
        })
        .pipe(
          tap((userData) => console.log('UserData is ' + userData)),
          shareReplay(1)
        );
    }
    return this.userCache$;
  }
}
