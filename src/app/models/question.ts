export interface Question {
    id: number;
    question_text: string;
    best_answer: string;
    category_id: number;
    misconceptions?: QuestionMisconception[];
}

export interface QuestionMisconception {
  id: number;
  misconception_text: string;
  question_id: number;
  error_rate?: number;
  question_text?: string;
}
