import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user-service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserModel } from '../../models/user-model'; // This imports the Component!

@Component({
  selector: 'app-user',
  imports: [CommonModule, RouterModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User implements OnInit{
  private userService = inject(UserService);
  
  // Using Signals for optimized reactivity
  users = signal<UserModel[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Failed to load users. Please try again.');
        this.isLoading.set(false);
      }
    });
  }
}
