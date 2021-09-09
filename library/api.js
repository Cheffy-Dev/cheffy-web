import axios from 'axios';
import config from '../src/config';

export default class Api {
	VerifyEmail = params => {
		const headers = {
			'Content-Type': 'application/json'
		};
		var response = axios.post(`${config.BASE_URL}/user/`, params, { headers: headers });
		return response;
	};

	SignUp = params => {
		const headers = {
			'Content-Type': 'application/json'
		};
		var response = axios.post(`${config.BASE_URL}/user/complete-registration`, params, { headers: headers });
		return response;
	};
}
