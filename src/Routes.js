import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Rover from './pages/Rover';
import NoMatch from './pages/NoMatch';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/:rover" exact component={Rover} />
        <Route path="*" component={NoMatch} />
      </Switch>
    </BrowserRouter>
  )
}