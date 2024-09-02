import { Component, OnDestroy, OnInit } from '@angular/core';
import { IFeedPosts } from '../../interfaces/postInterfaces';
import { PostsService } from '../services/posts.service';
import { catchError, tap, of, Subscription } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
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
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit, OnDestroy {
  page = 1;
  pageSize = 10;
  posts: IFeedPosts[] | [] = [];
  isLoading = false;
  serverError = '';
  postsSubscription$!: Subscription;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.loadFeedPosts();
  }

  loadFeedPosts() {
    this.isLoading = true;
    this.postsSubscription$ = this.postsService
      .getAllFriendsPosts(this.page, this.pageSize)
      .pipe(
        tap((postArray) => {
          this.posts = [...this.posts, ...postArray];
          this.isLoading = false;
        }),
        catchError((err) => {
          this.serverError = err.message;
          this.isLoading = false;
          return of([]);
        })
      )
      .subscribe();
    this.page += 1;
  }

  onFeedRefresh() {
    this.page = 1;
    this.posts = [];
    this.loadFeedPosts();
  }

  ngOnDestroy(): void {
    this.postsSubscription$?.unsubscribe();
  }
}
