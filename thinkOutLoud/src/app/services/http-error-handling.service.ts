import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlingService {
  constructor() {}

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.status === 0) {
      errorMessage =
        'A client side error occurred. Please check your network or try again later';
    } else {
      errorMessage = `A server side error occurred, StatusCode: ${error.status}, Description: ${error.statusText}`;
    }
    console.error(error);
    return throwError(() => new Error(errorMessage));
  }
}
