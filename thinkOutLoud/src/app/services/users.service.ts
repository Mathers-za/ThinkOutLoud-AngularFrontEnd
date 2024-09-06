import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginForm, IUser } from '../Interfaces/Users';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { HttpErrorHandlingService } from './http-error-handling.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl = 'http://localhost:3000';
  httpOptions = {
    withCredentials: true,
  };

  private userBehaviourSubject$ = new BehaviorSubject<IUser | null>(null);
  readonly user$ = this.userBehaviourSubject$.asObservable();

  constructor(
    private http: HttpClient,
    private httpErrorHandlingService: HttpErrorHandlingService
  ) {}
  registerUser(formData: ILoginForm): Observable<HttpResponse<object>> {
    return this.http
      .post(this.baseUrl + '/users/register', formData, {
        ...this.httpOptions,
        observe: 'response',
      })
      .pipe(
        catchError((err) => this.httpErrorHandlingService.handleError(err))
      );
  }

  getUser(): Observable<IUser> {
    return this.http
      .get<IUser>(this.baseUrl + '/users/getUserOnlogin', this.httpOptions)
      .pipe(
        tap((userData) => this.userBehaviourSubject$.next(userData)),
        catchError((err) => this.httpErrorHandlingService.handleError(err))
      );
  }

  loginUser(formData: ILoginForm): Observable<HttpResponse<object>> {
    return this.http
      .post(this.baseUrl + '/users/login', formData, {
        ...this.httpOptions,
        observe: 'response',
      })
      .pipe(
        catchError((err) => this.httpErrorHandlingService.handleError(err))
      );
  }

  filterAllUsersByName(searchString: string): Observable<IUser[] | []> {
    return this.http
      .get<IUser[]>(this.baseUrl + '/users/usersSearch', {
        params: { searchString },
        ...this.httpOptions,
      })
      .pipe(
        catchError((err) => this.httpErrorHandlingService.handleError(err))
      );
  }

  updateUser(payload: { $set: Partial<IUser> }) {
    return this.http
      .patch(this.baseUrl + '/users/update', payload, this.httpOptions)
      .pipe(
        catchError((err) => this.httpErrorHandlingService.handleError(err))
      );
  }
}
