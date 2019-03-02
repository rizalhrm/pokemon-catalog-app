import { combineReducers } from 'redux';

import auth from './auth'
import user from './user'
import pokemons from './pokemon'
import categories from './category'
import type from './type'

const appReducer = combineReducers({
	auth,
	user,
	pokemons,
	categories,
	type
});
  
export default appReducer;