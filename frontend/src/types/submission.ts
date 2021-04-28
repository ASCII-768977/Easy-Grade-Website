export interface Submission {
  _id: string;
  assignedTo: string;
  gradedBy: string;
  gradedScore: number;
  isGraded: boolean;
  comment: string;
  feedback: string;
  assignmentId: string;
  submittedByName: string;
  submitTime: number;
  pdfName: string;
  pdfUrl: string;
  assignment: { totalScore: number; assignmentName: string };
}
