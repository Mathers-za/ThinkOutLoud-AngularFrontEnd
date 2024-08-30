import { Component, Input } from '@angular/core';
import { IUser } from '../Interfaces/Users';
import { RouterLink } from '@angular/router';
import { CreateEditPostComponent } from '../create-edit-post/create-edit-post.component';
import { NgIf } from '@angular/common';
import { CloseModalOnClickOutisdeDirective } from '../shared/custom directives/close-modal-on-click-outisde.directive';

@Component({
  selector: 'app-home-nav-bar',
  standalone: true,
  imports: [
    RouterLink,
    CreateEditPostComponent,
    NgIf,
    CloseModalOnClickOutisdeDirective,
  ],
  templateUrl: './home-nav-bar.component.html',
  styleUrl: './home-nav-bar.component.scss',
})
export class HomeNavBarComponent {
  @Input() userData!: null | IUser;
  initails =
    (this.userData?.firstName[0].toLocaleUpperCase() || 'D') +
    (this.userData?.lastName[0].toLocaleUpperCase() || 'M');
  showCreateEditPost = false;

  toggleShowCreateEditPost() {
    this.showCreateEditPost = !this.showCreateEditPost;
  }

  handleClickOutside() {
    this.showCreateEditPost = false;
  }
}
