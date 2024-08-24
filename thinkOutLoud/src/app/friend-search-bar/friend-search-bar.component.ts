import { Component } from '@angular/core';
import { iUser } from '../Interfaces/Users';

import { UsersService } from '../services/users.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { FriendSearchItemComponent } from '../friend-search-item/friend-search-item.component';

@Component({
  selector: 'app-friend-search-bar',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, FriendSearchItemComponent],
  templateUrl: './friend-search-bar.component.html',
  styleUrl: './friend-search-bar.component.scss',
})
export class FriendSearchBarComponent {
  searchBarInput: string = '';
  searchResultData: iUser[] = [];
  timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;
  serverErrorMessage: string = '';

  constructor(private usersService: UsersService) {}
  onSearch() {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.getUsersFromServer();
    }, 500);
  }

  getUsersFromServer() {
    this.usersService.filterAllUsersByName(this.searchBarInput).subscribe({
      next: (arrOfUsers) => (this.searchResultData = arrOfUsers),
      error: (err) => (this.serverErrorMessage = err.message),
    });
  }
}
