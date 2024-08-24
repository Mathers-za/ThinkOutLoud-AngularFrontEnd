import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginForm, iUser } from '../Interfaces/Users';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  shareReplay,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userSubject$ = new BehaviorSubject<{
    data: iUser | null;
    error: any;
  } | null>(null);
  userCache$? = this.userSubject$.asObservable();

  constructor(private http: HttpClient) {
    console.log('the Injection occured');
    this.fetchUserData().subscribe();
  }

  registerUser(formData: ILoginForm) {
    return this.http.post('/users/register', formData, {
      withCredentials: true,
    });
  }

  loginUser(formData: ILoginForm) {
    return this.http.post('/user/login', formData, { withCredentials: true });
  }

  refetchUserData() {
    this.fetchUserData();
  }

  private fetchUserData() {
    return this.http
      .get<iUser | null>('/users/getUserOnlogin', {
        withCredentials: true,
      })
      .pipe(
        tap((userData) =>
          this.userSubject$.next({ data: userData, error: null })
        ),
        catchError((err) => {
          this.userSubject$.next({ data: null, error: err.message });
          return of(null);
        })
      );
  }

  filterAllUsersByName(searchString: string) {
    return this.http.get<iUser[]>('/users/usersSearch', {
      params: { searchString: searchString },
      withCredentials: true,
    });
  }

  addFriend(userId: string, body: any) {
    this.http.patch(`users/update:${userId}`, body, { withCredentials: true });
  }
}
