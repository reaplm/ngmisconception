import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exam',
  imports: [],
  templateUrl: './exam.html',
  styleUrl: './exam.css',
})
export class Exam {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  userEmail: string = '';

  ngOnInit(): void {
    // Check if user is logged in
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    
    // Get user email
    const user = this.authService.getUser();
    this.userEmail = user?.email || 'User';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
