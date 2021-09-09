import FoodHeader from '../src/components/Layouts/Header/HomeHeader';
import FoodFooter from '../src/components/Layouts/home/FoodFooter';
import PopularNearYouComponent from '../src/components/Layouts/PopularNearYou';

const PopularNearYou = ({ plates }) => (
	<>
		<FoodHeader />
		<PopularNearYouComponent plates={plates} />
		<FoodFooter />
	</>
);

export async function getServerSideProps() {
	// Change This Later!
	const city = 'Centreville';
	const res = await fetch(`https://mycheffy.herokuapp.com/plate/new?city=${city}`).then(res => res.json());
	return {
		props: { plates: res.data }
	};
}

export default PopularNearYou;
