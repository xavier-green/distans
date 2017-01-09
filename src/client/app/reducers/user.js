const user = (state = {}, action) => {
  console.log(action);
  switch (action.type) {
    case 'SET_USER':
      console.log("Set user "+action.data.username);
      return Object.assign({}, state, {
        username: action.data.username
      })
    default:
      return state;
  }
}

export default user;
