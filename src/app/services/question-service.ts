import { HttpClient, HttpParams } from '@angular/common/http';
import {inject, Service } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Question } from '../models/question';
import { SubmissionResult } from '../models/submission-result';

@Service()
export class QuestionService {
    private http = inject(HttpClient);
    

    private apiUrl = 'http://localhost:8000/api/v1';

    // Fetches the entire collection array from your database
    getAllQuestions(include_misconception: boolean = false,limit: number = 5): Observable<Question[]> {
        // Dynamically append query variables (?limit=5)
        const params = new HttpParams()
            .set('limit', limit.toString())
            .set('include_misconceptions', include_misconception);

        return this.http.get<Question[]>(this.apiUrl + '/questions', {params});
    }
    // New method for getting specific questions by IDs
    getQuestionsByIds(questionIds: number[]): Observable<Question[]> {
        if (!questionIds || questionIds.length === 0) {
            return of([]); // Return empty array if no IDs provided
        }
        
        const body = { question_ids: questionIds };
        return this.http.post<{ total: number; questions: Question[] }>(
            this.apiUrl + '/questions/batch',
            body
        ).pipe(
            map(response => response.questions)
        );
    }

    /**
   * Submits a text answer string payload row for assessment.
   * Matches the exact schema path required to return nested misconception analytics.
   */
  submitAnswer(questionId: number, answerText: string): Observable<SubmissionResult> {
    
    //const url = `${this.apiUrl}/${questionId}/submit`;
    const url = this.apiUrl + '/misconception/detect';
    
    // Explicitly define the payload contract structure that matches Python expectations
    const payload = { 
        question_id: questionId,
        student_answer: answerText 
    };

    // Strongly type the post request return to expect a SubmissionResult map interface
    return this.http.post<SubmissionResult>(url, payload);
  }

}
