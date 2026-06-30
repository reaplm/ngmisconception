import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Question } from '../../models/question';
import { Router } from '@angular/router';
import { QuestionService } from '../../services/question-service';

@Component({
  selector: 'app-question-review',
  imports: [],
  templateUrl: './question-review.html',
  styleUrl: './question-review.css',
})
export class QuestionReview {
  private questionService = inject(QuestionService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  questions: Question[] = [];
  isLoading = true;
  errorMessage = '';

  // Pagination Tracking Parameters
  currentPage: number = 1;
  pageSize: number = 5; // Forces 5 items per display panel
  
  // Track open/closed states for individual cards using an index map
  expandedQuestions: { [key: number]: boolean } = {};

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

  // Navigation Pager Core Actions
  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.expandedQuestions = {}; // Automatically collapse active accordions on transition
      this.cdr.detectChanges();
    }
  }

  toggleExpand(questionId: number): void {
    this.expandedQuestions[questionId] = !this.expandedQuestions[questionId];
    this.cdr.detectChanges();
  }

  goBackToExam(): void {
    this.router.navigate(['/exam']);
  }
}
