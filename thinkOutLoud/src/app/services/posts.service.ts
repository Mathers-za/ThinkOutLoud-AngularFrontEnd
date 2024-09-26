import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IComments,
  ICommentsPayload,
  IFeedPosts,
  IPostsHapi,
  IPostsSchema,
} from '../../interfaces/postInterfaces';
import { catchError, Observable } from 'rxjs';
import { HttpErrorHandlingService } from './http-error-handling.service';
import { IUser } from '../Interfaces/Users';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private baseUrl = 'http://localhost:4000';
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
        `${this.baseUrl}/api/posts/create`,
        payload,
        this.httpOptions
      )
      .pipe(
        catchError((err) => this.httpErrorHandlingService.handleError(err))
      );
  }

  deletePost(postId: string) {
    return this.http
      .delete<{ success: boolean }>(
        `${this.baseUrl}/api/posts/deletePost${postId}`,
        this.httpOptions
      )
      .pipe(
        catchError((err) => this.httpErrorHandlingService.handleError(err))
      );
  }

  editPost(postId: string, changes: Partial<IPostsSchema>) {
    return this.http
      .patch<{ success: boolean; data: IUser | null }>(
        `${this.baseUrl}/api/posts/update${postId}`,
        changes,
        this.httpOptions
      )
      .pipe(
        catchError((err) => this.httpErrorHandlingService.handleError(err))
      );
  }

  getAllFriendsPosts(
    page: number,
    pageSize: number,
    friendsArray: IUser[] = []
  ) {
    return this.http
      .post<IFeedPosts[]>(
        this.baseUrl + '/api/posts/getFriendsPosts',
        { page, pageSize, friendsArray },
        this.httpOptions
      )
      .pipe(
        catchError((err) => this.httpErrorHandlingService.handleError(err))
      );
  }

  getUserPosts(userId: string) {
    return this.http
      .get<IPostsHapi[]>(
        `${this.baseUrl}/api/posts/getUsersPosts/${userId}`,
        this.httpOptions
      )
      .pipe(
        catchError((err) => this.httpErrorHandlingService.handleError(err))
      );
  }

  manipulateCommentsFieldInPostsCollection(payload: any) {
    return this.http
      .patch<{ success: boolean }>(
        `${this.baseUrl}/api/posts/update`,
        payload,
        this.httpOptions
      )
      .pipe(
        catchError((err) => this.httpErrorHandlingService.handleError(err))
      );
  }

  updateComments(payload: {
    postId: string;
    commentId: string;
    content: string;
    updatedAt: Date;
  }) {
    return this.http.patch(`${this.baseUrl}/api/posts/update`, payload);
  }

  //TODO good starting point. will probably need to get specific user/friend posts too
  //TODO pagination is for kooks, implement lazy loading
}
