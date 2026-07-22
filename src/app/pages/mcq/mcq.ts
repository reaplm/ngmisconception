import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AuthService } from '../../auth-service';
import { QuestionService } from '../../services/question-service';
import { Router } from '@angular/router';
import { Question } from '../../models/question';
import { SubmissionResult } from '../../models/submission-result';

@Component({
  selector: 'app-mcq',
  imports: [CommonModule],
  templateUrl: './mcq.html',
  styleUrl: './mcq.css',
})
export class Mcq {
  private authService = inject(AuthService);
  private questionService = inject(QuestionService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  userEmail: string = '';
  questions: Question[] = [];
  questionIds: number[] = [6, 7, 8, 9, 10];
  isLoading = true;
  errorMessage = '';

  // Tracking index variable
  currentQuestionIndex: number = 0;

  // Submit answer
  submissionFeedback: SubmissionResult | null = null;

  showBestAnswer = false;
  userAnswerText = ''; // Tracks the chosen option if needed later


  ngOnInit(): void {
    // Check if user is logged in
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    
    // Get user email
    const user = this.authService.getUser();
    this.userEmail = user?.email || 'User';

    // Fetch exam questions
    this.loadQuestionsByIds(this.questionIds, true);
  }

  // Navigation Methods
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

  loadAllQuestions(include_misconceptions: boolean = true): void {
    this.questionService.getAllQuestions(include_misconceptions).subscribe({
      next: (response: any) => {
        console.error('Response:', response);
        this.questions = response;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error('Database fetch error:', error);
        this.errorMessage = 'Failed to load exam questions. Please try again.';
        this.isLoading = false;
      }
    });
  }

  loadQuestionsByIds(questionsIds: number[], include_misconceptions: boolean = false): void {
    this.questionService.getQuestionsByIds(questionsIds,include_misconceptions).subscribe({
      next: (response: any) => {
        console.error('Response:', response);
        this.questions = response;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error('Database fetch error:', error);
        this.errorMessage = 'Failed to load exam questions. Please try again.';
        this.isLoading = false;
      }
    });
  }

  // Centralised cleanup method to wipe the question card canvas fresh
  private resetQuestionState(): void {
    this.submissionFeedback = null;
    this.showBestAnswer = false;
    this.userAnswerText = '';
  }

  // Updated signature to take the string payload option directly from template clicks
  onSubmitAnswer(questionId: number, selectedOption: string): void {
    const answerValue = selectedOption?.trim();
    if (!answerValue) return;

    this.userAnswerText = answerValue; // Keep track of selection locally

    this.questionService.submitAnswer(questionId, answerValue).subscribe({
      next: (response: SubmissionResult) => {
        // Save the backend object containing your payload
        this.submissionFeedback = response;
        this.showBestAnswer = true;
        console.error(this.submissionFeedback);
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }
}
