import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login.component';
import { LandingComponent } from './landing/landing.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EditGameComponent } from './edit-game/edit-game.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'games', component: LandingComponent },
  { path: 'games/:slug', component: GameDetailsComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'admin/edit/:slug', component: EditGameComponent },
];
