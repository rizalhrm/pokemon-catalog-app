import { combineReducers } from 'redux';

import auth from './auth'
import profile from './profile'
import pokemons from './pokemon'
import categories from './category'
import type from './type'

const appReducer = combineReducers({
	auth,
	profile,
	pokemons,
	categories,
	type
});
  
export default appReducer;