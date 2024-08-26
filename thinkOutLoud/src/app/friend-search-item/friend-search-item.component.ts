import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IUser } from '../Interfaces/Users';
import { NgClass } from '@angular/common';

import { UsersService } from '../services/users.service';
import { catchError, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-friend-search-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './friend-search-item.component.html',
  styleUrl: './friend-search-item.component.scss',
})
export class FriendSearchItemComponent implements OnInit, OnDestroy {
  @Input() otherUsersData?: IUser;
  following = false;
  currentUserId: any = null;
  error?: string;

  subscriber$!: Subscription;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.subscriber$ =this.usersService.getUser().pipe(
      tap((userData) => (this.currentUserId = userData?._id)),
      catchError((err) => (this.error = err.message))
    ).subscribe();
  }

  ngOnDestroy(): void {
     this.subscriber$.unsubscribe()
  }

  toggleFollowing() {
    this.following = !this.following;
    if (this.following) {
      this.usersService
        .updateFriendsList(this.currentUserId, {
          $push: { friends: this.otherUsersData?._id },
        })
        .subscribe();
    } else {
      this.usersService
        .updateFriendsList(this.currentUserId, {
          $pull: { friends: this.otherUsersData?._id? },
        })
        .subscribe();
    }
  }
}

