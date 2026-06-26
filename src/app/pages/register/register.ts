import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  // Object to store form field values
  registerData = { email: '', username: '', password: '', confirmPassword: ''};


  // Fires when the registration form is submitted
  onRegister(): void {
    this.authService.register(this.registerData).subscribe({
      next: (response :any) => {
          console.log('Registration successful!', response);
        // Check if response has success flag (optional)
        
        if (response.success) {
          alert(response.message || 'Account created successfully! Please log in.');
           setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        } else {
          alert(response.message || 'Registration failed. Please try again.');
        }
      },
      error: (err :any) => {
        console.error('Registration failed', err);
        alert(err.error?.message || 'Failed to register. Please try again.');
      }
    });
  }

}
