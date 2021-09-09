import Head from 'next/head';

const AppHead = props => {
	return (
		<Head>
			<title>{props.title}</title>
			<link rel='apple-touch-icon' sizes='180x180' href='/images/apple-ico.png' />
			<link rel='icon' type='image/png' sizes='32x32' href='/favicon.ico' />
			<link rel='icon' type='image/png' sizes='16x16' href='/favicon.ico' />
		</Head>
	);
};

export default AppHead;
