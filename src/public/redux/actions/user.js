import axios from 'axios'
import { server } from '../../../server'

export const getFullProfile = (user_id, token) => {
	return {
	  type: "GET_FULL_PRORILE",
	  payload: axios({
		method: "get",
		url: `${server.url}/api/v1/user/${user_id}`,
		headers: {
		  Authorization: `Bearer ${token}`
		}
	  })
	};
  };
  
  export const updateProfile = (body, token) => {
	return {
	  type: "UPDATE_PROFILE",
	  payload: axios({
		method: "post",
		url: `${server.url}/api/v1/user`,
		data: body,
		headers: {
		  Authorization: `Bearer ${token}`
		}
	  })
	};
  };
  
export const addUser = ({ email, username, password }) => {
	return {
		type: 'REGISTER_USER',
		payload: axios.post(`${server.url}/api/v1/register`, { email, username, password })
	}
}
