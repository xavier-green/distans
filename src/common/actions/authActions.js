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

function receiveUser(user) {
  const newUser = {
    name: user.username,
    id: user._id
  }
  return {
    type: types.AUTH_SIGNUP_SUCCESS,
    newUser
  }
}

function receivePsy(psy) {
  const newPsy = {
    email: psy.email,
    name: psy.name,
    id: psy._id
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
    return axios
    .post(url, user)
    .then((response) => {
      if((response.status == 200) && (user.type == 1)) {
        var data = new FormData();
        data.append('file', user.files[0].file);
        data.append('file', user.files[1].file);
        data.append('filenames', user.files.map((el) => { return el.name}));
        data.append('email', user.email);
        return axios.post('/api/fileupload', data)
        .then(json => {
          if (json.data.success) {
            browserHistory.push('/unactive');
          }
        })
        .catch(error => {throw error});
      } else if ((response.status == 200) && (user.type == 0)) {
        return axios.post('/api/channels/new_channel',response.data)
        .then((doc) => {
          cookie.save('username', user.username)
          dispatch(receiveUser(response.data));
          browserHistory.push('/chat');
        })
        .catch((err) => {throw err;})
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
    return axios
    .post(url, user)
    .then((response) => {
      console.log("RESP");
      console.log(response.data);
      if(response.status == 200) {
        if (user.type == "0") {
          cookie.save('username', user.login)
          dispatch(receiveUser(response.data));
          browserHistory.push('/chat');
        } else if (user.type == "1") {
          if (response.data.active) {
            cookie.save('email', user.login)
            dispatch(receivePsy(response.data));
            browserHistory.push('/chat');
          } else {
            browserHistory.push('/unactive');
          }
        }
      }
    })
    .catch(error => {console.log(error);});
  };
}

export function receiveSocket(socketID) {
  return {
    type: types.RECEIVE_SOCKET,
    socketID
  }
}
