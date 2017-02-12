'use strict';

import express from 'express';
import path from 'path';
var session = require('express-session');

import mongoose from 'mongoose';

import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import React from 'react';
import configureStore from '../common/store/configureStore'
import { RouterContext, match } from 'react-router';
import routes from '../common/routes';
import { createMemoryHistory } from 'history';
import DevTools from '../common/containers/DevTools';
import cors from 'cors';
import webpack from 'webpack';
import webpackConfig from '../../webpack.config.dev'
const compiler = webpack(webpackConfig);
import User from './models/User.js';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import passport from 'passport';
require('../../config/passport')(passport);
import SocketIo from 'socket.io';
const app = express();
//set env vars
process.env.MONGOLAB_URI = process.env.MONGOLAB_URI || 'mongodb://localhost/chat_dev';
process.env.PORT = process.env.PORT || 3000;

// connect our DB
mongoose.connect(process.env.MONGOLAB_URI);

process.on('uncaughtException', function (err) {
  console.log(err);
});
app.use(cors());
app.use(passport.initialize());

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

//load routers
const messageRouter = express.Router();
const usersRouter = express.Router();
const channelRouter = express.Router();
require('./routes/message_routes')(messageRouter);
require('./routes/channel_routes')(channelRouter);
require('./routes/user_routes')(usersRouter, passport);
app.use('/api', messageRouter);
app.use('/api', usersRouter);
app.use('/api', channelRouter);
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));

app.use('/', express.static(path.join(__dirname, '..', 'static')));

app.get('/*', function(req, res) {
  const history = createMemoryHistory();
  const location = history.createLocation({
    pathname: req.url
  })
  match({ routes, location }, (err, redirectLocation, renderProps) => {

    const store = configureStore();
    // console.log(redirectLocation);
    // if(redirectLocation) {
    //   return res.status(302).end(redirectLocation);
    // }


    if(err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if(!renderProps) {
      return res.status(404).end('Not found');
    }
    const InitialView = (
      <MuiThemeProvider muiTheme={getMuiTheme(null, { userAgent: 'all' })}>
        <Provider className="root" store={store}>
          <div>
            <RouterContext {...renderProps} />
            {process.env.NODE_ENV !== 'production' && <DevTools />}
          </div>
        </Provider>
      </MuiThemeProvider>
    );

    const finalState = store.getState();
    const html = renderToString(InitialView)
    res.status(200).end(renderFullPage(html, finalState));
  })
})

const server = app.listen(process.env.PORT, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('server listening on port: %s', process.env.PORT);
});

const io = new SocketIo(server, {path: '/api/chat'})
const socketEvents = require('./socketEvents')(io);

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <title>Distans</title>
      </head>
      <body>
        <container id="react"><div>${html}</div></container>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/dist/bundle.js"></script>
      </body>
    </html>
  `
}
