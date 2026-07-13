import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { Exam } from './pages/exam/exam';
import { authGuard } from './guards/auth-guard';
import { Register } from './pages/register/register';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { QuestionReview } from './pages/question-review/question-review';
import { Categories } from './pages/categories/categories';
import { Misconception } from './pages/misconception/misconception';
import { User } from './pages/user/user';

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
    path: '',
    component: AdminLayout,
    canActivate: [authGuard],
    children: [
      { path: 'question-review', component: QuestionReview },
      { path: 'exam', component: Exam },
      { path: 'categories', component: Categories },
      { path: 'misconception', component: Misconception },
      { path: 'user', component: User },
      { path: '', redirectTo: 'question-review', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/login' }
   
];
