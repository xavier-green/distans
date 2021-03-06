import { Redirect, Router, Route, IndexRoute } from 'react-router';
import React from 'react';

import ChatContainer from './containers/ChatContainer';
import EditProfile from './components/UserProfile';
import RegisterUser from './containers/RegisterUser';
import RegisterPsy from './containers/RegisterPsy';
import Unactive from './containers/AccountUnactivated';
import StartPsy from './containers/StartPsy';
import StartUtilisateur from './containers/StartUtilisateur';
import Login from './components/Login';
import App from './containers/App';
import {checkAuth} from './actions/authActions';



const Routes = (
  <Route path="/" component={App}>
    <Route path="/login" component={Login}/>
    <Route path="/unactive" component={Unactive}/>
    <Route path="/chat" component={ChatContainer}/>
    <Route path="/edit" component={ChatContainer}/>
    <Route path="/contact" component={ChatContainer}/>
    <Route path="/start/psy" component={StartPsy}/>
    <Route path="/start/utilisateur" component={StartUtilisateur}/>
    <Route path="/register/psy" component={RegisterPsy}/>
    <Route path="/register/utilisateur" component={RegisterUser}/>
  </Route>
);

export default Routes;
