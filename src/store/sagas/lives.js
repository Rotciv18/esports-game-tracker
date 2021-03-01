import { takeLatest, call, put } from 'redux-saga/effects';
import { esports } from '../../services/api';

import { Types as LivesTypes, Creators as LivesActions } from '../ducks/lives';

function* getLives() {
  const apiCall = () => {
    return esports.get('/getLive', { params: { hl: 'pt-BR' }, headers: { 'x-api-key': '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z' } });
  }

  try {
    const response = yield call(apiCall);
    console.log(response.data.data);

    yield put(LivesActions.getLivesSuccess(response.data.data.schedule.events));
  } catch (error) {
    console.log(error);
  }
}

export default function* sagas() {
  yield takeLatest(LivesTypes.GET_LIVES_REQUEST, getLives);
}
