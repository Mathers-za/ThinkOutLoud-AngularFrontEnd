import { Component, OnDestroy, OnInit } from '@angular/core';
import { IFeedPosts } from '../../interfaces/postInterfaces';
import { PostsService } from '../services/posts.service';
import {
  catchError,
  tap,
  of,
  Subscription,
  BehaviorSubject,
  Observable,
  switchMap,
  scan,
  EMPTY,
  mergeScan,
} from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FeedpostComponent } from '../feedpost/feedpost.component';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { FeedbackMessageComponent } from '../feedback-message/feedback-message.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    FeedpostComponent,
    InfiniteScrollDirective,
    FeedbackMessageComponent,
    AsyncPipe,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent {
  pageSize = 10;

  isLoading = false;
  serverError = '';

  readonly page$ = new BehaviorSubject<number>(1);
  feedPosts$: Observable<IFeedPosts[]> = this.page$
    .pipe(
      tap(() => (this.isLoading = true)),
      switchMap((pageNumber) =>
        this.postsService.getAllFriendsPosts(pageNumber, this.pageSize).pipe(
          tap(() => (this.isLoading = false)),
          catchError((err) => {
            this.serverError = err;
            return EMPTY;
          })
        )
      )
    )
    .pipe(
      scan((accum: IFeedPosts[], newlyFetchedPosts: IFeedPosts[]) => {
        return this.page$.getValue() === 1
          ? newlyFetchedPosts
          : [...accum, ...newlyFetchedPosts];
      }, [])
    );

  constructor(private postsService: PostsService) {}

  loadMorePosts() {
    this.page$.next(this.page$.getValue() + 1);
  }

  refreshFeed() {
    this.page$.next(1);
  }
}
