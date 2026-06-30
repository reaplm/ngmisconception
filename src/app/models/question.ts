export interface Question {
    id: number;
    question_text: string;
    best_answer: string;
    category_id: number;
    misconceptions?: Misconception[];
}

export interface Misconception {
  id: number;
  misconception_text: string;
  question_id: number;
}