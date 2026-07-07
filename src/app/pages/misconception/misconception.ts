import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MisconceptionService } from '../../services/misconception-service';
import { QuestionMisconception } from '../../models/question';

@Component({
  selector: 'app-misconception',
  imports: [],
  templateUrl: './misconception.html',
  styleUrl: './misconception.css',
})

export class Misconception implements OnInit{
  private misconceptionService = inject(MisconceptionService);
   private cdr = inject(ChangeDetectorRef);

  // Component view state properties
  misconceptions: QuestionMisconception[] = [];
  currentPage = 1;
  totalPages = 1;
  limit = 5; // Records per database chunk slice
  pageSize: number = 5;
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.fetchDatabaseRecords();
  }

   // Hook this method directly to your template's pager buttons
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchDatabaseRecords(); // Queries the database for the new page automatically
    }
  }

  // Computes maximum pagination index ceiling bounds
  getTotalPages(): number {
    return Math.ceil(this.misconceptions.length / this.pageSize) || 1;
  }

  // Centralised database execution logic hook
  fetchDatabaseRecords(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.misconceptionService.getMisconceptions(this.currentPage, this.limit)
      .subscribe({
        next: (response: any) => {
          this.misconceptions = response.misconceptions;

          // Read values calculated directly on the database server layer
        this.totalPages = response.total_pages; 
        this.currentPage = response.current_page;

          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Database connection crash details:', err);
          this.errorMessage = 'Could not fetch records. Please check database connectivity.';
          this.isLoading = false;
        }
      });
  }
}
