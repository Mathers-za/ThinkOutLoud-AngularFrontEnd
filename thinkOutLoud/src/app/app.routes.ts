import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComponentLibraryComponent } from './component-library/component-library.component';
import { FriendSearchBarComponent } from './friend-search-bar/friend-search-bar.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Login Page' },

  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
    children: [
      { path: 'search', component: FriendSearchBarComponent, title: 'Search' },
    ],
  },

  {
    path: 'componentLibrary',
    component: ComponentLibraryComponent,
    title: 'Component library',
  },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent, title: 'Page not Found' }, //keep at end
];

//wild card route aka 404 must be last. order matters dan
