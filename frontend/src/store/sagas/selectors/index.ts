import { State } from '../../../types/state';
export const selectAccountName = (state: State) => state.user.accountName;
export const selectUserEmail = (state: State) => state.user.accountEmail;
export const selectSubmissionListConfig = (state: State) => state.submissionList.config;
export const selectAssignmentId = (state: State) => state.assignment._id;
