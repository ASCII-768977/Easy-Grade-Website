import moment from 'moment-timezone';

export const convertSubmissionTime = (timeStamp: number | string) => {
  return moment(timeStamp).format('DD/MM/YY HH:mm');
};
