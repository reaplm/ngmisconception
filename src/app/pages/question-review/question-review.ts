import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Question } from '../../models/question';
import { Router } from '@angular/router';
import { QuestionService } from '../../services/question-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-review',
  imports: [CommonModule],
  templateUrl: './question-review.html',
  styleUrl: './question-review.css',
})
export class QuestionReview implements OnInit{
  private questionService = inject(QuestionService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  questions: Question[] = [];
  isLoading = true;
  errorMessage = '';

  // Pagination Tracking Parameters
  currentPage: number = 1;
  pageSize: number = 6; // Forces 5 items per display panel
  selectedQuestionId: number | null = null;
  
  // Track open/closed states for individual cards using an index map
  expandedQuestions: { [key: number]: boolean } = {};

  selectedQuestion: number | null = null;
  isLoadingMisconceptions = false;
  misconceptionsError: string | null = null;


  ngOnInit(): void {
    this.loadAllQuestions();
  }

  loadAllQuestions(): void {
    // Pass a higher limit (e.g. 50) to fetch the entire collection list
    this.questionService.getAllQuestions(true, 50).subscribe({
      next: (response: Question[]) => {
        this.questions = [...response];
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error('Fetch error:', error);
        this.errorMessage = 'Could not load your analytical dashboard view.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
   // Calculated Javascript Getter slicing precisely 5 questions relative to active index adjustments
  get paginatedQuestions(): Question[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.questions.slice(startIndex, startIndex + this.pageSize);
  }

  // Computes maximum pagination index ceiling bounds
  get totalPages(): number {
    return Math.ceil(this.questions.length / this.pageSize) || 1;
  }

  // Method to select question
  selectQuestion(questionId: number): void {
    this.selectedQuestion = questionId;
    this.misconceptionsError = null;
    
    const question = this.questions.find(q => q.id === questionId);
    if (question && (!question.misconceptions || question.misconceptions.length === 0)) {
      this.fetchMisconceptions(questionId);
    }
  }

  // Method to fetch misconceptions
  fetchMisconceptions(questionId: number): void {
    this.isLoadingMisconceptions = true;
    this.misconceptionsError = null;
  }

  // Navigation Pager Core Actions
  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.expandedQuestions = {}; // Automatically collapse active accordions on transition
      this.cdr.detectChanges();
    }
  }


  getSelectedQuestion(): Question | undefined {
    return this.questions.find(q => q.id === this.selectedQuestionId);
  }

  isQuestionSelected(questionId: number): boolean {
    return this.selectedQuestionId === questionId;
  }

  goBackToExam(): void {
    this.router.navigate(['/exam']);
  }
}
