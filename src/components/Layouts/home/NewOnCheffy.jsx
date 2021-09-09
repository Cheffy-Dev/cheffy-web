import { ClockCircleFilled, StarFilled } from "@ant-design/icons";
import { Col, Row } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaTruck } from "react-icons/fa";

const NewOnCheffy = ({ newFood = [], isXs, isMd, isLg }) => {
  const [start, setStart] = useState(0);
  const [food, setFood] = useState([]);

  useEffect(() => {
    if (isXs) {
      setFood((food) => newFood.slice(start, start + 1));
    } else if (isMd) {
      setFood((food) => newFood.slice(start, start + 2));
    } else if (isLg) {
      setFood((food) => newFood.slice(start, start + 3));
    } else {
      setFood((food) => newFood.slice(start, start + 1));
    }
  }, [start, isXs, isMd, isLg]);

  const plus = () => {
    if (isXs) {
      if (start < 19) setStart(start + 1);
      else setStart(0);
    } else if (isMd) {
      if (start < 18) setStart(start + 2);
      else setStart(0);
    } else {
      if (start === 15) setStart(17);
      else if (start < 15) setStart(start + 3);
      else setStart(0);
    }
  };

  const minus = () => {
    if (isXs) {
      if (start > 0) setStart(start - 1);
      else setStart(19);
    } else if (isMd) {
      if (start > 0) setStart(start - 2);
      else setStart(18);
    } else {
      if (start === 17) setStart(15);
      else if (start > 0) setStart(start - 3);
      else setStart(17);
    }
  };

  return (
    <>
      <Row
        className="food-grid -mt-8 mb-4 sm:mb-10"
        gutter={32}
        justify="start"
        align="middle"
      >
        <Col className="my-5" xs={15} md={16}>
          <span className="font-extrabold text-2xl md:text-4xl xs:text-4xl sm:text-4xl lg:text-5xl">
            New on Cheffy
          </span>
        </Col>
        <Col className="justify-end" xs={9} md={8}>
          <span className="flex items-center md:items-baseline justify-end">
            <Link href="/new-on-cheffy">
              <a className="font-semibold underline md:text-lg lg:text-xl">
                View all
              </a>
            </Link>
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
      <Row className="food-grid" gutter={[32, 48]} justify="center" align="top">
        {food.length &&
          food.map((plate, i) => (
            <Col
              xs={20}
              sm={16}
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
                    className="new-food-image"
                    style={{
                      backgroundImage: `url(${plate.PlateImages[0]?.url})`,
                      height: "20vh",
                    }}
                  ></Row>
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
};

export default NewOnCheffy;
