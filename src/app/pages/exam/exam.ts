import { ChangeDetectorRef, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
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

@ViewChild('userAnswer') answerInputRef!: ElementRef<HTMLInputElement>;

  
  userEmail: string = '';
  questions: Question[] = [];
  questionIds: number[] = [6, 7, 8, 9, 10]
  isLoading = true;
  errorMessage = '';

  // Tracking index variable
  currentQuestionIndex: number = 0;

  // Submit answer
  submissionFeedback: SubmissionResult | null = null;

  showBestAnswer = false;
  userAnswerText = ''; // Two-way binding property tracking data parameters


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
    this.loadQuestionsByIds(this.questionIds);
  }

  // 2. Navigation Methods
  goToNextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.resetQuestionState();
      this.currentQuestionIndex++;
      this.cdr.detectChanges(); // Force template update
    }
  }

  goToPreviousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.resetQuestionState();
      this.currentQuestionIndex--;
      this.cdr.detectChanges(); // Force template update
    }
  }
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  loadAllQuestions(): void {
    this.questionService.getAllQuestions().subscribe({
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

  loadQuestionsByIds(questionsIds :number[]): void {
    this.questionService.getQuestionsByIds(questionsIds).subscribe({
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

  // THE Centralised cleanup method to wipe the question card canvas fresh
  private resetQuestionState(): void {
    // FIXED: Added absolute reset to clear out previous data feedback objects completely
    this.submissionFeedback = null;
    this.showBestAnswer = false;
    this.userAnswerText = '';

    // Clear physical DOM element content values securely
    if (this.answerInputRef && this.answerInputRef.nativeElement) {
      this.answerInputRef.nativeElement.value = '';
    }
  }

  onSubmitAnswer(questionId: number, inputElement: HTMLInputElement): void {
    const answerValue = inputElement.value.trim();
    if (!answerValue) return;

    this.questionService.submitAnswer(questionId, answerValue).subscribe({
      next: (response: SubmissionResult) => {
        
        // Save the backend object containing your payload
        this.submissionFeedback = response;
        this.showBestAnswer = true;
        console.error(this.submissionFeedback )
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }
}
