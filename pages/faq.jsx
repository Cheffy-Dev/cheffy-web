import React from 'react';
import Faq from '../src/components/Layouts/faq/Faq';
import FoodHeader from '../src/components/Layouts/Header/HomeHeader';
import { FoodFooter } from '../src/components/Layouts/home';

function Index() {
	return (
		<div>
			<FoodHeader />
			<Faq />
			<FoodFooter />
		</div>
	);
}

export default Index;
