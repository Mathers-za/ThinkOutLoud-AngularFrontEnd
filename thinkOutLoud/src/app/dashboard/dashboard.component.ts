import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeNavBarComponent } from '../home-nav-bar/home-nav-bar.component';
import { IUser } from '../Interfaces/Users';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../services/users.service';
import { catchError, Observable, Subscription, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, HomeNavBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  user: IUser | null = null;
  serverError: string | null = null;
  subScriber$!: Subscription;
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.subScriber$ = this.usersService
      .getUser()
      .pipe(tap((userData) => (this.user = userData)))
      .subscribe();
  }
  ngOnDestroy(): void {
    this.subScriber$.unsubscribe();
  }
}
