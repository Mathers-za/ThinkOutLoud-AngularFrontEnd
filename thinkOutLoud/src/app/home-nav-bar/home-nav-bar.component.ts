import { Component, Input } from '@angular/core';
import { IUser } from '../Interfaces/Users';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-nav-bar.component.html',
  styleUrl: './home-nav-bar.component.scss',
})
export class HomeNavBarComponent {
  @Input() userData!: null | IUser;
  initails =
    (this.userData?.firstName[0].toLocaleUpperCase() || 'D') +
    (this.userData?.lastName[0].toLocaleUpperCase() || 'M');
}
