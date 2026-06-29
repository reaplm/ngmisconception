import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../auth-service';
import { Router } from '@angular/router';
import { QuestionService } from '../../services/question-service';
import { Question } from '../../models/question';
import { CommonModule } from '@angular/common';
import { SubmissionResult } from '../../models/submission-result';

@Component({
  selector: 'app-exam',
  imports: [CommonModule],
  templateUrl: './exam.html',
  styleUrl: './exam.css',
})
export class Exam implements OnInit{
  private authService = inject(AuthService);
  private questionService = inject(QuestionService)
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  
  userEmail: string = '';
  questions: Question[] = [];
  isLoading = true;
  errorMessage = '';

  // Tracking index variable
  currentQuestionIndex: number = 0;

  // Submit answer
  submissionFeedback: SubmissionResult | null = null;

  ngOnInit(): void {
    // Check if user is logged in
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    
    // Get user email
    const user = this.authService.getUser();
    this.userEmail = user?.email || 'User';

    //Fetch exam questions
    this.loadQuestions();
  }

  // 2. Navigation Methods
  goToNextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.cdr.detectChanges(); // Force template update
    }
  }

  goToPreviousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.cdr.detectChanges(); // Force template update
    }
  }
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  loadQuestions(): void {
    this.questionService.getQuestions().subscribe({
      next: (response :any) => {
        console.error('Response:', response);
        this.questions = response;
        this.isLoading = false;

        this.cdr.detectChanges();
      },
      error: (error :any) => {
        console.error('Database fetch error:', error);
        this.errorMessage = 'Failed to load exam questions. Please try again.';
        this.isLoading = false;
      }
    });
  }

  onSubmitAnswer(questionId: number, inputElement: HTMLInputElement): void {
    const answerValue = inputElement.value.trim();
    if (!answerValue) return;

    this.questionService.submitAnswer(questionId, answerValue).subscribe({
      next: (response: SubmissionResult) => {
        // Save the backend object containing your payload
        this.submissionFeedback = response;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }
}
