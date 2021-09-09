import React, { useEffect, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import Link from "next/link";
import axiosClient from "../../../utils/axios-config";

const StarIcon = () => {
  return <img className="mr-2 w-4 h-4" src="/images/star.png" alt="rating" />;
};
const ClockIcon = () => {
  return <img className="mr-2 w-4 h-4" src="/images/clock.png" alt="time" />;
};

const RentKitchen = () => {
  const [rentKitchen, setrentKitchen] = useState("");
  const [dataLength, setDataLength] = useState("");

  var [startLimit, setStartLimit] = useState(0);
  var [endLimit, setEndLimit] = useState(4);

  const get_next_data = () => {
    if (endLimit < dataLength) {
      setStartLimit((startLimit += 4));
      setEndLimit((endLimit += 4));
    }
  };

  const get_prev_data = () => {
    if (startLimit > 0) {
      setStartLimit((startLimit -= 4));
      setEndLimit((endLimit -= 4));
    }
  };

  useEffect(async () => {
    const url = "https://cheffyus-api.herokuapp.com/kitchens/";
    try {
      const res = await axiosClient(url);
      setrentKitchen(res);
      setDataLength(res.length);
    } catch (e) {
      console.log(e);
    }
  }, []);

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
            Rent a Kitchen
          </label>

          <div>
            <a className="food-grid-link" href="/">
              View all{" "}
            </a>

            <button className="food-grid-button">
              <LeftOutlined onClick={get_prev_data} />
            </button>

            <button className="food-grid-button">
              <RightOutlined onClick={get_next_data} />
            </button>
          </div>
        </Col>
      </Row>

      <Row className="food-grid" gutter={[32, 48]} justify="center" align="top">
        {rentKitchen &&
          rentKitchen.map((item, index) => {
            return index > startLimit - 1 && index < endLimit ? (
              <Col
                xs={24}
                sm={12}
                md={12}
                lg={8}
                xl={6}
                xxl={6}
                key={item.kitchen.id}
                className="new-food-card"
              >
                <Link
                  href={`/kitchen/${encodeURIComponent(
                    item.kitchen.name
                  )}/${encodeURIComponent(item.kitchen.id)}`}
                >
                  <a>
                    <Row
                      justify="center"
                      className="new-food-image"
                      style={{
                        backgroundImage: `url(${item.kitchen.image_urls[0]})`,
                      }}
                    ></Row>
                    <Row>
                      <label className="label2">{item.kitchen.name}</label>
                    </Row>
                    <Row className="card-bar my-5">
                      <Col xs={8} sm={9} md={8} lg={8} xl={9} xxl={8}>
                        <Row align="middle">
                          <StarIcon />
                          <label>{item.kitchen.likes}</label>
                        </Row>
                      </Col>
                      <Col xs={8} sm={9} md={8} lg={8} xl={9} xxl={8}>
                        <Row align="middle">
                          <ClockIcon />
                          <label>
                            ${item.kitchen.price_per_time} -{" "}
                            {item.kitchen.time_type}
                          </label>
                        </Row>
                      </Col>
                    </Row>
                  </a>
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

export default RentKitchen;
