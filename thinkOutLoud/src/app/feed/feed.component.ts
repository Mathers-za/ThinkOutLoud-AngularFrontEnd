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
export class FeedComponent implements OnInit {
  pageSize = 10;

  isLoading = false;
  serverError = '';
  postsSubscription$!: Subscription;
  page$ = new BehaviorSubject<number>(1);
  feedPosts$!: Observable<IFeedPosts[] | []>;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.feedPosts$ = this.page$.pipe(
      tap(() => (this.isLoading = true)),
      switchMap((pageNum) =>
        this.postsService.getAllFriendsPosts(pageNum, this.pageSize).pipe(
          catchError((err) => {
            this.serverError = err;
            this.isLoading = false;
            return EMPTY;
          })
        )
      ),
      scan((acc: IFeedPosts[] | [], value: IFeedPosts[]) => {
        if (this.page$.value === 1) {
          return value;
        }
        return (acc = [...acc, ...value]);
      }, []),
      tap(() => (this.isLoading = false))
    );
  }

  loadMorePosts() {
    this.page$.next(this.page$.value + 1);
  }

  refreshFeed() {
    this.page$.next(1);
  }
}
