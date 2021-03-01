import { all } from 'redux-saga/effects';
import lives from './lives';
import event from './event';
import game from './game';

export default function* rootSaga() {
  yield all([
    lives(),
    event(),
    game()
  ]);
}
