import React from "react";
import { HomeFilled } from "@ant-design/icons";

export default function BannerHero({ title, backgroundImage }) {
  const height = "35vh";

  return (
    <>
      <div className="max-w-7xl mx-auto p-5 flex flex-row items-center">
        <HomeFilled />
        <span className="text-back font-bold ml-4">{title}</span>
      </div>

      <div
        className="w-full flex flex-row justify-center items-center bg-fixed bg-cover bg-no-repeat bg-center banner-home-filter"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          height,
        }}
      >
        <h1 className="text-white text-4xl sm:text-5xl font-bold absolute">{title}</h1>
      </div>
    </>
  );
}
