import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { VscLoading } from "react-icons/vsc";
import CateGoryPlateComponent from "../src/components/Layouts/new-in-cheffy/newOnCheffyContent_1";
import FoodHeader from "../src/components/Layouts/Header/HomeHeader";

function CateGoryPlate({ category }) {
  return (
    <div>
      <FoodHeader />
      {category ? (
        <CateGoryPlateComponent category={category} />
      ) : (
        <div className="flex items-center justify-center">
          <VscLoading className="text-3xl" />
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const categoryId = 2;
  const res = await fetch("https://mycheffy.herokuapp.com/category").then(
    (res) => res.json()
  );
  const category = res.data[categoryId];

  return {
    props: { category },
  };
}

export default CateGoryPlate;
