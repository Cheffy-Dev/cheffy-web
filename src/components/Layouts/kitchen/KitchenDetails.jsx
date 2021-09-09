import {
  ClockCircleFilled,
  EnvironmentFilled,
  HeartFilled,
  HomeFilled,
  StarFilled,
} from "@ant-design/icons";
import { Button, Col, Divider, Row, Tabs, Typography } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/actions/cart/cartAction';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaCartPlus, FaTruck } from "react-icons/fa";
import "../../../../styles/foodDetailPage.css";
import Head from "next/head";
// import { FaCartPlus, FaTruck } from "react-icons/fa";

const { Text } = Typography;
const { TabPane } = Tabs;

/* TODO:
 * As of now, the Kitchen API does not provide anything like "ratings" or "location".
 * I am using static data for that. Please update it later. There are 2 sections - for mobile and desktop devices.
 * There is no provision (redux actions, cart handling) to receive kitchens in the cart.
 */

function KitchenDetails({ data, allKitchens }) {
  const [inCart, setInCart] = useState(false);
  const [number, setNumber] = useState(1);
  const router = useRouter();
  const dispatch = useDispatch();

  const [isXs, setXs] = useState(false);
  const [isMd, setMd] = useState(false);
  const [isLg, setLg] = useState(false);
  const [start, setStart] = useState(0);
  const [kitchens, setKitchens] = useState([]);
  const [all, setAll] = useState(false);
  const kitchenId = data.kitchen.id;

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
      setKitchens(allKitchens);
      return undefined;
    }
    if (isXs) {
      setKitchens(allKitchens.slice(start, start + 1));
    } else if (isMd) {
      setKitchens(allKitchens.slice(start, start + 2));
    } else if (isLg) {
      setKitchens(allKitchens.slice(start, start + 3));
    } else {
      setKitchens(allKitchens.slice(start, start + 1));
    }
  }, [start, isXs, isMd, isLg, all]);

  const plus = () => {
    const maxIndex = allKitchens.length - 1;
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
    const maxIndex = allKitchens.length - 1;
    if (isXs) {
      if (start > 0) setStart(start - 1);
      else setStart(maxIndex - 1);
    } else if (isMd) {
      if (start > 2) setStart(start - 2);
      else setStart(maxIndex - 2);
    } else {
      if (start > 3) setStart(start - 3);
      else setStart(maxIndex - 3);
    }
  };

  const addOne = () => (number < 10 ? setNumber(number + 1) : undefined);
  const removeOne = () => (number > 1 ? setNumber(number - 1) : undefined);
  // const gotoCart = () => router.push("/cart");
  // const AddToCart = async () => {
  //   dispatch(
  //     addToCart({
  //       plates: [
  //         {
  //           quantity: number,
  //           plateId: kitchenId,
  //           note: "Special instructions here.",
  //         },
  //       ],
  //       deliveryType: "user",
  //     })
  //   );
  //   if (typeof window !== undefined) {
  //     const cart = JSON.parse(window.localStorage.getItem("cartitems") || null);
  //     const item = {
  //       plateId: kitchenId,
  //       ordered: number,
  //     };
  //     if (!cart) {
  //       window.localStorage.setItem(
  //         "cartitems",
  //         JSON.stringify({ items: [item] })
  //       );
  //       setInCart(true);
  //     } else {
  //       cart.items.forEach((i) => {
  //         if (parseInt(i.plateId, 10) === parseInt(foodId, 10)) {
  //           setInCart(true);
  //         }
  //       });
  //       window.localStorage.setItem("cartitems", JSON.stringify(cart));
  //     }
  //   }
  // };

  const AddToCart = () => {
    dispatch(
			addToCart({
				plates: [{ quantity: number, kitchenId: kitchenId, note: 'Special instructions here.' }],
				deliveryType: 'user'
			})
		);

    if (typeof window !== undefined) {
			const cart = JSON.parse(window.localStorage.getItem('cartitems') || null);
			const item = {
				kitchenId: kitchenId,
        kitchenName: data.kitchen.name,
				ordered: number
			};
			if (!cart) {
				window.localStorage.setItem('cartitems', JSON.stringify({ items: [item] }));
				setInCart(true);
			} else {
				cart.items.forEach(i => {
					if ((parseInt(i.plateId, 10) === parseInt(kitchenId, 10)) && (String(i.kitchenName) === kitchenName)) {
						setInCart(true);
					}
				});
				window.localStorage.setItem('cartitems', JSON.stringify(cart));
			}
		}
  };

  const gotoCart = () => router.push('/cart');

  return (
    <div className="kitchen-info">
      {data && (
        <>
          <Row className="pt-2 pb-4 mx-auto w-3/5" align="middle">
            <Col span={24} className="flex justify-start items-center">
              <HomeFilled />
              <Text strong className="text-black ml-4">
                Rent a Kitchen {">"} {data.kitchen.name}
              </Text>
            </Col>
          </Row>

          {/* The banner. */}
          <Row
            className="w-full bg-cover bg-no-repeat bg-center"
            style={{
              backgroundImage: `url(${data.kitchen?.image_urls?.[0]})`,
              height: "40vh",
              backgroundSize: "100%",
              filter: "brightness(50%)",
            }}
            justify="center"
            align="middle"
          ></Row>
          <Row
            className="w-full"
            style={{ height: "40vh", transform: "translateY(-100%)" }}
            justify="center"
            align="middle"
          >
            <Col>
              <Text
                strong
                className="block text-white text-4xl md:text-5xl font-extrabold"
              >
                {data.kitchen?.name}
              </Text>
              <div className="flex flex-row justify-center mt-2 text-lg font-bold">
                <ClockCircleFilled className="text-white mt-1" />
                <Text className="ml-3 text-white text-center">
                  {"$ "}{data.kitchen?.price_per_time || 25} /{" "}
                  {data.kitchen?.time_type || "hr"}
                </Text>
              </div>
            </Col>
          </Row>

          <div
            className="container mx-auto justify-start"
            style={{ marginTop: "-40vh" }}
          >
            <div className="w-full md:w-4/5 xl:w-2/3 mx-auto flex flex-wrap justify-start">
              {/* User name and misc details. */}
              <div className="flex flex-wrap md:hidden mx-auto">
                {/* Styles for xs+ here. */}
                <div className="w-full flex justify-evenly">
                  <div
                    className="w-40 h-40 rounded-xl shadow-md bg-center bg-cover bg-no-repeat transform -translate-y-20"
                    style={{
                      backgroundImage: `url(${
                        data.user?.image_url || "/images/avatar.jpg"
                      })`,
                    }}
                  ></div>
                </div>
                <div className="w-11/12 mx-auto -mt-16">
                  <strong className="text-xl block w-full">
                    {data.user?.first_name} {data.user?.last_name}
                  </strong>
                  <span className="mt-2 text-base flex justify-between">
                    <span className="block">
                      <StarFilled style={{ color: "#ffd700" }} />
                      &ensp;
                      <span className="align-middle">4</span>
                    </span>
                    <span className="block">
                      <EnvironmentFilled />
                      &ensp;
                      <span className="align-middle">
                        Centreville, Virginia
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
                      data.user?.image_url || "/images/avatar.jpg"
                    })`,
                  }}
                ></div>
                <div className="ml-12 mt-8 block">
                  <strong className="text-2xl block w-full">
                    {data.user?.first_name} {data.user?.last_name}
                  </strong>
                  <span className="text-lg flex flex-wrap gap-4 justify-between">
                    <span className="block">
                      <StarFilled style={{ color: "#ffd700" }} />
                      &ensp;
                      <span className="align-middle">4</span>
                    </span>
                    <span className="block">
                      <EnvironmentFilled />
                      &ensp;
                      <span className="align-middle">
                        Centreville, Virginia
                      </span>
                    </span>
                  </span>
                </div>
              </div>

              <Divider
                style={{ backgroundColor: "#A0AEC0" }}
                className="md:mt-0"
              />

              {/* Price and cart. */}
              <div className="w-full flex flex-wrap sm:justify-evenly md:justify-start gap-6">
                <span className="w-5/12 sm:w-auto block text-2xl md:text-3xl md:py-2 font-extrabold text-center">
                  $ {data.kitchen?.price_per_time || 25}
                </span>
                <div className="w-5/12 sm:w-auto flex justify-center">
                  <span
                    className="flex rounded-xl py-2 text-lg"
                    style={{ backgroundColor: "#EDF2F7" }}
                  >
                    <button
                      className="text-black hover:text-primary focus:outline-none bg-transparent rounded-l-xl border-none px-5"
                      onClick={removeOne}
                    >
                      -
                    </button>
                    <span className="flex items-center px-5">{number}</span>
                    <button
                      className="text-black hover:text-primary focus:outline-none bg-transparent rounded-r-xl border-none px-5"
                      onClick={addOne}
                    >
                      +
                    </button>
                  </span>
                </div>
                <span className="w-full sm:w-auto flex justify-center">
                  <button
                    className="bg-primary hover:bg-red-400 text-white px-6 md:px-4 py-2 md:py-4 rounded-xl text-lg align-middle"
                    onClick={inCart ? gotoCart : AddToCart}
                  >
                    <FaCartPlus className="inline" />
                    &ensp; {inCart ? "Go to Cart" : "Add to Cart"}
                  </button>
                </span>
              </div>

              <Divider style={{ backgroundColor: "#A0AEC0" }} />

              {/* Kitchen Info. Tabs and tables. */}
              <div className="w-11/12 mx-auto">
                <Tabs defaultActiveKey="1" size="middle">
                  <TabPane tab="Description" key="1">
                    <Text className="mb-6 mt-2 block">
                      {data.kitchen?.description || "Sample description."}
                    </Text>
                    {/* Calender here. */}
                    <div
                      className="w-full mx-auto pt-2 flex align-center justify-center"
                      style={{ flexDirection: "column" }}
                    >
                      <p className="text-2xl font-semibold text-center mt-12 mb-12">
                        Want to rent the kitchen? Take a look at the calendar to check for availability.
                      </p>
                      <Calendar minDate={new Date(Date.now())} />
                    </div>
                  </TabPane>
                  <TabPane tab="Tags" key="2">
                    Tags section.
                  </TabPane>
                  <TabPane tab="Reviews" key="3">
                    {/* TODO: I could not find a base review to figure out it's structure. So, this tab is empty for now. */}
                    All the reviews are displayed here.
                  </TabPane>
                </Tabs>
              </div>

              <Divider style={{ backgroundColor: "#A0AEC0" }} />

              {/* Other Kitchens. */}

              <Row className="w-full" justify="start" align="middle">
                <Col className="my-5" xs={12}>
                  <span className="text-xl md:text-2xl font-bold">
                    Other Plates:
                  </span>
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
                className="food-grid"
                gutter={[32, 48]}
                justify="center"
                align="top"
              >
                {kitchens.length &&
                  kitchens.map((data) => (
                    <Col
                      xs={24}
                      md={12}
                      lg={8}
                      key={data.kitchen.id}
                      className="new-food-card"
                      key={data.kitchen.id}
                    >
                      <Link
                        href={`/kitchen/${encodeURIComponent(
                          data.kitchen.name
                        )}/${encodeURIComponent(data.kitchen.id)}`}
                      >
                        <a>
                          <Row
                            justify="center"
                            align="middle"
                            className="new-food-image"
                            style={{
                              backgroundImage: `url(${
                                data.kitchen.image_urls?.[0] ||
                                "/images/background.jpg"
                              })`,
                              height: "20vh",
                            }}
                          ></Row>
                          <Row className="my-5" justify="space-between">
                            <Col span={8}>
                              <Row align="middle" justify="start">
                                <StarFilled className="pr-1 text-yellow-500 text-lg" />
                                <span>4 ({data.kitchen.likes})</span>
                              </Row>
                            </Col>
                            <Col span={8}>
                              <Row align="middle" justify="center">
                                $ {data.kitchen?.price_per_time || 25} /{" "}
                                {data.kitchen?.time_type || "hour"}
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
                            <span className="label">
                              {data.kitchen?.name || "Kitchen Name"}
                            </span>
                          </Row>
                        </a>
                      </Link>
                    </Col>
                  ))}
              </Row>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default KitchenDetails;
