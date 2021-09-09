import { ClockCircleFilled, StarFilled } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import Link from "next/link";
import React from "react";
import { FaTruckMoving } from "react-icons/fa";
import FoodHeader from "../../src/components/Layouts/Header/HomeHeader";
import { default as SearchBar } from "../../src/components/Search";
import axiosClient from "../../src/utils/axios-config";

const ResultCard = ({
  img_url,
  name,
  delivery_time,
  delivery_type,
  rating,
  sell_count,
  id,
}) => {
  return (
    <>
      <Link href={`/food-detail/${id}`}>
        <a>
          <div className="flex flex-col w-full hover:shadow-md rounded-md transition-all ease-in duration-200">
            <div className="w-full h-60 overflow-hidden">
              <img
                className="rounded-md w-full h-full object-cover object-center"
                src={img_url}
                alt={name}
              />
            </div>
            <Text className="pt-3 px-2 sm:pt-4 pb-1 font-semibold text-lg">
              {name}
            </Text>
            <span className="flex px-2 font-poppins font-normal flex-row justify-between">
              <Text>
                <p className="flex items-center">
                  <StarFilled className="pr-1 text-yellow-500" />
                  {rating ? rating : "0"}
                </p>
              </Text>
              <Text>
                <p className="flex items-center">
                  <ClockCircleFilled className="pr-1" /> {delivery_time} min
                </p>
              </Text>
              <Text>
                <p className="flex items-center uppercase">
                  <FaTruckMoving className="pr-1 text-lg" /> {delivery_type}
                </p>
              </Text>
            </span>
          </div>
        </a>
      </Link>
    </>
  );
};

// TODO: Pagination Support
const Search = ({ plates }) => {
  return (
    <div>
      <FoodHeader />
      <div className="mt-20 overflow-x-hidden pt-6 lg:pt-2 pb-4 mx-auto max-w-7xl px-5 md:px-9">
        <div className="sm:px-2">
          <SearchBar />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-y-12 lg:gap-x-8 mt-8">
          {plates.slice(0, 12).map((data) => (
            <ResultCard
              id={data.id}
              key={data.id}
              sell_count={data["sell_count"]}
              delivery_time={data["delivery_time"]}
              delivery_type={data["delivery_type"]}
              rating={data["rating"]}
              name={data["name"]}
              img_url={data["PlateImages"][0]?.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { params } = ctx;
  try {
    const res = await axiosClient.get(`user/search/${params.query}`);
    return { props: { ...res } };
  } catch (err) {
    const res = { plates: [] };
    return { props: { ...res } };
  }
}

export default Search;
