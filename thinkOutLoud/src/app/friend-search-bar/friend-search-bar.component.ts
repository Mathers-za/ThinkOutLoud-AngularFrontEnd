import { Component, OnDestroy } from '@angular/core';
import { IUser } from '../Interfaces/Users';

import { UsersService } from '../services/users.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { FriendSearchItemComponent } from '../friend-search-item/friend-search-item.component';
import { catchError, Observable, Subscription, tap } from 'rxjs';
import { FeedbackMessageComponent } from '../feedback-message/feedback-message.component';

@Component({
  selector: 'app-friend-search-bar',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    FriendSearchItemComponent,
    FeedbackMessageComponent,
  ],
  templateUrl: './friend-search-bar.component.html',
  styleUrl: './friend-search-bar.component.scss',
})
export class FriendSearchBarComponent implements OnDestroy {
  searchBarInput: string = '';

  timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;
  serverErrorMessage: string = '';
  globalUsers: IUser[] | [] = [];
  searchResultSubscription$!: Subscription;

  constructor(private usersService: UsersService) {}
  onSearch() {
    if (this.searchBarInput) {
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.getUsersFromServer();
      }, 500);
    }
  }

  getUsersFromServer() {
    this.searchResultSubscription$ = this.usersService
      .filterAllUsersByName(this.searchBarInput)
      .pipe(
        tap((usersArray) => (this.globalUsers = usersArray)),
        catchError((err) => (this.serverErrorMessage = err.message))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.searchResultSubscription$?.unsubscribe();
  }
}
