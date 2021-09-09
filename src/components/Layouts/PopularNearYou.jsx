import {
  ClockCircleFilled,
  HomeFilled,
  MenuOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Button, Col, Row, Tabs, Typography } from "antd";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { FaTruckMoving } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

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

const PopularNearYou = ({ plates = [] }) => {
  const [add, setAdd] = useState(1);
  return (
    <>
      <Head>
        <title>Popular Near You</title>
      </Head>
      <Row className="pt-2 pb-4 mx-auto w-3/5" align="middle">
        <Col span={24} className="flex justify-start items-center">
          <HomeFilled />
          <Text strong className="text-black  ml-4">
            Popular Near You
          </Text>
        </Col>
      </Row>
      <Row
        className="w-full bg-fixed bg-cover bg-no-repeat bg-center"
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
            Popular Near You
          </Text>
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
            Filters Tab
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
                    .slice(0, 12 * add)
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
                onClick={() => setAdd(add + 1)}
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
                  plates.slice(0, 12 * add).map((item, index) => {
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
                onClick={() => setAdd(add + 1)}
              >
                Load More <IoMdArrowDropdown className="text-3xl" />
              </Button>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default PopularNearYou;
