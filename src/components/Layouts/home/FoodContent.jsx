import { Row } from "antd";
import Fuse from "fuse.js";
import React, { useEffect, useState } from "react";
import "../../../../styles/foodContent.css";
import { NewAndPopularSkeleton } from "../Skeleton";
import AppBanner from "./AppBanner";
import FoodBanner from "./FoodBanner";
import FoodGrid from "./FoodGrid";
import FoodSearch from "./FoodSearch";
import { default as PopularChefs } from "./MustTryChef";
import NewOnCheffy from "./NewOnCheffy";
import PopularNearYou from "./PopularNearYou";
import TopKitchens from "./TopKitchens";

const FoodContent = ({
  categories,
  newFood,
  popular,
  mustTryChefs,
  kitchens,
}) => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  const [isXs, setXs] = useState(false);
  const [isMd, setMd] = useState(false);
  const [isLg, setLg] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      const check = () => {
        const width = window.innerWidth;
        if (width < 768) {
          setXs(true);
          setMd(false);
          setLg(false);
        } else if (width < 992) {
          setXs(false);
          setMd(true);
          setLg(false);
        } else {
          setXs(false);
          setMd(false);
          setLg(true);
        }
      };
      check();
      window.onresize = check;
    }
  }, []);

  const searchData = (pattern) => {
    setKeyword(pattern);
    setResults([]);
    const options = {
      keys: ["name"],
      threshold: 1, 
      // distance: 1000,
    };
    const fuse = new Fuse(popular, options);

    const result = fuse.search(pattern);
    console.log(result);
    const matches = [];
    if (!result) {
      setResults([]);
    } else {
      result.forEach(({ item }) => {
        if (matches.length < 6) {
          matches.push(item);
        }
      });
      setResults(matches);
    }
  };

  /*
   * Breakdown from Figma Design Plans:
   * Main Banner - done.
   * New On Cheffy - done.
   * There's more in the app banner. - done.
   * Popular Near You. - done.
   * Categories. - done.
   * Celebrity Choice. - don't know what to put here
   * Rent A Kitchen. - done.
   * Popular Chefs. - done (differently).
   */
  
  return (
    <>
      <FoodBanner
        keyword={keyword}
        setKeyword={setKeyword}
        searchData={searchData}
      />
      {!keyword ? (
        <React.Fragment>
          {/* New on Cheffy. */}
          <Row
            id="newOnCheffy"
            className="w-full md:w-3/4 lg:w-5/6 xl:w-2/3 mx-auto"
          >
            {newFood.length ? (
              <NewOnCheffy
                newFood={newFood}
                isXs={isXs}
                isMd={isMd}
                isLg={isLg}
              />
            ) : (
              <NewAndPopularSkeleton title="New On Cheffy" />
            )}
          </Row>

          {/* The App banner. */}
          <AppBanner />

          {/* Popular Near You. */}
          <Row className="w-full md:w-3/4 lg:w-5/6 xl:w-2/3 mx-auto">
            {popular.length ? (
              <PopularNearYou
                popular={popular}
                isXs={isXs}
                isMd={isMd}
                isLg={isLg}
              />
            ) : (
              <NewAndPopularSkeleton title="Popular Near You" />
            )}
          </Row>

          {/* Categories. */}
          {/* TODO: Fix background image*/}
          <Row className="w-full mt-16 bg-primary text-white">
            <FoodGrid
              className="w-full md:w-3/4 lg:w-5/6 xl:w-3/4 mx-auto"
              categories={categories}
              isXs={isXs}
              isMd={isMd}
              isLg={isLg}
            />
          </Row>

          {/* TODO: Celebrity's choice section. No idea what to put here. */}
          <></>

          {/* Rent A Kitchen. */}
          <TopKitchens
            className="w-full md:w-3/4 lg:w-5/6 xl:w-2/3 mx-auto"
            kitchens={kitchens}
            isXs={isXs}
            isMd={isMd}
            isLg={isLg}
          />

          {/* Popular Chefs. */}
          <PopularChefs
            mustTryChefs={mustTryChefs}
            className="w-full md:w-3/4 lg:w-5/6 xl:w-2/3 mx-auto"
            isXs={isXs}
            isMd={isMd}
            isLg={isLg}
          />
        </React.Fragment>
      ) : (
        <FoodSearch results={results} />
      )}
    </>
  );
};

export default FoodContent;
