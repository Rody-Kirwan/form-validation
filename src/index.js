import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import App from 'components/app/app';
import AppRoutes from 'components/app/app.routes';

import 'styles/_base';

const AppRouter = (
  <Router>
    <Route component={App} />
    <Route path="/:content" component={AppRoutes} />
  </Router>
);

ReactDOM.render(
  AppRouter,
  document.querySelector('#root')
);

