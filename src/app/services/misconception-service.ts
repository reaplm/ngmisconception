import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionMisconception } from '../models/question';

@Service()
export class MisconceptionService {

     // Inject the native HTTP Client utility token
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8000/api/v1';

  // Fetch records dynamically using parameters for clean server-side pagination
  getMisconceptions(page: number, limit: number = 10): Observable<QuestionMisconception[]> {
    const params = new HttpParams()
      //.set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<QuestionMisconception[]>(this.apiUrl + '/misconceptions', { params });
  }

}
