import * as types from '../constants/ActionTypes';
import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import moment from 'moment';
var bluebird = require("bluebird");

// NOTE:Chat actions

export function start(user, account, socket) {
  return dispatch => {
    return bluebird.all([
      dispatch(fetchChannels(user, account, socket))
    ])
  }
}

function addMessage(message) {
  return {
    type: types.ADD_MESSAGE,
    message
  };
}

export function receiveRawMessage(message) {
  console.log("front receiving message");
  return {
    type: types.RECEIVE_MESSAGE,
    message
  };
}

export function receiveRawChannel(channel) {
  return {
    type: types.RECEIVE_CHANNEL,
    channel
  };
}

function addChannel(channel) {
  return {
    type: types.ADD_CHANNEL,
    channel
  };
}

export function typing(username) {
  return {
    type: types.TYPING,
    username
  };
}

export function stopTyping(username) {
  return {
    type: types.STOP_TYPING,
    username
  };
}

export function changeChannel(channel) {
  return {
    type: types.CHANGE_CHANNEL,
    channel
  };
}

// NOTE:Data Fetching actions

export function welcomePage(username) {
  return {
    type: types.SAVE_USERNAME,
    username
  };
}

export function fetchChannels(user, account, socket) {
  var url = null;
  if (account == 'user') {
    url = `/api/channels/user/${user.id}`;
  } else if (account == 'psy') {
    url = `/api/channels/psy/${user.id}`;
  }
  return dispatch => {
    dispatch(requestChannels())
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveChannels(json));
        if (account == 'user') {
          dispatch(changeChannel(json[0]._id));
          dispatch(fetchMessages(json[0]._id));
          socket.emit('join channel', json[0]._id);
        }
      })
      .catch(error => {throw error});
  }
}

function requestChannels() {
  return {
    type: types.LOAD_CHANNELS
  }
}

function receiveChannels(json) {
  return {
    type: types.LOAD_CHANNELS_SUCCESS,
    json
  }
}

function requestMessages() {
  return {
    type: types.LOAD_MESSAGES
  }
}

export function fetchMessages(channelId) {
  return dispatch => {
    dispatch(requestMessages())
    return fetch(`/api/messages/${channelId}`) // add /channelId
      .then(response => response.json())
      .then(json => dispatch(receiveMessages(json, channelId)))
      .catch(error => {throw error});
  }
}

function receiveMessages(json, channelId) {
  const date = moment().format('lll');
  console.log("Messages");
  console.log(json);
  return {
    type: types.LOAD_MESSAGES_SUCCESS,
    json,
    channelId,
    date
  }
}

function shouldFetchMessages(state) {
  const messages = state.messages.data;
  if (!messages) {
    return true
  }
}

export function fetchMessagesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchMessages(getState())) {
      return dispatch(fetchMessages())
    }
  }
}

function loadingValidationList() {
  return {
    type: types.LOAD_USERVALIDATION
  }
}

function receiveValidationList(json) {
  return {
    type: types.LOAD_USERVALIDATION_SUCCESS,
    json
  }
}

export function usernameValidationList() {
  return dispatch => {
    dispatch(loadingValidationList())
    return fetch('/api/all_usernames')
      .then(response => {
        return response.json()
    })
      .then(json => {
        return dispatch(receiveValidationList(json.map((item) => item.local.username)))
    })
      .catch(error => {throw error});
  }
}

export function createMessage(message) {
  return dispatch => {
    dispatch(addMessage(message))
    return fetch('/api/newmessage', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)})
      .catch(error => {throw error});
  }
}

export function createChannel(channel) {
  return dispatch => {
    dispatch(addChannel(channel))
    return fetch ('/api/channels/new_channel', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(channel)})
      .catch(error => {throw error});
  }
}

//the environment code is borrowed from Andrew Ngu, https://github.com/andrewngu/sound-redux

function changeIsMobile(isMobile) {
  return {
    type: types.CHANGE_IS_MOBILE,
    isMobile
  };
}

function changeWidthAndHeight(screenHeight, screenWidth) {
  return {
    type: types.CHANGE_WIDTH_AND_HEIGHT,
    screenHeight,
    screenWidth
  };
}

export function initEnvironment() {
  return dispatch => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      document.body.style.overflow = 'hidden';
    }

    dispatch(changeIsMobile(isMobile));
    dispatch(changeWidthAndHeight(window.innerHeight, window.innerWidth));

    window.onresize = () => {
      dispatch(changeWidthAndHeight(window.innerHeight, window.innerWidth));
    }
  };
}
