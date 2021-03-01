import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from '../pages/Main';
import Events from '../pages/Events';
import Game from '../pages/Game';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/events/:id" component={Events} />
      <Route exact path="/game/:id" component={Game} />
    </Switch>
  );
}
