import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  private apiUrl = 'http://localhost:8080/api';
  private tokenKey = 'auth_token';
  private userKey = 'user_data';
  

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}
}

