const initialState = {
  errors: [],
  loginError: ''
};

export default function errors(state = initialState, action) {
  switch (action.type) {
  case 'NEW_ERROR':
  	console.log("new error reducer");
    return {
      errors: [...state.errors, action.error]
    };
  case 'LOGIN_ERROR':
    console.log("new login error reducer");
    let obj = {
      ...state,
      loginError: action.error
    };
    console.log(obj);
    return obj;

  default:
    return state;
  }
}
