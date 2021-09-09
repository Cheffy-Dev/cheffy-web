module.exports = {
	purge: {
		enabled: process.env.NODE_ENV === 'production',
		content: ['./src/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './public/index.html'],
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			backgroundImage: (theme) => ({
				'home-bg-img': "url('/images/background.svg')",
			}),
			colors: {
				primary: '#d73d36',
				secondary: '#ecc94b',
				inputBg: '#EDF2F7',
			},
		},
		screens: {
			xs: '480px',
			sm: '576px',
			md: '768px',
			lg: '992px',
			xl: '1200px',
			xxl: '1600px',
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
