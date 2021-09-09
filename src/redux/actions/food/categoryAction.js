import axiosClient from '../../../utils/axios-config';

export function foodCategories(params = { page: 1, pageSize: 10 }) {
	return async dispatch => {
		try {
			const res = await axiosClient.get('category/', {
				params
			});
			return res;
		} catch (error) {
			return Promise.reject(error);
		}
	};
}
