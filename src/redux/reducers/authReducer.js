import * as types from '../actions/auth/authType';
//
const initialState = { isAuthenticated: false, isChef: false, userInfo: {} };
//
export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.AUTH_ME_REQUEST:
			return state;
		case types.AUTH_ME_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				userInfo: action.payload
			};
		case types.AUTH_ME_FAILURE:
			return state;
		//
		case types.AUTH_LOGIN_REQUEST:
			return state;
		case types.AUTH_LOGIN_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				isChef: action.payload.type === 'user' ? true : false,
				userInfo: action.payload
			};
		case types.AUTH_LOGIN_FAILURE:
			return state;
		//
		case types.AUTH_LOOUT_REQUEST:
			return state;
		case types.AUTH_LOOUT_SUCCESS:
			return {
				...state,
				isAuthenticated: false
			};
		case types.AUTH_LOOUT_FAILURE:
			return state;
		default:
			return state;
	}
};
