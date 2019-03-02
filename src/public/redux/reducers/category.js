const initialState = {
    categories: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    length: 0,
    lastid: 0
  }
  
  export default categories = (state = initialState, action) => {
    switch (action.type) {
  
      case 'ALL_CATEGORIES_PENDING':
        return {...state, isLoading: true, isSuccess: false, isError: false}
      case 'ALL_CATEGORIES_REJECTED':
        return { ...state, isLoading: false, isError: true }
      case 'ALL_CATEGORIES_FULFILLED':
        return { ...state, isLoading: false, categories: action.payload.data, length: action.payload.data.length}
  
      default:
        return state;
  
    }
  }