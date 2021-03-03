import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getGameRequest: ['id', 'startingTime'],
  getGameSuccess: ['data'],
  getGameFailure: ['startingDate']
});

const INITIAL_STATE = {
  game: {},
  isLoading: true,
  startingDate: null
};

const getGameRequest = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: false,
});

const getGameSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isLoading: false,
  game: action.data,
  startingDate: null
});

const getGameFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  isLoading: false,
  startingDate: action.startingDate
})

export default createReducer(INITIAL_STATE, {
  [Types.GET_GAME_REQUEST]: getGameRequest,
  [Types.GET_GAME_SUCCESS]: getGameSuccess,
  [Types.GET_GAME_FAILURE]: getGameFailure,
});
