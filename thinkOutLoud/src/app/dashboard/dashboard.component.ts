import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeNavBarComponent } from '../home-nav-bar/home-nav-bar.component';
import { IUser } from '../Interfaces/Users';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../services/users.service';
import {
  catchError,
  EMPTY,
  Observable,
  Subscription,
  tap,
  throwError,
} from 'rxjs';
import { FeedbackMessageComponent } from '../feedback-message/feedback-message.component';
import {
  FeedbackMessageStateService,
  IFeedbackConfig,
} from '../feedback-message-state.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    HomeNavBarComponent,
    FeedbackMessageComponent,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  user: IUser | null = null;
  serverError: string = '';
  subScriber$?: Subscription;
  feedbackMessageConfig$!: Observable<IFeedbackConfig>;

  constructor(
    private usersService: UsersService,
    private feedBackMessageService: FeedbackMessageStateService
  ) {}

  ngOnInit(): void {
    this.feedbackMessageConfig$ =
      this.feedBackMessageService.feedbackMessageConfig$;
    this.subScriber$ = this.usersService
      .getUser()
      .pipe(
        tap(({ data }) => {
          if (!localStorage.getItem('userID')) {
            localStorage.setItem('userId', data._id);
            this.user = data;
          }
        }),
        catchError((err) => {
          this.feedBackMessageService.showFeedBackComponentOnTimer({
            visibility: true,
            message: err.message,
            severity: 'error',
          });
          return EMPTY;
        })
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.subScriber$?.unsubscribe();
  }
}
