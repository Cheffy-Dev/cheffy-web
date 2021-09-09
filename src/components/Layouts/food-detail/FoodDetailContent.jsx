import {
  ClockCircleFilled,
  EnvironmentFilled,
  HomeFilled,
  StarFilled,
} from "@ant-design/icons";
import { Button, Col, Divider, Row, Table, Tabs, Typography } from "antd";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaCartPlus, FaTruck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/actions/cart/cartAction";

const { Text } = Typography;
const { TabPane } = Tabs;

// TODO: Increase - Decrease cart implementation. I could not get them to work.
const FoodDetailContent = ({ foodId, data, platesRelated }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [number, setNumber] = useState(1);
  const [inCart, setInCart] = useState(false);
  const [isXs, setXs] = useState(false);
  const [isMd, setMd] = useState(false);
  const [isLg, setLg] = useState(false);
  const [start, setStart] = useState(0);
  const [food, setFood] = useState([]);
  const [all, setAll] = useState(false);
  const [sort, setSort] = useState(1);

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
    const getPlates = () => {
      if (sort === 1) {
        return platesRelated;
      }
      if (sort === 2) {
        return platesRelated
          .slice(0)
          .sort((a, _b) => (a.categoryId === data.categoryId ? -1 : 1));
      }
      if (sort === 3) {
        return platesRelated.slice(0).sort((a, b) => a.price - b.price);
      }
      return platesRelated
        .slice(0)
        .sort((a, b) => (b.rating || 0) - (a.rating || 0));
    };

    if (all) {
      setFood(getPlates());
      return undefined;
    }
    if (isXs) {
      setFood(getPlates().slice(start, start + 1));
    } else if (isMd) {
      setFood(getPlates().slice(start, start + 2));
    } else if (isLg) {
      setFood(getPlates().slice(start, start + 3));
    } else {
      setFood(getPlates().slice(start, start + 1));
    }
  }, [start, isXs, isMd, isLg, all, sort]);

  const plus = () => {
    const maxIndex = platesRelated.length - 1;
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
    const maxIndex = platesRelated.length - 1;
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

  const getPlateImg = (plate) =>
    plate?.PlateImages[0]?.url ?? "/images/food-list.png";

  const addOne = () => (number < 10 ? setNumber(number + 1) : undefined);
  const removeOne = () => (number > 1 ? setNumber(number - 1) : undefined);
  const gotoCart = () => router.push("/cart");
  const gotoHome = () => router.push("/");
  const AddToCart = async () => {
    dispatch(
      addToCart({
        plates: [
          {
            quantity: number,
            plateId: foodId,
            note: "Special instructions here.",
          },
        ],
        deliveryType: "user",
      })
    );
    if (typeof window !== undefined) {
      const cart = JSON.parse(window.localStorage.getItem("cartitems") || null);
      const item = {
        plateId: foodId,
        ordered: number,
      };
      if (!cart) {
        window.localStorage.setItem(
          "cartitems",
          JSON.stringify({ items: [item] })
        );
        setInCart(true);
      } else {
        cart.items.forEach((i) => {
          if (parseInt(i.plateId, 10) === parseInt(foodId, 10)) {
            setInCart(true);
          }
        });
        window.localStorage.setItem("cartitems", JSON.stringify(cart));
      }
    }
  };

  const columns = [
    {
      title: "Ingredients",
      dataIndex: "ingredients",
      key: "ingredients",
    },
    // {
    //   title: "Purchase Date",
    //   dataIndex: "date",
    //   key: "date",
    // },
  ];
  const dataSource = [
    {
      key: "1",
      ingredients: "1. Tomato",
      // date: "08 - 19 - 19",
    },
    {
      key: "2",
      ingredients: "2. Water",
      // date: "08 - 19 - 19",
    },
    {
      key: "3",
      ingredients: "3. Egg",
      // date: "08 - 19 - 19",
    },
  ];

  const RelatedFood = ({ plates = [] }) => (
    <>
      <Row className="w-full" justify="start" align="middle">
        <Col className="my-5" xs={12}>
          <span className="text-xl md:text-2xl font-bold">Other Plates:</span>
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
              <button className="text-xl md:text-2xl" onClick={() => minus()}>
                {"<"}
              </button>
              &emsp;
              <button className="text-xl md:text-2xl" onClick={() => plus()}>
                {">"}
              </button>
            </span>
          </span>
        </Col>
      </Row>
      <Row gutter={[32, 48]} justify="center" align="top">
        {plates.length &&
          plates.map((plate, i) => (
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
                    className="new-food-image w-full h-64 md:h-48 object-cover rounded"
                    style={{
                      backgroundImage: `url(${getPlateImg(plate)})`,
                    }}
                  >

                  </Row>
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
    </>
  );

  return (
    <>
      {data ? (
        <Head>
          <title>Order - {data.name}</title>
        </Head>
      ) : (
        <Head>
          <title>Loading...</title>
        </Head>
      )}
      {/* The page indicator. */}
      <Row className="pt-2 pb-4 mx-auto w-3/5" align="middle">
        <Col span={24} className="flex justify-start items-center">
          <HomeFilled onClick={gotoHome} />
          <Text strong className="text-black ml-4">
            {data.name}
          </Text>
        </Col>
      </Row>

      {/* The Banner */}
      <Row
        className="w-full bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${
            data?.PlateImages[0]?.url || "/images/background.jpg"
          })`,
          height: "40vh",
          backgroundSize: "cover",
          filter: "brightness(30%)",
        }}
        justify="center"
        align="middle"
      ></Row>
      <Row
        className="w-full text-white flex-col justify-center items-center"
        style={{ height: "40vh", transform: "translateY(-100%)" }}
      >
        <span className="w-full flex justify-center text-5xl font-extrabold my-2">
          {data.name}
        </span>
        <span className="w-full flex items-center justify-center text-lg font-bold my-2">
          <ClockCircleFilled /> &ensp; {data.delivery_time || 30} mins
        </span>
      </Row>

      <div
        className="container mx-auto justify-start"
        style={{ marginTop: "-40vh" }}
      >
        <div className="w-full md:w-4/5 xl:w-2/3 mx-auto flex flex-wrap justify-start">
          {/* Chef name and misc details. */}
          <div className="flex flex-wrap md:hidden mx-auto">
            {/* Style for xs+ here. */}
            <div className="w-full flex justify-evenly">
              <div
                className="w-40 h-40 rounded-xl shadow-md bg-center bg-cover bg-no-repeat transform -translate-y-20"
                style={{
                  backgroundImage: `url(${
                    data.chef.image ?? "/images/chef/chef.jpg"
                  })`,
                }}
              ></div>
            </div>
            <div className="w-11/12 mx-auto -mt-16">
              <strong className="text-xl block w-full">
                By {data.chef.name}
              </strong>
              <span className="mt-2 text-base flex justify-between">
                <span className="block">
                  <StarFilled style={{ color: "#ffd700" }} />
                  &ensp;
                  <span className="align-middle">
                    {data.rating || "Not Rated Yet!"}{" "}
                    {data.reviews.length ? `(${data.reviews.length})` : ""}
                  </span>
                </span>
                <span className="block">
                  <EnvironmentFilled />
                  &ensp;
                  <span className="align-middle">
                    {data.chef.city}, {data.chef.state}
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
                  data.chef.image ?? "/images/chef/chef.jpg"
                })`,
              }}
            ></div>
            <div className="ml-12 mt-8 block">
              <strong className="text-2xl block w-full">
                By {data.chef.name}
              </strong>
              <span className="text-lg flex flex-wrap gap-4 justify-between">
                <span className="block">
                  <StarFilled style={{ color: "#ffd700" }} />
                  &ensp;
                  <span className="align-middle">
                    {data.rating || "Not Rated Yet!"}{" "}
                    {data.reviews.length ? `(${data.reviews.length})` : ""}
                  </span>
                </span>
                <span className="block">
                  <EnvironmentFilled />
                  &ensp;
                  <span className="align-middle">
                    {data.chef.city || "Centreville"},{" "}
                    {data.chef.state || "Virginia"}
                  </span>
                </span>
                <span className="hidden lg:block">
                  <FaTruck className="inline" />
                  &ensp;
                  <span className="align-middle">Delivery</span>
                </span>
              </span>
            </div>
          </div>

          <Divider style={{ backgroundColor: "#A0AEC0" }} className="md:mt-0" />
          {/* Price and cart. */}
          <div className="w-full flex flex-wrap sm:justify-evenly md:justify-start gap-6">
            <span className="w-5/12 sm:w-auto block text-2xl md:text-3xl md:py-2 font-extrabold text-center">
              $ {data.price}
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
          {/* Tabs */}
          <div className="w-full mx-auto">
            <Tabs defaultActiveKey="1" size="middle">
              <TabPane tab="The Plate" key="1">
                <Text className="mb-6 mt-2 block">{data.description}</Text>
                {data.Ingredients && (
                  <Table
                    pagination={false}
                    columns={columns}
                    dataSource={
                      data.Ingredients.length > 0 ? data.Ingredients : dataSource
                    }
                  />
                )}
              </TabPane>
              <TabPane tab="Kitchen" key="2">
                {/* TODO: Kitchen name not there in the data sent from the api. */}
                It is delivered by xyz kitchen.
              </TabPane>
              <TabPane tab="Reviews" key="3">
                {/* TODO: I could not find a base review to figure out it's structure. So, this tab is empty for now. */}
                All the reviews are displayed here.
              </TabPane>
            </Tabs>
          </div>

          {/* Other plates. */}
          <div className="w-full mx-auto">
            <Tabs
              defaultActiveKey="1"
              size="middle"
              id="related-tabs"
              onChange={(key) => setSort(parseInt(key, 10))}
            >
              <TabPane tab="Related Plates" key="1">
                {/* Food, unsorted. */}
                <RelatedFood plates={food} />
              </TabPane>
              <TabPane tab="Dietry" key="2">
                {/* Check to get Dietry like cold drinks, milkshake etc if available from same restaurants */}
                <RelatedFood plates={food} />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodDetailContent;
