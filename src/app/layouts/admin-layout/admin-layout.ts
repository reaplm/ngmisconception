import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth-service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  private authService = inject(AuthService);
  userEmail: string = '';
  
  ngOnInit(): void {
    const user = this.authService.getUser();
    this.userEmail = user?.email || 'User';
  }


  logout(): void {
    this.authService.logout();
  }
}
