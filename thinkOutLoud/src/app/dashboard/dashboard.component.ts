import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeNavBarComponent } from '../home-nav-bar/home-nav-bar.component';
import { IUser } from '../Interfaces/Users';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../services/users.service';
import { catchError, Observable, Subscription, tap, throwError } from 'rxjs';
import { FeedbackMessageComponent } from '../feedback-message/feedback-message.component';
import { FeedbackMessageStateService } from '../feedback-message-state.service';
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
  userFeedBackMessage$!: Observable<string>;
  feedbackMessageSeverity$!: Observable<'success' | 'error' | 'warning'>;
  feedbackMessageVisibility$!: Observable<boolean>;

  constructor(
    private usersService: UsersService,
    private feedBackMessageService: FeedbackMessageStateService
  ) {}

  ngOnInit(): void {
    this.userFeedBackMessage$ = this.feedBackMessageService.message$;
    this.feedbackMessageSeverity$ = this.feedBackMessageService.severity$;
    this.feedbackMessageVisibility$ = this.feedBackMessageService.visibility$;
    this.subScriber$ = this.usersService
      .getUser()
      .pipe(
        tap(({ data }) => {
          if (!localStorage.getItem('userID')) {
            localStorage.setItem('userId', data._id);
            this.user = data;
          }
        }),
        catchError((err) => (this.serverError = err.message))
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.subScriber$?.unsubscribe();
  }
}
