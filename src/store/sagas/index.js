import { all } from 'redux-saga/effects';
import lives from './lives';

export default function* rootSaga() {
  yield all([
    lives(),
  ]);
}
