import React from "react";
import Head from "next/head";
import { MenuOutlined } from "@ant-design/icons";
import { Tabs, Form, Checkbox, Switch, Row, Col } from "antd";

import KitchenList from "./KitchenList";
import KitchenItem, { KitchenItemSkeleton } from "./KitchenItem";
import KitchenLoadMore from "./KitchenLoadMore";
import BannerHero from "../../BannerHero";

const { TabPane } = Tabs;

const KitchenContent = ({ kitchens = [] }) => {
  const ratingsKitchens = kitchens.sort((a, b) => b.likes - a.likes);
  const onChange = () => {

  }

  return (
    <>
      <Head>
        <title>Rent A Kitchen</title>
      </Head>

      <BannerHero
        title="Rent a Kitchen"
        backgroundImage="/images/background.jpg"
      />

      <div className="py-20 max-w-7xl px-5 md:px-9 mx-auto">
        <hr />
        <Tabs
          defaultActiveKey="relevance"
          className="font-bold"
          size="large"
          direction="rtl"
          moreIcon={<MenuOutlined />}
        >
          <TabPane key="filters" tab="Filters">
            <Row>
              <Col>
                <p>Price</p>
                <p>Lowest to highest price</p>
                <Switch defaultChecked onChange={onChange} />
              </Col>
            </Row>
            <KitchenList>
              {kitchens.length === 0 ? (
                <KitchenItemSkeleton />
              ) : (
                kitchens
                  .slice(0)
                  .sort((a, b) => a?.price_per_time - b?.price_per_time)
                  .map((item) => (
                    <KitchenItem
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      imgURL={item.image_urls[0] || "/images/background.jpg"}
                      rating={"4.3"}
                      count={item.likes}
                      price={item.price_per_time}
                      price_type={item.time_type}
                    />
                  ))
              )}
            </KitchenList>
            {kitchens.length && <KitchenLoadMore />}
          </TabPane>

          <TabPane key="ratings" tab="Ratings">
            <KitchenList>
              {ratingsKitchens.length === 0 ? (
                <KitchenItemSkeleton />
              ) : (
                ratingsKitchens.map((item) => (
                  <KitchenItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    imgURL={item.image_urls[0] || "/images/background.jpg"}
                    rating={"4.3"}
                    count={item.likes}
                    price={item.price_per_time}
                    price_type={item.time_type}
                  />
                ))
              )}
            </KitchenList>
            {ratingsKitchens.length && <KitchenLoadMore />}
          </TabPane>

          <TabPane key="relevance" tab="Relevance">
            <KitchenList>
              {kitchens.length === 0 ? (
                <KitchenItemSkeleton />
              ) : (
                kitchens.map((item) => (
                  <KitchenItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    imgURL={item.image_urls[0] || "/images/background.jpg"}
                    rating={"4.3"}
                    count={item.likes}
                    price={item.price_per_time}
                    price_type={item.time_type}
                  />
                ))
              )}
            </KitchenList>
            {kitchens.length && <KitchenLoadMore />}
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default KitchenContent;
