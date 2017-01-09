var axios = require("axios");

export const sendMessage = (data,socket) => {
  return dispatch => {
    return axios
    .post('/post',{data:0})
    .then((response) => {
      socket.emit('chat',data);
    })
  }
}

export const receiveMessage = (text,person) => {
  console.log("Received message: "+text+" from "+person);
  return {
    type: 'RCV_MSG',
    data: {
      text: text,
      person: person
    }
  }
}

export const setUsername = (username) => {
  return {
    type: 'SET_USER',
    data: {
        username: username
    }
  }
}

export const signUp = (data) => {
  return {
    type: 'SIGN_UP',
    data: data
  }
}
