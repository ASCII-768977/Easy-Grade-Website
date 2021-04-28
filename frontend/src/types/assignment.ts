export interface Assignment {
  _id: string;
  assignmentName: string;
  assignmentDesc: string;
  releaseDate: string;
  dueDate: string;
  delayDue: string;
  status: number;
  totalScore: string;
  attachments: Array<any>;
  submission: Array<any>;
  courseId: any;
}

export interface AssignmentStatistic {
  _id: string;
  totalNum: number;
  assignmentId: string;
  assignmentName: string;
  releaseDate: string;
  dueDate: string;
  submittedNum: number;
  gradedNum: number;
  allocatedNum: number;
}

export type AssignmentData = Array<AssignmentStatistic>;

export type AssignmentList = Array<Assignment>;
