const dev = {
	BASE_URL: 'http://localhost:9000',
	MOKE_URL: 'http://127.0.0.1:3004/api/v1',
	GRAPH_QL_URL: 'http://127.0.0.1:8080/graphql',
	BASE_URL_ADMIN_API: 'http://localhost:9001'
};

const prod = {
	BASE_URL: 'https://mycheffy.herokuapp.com',
	MOKE_URL: 'https://salty-badlands-81511.herokuapp.com/api/v1',
	GRAPH_QL_URL: 'https://server-api-dot-mwarereacttvms.appspot.com/graphql',
	BASE_URL_ADMIN_API: 'https://cheffyus-api.herokuapp.com'
};
const config = process.env.NODE_ENV === 'production' ? prod : dev;

export default {
	// Add common config values here
	MAX_ATTACHMENT_SIZE: 5000000,
	TIMEOUT: 60000,
	AUTH_TOKEN: '@cheffy/token',
	AUTH_TYPE: '@cheffy/userType',
	AUTH_IN: '@cheffy/expiresIn',
	AUTH_AT: '@cheffy/expiresAt',
	...config,
};
