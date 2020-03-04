import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LazyLoad from 'components/lazy-load.js';

const Subscribe = React.lazy(() => import("components/subscribe/subscribe.js"));

const AppRoutes = () => {
  return (
    <div>
      <Switch>
        <Route path="/subscribe" component={LazyLoad(Subscribe)} />
      </Switch>
    </div>
  );
};

export default AppRoutes;
