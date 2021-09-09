import React, { Component } from 'react';
import ChefBanner from './ChefBanner';
import ChefProfile from './ChefProfile';
import '../../../../styles/chefContent.css';

const ChefContent = () => {
	return (
		<>
			<ChefBanner />
			<ChefProfile />
		</>
	);
};

export default ChefContent;
