import { Component, Input } from '@angular/core';
import { iUser } from '../Interfaces/Users';

@Component({
  selector: 'app-home-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './home-nav-bar.component.html',
  styleUrl: './home-nav-bar.component.scss',
})
export class HomeNavBarComponent {
  @Input() userData: null | iUser = null;
  initails =
    (this.userData?.firstName[0].toLocaleUpperCase() || 'D') +
    (this.userData?.lastName[0].toLocaleUpperCase() || 'M');
}
