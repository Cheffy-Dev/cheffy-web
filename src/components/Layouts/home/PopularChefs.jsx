import React from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import Link from "next/link";

const PopularChefs = () => {
  const data = [
    {
      id: 1,
      name: "john doe",
      url: "/images/fake-api/chef1.png",
    },
    {
      id: 2,
      name: "john doe",
      url: "/images/fake-api/chef2.png",
    },
    {
      id: 3,
      name: "john doe",
      url: "/images/fake-api/chef3.png",
    },
    {
      id: 11,
      name: "john doe",
      url: "/images/fake-api/chef4.png",
    },
    {
      id: 12,
      name: "john doe",
      url: "/images/fake-api/chef5.png",
    },
    {
      id: 13,
      name: "john doe",
      url: "/images/fake-api/chef6.png",
    },
    {
      id: 21,
      name: "john doe",
      url: "/images/fake-api/chef7.png",
    },
    {
      id: 22,
      name: "john doe",
      url: "/images/fake-api/chef8.png",
    },
    // {
    // 	id: 23,
    // 	name: 'john doe',
    // 	url: '/images/fake-api/chef9.png',
    // },
  ];
  return (
    <>
      <Row
        className="food-grid mt-16 mb-10"
        gutter={32}
        justify="start"
        align="middle"
      >
        <Col className="food-grid-label">
          <label className="font-extrabold text-5xl xs:text-4xl sm:text-4xl lg:text-5xl">
            Popular chefs
          </label>

          <div>
            <a className="food-grid-link" href="/">
              View all{" "}
            </a>

            <button className="food-grid-button">
              <LeftOutlined />
            </button>

            <button className="food-grid-button">
              <RightOutlined />
            </button>
          </div>
        </Col>
      </Row>

      <Row className="chef-grid" align="top">
        {data &&
          data.map((chef, index) => {
            return index < 9 ? (
              <Col
                xs={24}
                sm={12}
                md={12}
                lg={8}
                xl={6}
                xxl={6}
                key={chef.id}
                className="new-chef-card"
              >
                <Link href="/">
                  <Row
                    justify="center"
                    className="new-chef-image"
                    style={{ backgroundImage: `url(${chef.url})` }}
                  ></Row>
                </Link>
              </Col>
            ) : (
              ""
            );
          })}
      </Row>
    </>
  );
};

export default PopularChefs;
