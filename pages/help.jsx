import React from 'react';
import { useDispatch } from 'react-redux';
import FoodHeader from '../src/components/Layouts/Header/HomeHeader';
import Help from '../src/components/Layouts/help/Help';
import { FoodFooter } from '../src/components/Layouts/home';

function Index() {
	const dispatch = useDispatch();
	return (
		<div>
			<FoodHeader />
			<Help dispatch={dispatch} />
			<FoodFooter />
		</div>
	);
}

export default Index;
