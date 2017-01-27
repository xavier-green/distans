import { Redirect, Router, Route, IndexRoute } from 'react-router';
import React from 'react';

import ChatContainer from './containers/ChatContainer';
import RegisterUser from './containers/RegisterUser';
import RegisterPsy from './containers/RegisterPsy';
import Unactive from './containers/AccountUnactivated';
import SignIn from './components/Login';
import App from './containers/App';
import {checkAuth} from './actions/authActions';

const requireAuth = (nextState, replace) => {
  if(!checkAuth()) {
    return replace(null, '/signin')
  }
}
const Routes = (
  <Route path="/" component={App}>
    <Route path="/signin" component={SignIn}/>
    <Route path="/unactive" component={Unactive}/>
    <Route path="/chat" component={ChatContainer}/>
    <Route path="/register/psy" component={RegisterPsy}/>
    <Route path="/register/utilisateur" component={RegisterUser}/>
  </Route>
);

export default Routes;
