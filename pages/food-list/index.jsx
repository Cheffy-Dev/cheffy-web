import React from 'react';
import FoodListContent from '../../src/components/Layouts/foodList/FoodListContent';
import FoodHeader from '../../src/components/Layouts/Header/HomeHeader';
import { FoodFooter } from '../../src/components/Layouts/home';

const Index = ({ data }) => {
	return (
		<div>
			<FoodHeader />
			<FoodListContent data={data} />
			<FoodFooter />
		</div>
	);
};

export async function getServerSideProps() {
	let res = await fetch(`https://mycheffy.herokuapp.com/plate?city=Centreville`).then(r => r.json());

	return {
		props: { data: res.data }
	};
}

export default Index;
