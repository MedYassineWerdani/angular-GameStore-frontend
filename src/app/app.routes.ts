import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login.component';
import { LandingComponent } from './landing/landing.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'games', component: LandingComponent },
];
