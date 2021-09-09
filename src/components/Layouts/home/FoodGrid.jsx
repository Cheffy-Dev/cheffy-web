import { Col, Row } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const FoodGrid = ({ categories = [], isXs, isMd, isLg, className }) => {
  const [start, setStart] = useState(0);
  const [cats, setCats] = useState([]);

  useEffect(() => {
    if (isXs) {
      setCats(categories.slice(start, start + 1));
    } else if (isMd) {
      setCats(categories.slice(start, start + 3));
    } else if (isLg) {
      setCats(categories.slice(start, start + 6));
    }
  }, [start, isXs, isMd, isLg]);

  const plus = () => {
    const maxIndex = categories.length - 1;
    if (isXs) {
      if (start < maxIndex - 1) setStart(start + 1);
      else setStart(0);
    } else if (isMd) {
      if (start < maxIndex - 3) setStart(start + 3);
      else setStart(0);
    } else {
      if (start < maxIndex - 6) setStart(start + 6);
      else setStart(0);
    }
  };

  const minus = () => {
    const maxIndex = categories.length - 1;
    if (isXs) {
      if (start > 0) setStart(start - 1);
      else setStart(maxIndex - 1);
    } else if (isMd) {
      if (start >= 3) setStart(start - 3);
      else setStart(maxIndex - 3);
    } else {
      if (start >= 6) setStart(start - 6);
      else setStart(maxIndex - 6);
    }
  };

  return (
    <div className={className}>
      <Row
        className="food-grid mb-4 sm:mb-10"
        gutter={32}
        justify="start"
        align="middle"
      >
        <Col className="my-5" xs={15} md={16}>
          <span className="font-extrabold text-2xl md:text-4xl xs:text-4xl sm:text-4xl lg:text-5xl">
            Categories
          </span>
        </Col>
        <Col className="justify-end" xs={9} md={8}>
          <span className="flex items-center md:items-baseline justify-end">
            <Link href="/category">
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
      <Row
        className="food-grid"
        justify="center"
        gutter={[32, 48]}
        align="middle"
      >
        {cats.length &&
          cats.map((category) => (
            <Col xs={24} md={8} lg={6} xl={4} className="gutter-row" key={category.id}>
              <Link href={`/category/${category.id}/plates`}>
                <a>
                  <div className="flex flex-wrap justify-evenly h-56">
                    <div className="w-full flex justify-evenly">
                      <img
                        className="category-icon object-cover"
                        src={category.url}
                        alt=""
                      />
                    </div>
                    <label className="category-label cursor-pointer" style={{color: '#fff'}}>
                      {category.name}
                    </label>
                  </div>
                </a>
              </Link>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default FoodGrid;
