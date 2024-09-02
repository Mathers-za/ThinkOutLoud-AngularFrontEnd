import { Component, OnInit } from '@angular/core';
import { IFeedPosts } from '../../interfaces/postInterfaces';
import { PostsService } from '../services/posts.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit {
  page = 1;
  pageSize = 10;
  posts: IFeedPosts[] | [] = [];
  isLoading = false;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.loadFeedPosts();
  }

  loadFeedPosts() {
    this.isLoading = true;
    this.postsService
      .getAllFriendsPosts(this.page, this.pageSize)
      .pipe(
        tap((postArray) => {
          this.posts = postArray;
          this.isLoading = false;
          this.page += 1;
        })
      )
      .subscribe();
  }

  onScroll() {
    this.postsService
      .getAllFriendsPosts(this.page, this.pageSize)
      .pipe(tap((postsArray) => (this.posts = [...this.posts, ...postsArray])))
      .subscribe();
    this.page += 1;
  }

  onFeedRefresh() {
    this.page = 1;
    this.posts = [];
    this.loadFeedPosts();
  }
}
