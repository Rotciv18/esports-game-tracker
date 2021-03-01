import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getLivesRequest: [''],
  getLivesSuccess: ['data']
});

const INITIAL_STATE = {
  lives: [],
  isLoading: false,
};

const getLivesRequest = (state = INITIAL_STATE) => ({
  ...state,
  loading: true,
});

const getLivesSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  lives: [
    ...action.data,
  ],
});

export default createReducer(INITIAL_STATE, {
  [Types.GET_LIVES_REQUEST]: getLivesRequest,
  [Types.GET_LIVES_SUCCESS]: getLivesSuccess,
});
