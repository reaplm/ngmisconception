import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';  
import { Service } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    last_login_at?: string;
    created_at?: string;
  };
}

@Service()
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);

    private apiUrl = 'http://localhost:8000/api/v1/auth';
    private tokenKey = 'auth_token';
    private userKey = 'user_data';

    private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
    isLoggedIn$ = this.isLoggedInSubject.asObservable();

     /**
     * Login with email and password - Real backend call
     */
    login(credentials: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials)
        .pipe(
            tap(response => {
            if (response.token) {
                // Store token and user data
                const storage = credentials.rememberMe ? localStorage : sessionStorage;
                storage.setItem(this.tokenKey, response.token);
                storage.setItem(this.userKey, JSON.stringify(response.user));
                this.isLoggedInSubject.next(true);
            }
            }),
            catchError(this.handleError)
        );
    }
    /**
     * Register new user
     */
    register(userData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, userData)
        .pipe(
            catchError(this.handleError)
        );
    }


    logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.userKey);
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey) || sessionStorage.getItem(this.tokenKey);
    }

    getUser(): any {
        const userData = localStorage.getItem(this.userKey) || sessionStorage.getItem(this.userKey);
        return userData ? JSON.parse(userData) : null;
    }

    getCurrentUserEmail(): string {
        const user = this.getUser();
        return user ? user.email : '';
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'Login failed. Please try again.';
        
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
        } 
        else {
            switch (error.status) {
                case 400:
                errorMessage = 'Invalid email or password. Please try again.';
                break;
                case 401:
                errorMessage = 'Unauthorized. Please check your credentials.';
                break;
                case 403:
                errorMessage = 'Access forbidden. Please contact support.';
                break;
                case 404:
                errorMessage = 'User not found. Please check your email.';
                break;
                case 500:
                errorMessage = 'Server error. Please try again later.';
                break;
                default:
                errorMessage = `Error ${error.status}: ${error.message}`;
            }
        }
        return throwError(() => new Error(errorMessage));
    }
        
}



