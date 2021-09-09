import { NewOnCheffyContent } from '../../src/components/Layouts/new-in-cheffy/';
import FoodHeader from '../../src/components/Layouts/Header/HomeHeader';
import FoodFooter from '../../src/components/Layouts/home/FoodFooter';

const NewOnCheffySection = ({ kitchens }) => (
	<>
		<FoodHeader />
		<NewOnCheffyContent kitchens={kitchens} />
		<FoodFooter />
	</>
);

export async function getServerSideProps() {
	const kitchens = await fetch('https://cheffyus-api.herokuapp.com/kitchens/').then(res => res.json());
	return { props: { kitchens } };
}

export default NewOnCheffySection;
