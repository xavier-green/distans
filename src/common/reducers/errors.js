const initialState = {
  errors: []
};

export default function errors(state = initialState, action) {
  switch (action.type) {
  case 'NEW_ERROR':
  	console.log("new error reducer");
    return {
      errors: [...state.errors, action.error]
    };

  default:
    return state;
  }
}
