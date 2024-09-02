import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFeedPosts, IPostsSchema } from '../../interfaces/postInterfaces';
import { catchError, Observable } from 'rxjs';
import { HttpErrorHandlingService } from './http-error-handling.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private baseUrl = 'http://localhost:3000';
  private httpOptions = {
    withCredentials: true,
  };
  constructor(
    private http: HttpClient,
    private httpErrorHandlingService: HttpErrorHandlingService
  ) {}

  createPost(payload: Partial<IPostsSchema>): Observable<IPostsSchema> {
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
      .delete(this.baseUrl + `/posts/deletePost${postId}`, {
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
      .patch(this.baseUrl + `/posts/updatePost${postId}`, changes, {
        ...this.httpOptions,
        observe: 'response',
      })
      .pipe(
        catchError((err) => this.httpErrorHandlingService.handleError(err))
      );
  }

  getAllFriendsPosts(
    page: number,
    pageSize: number
  ): Observable<IFeedPosts[] | []> {
    return this.http
      .get<IFeedPosts[] | []>(this.baseUrl + '/posts/getAllFriendsPosts', {
        ...this.httpOptions,
        params: { page, pageSize },
      })
      .pipe(
        catchError((err) => this.httpErrorHandlingService.handleError(err))
      );
  }

  //TODO good starting point. will probably need to get specific user/friend posts too
  //TODO pagination is for kooks, implement lazy loading
}
