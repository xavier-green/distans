import { combineReducers } from 'redux'
import messages from './message'
import user from './user'

const distansReducer = combineReducers({
  messages,
  user
})

export default distansReducer
