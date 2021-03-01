import { takeLatest, call, put } from 'redux-saga/effects';
import { esports } from '../../services/api';

import { Types as EventTypes, Creators as EventActions } from '../ducks/event';

function* getEvent(action) {
  
  const apiCall = () => {
    return esports.get('/getEventDetails', { params: { hl: 'pt-BR', id: action.id }, headers: { 'x-api-key': '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z' } });
  }

  try {
    const response = yield call(apiCall);

    yield put(EventActions.getEventSuccess(response.data.data.event));
  } catch (error) {
    console.log(error);
  }
}

export default function* sagas() {
  yield takeLatest(EventTypes.GET_EVENT_REQUEST, getEvent);
}
