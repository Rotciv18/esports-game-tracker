import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getLivesRequest: [''],
  getLivesSuccess: ['data']
});

const INITIAL_STATE = {
  livesList: [],
  isLoading: true,
};

const getLivesRequest = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: true,
});

const getLivesSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isLoading: false,
  livesList: [
    ...action.data,
  ],
});

export default createReducer(INITIAL_STATE, {
  [Types.GET_LIVES_REQUEST]: getLivesRequest,
  [Types.GET_LIVES_SUCCESS]: getLivesSuccess,
});
