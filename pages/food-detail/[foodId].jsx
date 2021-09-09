import React from 'react';
import { FoodDetailContent } from '../../src/components/Layouts/food-detail/';
import FoodHeader from '../../src/components/Layouts/Header/HomeHeader';
import MainFooter from "../../src/components/Layouts/Footer/MainFooter";
import '../../styles/foodDetailPage.css';

const Index = ({ data, platesRelated, foodId }) => (
	<div>
		<FoodHeader />
		<FoodDetailContent foodId={foodId} data={data} platesRelated={platesRelated} />
		<MainFooter />
	</div>
);

export async function getServerSideProps({ query }) {
	const res = await (await fetch(`https://mycheffy.herokuapp.com/plate/show/${query.foodId}`)).json();
	const data = await res.data;

	const res2 = await (await fetch(`https://mycheffy.herokuapp.com/plate/${query.foodId}/related`)).json();
	const platesRelated = await res2.data;

	return {
		props: { data, platesRelated, foodId: query.foodId }
	};
}

export default Index;
