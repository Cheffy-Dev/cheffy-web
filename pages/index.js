import Head from "next/head";
import { FoodContent, FoodLayout } from "../src/components/Layouts/home";
import { useDispatch, useSelector } from "react-redux";
import { cityAction } from "../src/redux/actions/user/userAction";
import { useState, useEffect } from "react";

const Home = ({ categories, newFood, popular, mustTryChefs, kitchens }) => {
  // const [popular, setPopular] = useState([]);
  // const [newFood, setNewFood] = useState([]);
  // const [categories, setCategories] = useState([]);
  // const [mustTryChefs, setMustTryChefs] = useState([]);
  // const [kitchens, setKitchens] = useState([]);
  // const [city, setCity] = useState("Cetreville");
  // // useSelector((state) => state.city);
  // // const dispatch = useDispatch();
  // // const newcity = await dispatch(cityAction());

  // useEffect(async () => {
  //   const SITE_BASE_URL =
  //     process.env.NODE_ENV === "development"
  //       ? "http://localhost:8000"
  //       : "https://mycheffy.herokuapp.com";
  //   const res = await fetch(`${SITE_BASE_URL}/home?city=${city}`).then((res) =>
  //     res.json()
  //   );
  //   const kitchenRes = await fetch(`${SITE_BASE_URL}/kitchen/all`).then((res) =>
  //     res.json()
  //   );
  //   const data = res.data;
  //   data.kitchens = [];
  //   for (const obj of kitchenRes) {
  //     data.kitchens.push(obj);
  //   }
  //   setPopular(data.popular);
  //   setNewFood(data.new);
  //   setCategories(data.categories);
  //   setMustTryChefs(data.mustTryChefs);
  //   setKitchens(data.kitchens ? data.kitchens : []);
  // }, []);
  return (
    <>
      <Head>
        <title>Cheffy - Home</title>
      </Head>
      <FoodContent
        newFood={newFood}
        popular={popular}
        categories={categories}
        mustTryChefs={mustTryChefs}
        kitchens={kitchens}
      />
    </>
  );
};

Home.Layout = FoodLayout;

export async function getServerSideProps() {
  // Change this later!
  // const dispatch = useDispatch();
  // const city = await dispatch(cityAction());
  const city = "Centreville";
  const SITE_BASE_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/api"
      : "https://mycheffy.herokuapp.com";

  let data = await fetch(`https://mycheffy.herokuapp.com/home?city=${city}`).then((res) =>
    res.json()
  );
  const kitchenRes = await fetch('https://cheffyus-api.herokuapp.com/kitchens/').then(res => res.json());

  const kitchens = kitchenRes.map((item) => item.kitchen);
  const popular = data.data?.popular ?? [];
  const newFood = data.data?.new ?? [];
  const categories = data.data?.categories ?? [];
  const mustTryChefs = data.data?.mustTryChefs ?? [];

  return {
    props: { categories, newFood, popular, mustTryChefs, kitchens },
  };
}

export default Home;
