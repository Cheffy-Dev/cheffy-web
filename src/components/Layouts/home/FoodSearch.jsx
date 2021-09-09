import { Col, Row } from "antd";
import Link from "next/link";
import React from "react";

const FoodSearch = ({ results }) => {
  const StarIcon = () => {
    return <img className="mr-2 w-4 h-4" src="/images/star.png" alt="rating" />;
  };
  const ClockIcon = () => {
    return <img className="mr-2 w-4 h-4" src="/images/clock.png" alt="time" />;
  };
  const TruckIcon = () => {
    return (
      <img
        className="mr-2"
        src="/images/truck.png"
        width="20px"
        alt="delivery"
      />
    );
  };

  return (
    <React.Fragment>
      <Row
        className="food-grid mt-16 mb-10"
        gutter={[32, 48]}
        justify="start"
        align="middle"
      >
        <Row
          className="food-grid"
          gutter={[32, 48]}
          justify="center"
          align="top"
        >
          {results &&
            results.map((data, index) => {
              return (
                <Col
                  xs={24}
                  sm={12}
                  md={12}
                  lg={8}
                  xl={6}
                  xxl={6}
                  key={data.id}
                  className="new-food-card"
                >
                  <Link href={`/food-detail/${encodeURIComponent(data.id)}`}>
                    <a>
                      <Row
                        justify="center"
                        className="new-food-image"
                        style={{
                          backgroundImage: `url(${data.PlateImages[0]?.url})`,
                        }}
                      ></Row>
                      <Row className="my-5 ml-1 mr-2">
                        <Col span={8}>
                          <Row align="middle">
                            <StarIcon />
                            <label>4.5</label>
                          </Row>
                        </Col>
                        <Col span={8}>
                          <Row align="middle">
                            <ClockIcon />
                            <label>15-20 min</label>
                          </Row>
                        </Col>
                        <Col span={8}>
                          <Row align="middle" justify="end">
                            <TruckIcon />
                            <label>Delivery</label>
                          </Row>
                        </Col>
                      </Row>
                      <Row>
                        <label className="label">{data.name}</label>
                      </Row>
                    </a>
                  </Link>
                </Col>
              );
            })}
        </Row>
      </Row>
    </React.Fragment>
  );
};

export default FoodSearch;
