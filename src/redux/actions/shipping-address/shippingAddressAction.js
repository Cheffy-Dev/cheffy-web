import axiosClient from '../../../utils/axios-config';
import * as types from './shippingAddressType';

export const getShippingAddressList = () => {
	return async dispatch => {
		dispatch({ type: types.SHIPPING_ADDRESS_LIST_REQUEST });
		try {
			const res = axiosClient.get(`/shipping`);
			dispatch({ type: types.SHIPPING_ADDRESS_LIST_SUCCESS, payload: res });
			return res;
		} catch (e) {
			dispatch({ type: types.SHIPPING_ADDRESS_LIST_FAILURE });
			return Promise.reject(e);
		}
	};
};

export const getShippingAddressById = shippingAddressById => {
	return async dispatch => {
		dispatch({ type: types.SHIPPING_ADDRESS_BY_ID_LIST_REQUEST });
		try {
			const res = axiosClient.get(`/shipping/${shippingAddressById}`);
			dispatch({ type: types.SHIPPING_ADDRESS_BY_ID_LIST_SUCCESS, payload: res });
			return res;
		} catch (e) {
			dispatch({ type: types.SHIPPING_ADDRESS_BY_ID_LIST_FAILURE });
			return Promise.reject(e);
		}
	};
};
