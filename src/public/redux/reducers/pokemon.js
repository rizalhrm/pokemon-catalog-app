const initialState = {
    pokemons: [],
    pokemon: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
    length: 0,
    lastid: 0
  }
  
  export default pokemons = (state = initialState, action) => {
    switch (action.type) {
  
      case 'ALL_POKEMONS_PENDING':
        return {...state, isLoading: true, isSuccess: false, isError: false}
      case 'ALL_POKEMONS_REJECTED':
        return { ...state, isLoading: false, isError: true }
      case 'ALL_POKEMONS_FULFILLED':
        return { ...state, isLoading: false, pokemons: action.payload.data, length: action.payload.data.length}
  
      case 'CREATE_POKEMON_PENDING':
        return {...state, isLoading: true, isSuccess: false, isError: false};
      case 'CREATE_POKEMON_FULFILLED':
        state.pokemons.push(action.payload.data);
        return {...state, pokemons: state.pokemons, isLoading: false, isSuccess: true};
      case 'CREATE_POKEMON_REJECTED':
        return {...state, isLoading: false, isError: true};
  
      case 'UPDATE_POKEMON_PENDING':
        return {...state, isLoading: true, isSuccess: false, isError: false};
      case 'UPDATE_POKEMON_FULFILLED':
        const newPokemonsAfterUpdate = state.pokemons.map(pokemon => {
          if (pokemon.id == action.payload.data.id) {
            return action.payload.data;
          }
          return pokemon;
        })
        return {...state, pokemons: newPokemonsAfterUpdate, isLoading: false};
      case 'UPDATE_POKEMON_REJECTED':
        return {...state, isLoading: false, isError: true};
  
      case 'DELETE_POKEMON_PENDING':
        return {...state, isLoading: true, isSuccess: false, isError: false};
      case 'DELETE_POKEMON_FULFILLED':
        return {...state, isLoading: false, isSuccess: true};
      case 'DELETE_POKEMON_REJECTED':
        return {...state, isLoading: false, isError: true};
  
      default:
        return state;
  
    }
  }