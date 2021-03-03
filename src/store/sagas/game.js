import { takeLatest, call, put } from 'redux-saga/effects';
import { feed } from '../../services/api';

import { Types as GameTypes, Creators as GameActions } from '../ducks/game';

function* getGame(action) {

  const apiCall = () => {
    return feed.get(`/window/${action.id}`, { params: { startingTime: action.startingTime }, headers: { 'x-api-key': '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z' } });
  }

  try {
    const response = yield call(apiCall);
    console.log(response);

    yield put(GameActions.getGameSuccess(response.data));
  } catch (error) {
    // console.log(error);
    console.log('OI');

    yield put(GameActions.getGameFailure(action.startingTime));
  }
}

export default function* sagas() {
  yield takeLatest(GameTypes.GET_GAME_REQUEST, getGame);
}
