export interface SubmissionResult {
  detected: boolean;
  highest_score: number;
  threshold: number;
  student_answer: string;
  misconception: {
    id: number;
    text: string;
    question_id: number;
  } | null;
  message: string | null;
}
