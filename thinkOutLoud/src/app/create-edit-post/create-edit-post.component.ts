import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostsService } from '../services/posts.service';
import { IPostsSchema } from '../../interfaces/postInterfaces';
import { catchError, EMPTY, tap } from 'rxjs';
import { NgClass, NgIf } from '@angular/common';
import { FeedbackMessageComponent } from '../feedback-message/feedback-message.component';

@Component({
  selector: 'app-create-edit-post',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass, FeedbackMessageComponent],
  templateUrl: './create-edit-post.component.html',
  styleUrl: './create-edit-post.component.scss',
})
export class CreateEditPostComponent implements OnInit {
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
      this.postsService
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
      this.postsService
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
}
