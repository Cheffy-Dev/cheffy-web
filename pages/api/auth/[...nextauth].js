import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
const options = {
	// https://next-auth.js.org/configuration/providers
	providers: [
		Providers.Credentials({
			id: 'cheffyCredentials',
			name: 'CheffyCredentials',
			authorize: async credentials => {
				try {
					if (credentials.apiToken) {
						// Any object returned will be saved in `user` property of the JWT
						return Promise.resolve(credentials);
					} else {
						throw new Error('apiToken token is not define');
					}
				} catch (error) {
					console.log('error', error);
					return Promise.resolve(null);
				}
			}
		})
	],
	session: {
		jwt: true
	},
	jwt: {
		// secret: process.env.JWT_SECRET
	},
	callbacks: {
		signIn: async (user, account, profile) => {
			user.role = await user.role;
			user.userId = await user.id;
			return true;
		},
		redirect: async (url, baseUrl) => {
			return url.startsWith(baseUrl) ? Promise.resolve(url) : Promise.resolve(baseUrl);
		},
		session: async (session, user) => {
			if (user.apiToken) {
				session.apiToken = user.apiToken;
				session.role = user.role;
				session.userId = user.userId;
			}
			return session;
		},
		jwt: async (token, user, account, profile, isNewUser) => {
			const isSignIn = user ? true : false;
			if (isSignIn) {
				token.apiToken = user.apiToken;
				token.role = user.role;
				token.userId = user.id;
			}
			return token;
		}
	},

	// Events are useful for logging
	// https://next-auth.js.org/configuration/events
	events: {},
	//   pages: {
	//     signIn: '/login'
	//   },
	// Enable debug messages in the console if you are having problems
	debug: true
};

export default (req, res) => NextAuth(req, res, options);
