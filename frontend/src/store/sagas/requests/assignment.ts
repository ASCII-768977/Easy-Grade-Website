import { AxiosResponse } from 'axios';
import authAxios from '../../../api/authAxios';
import { Assignment } from '../../../types';
import baseUrl from '../../../config/config';

export const asyncCreateAssignment = async (assignment: Assignment): Promise<AxiosResponse> => {
  const createAssignment = `${baseUrl}/assignment`;
  return await authAxios.post(createAssignment, assignment);
};

export const asyncRequestAssignmentList = async (courseId: string): Promise<AxiosResponse> => {
  const requestAssignmentList = `${baseUrl}/course/${courseId}/assignmentList`;
  return await authAxios.get(requestAssignmentList);
};

export const asyncRequestAssignment = async (assignment: Assignment): Promise<AxiosResponse> => {
  const requestAssignment = `${baseUrl}/assignment/${assignment._id}`;
  return await authAxios.get(requestAssignment);
};

export const asyncRequestAssignmentStatistic = async (courseId: string): Promise<AxiosResponse> => {
  const requestStatisticData = `${baseUrl}/course/${courseId}/assignmentList/statistic`;
  return await authAxios.get(requestStatisticData);
};

export const asyncUpdateAssignmentDesc = async (assignment: Assignment): Promise<AxiosResponse> => {
  const updateAssignment = `${baseUrl}/assignment/${assignment._id}`;
  return await authAxios.put(updateAssignment, assignment);
};
