import { Component, Input } from '@angular/core';
import { IUser } from '../Interfaces/Users';
import { RouterLink } from '@angular/router';
import { CreateEditPostComponent } from '../create-edit-post/create-edit-post.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { CloseModalOnClickOutisdeDirective } from '../shared/custom directives/close-modal-on-click-outisde.directive';
import { UsersService } from '../services/users.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-home-nav-bar',
  standalone: true,
  imports: [
    RouterLink,
    CreateEditPostComponent,
    NgIf,
    CloseModalOnClickOutisdeDirective,
    AsyncPipe,
  ],
  templateUrl: './home-nav-bar.component.html',
  styleUrl: './home-nav-bar.component.scss',
})
export class HomeNavBarComponent {
  user$: Observable<IUser | null> = this.usersService
    .getUser()
    .pipe(map((value) => value.data));

  showCreateEditPost = false;

  constructor(private usersService: UsersService) {}

  toggleShowCreateEditPost() {
    this.showCreateEditPost = !this.showCreateEditPost;
  }

  handleClickOutside() {
    this.showCreateEditPost = false;
  }
}
