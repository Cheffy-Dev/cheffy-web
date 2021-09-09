import axios from 'axios';
import { getSession } from 'next-auth/client';
import config from '../config';

const axiosClient = axios.create({
	baseURL: `${config.BASE_URL}/`
});

axiosClient.interceptors.request.use(
	async function (config) {
		//const token = localStorage.getItem('token');
		const session = await getSession();
		if (session && session.apiToken) {
			// console.log('axiosClient session', session.apiToken);
			config.headers['x-access-token'] = session.apiToken;
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

axiosClient.interceptors.response.use(
	response => {
		// console.debug('Axios onResponseSuccess', response);
		return response.data;
	},
	error => {
		// console.debug('Axios onResponseError', error.response);
		if (error.response && error.response.status === 403) {
			return Promise.reject(error.response.data);
		}
		return Promise.reject(error);
	}
);

export default axiosClient;
