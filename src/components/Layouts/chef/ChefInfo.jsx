import {
  ClockCircleFilled,
  EnvironmentFilled,
  HomeFilled,
  StarFilled,
} from "@ant-design/icons";
import { Button, Col, Divider, Row } from "antd";
import Text from "antd/lib/typography/Text";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaTruck } from "react-icons/fa";

/**
 * The chef object.
 * @typedef {Object} Chef
 * @property {number} id
 * @property {string} name
 * @property {string} imagePath
 * @property {string} email
 * @property {string} bio
 * @property {string} restaurant_name
 * @property {string} city
 * @property {string} state
 * @property {number} avgRating
 * @property {number} avgTiming
 */

/**
 * The plate object.
 * @typedef {Object} Plate
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {Chef} chef
 * @property {number} price
 * @property {number} rating
 * @property {number} delivery_time
 * @property {number} categoryId
 * @property {{ id: number, name: string, description: string, url: string }} category
 * @property {Array<{ id: number, name: string, url: string }>} PlateImages
 * @property {Array<any>} reviews
 * @property {string} delivery_type
 */

/**
 * The Chef Info component that will display the information of the chef.
 * @param {Object} props - The props passed from previous components.
 * @param {Chef} props.chef - The chef object.
 * @param {Array<Plate>} props.plates - An array of plates
 * @returns {JSX.Element}
 */
const ChefInfo = ({ chef, plates = [] }) => {
  const [isXs, setXs] = useState(false);
  const [isMd, setMd] = useState(false);
  const [isLg, setLg] = useState(false);
  const [start, setStart] = useState(0);
  const [food, setFood] = useState([]);
  const [all, setAll] = useState(false);

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

  useEffect(() => {
    if (all) {
      setFood(plates);
      return undefined;
    }
    if (isXs) {
      setFood(plates.slice(start, start + 1));
    } else if (isMd) {
      setFood(plates.slice(start, start + 2));
    } else if (isLg) {
      setFood(plates.slice(start, start + 3));
    } else {
      setFood(plates.slice(start, start + 1));
    }
  }, [start, isXs, isMd, isLg, all]);

  const plus = () => {
    const maxIndex = plates.length - 1;
    if (isXs) {
      if (start < maxIndex - 1) setStart(start + 1);
      else setStart(0);
    } else if (isMd) {
      if (start < maxIndex - 2) setStart(start + 2);
      else setStart(0);
    } else {
      if (start < maxIndex - 3) setStart(start + 3);
      else setStart(0);
    }
  };

  const minus = () => {
    const maxIndex = plates.length - 1;
    if (isXs) {
      if (start > 0) setStart(start - 1);
      else setStart(maxIndex - 1);
    } else if (isMd) {
      if (start > 0) setStart(start - 2);
      else setStart(maxIndex - 2);
    } else {
      if (start > 0) setStart(start - 3);
      else setStart(maxIndex - 3);
    }
  };

  return (
    <>
      <Head>
        <title>Chef - {chef.name}</title>
      </Head>
      <Row className="pt-2 pb-4 mx-auto w-3/5" align="middle">
        <Col span={24} className="flex justify-start items-center">
          <HomeFilled />
          <Text strong className="text-black ml-4">
            Chef - {chef.name}
          </Text>
        </Col>
      </Row>
      <Row
        className="w-full bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${
            plates[0]?.PlateImages?.[0]?.url || "/images/food-list.png"
          })`,
          height: "40vh",
          backgroundSize: "cover",
          filter: "brightness(50%)",
        }}
        justify="center"
        align="middle"
      ></Row>

      <div className="container mx-auto justify-start">
        <div className="w-full md:w-4/5 lg:w-2/3 mx-auto flex flex-wrap justify-start">
          {/* The details section. */}
          <div className="flex flex-wrap md:hidden mx-auto">
            {/* Style for xs+ here. */}
            <div className="w-full flex justify-evenly">
              <div
                className="w-40 h-40 rounded-xl shadow-md bg-center bg-cover bg-no-repeat transform -translate-y-16"
                style={{
                  backgroundImage: `url(${
                    chef.imagePath || "/images/chef/chef.jpg"
                  })`,
                }}
              ></div>
            </div>
            <div className="w-11/12 mx-auto -mt-10">
              <strong className="text-xl block w-full">{chef.name}</strong>
              <span className="mt-2 text-base flex justify-between">
                <span className="block">
                  <StarFilled style={{ color: "#ffd700" }} />
                  &ensp;
                  <span className="align-middle">
                    {chef.avgRating || "Not Rated Yet!"}
                  </span>
                </span>
                <span className="block">
                  <EnvironmentFilled />
                  &ensp;
                  <span className="align-middle">
                    {chef.city || "Centreville"}, {chef.state || "Virginia"}
                  </span>
                </span>
              </span>
            </div>
          </div>
          <div className="hidden md:flex flex-wrap justify-start">
            {/* Style for md+ here. */}
            <div
              className="w-40 h-40 rounded-xl shadow-md bg-center bg-cover bg-no-repeat transform -translate-y-12"
              style={{
                backgroundImage: `url(${
                  chef.imagePath || "/images/chef/chef.jpg"
                })`,
              }}
            ></div>
            <div className="ml-12 mt-8 block">
              <strong className="text-2xl block w-full">{chef.name}</strong>
              <span className="text-lg flex justify-between">
                <span className="block px-2">
                  <StarFilled style={{ color: "#ffd700" }} />
                  &ensp;
                  <span className="align-middle">
                    {chef.avgRating || "Not Rated Yet!"}
                  </span>
                </span>
                <span className="block px-2">
                  <EnvironmentFilled />
                  &ensp;
                  <span className="align-middle">
                    {chef.city || "Centreville"}, {chef.state || "Virginia"}
                  </span>
                </span>
              </span>
            </div>
          </div>

          <Divider style={{ backgroundColor: "#A0AEC0" }} className="md:mt-0" />

          <div className="mx-auto md:mx-0 w-11/12">
            <span className="text-lg md:text-2xl font-bold block">
              About Me:
            </span>
            <span className="md:text-lg block mt-4">
              {chef.bio ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus ex et metus pretium, id consequat diam feugiat. Vestibulum lobortis suscipit molestie. Donec eget pellentesque nisi. Sed malesuada tincidunt nibh, quis sollicitudin magna pharetra eu. Maecenas sed consectetur lectus. Nam ipsum leo, euismod eget hendrerit ut, scelerisque eu nisi. Sed non turpis ut nisi venenatis iaculis. Proin ac accumsan magna. Aliquam euismod dui massa, sed euismod purus pulvinar vitae. Donec condimentum a arcu et fermentum. Nunc non ornare leo. Phasellus pretium ultrices ultricies. Pellentesque eget ullamcorper metus. Suspendisse eu mauris at metus tempus finibus. Nam id metus sit amet dolor viverra accumsan."}
            </span>
          </div>

          <Divider style={{ backgroundColor: "#A0AEC0" }} />

          <Row className="w-full" justify="start" align="middle">
            <Col className="my-5" xs={12}>
              <span className="text-xl md:text-2xl font-bold">My Plates:</span>
            </Col>
            <Col className="justify-end" xs={12}>
              <span className="flex items-center md:items-baseline justify-end">
                <Button type="link" onClick={() => setAll(!all)}>
                  <span
                    className="font-semibold text-black hover:text-primary underline md:text-lg lg:text-xl"
                    style={{ textUnderlineOffset: "0.3rem" }}
                  >
                    View {all ? "some" : "all"}
                  </span>
                </Button>
                <span className="hidden md:inline">&emsp;</span>
                <span className="md:hidden">&ensp;</span>
                <span>
                  <button
                    className="text-xl md:text-2xl"
                    onClick={() => minus()}
                  >
                    {"<"}
                  </button>
                  &emsp;
                  <button
                    className="text-xl md:text-2xl"
                    onClick={() => plus()}
                  >
                    {">"}
                  </button>
                </span>
              </span>
            </Col>
          </Row>
          <Row
            className="food-grid w-full"
            gutter={[32, 48]}
            align="top"
            style={{ margin: "0 auto !important" }}
          >
            {food.length &&
              food.map((plate, i) => (
                <Col
                  xs={24}
                  md={12}
                  lg={8}
                  key={plate.id}
                  className="new-food-card"
                  key={`${i}`}
                >
                  <Link href={`/food-detail/${encodeURIComponent(plate.id)}`}>
                    <a>
                      <Row
                        justify="center"
                        align="middle"
                        className="new-food-image"
                        style={{
                          backgroundImage: `url(${plate.PlateImages[0]?.url})`,
                          height: "20vh",
                        }}
                      ></Row>
                      <Row className="my-5" justify="space-between">
                        <Col span={8}>
                          <Row align="middle" justify="start">
                            <StarFilled className="pr-1 text-yellow-500 text-lg" />
                            <span>
                              {plate.rating || 4} ({plate.reviews.length})
                            </span>
                          </Row>
                        </Col>
                        <Col span={8}>
                          <Row align="middle" justify="center">
                            <ClockCircleFilled className="pr-1 text-lg" />
                            <span>{plate.delivery_time || 30} min</span>
                          </Row>
                        </Col>
                        <Col span={8}>
                          <Row align="middle" justify="end">
                            <FaTruck className="pr-1 text-2xl" />
                            <span>Delivery</span>
                          </Row>
                        </Col>
                      </Row>
                      <Row>
                        <span className="label">{plate.name}</span>
                      </Row>
                    </a>
                  </Link>
                </Col>
              ))}
          </Row>
          {/* A "Other Chefs" section can be added here, inspired from Figma designs. */}
        </div>
      </div>
    </>
  );
};

export default ChefInfo;
