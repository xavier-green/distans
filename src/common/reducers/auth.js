import {
  AUTH_LOAD,
  AUTH_LOAD_SUCCESS,
  AUTH_LOAD_FAIL,
  AUTH_SIGNIN,
  AUTH_SIGNIN_SUCCESS,
  AUTH_SIGNIN_FAIL,
  AUTH_SIGNOUT,
  AUTH_SIGNOUT_SUCCESS,
  AUTH_SIGNOUT_FAIL,
  AUTH_SIGNUP,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_FAIL,
  AUTH_SIGNUP_PSY,
  AUTH_SIGNUP_SUCCESS_PSY,
  AUTH_SIGNUP_FAIL_PSY,
  RECEIVE_SOCKET,
  RECEIVE_FILE
} from '../constants/ActionTypes';

const initialState = {
  loaded: false,
  user: {
    username: null,
    name: null,
    email: null,
    id: null,
    socketID: null,
    userObject: null
  },
  account: null
};

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
  case AUTH_LOAD:
    return {
      ...state,
      loading: true
    };
  case AUTH_LOAD_SUCCESS:
    return {
      ...state,
      loading: false,
      loaded: true,
      user: { ...state.user, username: action.user }
    };
  case AUTH_LOAD_FAIL:
    return {
      ...state,
      loading: false,
      loaded: false,
      error: action.error
    };
  case AUTH_SIGNIN:
    return {
      ...state,
      signingIn: true
    };
  case AUTH_SIGNIN_SUCCESS:
    return {
      ...state,
      signingIn: false,
      user: {
        username: action.user.name,
        id: action.user.id
      }
    };
  case AUTH_SIGNIN_FAIL:
    return {
      ...state,
      signingIn: false,
      user: {
        username: null,
        id: null
      },
      signInError: action.error
    };
  case AUTH_SIGNUP:
    return {
      ...state,
      signingUp: true
    };
  case AUTH_SIGNUP_SUCCESS:
    return {
      ...state,
      signingUp: false,
      user: {
        username: action.newUser.name,
        id: action.newUser.id,
        socketID: null,
        userObject: action.newUser.userObject
      },
      account: 'user'
    };
  case AUTH_SIGNUP_SUCCESS_PSY:
    return {
      ...state,
      signingUp: false,
      user: {
        email: action.newPsy.email,
        name: action.newPsy.name,
        id: action.newPsy.id,
        socketID: null,
        userObject: action.newPsy.userObject
      },
      account: 'psy'
    };
  case AUTH_SIGNUP_FAIL:
    return {
      ...state,
      user: {
        username: null,
        id: null
      }
    };
  case AUTH_SIGNOUT:
    return {
      ...state,
      signingOut: true
    };
  case AUTH_SIGNOUT_SUCCESS:
    return {
      ...state,
      signingOut: false,
      user: {
        username: null,
        id: null
      }
    };
  case AUTH_SIGNOUT_FAIL:
    return {
      ...state,
      signingOut: false,
      signOutError: action.error
    };

  case RECEIVE_SOCKET:
    return {
      ...state,
      user: {...state.user,
        socketID: action.socketID
      }
    };
  default:
    return state;
  }
}
