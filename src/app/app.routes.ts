import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { Exam } from './pages/exam/exam';
import { authGuard } from './guards/auth-guard';
import { Register } from './pages/register/register';

export const routes: Routes = [
    {
    path: '',
    component: AuthLayout,
    children: [
      { path: 'login', component: Login },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  { 
    path: 'register', 
    component: Register,
  },
  { 
    path: 'exam', 
    component: Exam,
    canActivate: [authGuard] 
  },
  { path: '**', redirectTo: '/login' }
   
];
