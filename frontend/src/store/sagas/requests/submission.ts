import axios, { AxiosResponse } from 'axios';
import {
  apiGetMultiSubmission,
  apiPostSubmission,
  apiSubmissionById,
  apiGetSubmissionList,
  apiAllocateSubmission,
  apiUpdateSubmission,
} from '../../../api/submission';
import authAxios from '../../../api/authAxios';

export const requestGetSubmissionById = async (id: string) => {
  return await authAxios.get(apiSubmissionById(id));
};

export const requestGetMultiSubmission = async (assignmentId: string) => {
  return await authAxios.get(apiGetMultiSubmission(), { params: { assignmentId } });
};

export const axiosCreate_S_submission = async (formData: any): Promise<AxiosResponse> => {
  return await axios.post(apiPostSubmission(), formData, {
    headers: {
      'Content-Type': `multipart/form-data;boundary=${formData._boundary}`,
    },
  });
};

export const requestGetSubmissionList = async (assignmentId: string, config: any) => {
  const pageNum = config.pagination.current;
  const params = { pageSize: config.pagination.pageSize, ...config.filters, ...config.sorter };
  return await authAxios.get(apiGetSubmissionList(assignmentId, pageNum), { params: params });
};

export const requestAllocateSubmission = async (assignmentId: string, allocatedDetails: Array<any>) => {
  return await authAxios.put(apiAllocateSubmission(assignmentId), { formInfo: allocatedDetails });
};
export const requestUpdateSubmission = async (submissionId: string, feedback: string, gradedScore: number) => {
  return await authAxios.put(apiUpdateSubmission(submissionId), { feedback, gradedScore });
};
