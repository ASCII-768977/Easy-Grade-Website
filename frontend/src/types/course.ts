export interface Course {
  _id: string;
  courseEntryCode: string;
  courseCode: string;
  courseName: string;
  courseDesc: string;
  startTerm: string;
  startYear: number;
  organization: string;
  annoucements: Array<any>;
  material: Array<any>;
}

export type CourseList = Array<Course>;

export interface SemesterInfo {
  startYear: string;
  startTerm: string;
  seasonOrder: number;
}

export type ResponseCourseList = Array<{ courses: CourseList; semesterInfo: SemesterInfo }>;

export interface AllocatedNum {
  name: string;
  allocatedNum: number;
}

export type AssSample = {
  totalNum: number;
  allocatedNumArray: Array<AllocatedNum>;
};
