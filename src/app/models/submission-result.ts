export interface SubmissionResult {
  detected: boolean;
  highest_score: number;
  threshold: number;
  question_id: number;
  student_answer: string;
  question_text: string;
  misconception: {
    id: number;
    text: string;
    question_id: number;
  } | null;
  best_answer: string | null;
  message: string | null;
}