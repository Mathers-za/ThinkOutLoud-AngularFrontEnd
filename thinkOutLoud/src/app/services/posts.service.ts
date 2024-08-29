import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPostsSchema } from '../../interfaces/postInterfaces';
import { catchError, Observable } from 'rxjs';
import { HttpErrorHandlingService } from './http-error-handling.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  baseUrl = 'http://localhost:3000';
  httpOptions = {
    withCredentials: true,
  };
  constructor(
    private http: HttpClient,
    private httpErrorHandlingService: HttpErrorHandlingService
  ) {}

  createPost(payload: IPostsSchema): Observable<IPostsSchema> {
    return this.http
      .post<IPostsSchema>(
        this.baseUrl + '/posts/createPost',
        payload,
        this.httpOptions
      )
      .pipe(
        catchError((err) => this.httpErrorHandlingService.handleError(err))
      );
  }

  deletePost(postId: string): Observable<HttpResponse<object>> {
    return this.http
      .delete(this.baseUrl + `/posts/delete${postId}`, {
        ...this.httpOptions,
        observe: 'response',
      })
      .pipe(
        catchError((err) => this.httpErrorHandlingService.handleError(err))
      );
  }

  editPost(
    postId: string,
    changes: Partial<IPostsSchema>
  ): Observable<HttpResponse<object>> {
    return this.http
      .patch(`/posts/updatePost${postId}`, changes, {
        ...this.httpOptions,
        observe: 'response',
      })
      .pipe(
        catchError((err) => this.httpErrorHandlingService.handleError(err))
      );
  }

  getAllFriendsPosts(): Observable<IPostsSchema[] | []> {
    return this.http
      .get<IPostsSchema[] | []>('/posts/getAllFriendsPosts', this.httpOptions)
      .pipe(
        catchError((err) => this.httpErrorHandlingService.handleError(err))
      );
  }

  //TODO good starting point. will probably need to get specific user/friend posts too
  //TODO pagination is for kooks, implement lazy loading
}
