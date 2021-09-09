import React from "react";
import { VscLoading } from "react-icons/vsc";
import CateGoryPlateComponent from "../../../src/components/Layouts/category/CategoryPlate";
import FoodHeader from "../../../src/components/Layouts/Header/HomeHeader";

const CateGoryPlate = ({ category, plates = [] }) => (
  <div>
    <FoodHeader />
    {category ? (
      <CateGoryPlateComponent plates={plates} category={category} />
    ) : (
      <div className="flex items-center justify-center">
        <VscLoading className="text-3xl" />
      </div>
    )}
  </div>
);

export async function getServerSideProps({ query }) {
  const id = parseInt(query.categoryId, 10);
  const plates = await fetch(
    `https://mycheffy.herokuapp.com/plate/category/${id}`
  ).then((res) => res.json());
  const category = plates.data[0].category;
  return { props: { category, plates: plates.data } };
}

export default CateGoryPlate;
