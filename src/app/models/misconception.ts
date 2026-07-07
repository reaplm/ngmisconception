import { QuestionMisconception } from "./question";

export interface PaginatedMisconceptionsResponse {
  data: QuestionMisconception[];
  total_records: number;
  total_pages: number;
  current_page: number;
}
