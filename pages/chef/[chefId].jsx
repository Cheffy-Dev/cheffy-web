import Error from 'next/error';
import ChefInfo from '../../src/components/Layouts/chef/ChefInfo';
import FoodHeader from '../../src/components/Layouts/Header/HomeHeader';
import FoodFooter from '../../src/components/Layouts/home/FoodFooter';

const ChefInfoPage = ({ chef, plates }) => (
	<>
		<FoodHeader />
		{plates.length ? <ChefInfo chef={chef} plates={plates} /> : <Error statusCode={400} />}
		<FoodFooter />
	</>
);

export async function getServerSideProps({ query }) {
	const res = await fetch(`https://mycheffy.herokuapp.com/plate/chef/${query.chefId}`).then(res => res.json());
	const chef = res.data?.[0]?.chef;
	return {
		props: { chef, plates: res.data }
	};
}

export default ChefInfoPage;
