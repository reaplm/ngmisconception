import { HttpClient, HttpParams } from '@angular/common/http';
import {inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/question';

@Service()
export class QuestionService {
    private http = inject(HttpClient);
    

    private apiUrl = 'http://localhost:8000/api/v1/questions';

    // Fetches the entire collection array from your database
    getQuestions(limit: number = 5): Observable<Question[]> {
        // Dynamically append query variables (?limit=5)
        const params = new HttpParams().set('limit', limit.toString());

        return this.http.get<Question[]>(this.apiUrl, {params});
    }

}
