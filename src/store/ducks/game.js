import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getGameRequest: ['id', 'startingTime'],
  getGameSuccess: ['data']
});

const INITIAL_STATE = {
  game: {},
  isLoading: true,
};

const getGameRequest = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: true,
});

const getGameSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isLoading: false,
  game: action.data
});

export default createReducer(INITIAL_STATE, {
  [Types.GET_GAME_REQUEST]: getGameRequest,
  [Types.GET_GAME_SUCCESS]: getGameSuccess,
});
