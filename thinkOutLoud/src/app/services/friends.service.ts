import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpErrorHandlingService } from './http-error-handling.service';
import { IUser } from '../Interfaces/Users';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  httpOptions = {
    withCredentials: true,
  };

  apiBaseUrl = 'http://localhost:3000';
  constructor(
    private http: HttpClient,
    private httpErrorHandlingService: HttpErrorHandlingService
  ) {}

  addFriend(friendId: string): Observable<HttpResponse<object>> {
    const patchObject = { $push: { friend: friendId } };
    return this.http
      .patch(this.apiBaseUrl + '/users/patch', patchObject, {
        ...this.httpOptions,
        observe: 'response',
      })
      .pipe(
        catchError((err) => this.httpErrorHandlingService.handleError(err))
      );
  }

  removeFriend(friendId: string): Observable<HttpResponse<object>> {
    const patchObject = { $pull: { friend: friendId } };
    return this.http
      .patch(this.apiBaseUrl + '/users/patch', patchObject, {
        ...this.httpOptions,
        observe: 'response',
      })
      .pipe(
        catchError((err) => this.httpErrorHandlingService.handleError(err))
      );
  }

  viewFriendProfile(friendId: string): Observable<IUser | null> {
    return this.http
      .get<IUser | null>(
        this.apiBaseUrl + `/users/getUser${friendId}`,
        this.httpOptions
      )
      .pipe(
        catchError((err) => this.httpErrorHandlingService.handleError(err))
      );
  }
}
