import React, { useState, useEffect } from "react";
import { Col, Row, Spin } from "antd";
import Link from "next/link";
import { IoMdArrowDropdown } from "react-icons/io";
import BannerHero from "../../BannerHero";

const CitiesContent = () => {
  const [loading, setLoading] = useState(true);
  const [citiesArray, setCitiesArray] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  return (
    <Spin spinning={loading}>
      <BannerHero title="Cities, We Serve" backgroundImage="/images/Rectangle5.png" />

      <div className="h-auto mt-10">
        <div className="h-3/5 p-6 md:p-16">
          <Row
            justify="center"
            className="margin-top-50 ml-5 mr-5 align-items-center"
          >
            {citiesArray.data &&
              citiesArray.data.map((city) => {
                return (
                  <Col
                    className="margin-bottom-40 position-relative"
                    style={{ height: 240 }}
                    key={city.id}
                    md={12}
                    xs={24}
                    xl={6}
                  >
                    <div
                      className="category-border"
                      style={{
                        backgroundImage: `url(${city.url})`,
                        borderRadius: 10,
                        height: "100%",
                        filter: "brightness(50%)",
                      }}
                    ></div>
                    {/* <div className="cheffy-description div-width mt-2">
                    <div className="d-flex align-center">
                      <div className="mr-2">
                        <img src="/images/star.png" width="20px" alt="plus" />{" "}
                      </div>
                      <label>4.5 of 230</label>
                    </div>
                  </div> */}
                    <Link
                      href={`/home?city=${encodeURIComponent(
                        city["name"]
                      )}`}
                    >
                      <a
                        className="div-width text-white flex align-center justify-center category-border"
                        style={{
                          position: "absolute",
                          top: 0,
                          height: "100%",
                          borderRadius: 10,
                        }}
                      >
                        <label className="category-item-label">
                          {category.name}
                        </label>
                      </a>
                    </Link>
                    {/* <div className="cheffy-description div-width">
                    <div className="d-flex align-center">
                      <label>15-20 min . Delivery</label>
                    </div>
                  </div> */}
                  </Col>
                )
              })}
          </Row>
          <div
            dir="ltr"
            className="flex items-center justify-center pt-10 load-more"
          >
            <p className="text-white flex items-center bg-red-500 py-4 px-10 text-lg">
              <button
                // onClick={getCategories}
                type="button"
              >
                Load more
              </button>{" "}
              <IoMdArrowDropdown className="text-3xl" />
            </p>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default CitiesContent;
