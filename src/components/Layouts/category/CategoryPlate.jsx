import {
  ClockCircleFilled,
  HomeFilled,
  MenuOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Button, Col, Row, Tabs, Typography } from "antd";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaTruckMoving } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { VscLoading } from "react-icons/vsc";

const { Text } = Typography;
const { TabPane } = Tabs;

const PlateCol = ({
  img_url,
  name,
  delivery_time,
  delivery_type,
  rating,
  sell_count,
}) => {
  return (
    <>
      <div className="category-card">
        <p
          className="text-white rounded-md text-center bg-repeat-round py-20"
          style={{
            backgroundImage: `url(${img_url})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "33vh",
            filter: "brightness(70%)",
          }}
        ></p>
        <div className="px-2">
          <h2 className="text-xl mt-4 mb-1 text-black">{name}</h2>
          <span className="flex font-poppins font-normal flex-row justify-between">
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
      </div>
    </>
  );
};

const CateGoryPlateComponent = ({ category, plates: data = [] }) => {
  const [plates, setPlates] = useState(data);
  const [page, setPage] = useState(1);

  useEffect(async () => {
    if (page === 1) return undefined;
    const res = await fetch(
      `https://mycheffy.herokuapp.com/plate/category/${category.id}?page=${page}`
    ).then((r) => r.json());
    setPlates([...plates, ...res.data]);
  }, [page]);

  return (
    <>
      <Head>
        {category ? (
          <title>Category - {category["name"]}</title>
        ) : (
          <title>Loading.. </title>
        )}
      </Head>
      {plates.length > 0 ? (
        <>
          <Row className="pt-2 pb-4 mx-auto w-3/5" align="middle">
            <Col span={24} className="flex justify-start items-center">
              <HomeFilled />
              <Text strong className="text-black  ml-4">
                Categories
              </Text>
            </Col>
          </Row>
          <Row
            className="w-full bg-fixed bg-cover bg-no-repeat bg-center"
            style={{
              backgroundImage: `url(${category["url"]})`,
              height: "40vh",
              backgroundSize: "cover",
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
            <Col className="block text-white">
              <Text
                level={1}
                strong
                className="block font-poppins text-center text-white text-4xl"
              >
                {category["name"]}
              </Text>
              <Typography.Paragraph className="px-3 sm:px-8 pt-2 font-poppins text-center text-sm mt-2 max-w-7xl text-white">
                {category["description"]}
              </Typography.Paragraph>
            </Col>
          </Row>

          <div
            className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12"
            style={{ marginTop: "-40vh" }}
          >
            <hr />
            <Tabs
              defaultActiveKey={"relevance"}
              className="font-bold"
              size="large"
              direction="rtl"
              moreIcon={<MenuOutlined />}
            >
              <TabPane key="filters" tab="Filters">
                <div className="kitchen-item">
                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4"
                    dir="ltr"
                  >
                    {plates &&
                      plates
                        .slice(0)
                        .sort((a, b) => b.rating - a.rating)
                        .map((item, index) => {
                          return (
                            <div key={index} className="cursor-pointer">
                              <Link
                                href={`/food-detail/${encodeURIComponent(
                                  item["id"]
                                )}`}
                              >
                                <a>
                                  <PlateCol
                                    sell_count={item["sell_count"]}
                                    delivery_time={item["delivery_time"]}
                                    delivery_type={item["delivery_type"]}
                                    rating={item["rating"]}
                                    name={item["name"]}
                                    img_url={
                                      item["PlateImages"][0]?.url ||
                                      "/images/food-list.png"
                                    }
                                  />
                                </a>
                              </Link>
                            </div>
                          );
                        })}
                  </div>
                </div>
                <div
                  dir="ltr"
                  className="flex items-center justify-center pt-10 load-more"
                >
                  <Button
                    type="primary"
                    className="flex items-center py-8 px-10 text-lg rounded-xl"
                    size="large"
                    onClick={() => setPage(page + 1)}
                  >
                    Load More <IoMdArrowDropdown className="text-3xl" />
                  </Button>
                </div>
              </TabPane>
              <TabPane key="ratings" tab="Rating">
                <div className="kitchen-item">
                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4"
                    dir="ltr"
                  >
                    {plates &&
                      plates
                        .slice(0)
                        .sort((a, b) => b.rating - a.rating)
                        .map((item, index) => {
                          return (
                            <div key={index} className="cursor-pointer">
                              <Link
                                href={`/food-detail/${encodeURIComponent(
                                  item["id"]
                                )}`}
                              >
                                <a>
                                  <PlateCol
                                    sell_count={item["sell_count"]}
                                    delivery_time={item["delivery_time"]}
                                    delivery_type={item["delivery_type"]}
                                    rating={item["rating"]}
                                    name={item["name"]}
                                    img_url={
                                      item["PlateImages"][0]?.url ||
                                      "/images/food-list.png"
                                    }
                                  />
                                </a>
                              </Link>
                            </div>
                          );
                        })}
                  </div>
                </div>
                <div
                  dir="ltr"
                  className="flex items-center justify-center pt-10 load-more"
                >
                  <Button
                    type="primary"
                    className="flex items-center py-8 px-10 text-lg rounded-xl"
                    size="large"
                    onClick={() => setPage(page + 1)}
                  >
                    Load More <IoMdArrowDropdown className="text-3xl" />
                  </Button>
                </div>
              </TabPane>
              <TabPane key="relevance" tab="Relevance">
                <div className="kitchen-item ">
                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4"
                    dir="ltr"
                  >
                    {plates &&
                      plates.map((item, index) => {
                        return (
                          <div key={index} className="cursor-pointer">
                            <Link
                              href={`/food-detail/${encodeURIComponent(
                                item["id"]
                              )}`}
                            >
                              <a>
                                <PlateCol
                                  sell_count={item["sell_count"]}
                                  delivery_time={item["delivery_time"]}
                                  delivery_type={item["delivery_type"]}
                                  rating={item["rating"]}
                                  name={item["name"]}
                                  img_url={
                                    item["PlateImages"][0]?.url ||
                                    "/images/food-list.png"
                                  }
                                />
                              </a>
                            </Link>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div
                  dir="ltr"
                  className="flex items-center justify-center pt-10 load-more"
                >
                  <Button
                    type="primary"
                    className="flex items-center py-8 px-10 text-lg rounded-xl"
                    size="large"
                    onClick={() => setPage(page + 1)}
                  >
                    Load More <IoMdArrowDropdown className="text-3xl" />
                  </Button>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </>
      ) : (
        <>
          <p className="mt-20 font-poppins flex items-center justify-center flex-col text-3xl py-32">
            <VscLoading className="animate-spin text-5xl mb-5" /> Loading...
          </p>
        </>
      )}
    </>
  );
};

export default CateGoryPlateComponent;
