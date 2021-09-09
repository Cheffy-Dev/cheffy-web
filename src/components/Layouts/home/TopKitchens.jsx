import { ClockCircleFilled, StarFilled } from "@ant-design/icons";
import { Col, Row } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";

// It's now Rent A Kitchen.
const TopKitchens = ({ kitchens = [], className, isXs, isMd, isLg }) => {
  const [start, setStart] = useState(0);
  const [kits, setKits] = useState([]);

  useEffect(() => {
    if (isXs) {
      setKits(kitchens.slice(start, start + 1));
    } else if (isMd) {
      setKits(kitchens.slice(start, start + 2));
    } else if (isLg) {
      setKits(kitchens.slice(start, start + 3));
    } else {
      setKits(kitchens.slice(start, start + 1));
    }
  }, [start, isXs, isMd, isLg]);

  const plus = () => {
    if (isXs) {
      if (start < 8) setStart(start + 1);
      else setStart(0);
    } else if (isMd) {
      if (start < 8) setStart(start + 2);
      else setStart(0);
    } else {
      if (start === 3) setStart(5);
      else if (start < 3) setStart(start + 3);
      else setStart(0);
    }
  };

  const minus = () => {
    if (isXs) {
      if (start > 0) setStart(start - 1);
      else setStart(7);
    } else if (isMd) {
      if (start > 0) setStart(start - 2);
      else setStart(7);
    } else {
      if (start === 5) setStart(3);
      else if (start > 0) setStart(start - 3);
      else setStart(5);
    }
  };

  return (
    <div className={className}>
      <Row
        className="food-grid mt-16 mb-4 md:mb-10"
        gutter={32}
        justify="start"
        align="middle"
      >
        <Col className="my-5" xs={15} md={16}>
          <span className="font-extrabold text-2xl sm:text-4xl md:text-4xl lg:text-5xl">
            Rent A Kitchen
          </span>
        </Col>
        <Col className="justify-end" xs={9} md={8}>
          <span className="flex items-center md:items-baseline justify-end">
            <Link href="/kitchen">
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
      <Row className="food-grid" justify="center" gutter={32} align="middle">
        {kits.length &&
          kits.map((kitchen) => (
            <Col
              xs={24}
              md={12}
              lg={8}
              key={kitchen.id}
              className="new-food-card"
            >
              <Link
                href={`/kitchen/${encodeURIComponent(
                  kitchen.name
                )}/${encodeURIComponent(kitchen.id)}`}
              >
                <a>
                  <Row
                    justify="center"
                    className="new-food-image"
                    style={{
                      backgroundImage: `url(${
                        kitchen.image_urls?.[0] || "/images/background.jpg"
                      })`,
                      height: "20vh",
                    }}
                  ></Row>
                  <Row className="my-5" justify="space-between">
                    <Col span={12}>
                      <Row align="middle" justify="start">
                        <StarFilled className="pr-1 text-yellow-500 text-lg" />
                        <span>
                          {kitchen.rating || 4} ({kitchen.likes})
                        </span>
                      </Row>
                    </Col>
                    <Col span={12}>
                      <Row align="middle" justify="end">
                        <ClockCircleFilled className="pr-1 text-lg" />
                        <span>
                          $ {kitchen.price_per_time || 30} / {kitchen.time_type}
                        </span>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <span className="label">{kitchen.name}</span>
                  </Row>
                </a>
              </Link>
            </Col>
          ))}
      </Row>
    </div>
  );
};
export default TopKitchens;
