import { combineReducers } from 'redux';

import lives from './lives';
import event from './event';
import game from './game';

export default combineReducers({
  lives,
  event,
  game
});
