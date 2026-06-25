import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth-service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
   const authService = inject(AuthService);
  const router = inject(Router);

  // Check our service state
  if (authService.isLoggedIn()) {
    return true; //  Allow access to the page
  }

  // Not logged in: Redirect to login page
  router.navigate(['/login']);
  return false; 
};
