import jwt_decode from 'jwt-decode';
import config from '../../../config';
import axiosClient from '../../../utils/axios-config';
import { asyncLocalStorage } from '../../../utils/localStorage';
import * as types from './authType';

export function userLogin(params) {
	return async dispatch => {
		dispatch({ type: types.AUTH_LOGIN_REQUEST });
		try {
			const res = await axiosClient.post('user/login', params, {
				headers: { 'Content-Type': 'application/json' }
			});
			const decoded = jwt_decode(res.token);
			console.log(res);
			dispatch({ type: types.AUTH_LOGIN_SUCCESS, payload: decoded });
			return res;
		} catch (error) {
			//console.log('error', error);
			dispatch({ type: types.AUTH_LOGIN_FAILURE });
			return Promise.reject(error);
		}
	};
}

export function userLoginSocial(params) {
	return async dispatch => {
		dispatch({ type: types.AUTH_LOGIN_REQUEST });
		try {
			const res = await axiosClient.post('user/socialauth', params, {
				headers: { 'Content-Type': 'application/json' }
			});
			const decoded = jwt_decode(res.token);
			console.log(res);
			dispatch({ type: types.AUTH_LOGIN_SUCCESS, payload: decoded });
			return res;
		} catch (error) {
			//console.log('error', error);
			dispatch({ type: types.AUTH_LOGIN_FAILURE });
			return Promise.reject(error);
		}
	};
}

export function userSignup(parms) {
	return async dispatch => {
		dispatch({ type: types.AUTH_SIGNUP_REQUEST });
		try {
			console.log(parms);
			const res = await axiosClient.post('user/complete-registration', parms, {
				headers: { 'Content-Type': 'application/json' }
			});
			// console.log(res)
			const status = res.status;
			if (status == 201) {
				dispatch({ type: types.AUTH_SIGNUP_SUCCESS, payload: res.result.name });
				return res.status;
			} else {
				dispatch({ type: types.AUTH_SIGNUP_FAILURE });
				return Promise.reject(e);
			}
		} catch (e) {
			dispatch({ type: types.AUTH_SIGNUP_FAILURE });
			return Promise.reject(e);
		}
	};
}

export async function saveTokens(params) {
	try {
		//console.log("saveTokens params", params);
		const { access_token, decoded } = params;
		const { expires_in, type } = decoded;
		const expires_at = new Date();
		expires_at.setSeconds(expires_at.getSeconds() + expires_in);
		await asyncLocalStorage.setItem(config.AUTH_IN, expires_in);
		await asyncLocalStorage.setItem(config.AUTH_AT, expires_at.getTime());
		await asyncLocalStorage.setItem(config.AUTH_TOKEN, access_token);
		await asyncLocalStorage.setItem(config.AUTH_TYPE, type);
		return Promise.resolve(true);
	} catch (err) {
		throw err;
	}
}
