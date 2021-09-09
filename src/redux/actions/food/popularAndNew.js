import axiosClient from '../../../utils/axios-config';

export function popularAndNew(params = { page: 1, pageSize: 10 }) {
	return async dispatch => {
		try {
			const res = await axiosClient.get('plate/popularAndNew?city=Centreville', {
				// params,
			});
			return res;
		} catch (error) {
			return Promise.reject(error);
		}
	};
}

export function allPlates(params = { page: 1, pageSize: 10 }) {
	return async dispatch => {
		try {
			const res = await axiosClient.get('plate/', {
				// params,
			});
			return res;
		} catch (error) {
			return Promise.reject(error);
		}
	};
}
