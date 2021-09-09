import FoodHeader from "../../src/components/Layouts/Header/HomeHeader";
import MainFooter from "../../src/components/Layouts/Footer/MainFooter";
import { KitchenContent } from "../../src/components/Layouts/kitchen/";

const KitchenSection = ({ kitchens }) => {
  return (
    <>
      <FoodHeader />
      <KitchenContent kitchens={kitchens} />
      <MainFooter />
    </>
  );
};

export async function getServerSideProps() {
  const data = await fetch("https://cheffyus-api.herokuapp.com/kitchens/").then(
    (response) => response.json()
  );

  const kitchens = data.map((item) => item.kitchen);

  return {
    props: {
      kitchens,
    },
  };
}

export default KitchenSection;
