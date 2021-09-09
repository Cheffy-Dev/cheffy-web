import Head from 'next/head';
import React from 'react';
import Cart from '../src/components/Layouts/cart/cart';
import FoodHeader from '../src/components/Layouts/Header/HomeHeader';
import { FoodFooter } from "../src/components/Layouts/home";

const Index = () => {
	return (
		<div>
			<Head>
				<title>Cheffy - Cart</title>
			</Head>
			<FoodHeader />
			<Cart />
			<FoodFooter />
		</div>
	);
};

export default Index;
