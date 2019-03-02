const initialState = {
    type: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    length: 0
  }
  
  export default type = (state = initialState, action) => {
    switch (action.type) {
  
      case 'ALL_TYPES_PENDING':
        return {...state, isLoading: true, isSuccess: false, isError: false}
      case 'ALL_TYPES_REJECTED':
        return { ...state, isLoading: false, isError: true }
      case 'ALL_TYPES_FULFILLED':
        return { ...state, isLoading: false, type: action.payload.data, length: action.payload.data.length}
  
      default:
        return state;
  
    }
  }