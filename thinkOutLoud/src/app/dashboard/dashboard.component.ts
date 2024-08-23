import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeNavBarComponent } from '../home-nav-bar/home-nav-bar.component';
import { iUser } from '../Interfaces/Users';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../services/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, HomeNavBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  user: iUser | null = null;
  constructor(private httpService: UsersService) {}
  ngOnInit(): void {
    this.httpService
      .getUserData()
      .subscribe((userData) => (this.user = userData));
  }
}
