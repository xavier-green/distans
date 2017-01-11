import { Redirect, Router, Route, IndexRoute } from 'react-router';
import React from 'react';

import ChatContainer from './containers/ChatContainer';
import RegisterUser from './containers/Register';
import RegisterPsy from './containers/Register';
import App from './containers/App';
import {checkAuth} from './actions/authActions';

const requireAuth = (nextState, replace) => {
  if(!checkAuth()) {
    return replace(null, '/signin')
  }
}
const Routes = (
  <Route path="/" component={App}>
    <Route path="/chat" component={ChatContainer}>
    </Route>
    <Route path="/register/psy" component={RegisterPsy}/>
    <Route path="/register/utilisateur" component={RegisterUser}/>
  </Route>
);

export default Routes;
