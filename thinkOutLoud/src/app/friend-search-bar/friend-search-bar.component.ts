import { Component, OnDestroy } from '@angular/core';
import { IUser } from '../Interfaces/Users';

import { UsersService } from '../services/users.service';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FriendSearchItemComponent } from '../friend-search-item/friend-search-item.component';
import {
  catchError,
  debounceTime,
  EMPTY,
  Observable,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
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
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './friend-search-bar.component.html',
  styleUrl: './friend-search-bar.component.scss',
})
export class FriendSearchBarComponent {
  searchBarInput = new FormControl<string>('', Validators.required);
  errorMessage = '';

  usersList$: Observable<IUser[]> = this.searchBarInput.valueChanges.pipe(
    debounceTime(600),
    switchMap((searchInputString) =>
      this.usersService.filterAllUsersByName(searchInputString ?? '').pipe(
        catchError((err) => {
          console.error(err);
          this.errorMessage = 'Something went wrong. Please try again';
          return EMPTY;
        })
      )
    )
  );

  constructor(private usersService: UsersService) {}
}
