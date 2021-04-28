import baseUrl from '../config/config';
export const apiSubmissionById = (id: string): string => `${baseUrl}/submission/${id}`;
export const apiPostSubmission = (): string => `${baseUrl}/submission`;
export const apiGetMultiSubmission = (): string => `${baseUrl}/multi-submission`;
export const apiGetSubmissionList = (id: string, pageNum: string) =>
  `${baseUrl}/assignment/${id}/submissionList/page/${pageNum}`;
export const apiAllocateSubmission = (id: string) => `${baseUrl}/assignment/${id}/submission/allocate`;
export const apiUpdateSubmission = (id: string) => `${baseUrl}/submission/${id}`;
