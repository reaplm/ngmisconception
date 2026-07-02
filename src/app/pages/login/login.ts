import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  loginData = {
    email: '',
    password: '',
    rememberMe: false
  };
  
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/exam']);
    }
  }

   onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    this.isLoading = true;  

    this.authService.login({
      email: this.loginData.email,
      password: this.loginData.password,
      rememberMe: this.loginData.rememberMe
    }).subscribe({
      next: (res) => {
        console.log('👉 SUCCESS: Inside component next block!', res); // Add this log
        this.isLoading = false;
        this.successMessage = 'Login successful! Redirecting to exam...';
        setTimeout(() => {
          this.router.navigate(['/question-review']);

        }, 1500);
      },
      error: (error :any) => {
        this.isLoading = false;
        this.errorMessage = error?.message || 'Login failed. Please try again.';
      }
    });
  }
}
