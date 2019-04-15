import { LOGIN_USER, LOGOUT_USER } from '../actions/loginUser'

export default function loginUser (state=null, action) {

	switch (action.type) {
		case LOGIN_USER :
			return action.user
		case LOGOUT_USER :
			return null
		default :
			return state
	}
}
