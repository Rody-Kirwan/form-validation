import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Welcome from 'components/welcome/welcome.js';
import LazyLoad from 'components/lazy-load.js';

const Subscribe = React.lazy(() => import("components/subscribe/subscribe.js"));

const AppRoutes = () => {
  return (
    <div>
      <Switch>
        <Route path="/welcome" component={LazyLoad(Welcome)} />
        <Route path="/subscribe" component={LazyLoad(Subscribe)} />
      </Switch>
    </div>
  );
};

export default AppRoutes;
