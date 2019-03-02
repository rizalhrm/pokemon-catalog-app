import { combineReducers } from 'redux';

import auth from './auth'
import user from './user'
import pokemons from './pokemon'

const appReducer = combineReducers({
	auth,
	user,
	pokemons
});
  
export default appReducer;