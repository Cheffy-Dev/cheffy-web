import React from 'react';
import ChefFooter from './ChefFooter';
// import ChefHeader from './ChefHeader';
import Header from "../Header/HomeHeader"

const ChefLayout = ({ children }) => {
	return (
		<>
			{/* <ChefHeader /> */}
			<Header />
			<div>{children}</div>
			<ChefFooter />
		</>
	);
};

export default ChefLayout;
