import axios from 'axios';
import { getSession } from 'next-auth/client';
import axiosClient from '../../../utils/axios-config';
import * as types from './chefType';

export function chefOrders(params = {}) {
	return async dispatch => {
		try {
			const res = await axiosClient.get('order/list/chef', {
				params: params
			});
			return res;
		} catch (error) {
			return Promise.reject(error);
		}
	};
}

export function chefBalanceToday(params = {}) {
	// const todayDate = new Date().toISOString().split("T")[0];
	return async dispatch => {
		try {
			// console.log(`user/balance?from=${todayDate}&to=${todayDate}`);
			const res = await axiosClient.get(`user/chef/balance`);
			return res;
		} catch (e) {
			return Promise.reject(e);
		}
	};
}

export function chefPlates(params = {}, chefId) {
	return async dispatch => {
		dispatch({ type: types.CHEF_PLATES_REQUEST });
		try {
			const res = await axiosClient.get(`plate/chef/${chefId}`, {
				params: params
			});
			dispatch({ type: types.CHEF_PLATES_SUCCESS, payload: res });
			return res;
		} catch (error) {
			dispatch({ type: types.CHEF_PLATES_SUCCESS });
			return Promise.reject(error);
		}
	};
}

export function mustTryAndRecommendedChef(params = { page: 1, pageSize: 10 }) {
	return async dispatch => {
		try {
			const res = await axiosClient.get('user/mustTryAndRecommendedChefs', {
				// params,
			});
			return res;
		} catch (error) {
			return Promise.reject(error);
		}
	};
}

export function addPlates(param) {
	return async dispatch => {
		dispatch({ type: types.CHEF_ADD_PLATES_REQUEST });
		const session = await getSession();
		console.log(session.apiToken);
		try {
			const res = await axiosClient.post('plate', param, {
				headers: {
					'content-type': 'application/json',
					'x-access-token': session.apiToken
				}
			});
			console.log(res);
			const status = res.status;
			if (status == 201) {
				dispatch({ type: types.CHEF_ADD_PLATES_SUCCESS, payload: res.plate });
				return res;
			} else {
				dispatch({ type: types.CHEF_ADD_PLATES_FAILURE });
				console.log(res.status);
				return Promise.reject();
			}
		} catch (e) {
			dispatch({ type: types.CHEF_ADD_PLATES_FAILURE });
			return Promise.reject(e);
		}
	};
}

export function addPlateImages(image) {
	return async dispatch => {
		dispatch({ type: types.CHEF_ADD_PLATES_IMAGES_REQUEST });
		const proxyurl = 'https://afternoon-brook-18118.herokuapp.com/';
		const url = 'https://cheffyus-api.herokuapp.com/';
		try {
			const res = await axios.post(proxyurl + url + `images/`, image);
			const status = res.status;
			if (status === 200) {
				dispatch({ type: types.CHEF_ADD_PLATES_IMAGES_SUCCESS, payload: res.data.url });
				return res;
			} else {
				dispatch({ type: types.CHEF_ADD_PLATES_IMAGES_FAILURE });
				return Promise.reject();
			}
		} catch (error) {
			dispatch({ type: types.CHEF_ADD_PLATES_IMAGES_FAILURE });
			return Promise.reject();
		}
	};
}
