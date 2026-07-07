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
  limit = 50; // Records per database chunk slice
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

  // Centralised database execution logic hook
  fetchDatabaseRecords(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.misconceptionService.getMisconceptions(this.currentPage, this.limit)
      .subscribe({
        next: (response: QuestionMisconception[]) => {
          this.misconceptions = [...response];
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
