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
  
      case 'CREATE_NOTE_PENDING':
        return {...state, isLoading: true, isSuccess: false, isError: false};
      case 'CREATE_NOTE_FULFILLED':
        state.notes.push(action.payload.data);
        return {...state, notes: state.notes, isLoading: false, isSuccess: true};
      case 'CREATE_NOTE_REJECTED':
        return {...state, isLoading: false, isError: true};
  
      case 'UPDATE_NOTE_PENDING':
        return {...state, isLoading: true, isSuccess: false, isError: false};
      case 'UPDATE_NOTE_FULFILLED':
        const newNotesAfterUpdate = state.notes.map(note => {
          if (note.id == action.payload.data.id) {
            return action.payload.data;
          }
          return note;
        })
        return {...state, notes: newNotesAfterUpdate, isLoading: false};
      case 'UPDATE_NOTE_REJECTED':
        return {...state, isLoading: false, isError: true};
  
      case 'DELETE_NOTE_PENDING':
        return {...state, isLoading: true, isSuccess: false, isError: false};
      case 'DELETE_NOTE_FULFILLED':
        return {...state, isLoading: false, isSuccess: true};
      case 'DELETE_NOTE_REJECTED':
        return {...state, isLoading: false, isError: true};
  
      default:
        return state;
  
    }
  }