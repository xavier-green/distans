import { CHANGE_CHANNEL } from '../constants/ActionTypes';

const initialState = {
  id: "0"
};

export default function activeChannel(state = initialState, action) {
  switch (action.type) {
  case CHANGE_CHANNEL:
    return {
      id: action.channel
    };

  default:
    return state;
  }
}
