import {
  ClockCircleFilled,
  HomeFilled,
  MenuOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Button, Col, Row, Skeleton, Tabs, Typography } from "antd";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaTruckMoving } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { VscLoading } from "react-icons/vsc";
import axiosClient from "../../../utils/axios-config";

const { Text } = Typography;
const { TabPane } = Tabs;
// {name,rating,count,price,price_type,imgURL}
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
      <div className="flex flex-col w-full">
        <p
          className="text-white rounded-md text-center bg-cover py-20"
          style={{
            backgroundImage: `url(${img_url})`,
            // backgroundSize: '100%',
            height: "33vh",
            filter: "brightness(70%)",
          }}
        ></p>
        {/* <Image src={img_url} layout="fill" alt={name}/> */}
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
    </>
  );
};

const CateGoryPlateComponent = ({ categoryID }) => {
  const [plates, setPlates] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // First get req should feth 0+1 page
  const [loading, setLoading] = useState(false);

  async function getNewOnCheffy() {
    setLoading(true);
    try {
      const params = { page: currentPage + 1, pageSize: 9 };
      const url = `/plate/new?city=Centreville`;
      const res = await axiosClient.get(url, { params });

      setCurrentPage(currentPage + 1);
      const newData = [...plates, ...res.data];
      setPlates(newData);
      // Show more button needs to be implemented properly & that requires some API correction
    } catch (errors) {
      console.log(errors);
    }
    setLoading(false);
  }

  useEffect(async () => {
    getNewOnCheffy();
  }, []);

  const showCategory = (kId) => {
    console.log(kId);
    router.push(`/category/${kId}/plates`);
  };

  return (
    <>
      <Head>
        <title>New On Cheffy</title>
      </Head>
      {plates.length > 0 ? (
        <>
          <Row
            className="mt-10 pt-6 lg:pt-2 pb-4 mx-auto max-w-7xl px-5 md:px-9"
            align="middle"
          >
            <Col span={24} className="flex justify-start items-center">
              <HomeFilled />
              <Text strong className="text-black  ml-4">
                New On Cheffy
              </Text>
            </Col>
          </Row>
          <Row
            className="w-full bg-fixed bg-cover bg-no-repeat bg-center relative"
            style={{
              backgroundImage:
                "url(https://res.cloudinary.com/dexrrnlvq/image/upload/v1602088631/category_image/1602088629893-0f0a062c-Healthy.jpg.jpg)",
              height: "40vh",
              filter: "brightness(50%)",
            }}
            justify="center"
            align="middle"
          ></Row>
          <Row
            className="absolute w-full"
            style={{ height: "40vh", transform: "translateY(-100%)" }}
            justify="center"
            align="middle"
          >
            <Col className="block text-white">
              <Text
                level={1}
                strong
                className="block font-poppins text-center text-white text-4xl sm:text-5xl"
              >
                New On Cheffy
                {/* {category["name"]} */}
              </Text>
              <Typography.Paragraph className="px-32 pt-2 font-poppins text-center text-white">
                {/* {category["description"]} */}
              </Typography.Paragraph>
            </Col>
          </Row>

          <div className="py-20 max-w-7xl px-5 md:px-9 mx-auto">
            <Tabs
              defaultActiveKey={"relavance"}
              className="font-bold"
              size="large"
              direction="rtl"
              moreIcon={<MenuOutlined />}
            >
              <TabPane key="filters" tab="Filters">
                <div className="kitchen-item ">
                  <div
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-y-12 lg:gap-x-8"
                    dir="ltr"
                  >
                    {plates &&
                      plates.map((item, index) => {
                        // {console.log(item["PlateImages"][0])}
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
                                  img_url={item["PlateImages"][0]?.url}
                                />
                              </a>
                            </Link>
                          </div>
                        );
                      })}
                    {loading &&
                      [1, 2, 3, 4, 5, 6].map((skeleton) => (
                        <>
                          <div className="flex flex-col gap-2">
                            <Skeleton.Avatar
                              shape="square"
                              className="w-full"
                              style={{ height: "33vh", width: "100%" }}
                            />
                            <Skeleton.Avatar
                              shape="square"
                              className="w-full"
                              style={{ height: "1.5rem", width: "70%" }}
                            />
                            <Skeleton.Avatar
                              shape="square"
                              className="w-full"
                              style={{ height: "1.5rem", width: "40%" }}
                            />
                          </div>
                        </>
                      ))}
                  </div>
                </div>
                <div
                  dir="ltr"
                  className="flex items-center justify-center pt-10 load-more"
                >
                  <Button
                    onClick={getNewOnCheffy}
                    className="text-white flex items-center bg-red-500 py-8 px-10 text-lg"
                  >
                    Load more
                    <IoMdArrowDropdown className="text-3xl" />
                  </Button>
                </div>
              </TabPane>
              <TabPane key="ratings" tab="Rating">
                <div className="kitchen-item ">
                  <div
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-y-12 lg:gap-x-8"
                    dir="ltr"
                  >
                    {plates &&
                      plates
                        .slice(0)
                        .sort((a, b) => b.rating - a.rating)
                        .map((item, index) => {
                          // {console.log(item["PlateImages"][0])}
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
                                    img_url={item["PlateImages"][0]?.url}
                                  />
                                </a>
                              </Link>
                            </div>
                          );
                        })}
                    {loading &&
                      [1, 2, 3, 4, 5, 6].map((skeleton) => (
                        <>
                          <div className="flex flex-col gap-2">
                            <Skeleton.Avatar
                              shape="square"
                              className="w-full"
                              style={{ height: "33vh", width: "100%" }}
                            />
                            <Skeleton.Avatar
                              shape="square"
                              className="w-full"
                              style={{ height: "1.5rem", width: "70%" }}
                            />
                            <Skeleton.Avatar
                              shape="square"
                              className="w-full"
                              style={{ height: "1.5rem", width: "40%" }}
                            />
                          </div>
                        </>
                      ))}
                  </div>
                </div>
                <div
                  dir="ltr"
                  className="flex items-center justify-center pt-10 load-more"
                >
                  <Button
                    onClick={getNewOnCheffy}
                    className="text-white flex items-center bg-red-500 py-8 px-10 text-lg"
                  >
                    Load more
                    <IoMdArrowDropdown className="text-3xl" />
                  </Button>
                </div>
              </TabPane>
              <TabPane key="relavance" tab="Relavance">
                <div className="kitchen-item ">
                  <div
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-y-12 lg:gap-x-8"
                    dir="ltr"
                  >
                    {plates &&
                      plates.map((item, index) => {
                        // {console.log(item["PlateImages"][0])}
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
                                  img_url={item["PlateImages"][0]?.url}
                                />
                              </a>
                            </Link>
                          </div>
                        );
                      })}
                    {loading &&
                      [1, 2, 3, 4, 5, 6].map((skeleton) => (
                        <>
                          <div className="flex flex-col gap-2">
                            <Skeleton.Avatar
                              shape="square"
                              className="w-full"
                              style={{ height: "33vh", width: "100%" }}
                            />
                            <Skeleton.Avatar
                              shape="square"
                              className="w-full"
                              style={{ height: "1.5rem", width: "70%" }}
                            />
                            <Skeleton.Avatar
                              shape="square"
                              className="w-full"
                              style={{ height: "1.5rem", width: "40%" }}
                            />
                          </div>
                        </>
                      ))}
                  </div>
                </div>
                <div
                  dir="ltr"
                  className="flex items-center justify-center pt-10 load-more"
                >
                  <Button
                    onClick={getNewOnCheffy}
                    className="text-white flex items-center bg-red-500 py-8 px-10 text-lg"
                  >
                    Load more
                    <IoMdArrowDropdown className="text-3xl" />
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
