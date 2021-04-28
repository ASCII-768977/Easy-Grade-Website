import { AxiosResponse } from 'axios';
import { Course } from '../../../types';
import baseUrl from '../../../config/config';
import authAxios from '../../../api/authAxios';
import { apiGetRoster } from '../../../api/course';

export const asyncRequestCourseList = async (): Promise<AxiosResponse> => {
  const requestCouseList = `${baseUrl}/courseList`;
  return await authAxios.get(requestCouseList);
};

export const asyncCreateAnnouncement = async (course: Course, courseIdFromUrl: string): Promise<AxiosResponse> => {
  const createAnnouncement = `${baseUrl}/course/${courseIdFromUrl}`;
  return await authAxios.put(createAnnouncement, course);
};

export const asyncCreateCourse = async (course: Course): Promise<AxiosResponse> => {
  const createCourse = `${baseUrl}/course`;
  return await authAxios.post(createCourse, course);
};

export const asyncAddCourse = async (enrollInfo: any): Promise<AxiosResponse> => {
  const addCourse = `${baseUrl}/enroll`;
  return await authAxios.put(addCourse, enrollInfo);
};

export const asyncUpdateCourseDetails = async (course: Course, courseIdFromUrl: string): Promise<AxiosResponse> => {
  const updateCourse = `${baseUrl}/course/${courseIdFromUrl}`;
  return await authAxios.put(updateCourse, course);
};

export const asyncRequestCourse = async (courseId: String): Promise<AxiosResponse> => {
  const requestCourse = `${baseUrl}/course/${courseId}`;
  return await authAxios.get(requestCourse);
};
export const asyncRequestRosterList = async (courseId: string, config: any): Promise<AxiosResponse> => {
  const requestUrl = apiGetRoster(courseId, config);
  return await authAxios.get(requestUrl);
};
