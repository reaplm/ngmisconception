import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { Exam } from './pages/exam/exam';
import { authGuard } from './guards/auth-guard';
import { Register } from './pages/register/register';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { QuestionReview } from './pages/question-review/question-review';

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
  {
    path: '',
    component: AdminLayout,
    canActivate: [authGuard],
    children: [
      { path: 'question-review', component: QuestionReview },
      // Add more pages here
      // { path: 'dashboard', component: DashboardComponent },
      // { path: 'profile', component: ProfileComponent },
      // { path: 'settings', component: SettingsComponent },
      { path: '', redirectTo: 'review', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/login' }
   
];
