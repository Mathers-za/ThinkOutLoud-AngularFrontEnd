import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../Interfaces/Users';
import { NgClass } from '@angular/common';

import { UsersService } from '../services/users.service';
import { catchError, EMPTY, Subscription, tap } from 'rxjs';
import { FriendsService } from '../services/friends.service';

@Component({
  selector: 'app-friend-search-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './friend-search-item.component.html',
  styleUrl: './friend-search-item.component.scss',
})
export class FriendSearchItemComponent implements OnDestroy, OnInit {
  @Input() friendData!: IUser;

  userData: IUser | null = null;
  following: boolean = false;
  serverErrorMessage?: string;

  subscription$: Subscription | null = null;
  userFeedBackMessage?: string;
  userSubscription$ = new Subscription();

  constructor(
    private usersService: UsersService,
    private friendService: FriendsService
  ) {}

  ngOnInit(): void {
    this.userSubscription$ = this.usersService.user$
      .pipe(
        tap((userData) => {
          this.userData = userData;

          this.checkAndSetFollowingStatus();
        })
      )
      .subscribe();
  }

  checkAndSetFollowingStatus(): void {
    if (this.userData) {
      this.userData.friends.includes(this.friendData._id)
        ? (this.following = true)
        : (this.following = false);
    }
  }

  toggleFollowing() {
    if (!this.following) {
      this.subscription$ = this.friendService
        .addFriend(this.friendData._id)
        .pipe(
          tap(() => {
            this.following = true;
            this.usersService.getUser().subscribe();
          }),
          catchError((err) => {
            this.serverErrorMessage = err;
            return EMPTY;
          })
        )
        .subscribe();
    } else {
      this.subscription$ = this.friendService
        .removeFriend(this.friendData._id)
        .pipe(
          tap(() => {
            this.following = false;
            this.usersService.getUser().subscribe();
          }),
          catchError((err) => {
            this.serverErrorMessage = err;

            return EMPTY;
          })
        )
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
    this.userSubscription$.unsubscribe();
  }
}
