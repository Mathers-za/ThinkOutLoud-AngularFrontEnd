import { Component, Input, Output } from '@angular/core';
import { iUser } from '../Interfaces/Users';
import { NgClass } from '@angular/common';

import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-friend-search-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './friend-search-item.component.html',
  styleUrl: './friend-search-item.component.scss',
})
export class FriendSearchItemComponent {
  @Input() userData?: iUser;
  following = false;
  userId: string = '';
  error?: String;

  constructor(private usersService: UsersService) {
    this.usersService.userCache$?.subscribe((metaData) => {
      if (metaData?.data) {
        this.userId = metaData.data._id;
      } else {
        this.error = metaData?.error || 'data is available from cache';
      }
    });
  }

  toggleFollowing() {
    this.following = !this.following;
    if (this.following) {
      this.usersService.addFriend(this.userId, {
        $push: { friends: this.userData?._id },
      });
    } else {
      this.usersService.addFriend(this.userId, {
        $pull: { friends: this.userData?._id },
      });
    }
  }
}
