import {
  CarFilled,
  ClockCircleFilled,
  HomeFilled,
  MenuOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Button, Form, Checkbox, Radio, Col, Row, Tabs, Typography, Switch } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const { TabPane } = Tabs;

const KitchenCol = ({ name, rating, count, price, price_type, imgURL }) => {
  return (
    <>
      <div className="kitchen-card pb-4">
        <img src={imgURL} className="w-100 h-48 img-fluid" />
        <div className="flex-wrap">
          <p className="pt-4 font-bold text-2xl text-center">{name}</p>
          <p className="flex flex-wrap justify-evenly items-center text-base pt-2">
            <span className="flex items-center">
              <StarFilled className="text-yellow-500" />
              &nbsp;
              {rating} ({count})
            </span>
            <span className="flex items-center">
              <ClockCircleFilled />
              &nbsp;${price}/{price_type}
            </span>
            <span className="flex items-center">
              <CarFilled />
              &nbsp; Delivery
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

const KitchenContent = ({ kitchens }) => {
  const { Text } = Typography;
  const router = useRouter();

  const showKitchen = (kName, kId) => {
    console.log(kId);
    router.push(`/kitchen/${kName}/${kId}`);
  };

  return (
    <>
      <Row className="pt-2 pb-4 mx-auto w-3/5" align="middle">
        <Col span={24} className="flex justify-start items-center">
          <HomeFilled />
          <Text strong className="text-black ml-4">
            Thanksgiving Dinner
          </Text>
        </Col>
      </Row>
      <div
        className="w-full bg-fixed bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(/images/background.jpg)`,
          height: "40vh",
          filter: "brightness(50%)",
        }}
      ></div>

      <Row
        className="w-full"
        style={{ height: "40vh", transform: "translateY(-100%)" }}
        justify="center"
        align="middle"
      >
        <Col className="text-center">
          <Row justify="center" align="middle">
            <Col>
              {" "}
              <Text strong className="block text-white text-4xl md:text-5xl">
                Thanksgiving Dinner
              </Text>
            </Col>
            <Col className="py-4 px-5">
              {" "}
              <Text strong className="block text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Text>
            </Col>
          </Row>
        </Col>
      </Row>

      <div
        className="py-20 w-4/5 md:w-3/5 mx-auto"
        style={{ marginTop: "-40vh" }}
      >
        <hr />
        <Tabs
          defaultActiveKey={"relevance"}
          className="font-bold justify-end"
          id="tab-bar"
          size="large"
          moreIcon={<MenuOutlined />}
        >
          <TabPane key="relevance" tab="Relevance">
            <div className="kitchen-item ">
              <Row gutter={[16, 16]} className="flex justify-evenly pt-4">
                {kitchens &&
                  kitchens.map((item, i) => {
                    return (
                      <Col
                        onClick={() =>
                          showKitchen(item?.kitchen?.name, item?.kitchen?.id)
                        }
                        className="cursor-pointer"
                        span={8}
                        xs={24}
                        sm={16}
                        md={12}
                        xl={10}
                        xxl={8}
                        key={`${i}`}
                      >
                        <KitchenCol
                          name={item?.kitchen?.name}
                          imgURL={item?.kitchen?.image_urls?.[0]}
                          rating={"4.3"}
                          count={item?.kitchen?.likes}
                          price={item?.kitchen?.price_per_time}
                          price_type={item?.kitchen?.time_type}
                        />
                      </Col>
                    );
                  })}
              </Row>
            </div>
            <div className="flex items-center justify-center mt-12 load-more">
              <Button
                type="primary"
                className="flex items-center py-8 px-10 text-lg"
                size="large"
              >
                Load More <IoMdArrowDropdown className="text-3xl" />
              </Button>
            </div>
          </TabPane>
          <TabPane key="costForTwo" tab="Cost for Two">
            <div className="kitchen-item ">
              <Row gutter={[16, 16]} className="flex justify-evenly pt-4">
                {kitchens &&
                  kitchens
                    .slice(0)
                    .sort(
                      (a, b) =>
                        a.kitchen?.price_per_time - b.kitchen?.price_per_time
                    )
                    .map((item, i) => {
                      return (
                        <Col
                          onClick={() =>
                            showKitchen(item?.kitchen?.name, item?.kitchen?.id)
                          }
                          className="cursor-pointer"
                          span={8}
                          xs={24}
                          sm={16}
                          md={12}
                          xl={10}
                          xxl={8}
                          key={`${i}`}
                        >
                          <KitchenCol
                            name={item?.kitchen?.name}
                            imgURL={item?.kitchen?.image_urls?.[0]}
                            rating={"4.3"}
                            count={item?.kitchen?.likes}
                            price={item?.kitchen?.price_per_time}
                            price_type={item?.kitchen?.time_type}
                          />
                        </Col>
                      );
                    })}
              </Row>
            </div>
            <div className="flex items-center justify-center mt-12 load-more">
              <Button
                type="primary"
                className="flex items-center py-8 px-10 text-lg"
                size="large"
              >
                Load More <IoMdArrowDropdown className="text-3xl" />
              </Button>
            </div>
          </TabPane>
          <TabPane key="deliveryTime" tab="Delivery Time">
            Delivery Tab
            {/* Not Sufficient data available for sorting. */}
          </TabPane>
          <TabPane key="ratings" tab="Ratings">
            <div className="kitchen-item ">
              <Row gutter={[16, 16]} className="flex justify-evenly pt-4">
                {kitchens &&
                  kitchens
                    .slice(0)
                    .sort((a, b) => b.kitchen?.likes - a.kitchen?.likes)
                    .map((item, i) => {
                      return (
                        <Col
                          onClick={() =>
                            showKitchen(item?.kitchen?.name, item?.kitchen?.id)
                          }
                          className="cursor-pointer"
                          span={8}
                          xs={24}
                          sm={16}
                          md={12}
                          xl={10}
                          xxl={8}
                          key={`${i}`}
                        >
                          <KitchenCol
                            name={item?.kitchen?.name}
                            imgURL={item?.kitchen?.image_urls?.[0]}
                            rating={"4.3"}
                            count={item?.kitchen?.likes}
                            price={item?.kitchen?.price_per_time}
                            price_type={item?.kitchen?.time_type}
                          />
                        </Col>
                      );
                    })}
              </Row>
            </div>
            <div className="flex items-center justify-center mt-12 load-more">
              <Button
                type="primary"
                className="flex items-center py-8 px-10 text-lg"
                size="large"
              >
                Load More <IoMdArrowDropdown className="text-3xl" />
              </Button>
            </div>
          </TabPane>
          <TabPane key="filters" tab="Filters">
            <div className="kitchen-item ">
              <Row>
                <Col>
                <Form></Form>
                  <p>Price</p>
                  <p>Lowest to highest price</p>
                  <Switch defaultChecked onChange={onChange} />
                </Col>
              </Row>
              <Row gutter={[16, 16]} className="flex justify-evenly pt-4">
                {kitchens &&
                  kitchens
                    .slice(0)
                    .sort(
                      (a, b) =>
                        a.kitchen?.price_per_time - b.kitchen?.price_per_time
                    )
                    .map((item, i) => {
                      return (
                        <Col
                          onClick={() =>
                            showKitchen(item?.kitchen?.name, item?.kitchen?.id)
                          }
                          className="cursor-pointer"
                          span={8}
                          xs={24}
                          sm={16}
                          md={12}
                          xl={10}
                          xxl={8}
                          key={`${i}`}
                        >
                          <KitchenCol
                            name={item?.kitchen?.name}
                            imgURL={item?.kitchen?.image_urls?.[0]}
                            rating={"4.3"}
                            count={item?.kitchen?.likes}
                            price={item?.kitchen?.price_per_time}
                            price_type={item?.kitchen?.time_type}
                          />
                        </Col>
                      );
                    })}
              </Row>
            </div>
            <div className="flex items-center justify-center mt-12 load-more">
              <Button
                type="primary"
                className="flex items-center py-8 px-10 text-lg"
                size="large"
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

export default KitchenContent;
