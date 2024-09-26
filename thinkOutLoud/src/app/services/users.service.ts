import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginForm, IUser } from '../Interfaces/Users';
import {
  BehaviorSubject,
  catchError,
  Observable,
  shareReplay,
  Subject,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { HttpErrorHandlingService } from './http-error-handling.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl = 'http://localhost:4000';
  httpOptions = {
    withCredentials: true,
  };

  private refresh$ = new BehaviorSubject<void>(undefined);

  constructor(
    private http: HttpClient,
    private httpErrorHandlingService: HttpErrorHandlingService
  ) {}
  registerUser(formData: ILoginForm) {
    return this.http
      .post<{ success: boolean; message: string }>(
        this.baseUrl + '/api/user/registerUser',
        formData,
        {
          ...this.httpOptions,
        }
      )
      .pipe(
        catchError((err) => this.httpErrorHandlingService.handleError(err))
      );
  }

  getUser() {
    return this.refresh$.pipe(
      switchMap(() => {
        return this.http
          .get<{ success: boolean; data: IUser }>(
            `${this.baseUrl}/api/user/get/${localStorage.getItem('userId')}`,
            this.httpOptions
          )
          .pipe(
            shareReplay(1),

            catchError((err) => this.httpErrorHandlingService.handleError(err))
          );
      })
    );
  }

  refreshUser() {
    this.refresh$.next();
  }

  loginUser(formData: ILoginForm) {
    return this.http
      .post<{ success: boolean; message: string; data: IUser }>(
        this.baseUrl + '/api/user/login',
        formData,
        {
          ...this.httpOptions,
        }
      )
      .pipe(
        catchError((err) => this.httpErrorHandlingService.handleError(err))
      );
  }

  searchUsersByNameOrSurname(
    searchString: string = ''
  ): Observable<IUser[] | []> {
    return this.http
      .get<IUser[]>(this.baseUrl + '/api/user/search', {
        params: { searchString, limit: '20' },
        ...this.httpOptions,
      })
      .pipe(
        catchError((err) => this.httpErrorHandlingService.handleError(err))
      );
  }

  updateUser(payload: { $set: Partial<IUser> }, id: string) {
    return this.http
      .patch(
        this.baseUrl + `/api/user/updateUser${id}`,
        payload,
        this.httpOptions
      )
      .pipe(
        tap(() => this.refresh$.next()),
        catchError((err) => this.httpErrorHandlingService.handleError(err))
      );
  }
}
