import * as types from '../constants/ActionTypes';
import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import cookie from 'react-cookie';
import axios from 'axios';

export function receiveAuth() {
  const user = cookie.load('username');
  return {
    type: types.AUTH_LOAD_SUCCESS,
    user
  }
}

export function putFile(data) {
  return dispatch => {
    return axios.post('/api/fileupload', data)
      .then(json => dispatch(receiveFile(json)))
      .catch(error => {throw error});
  }
}

function receiveFile(json) {
  console.log("File received");
  console.log(json);
  return {
    type: types.RECEIVE_FILE,
    json
  }
}

export function checkAuth() {
  if (cookie.load('username')) {
    return true;
  }
  return false;
}

function requestSignUp() {
  return {
    type: types.AUTH_SIGNUP
  }
}

function receiveUser(username) {
  const newUser = {
    name: username,
    id: Symbol(username)
  }
  return {
    type: types.AUTH_SIGNUP_SUCCESS,
    newUser
  }
}

function receivePsy(email, name) {
  const newPsy = {
    email: email,
    name: name,
    id: Symbol(email)
  }
  return {
    type: types.AUTH_SIGNUP_SUCCESS_PSY,
    newPsy
  }
}

function requestSignOut() {
  return {
    type: types.AUTH_SIGNOUT
  }
}
function receiveSignOut() {
  return {
    type: types.AUTH_SIGNOUT_SUCCESS
  }
}

export function signOut() {
  return dispatch => {
    dispatch(requestSignOut())
    return fetch('/api/signout')
      .then(response => {
        if(response.ok) {
          cookie.remove('username')
          dispatch(receiveSignOut())
          browserHistory.push('/')
        }
      })
      .catch(error => {throw error});
  }
}

export function signUp(user) {
  var url = null;
  if (user.type == 0) {
    url = '/api/sign_up_user';
  } else if (user.type == 1) {
    url = '/api/sign_up_psy';
  }
  return dispatch => {
    dispatch(requestSignUp())
    return fetch(url, {
      method: 'post',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
      })
      .then(response => {
        if(response.ok && (user.type == 1)) {
          var data = new FormData();
          data.append('file', user.files[0].file);
          data.append('file', user.files[1].file);
          data.append('filenames', user.files.map((el) => { return el.name}));
          data.append('email', user.email);
          return axios.post('/api/fileupload', data)
          .then(json => {
            console.log("File upload response");
            console.log(json);
            if (json.data.success) {
              cookie.save('email', user.email)
              dispatch(receivePsy(user.email,user.name));
              browserHistory.push('/chat');
            }
          })
          .catch(error => {throw error});
        } else if (user.type == 0) {
          cookie.save('username', user.username)
          dispatch(receiveUser(user.username));
          browserHistory.push('/chat');
        }
      })
      .catch(error => {throw error});
  };
}

function requestSignIn() {
  return {
    type: types.AUTH_SIGNIN
  }
}

function receiveSignIn(username) {
  const user = {
    name: username,
    id: Symbol(username)
  }
  return {
    type: types.AUTH_SIGNIN_SUCCESS,
    user
  }
}

export function signIn(user) {
  var url = null;
  if (user.type == "0") {
    url = '/api/sign_in';
  } else if (user.type == "1") {
    url = '/api/sign_in_psy';
  }
  return dispatch => {
    dispatch(requestSignIn())
     return fetch(url, {
      method: 'post',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
      })
      .then(response => {
        console.log(response);
        if(response.ok) {
          if (user.type == "0") {
            cookie.save('username', user.login)
            dispatch(receiveUser(user.login));
          } else if (user.type == "1") {
            cookie.save('email', user.login)
            dispatch(receivePsy(user.login,response.name));
          }
          browserHistory.push('/chat');
        }
      })
      .catch(error => {throw error});
  };
}

export function receiveSocket(socketID) {
  return {
    type: types.RECEIVE_SOCKET,
    socketID
  }
}
