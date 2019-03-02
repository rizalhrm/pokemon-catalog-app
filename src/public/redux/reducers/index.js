import { combineReducers } from 'redux';

import auth from './auth'
import user from './user'
import pokemon from './pokemon'

const appReducer = combineReducers({
	auth,
	user,
	pokemon
});
  
export default appReducer;