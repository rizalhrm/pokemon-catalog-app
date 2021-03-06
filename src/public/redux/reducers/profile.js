const initialState = {
	data: [],
	message: '',
	isLoading: false,
	isLogin: false
}

export default profile = (state = initialState, action) => {
	switch(action.type) {
		
	case "GET_FULL_PROFILE_PENDING":
			return {
				...state,
				isLoading: true
			};


    case "GET_FULL_PROFILE_REJECTED":
			return {
				...state,
				isLoading: false
			};


    case "GET_FULL_PROFILE_FULFILLED":
			return {
				...state,
				data: action.payload.data,
				isLoading: false
			};


		case "UPDATE_PROFILE_PENDING":
			return {
				...state,
				isLoading: true
			};

		case "UPDATE_PROFILE_REJECTED":
			return {
				...state,
				isLoading: false
			};

		case "UPDATE_PROFILE_FULFILLED":
			return {
				...state,
				data: action.payload.data,
				isLoading: false
			};


		case 'REGISTER_USER_PENDING':
			return {
				...state,
				isLoading: true
			}
		case 'REGISTER_USER_REJECTED':
			return {
				...state,
				isLoading: false,
				isLogin: false
			}
		case 'REGISTER_USER_FULFILLED':
			alert('Register success')
			return {
				...state,
				isLoading: false,
				message: action.payload.data
			}
		
		default:
			return state
	}
}