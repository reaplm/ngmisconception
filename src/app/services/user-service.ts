import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user-model';

@Service()
export class UserService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8000/api/v1';

    getUsers(): Observable<UserModel[]> {
        return this.http.get<UserModel[]>(this.apiUrl + '/users');
    }

    getUserById(id: number): Observable<UserModel> {
        return this.http.get<UserModel>(`${this.apiUrl}/user/${id}`);
    }
}
