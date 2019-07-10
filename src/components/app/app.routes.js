import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Subscribe from 'components/subscribe/subscribe.js';
import Welcome from 'components/welcome/welcome.js';

const AppRoutes = () => {
  return (
    <div>
      <Switch>
        <Route path="/welcome" component={Welcome} />
        <Route path="/subscribe" component={Subscribe} />
      </Switch>
    </div>
  );
};

export default AppRoutes;
