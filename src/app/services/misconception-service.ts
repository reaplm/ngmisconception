import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionMisconception } from '../models/question';
import { PaginatedMisconceptionsResponse } from '../models/misconception';

@Service()
export class MisconceptionService {

     // Inject the native HTTP Client utility token
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8000/api/v1';

   getMisconceptions(page: number, limit: number = 5): Observable<PaginatedMisconceptionsResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    // FIXED: Realignment of HTTP get request type validations parameter
    return this.http.get<PaginatedMisconceptionsResponse>(this.apiUrl + '/misconceptions', { params });
  }
}
