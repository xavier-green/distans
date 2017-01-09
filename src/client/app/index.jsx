import React from 'react';
import {render} from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRedirect } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import MainComponent from './components/barcomponent.jsx';
import Chat from './components/chat.jsx';
import Register from './components/register.jsx';
require('./stylesheet/style.scss')

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import distansReducer from './reducers';
const loggerMiddleware = createLogger();

let store = createStore(
    distansReducer,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    ));
var socket = require('socket.io-client')('http://medicaid.via.ecp.fr:3000');

import listenForSocket from './socket';
listenForSocket(store,socket);

injectTapEventPlugin();

class App extends React.Component {
  constructor() {
    console.log("STARTED");
    super();
  }
  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <Router history={browserHistory}>
            <Route path="/" socket={socket} component={MainComponent}>
              <IndexRedirect to="/chat" />
              <Route path="chat" component={Chat}/>
            </Route>
            <Route path="register" component={Register}/>
          </Router>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

render(<App/>, document.getElementById('app'));
