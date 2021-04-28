import initialSate from '../initialState';
import { Action } from '../../types';
import { STORE_ROSTER_LIST, STORE_ROSTER_TABLE_CONFIG } from '../actions/actionTypes';

const initialRosterState = initialSate.roster;

const rosterReducer = (state = initialRosterState, action: Action) => {
  switch (action.type) {
    case STORE_ROSTER_LIST:
      return { ...state, data: action.payload };
    case STORE_ROSTER_TABLE_CONFIG:
      return { ...state, config: { ...state.config, ...action.payload } };
    default:
      return state;
  }
};

export default rosterReducer;
