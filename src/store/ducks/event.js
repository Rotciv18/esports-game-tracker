import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getEventRequest: ['id'],
  getEventSuccess: ['data']
});

const INITIAL_STATE = {
  event: {},
  isLoading: true,
};

const getEventRequest = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: true,
});

const getEventSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isLoading: false,
  event: action.data
});

export default createReducer(INITIAL_STATE, {
  [Types.GET_EVENT_REQUEST]: getEventRequest,
  [Types.GET_EVENT_SUCCESS]: getEventSuccess,
});
