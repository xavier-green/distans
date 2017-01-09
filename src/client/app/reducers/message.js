const messages = (state = [], action) => {
  switch (action.type) {
    case 'RCV_MSG':
      return [
        ...state,
        {
          text:action.data.text,
          person:action.data.person
        }
      ]
    default:
      return state;
  }
}

export default messages;
