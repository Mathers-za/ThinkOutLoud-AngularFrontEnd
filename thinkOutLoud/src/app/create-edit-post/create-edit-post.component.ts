import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostsService } from '../services/posts.service';
import { IPostsSchema } from '../../interfaces/postInterfaces';
import { catchError, EMPTY, Subscription, tap } from 'rxjs';
import { NgClass, NgIf } from '@angular/common';
import { FeedbackMessageComponent } from '../feedback-message/feedback-message.component';
import { CloseModalOnClickOutisdeDirective } from '../shared/custom directives/close-modal-on-click-outisde.directive';

@Component({
  selector: 'app-create-edit-post',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgClass,
    FeedbackMessageComponent,
    CloseModalOnClickOutisdeDirective,
  ],
  templateUrl: './create-edit-post.component.html',
  styleUrl: './create-edit-post.component.scss',
})
export class CreateEditPostComponent implements OnInit, OnDestroy {
  @Input() postData: IPostsSchema | null = null;
  @Output() toggleVisiblity = new EventEmitter<void>();
  postContent: string = '';
  isEdit = false;
  userId = localStorage.getItem('userId');
  userErrorMessage = '';
  userSuccessMessage = '';
  changes: Partial<IPostsSchema> = {};
  constructor(private postsService: PostsService) {}
  isFirstPostCreated = false;
  deleteSubscription$: Subscription | null = null;
  editSubscription$: Subscription | null = null;
  createSubscription$: Subscription | null = null;

  ngOnInit(): void {
    if (this.postData) {
      this.isEdit = true;
      this.postContent = this.postData.content;
    }
  }

  createPost() {
    if (!this.userId) {
      this.userErrorMessage = 'A problem occured. Please relog.';
      throw new Error('userID null in local storage. Critical error');
    } else {
      this.createSubscription$ = this.postsService
        .createPost({ content: this.postContent, creatorId: this.userId })
        .pipe(
          tap(() => {
            this.userSuccessMessage = 'Post created Successfully';
            this.isFirstPostCreated = true;
            this.postContent = '';
          }),
          catchError((err) => {
            this.userErrorMessage = err.message;
            return EMPTY;
          })
        )
        .subscribe();
    }
  }

  hideComponent() {
    this.toggleVisiblity.emit();
  }

  editPost() {
    if (this.postData) {
      this.editSubscription$ = this.postsService
        .editPost(this.postData._id, this.changes)
        .pipe(
          tap((httpReponse) =>
            httpReponse.status === 201
              ? (this.userSuccessMessage = 'Post Updated successfully')
              : ''
          )
        )
        .subscribe();
    } else {
      this.userErrorMessage = 'A problem occured. Please relog.';
      throw new Error(
        'PostData does not exist and postId cannot there be passed to server. Critical error'
      );
    }
  }

  deletePost(): void {
    if (!this.postData?._id)
      throw new Error('Critical error! post id undefined');
    else {
      this.deleteSubscription$ = this.postsService
        .deletePost(this.postData?._id)
        .pipe(
          tap((response) => {
            if (response.status === 204) {
              this.userSuccessMessage = 'Post successfully deleted';
              setTimeout(() => {
                this.hideComponent();
              }, 1000);
            }
          }),
          catchError((err) => {
            this.userErrorMessage = 'Post failed to delete. Please try again';
            return EMPTY;
          })
        )
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    this.deleteSubscription$?.unsubscribe();
    this.editSubscription$?.unsubscribe();
    this.createSubscription$?.unsubscribe();
  }
}
