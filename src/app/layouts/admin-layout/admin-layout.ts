import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth-service';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-admin-layout',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  private authService = inject(AuthService);
  private router = inject(Router);
  userEmail: string = '';
  
  ngOnInit(): void {
    const user = this.authService.getUser();
    this.userEmail = user?.email || 'User';

     // 1. Initial check when page first loads or refreshes
    this.checkActiveRoute(this.router.url);

    // 2. Continuous check if the user navigates between pages dynamically
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.checkActiveRoute(event.urlAfterRedirects);
    });
  }

  // Flag tracking the open/closed state of exam submenu
  isExamPanelOpen: boolean = false; 

  // Toggle function executed on user click
  toggleExamPanel(): void {
    this.isExamPanelOpen = !this.isExamPanelOpen;
  }

  private checkActiveRoute(url: string): void {
    // Standardize URL by converting to lowercase to prevent case mismatches
    const normalizedUrl = url.toLowerCase();

    // List target keywords
    const childKeywords = ['categories', 'question', 'misconception', 'preview', 'exam'];

    // Check if the current nested route path contains any of our target keywords
    const matchesChild = childKeywords.some(keyword => normalizedUrl.includes(keyword));
    
    if (matchesChild) {
      this.isExamPanelOpen = true;
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
