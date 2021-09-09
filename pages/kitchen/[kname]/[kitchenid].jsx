import Head from "next/head";
import React from "react";
import FoodHeader from "../../../src/components/Layouts/Header/HomeHeader";
import FoodFooter from "../../../src/components/Layouts/home/FoodFooter";
import KitchenDetails from "../../../src/components/Layouts/kitchen/KitchenDetails";

const ChefKitchen = ({ allKitchens, data, id }) => (
  <>
    <Head>
      {data ? (
        <title>{`Kitchen - ${data.kitchen.name}`}</title>
      ) : (
        <title>Loading...</title>
      )}
    </Head>
    <FoodHeader />
    {data && (
      <KitchenDetails kitchenId={id} data={data} allKitchens={allKitchens} />
    )}
    <FoodFooter />
  </>
);

export async function getServerSideProps({ query }) {
  const { kname } = query;
  const id = parseInt(query.kitchenid, 10);
  const matches = await fetch(
    `https://cheffyus-api.herokuapp.com/kitchens/?name=${encodeURIComponent(
      kname
    )}`
  ).then((res) => res.json());

  const allKitchens = await fetch(
    "https://cheffyus-api.herokuapp.com/kitchens"
  ).then((res) => res.json());

  return {
    props: {
      allKitchens: allKitchens,
      data: matches.find((data) => data.kitchen.id === id),
      id,
    },
  };
}

export default ChefKitchen;
