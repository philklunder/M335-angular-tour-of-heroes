import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard').then((m) => m.DashboardComponent),
  },
  {
    path: 'heroes',
    loadComponent: () => import('./heroes/heroes').then((m) => m.Heroes),
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./hero-detail/hero-detail').then((m) => m.HeroDetailComponent),
  },
];
