import React, { useState } from "react";
import { Card, Col, Row } from "antd";
import { foodCategories } from "../../../redux/actions/food/categoryAction";

const StarIcon = () => {
  return <img src="/images/star.png" alt="plus" />;
};
const ClockIcon = () => {
  return <img src="/images/clock.png" alt="plus" />;
};
const TruckIcon = () => {
  return <img src="/images/truck.png" alt="plus" />;
};

const sortData = [
  { id: 0, title: "Picked for you (default)" },
  { id: 1, title: "Most Popular" },
  { id: 2, title: "Rating" },
  { id: 3, title: "Delivery time" },
];

class FoodContent2 extends React.Component {
  state = { selected: false, selectedVal: "" };

  async componentDidMount() {
    const categories = await this.props.dispatch(foodCategories());
    if (typeof window !== undefined) {
      this.setState({ data: categories.data, windowWidth: window.innerWidth });
      window.addEventListener("resize", this.handleResize);
    }
  }

  handleResize = (e) => {
    if (typeof window !== undefined)
      this.setState({ windowWidth: window.innerWidth });
  };

  componentWillUnMount() {
    if (typeof window !== undefined)
      window.addEventListener("resize", this.handleResize);
  }

  render() {
    const data = [];
    if (this.state && this.state.data)
      for (let i = 1; i < 4; i++) {
        data.push(this.state && this.state.data && this.state.data[i]);
      }

    return (
      <div className="h-96 mt-24">
        <div className="h-3/5">
          <div
            className="category-card-wrapper p-4 absolute px-16"
            style={{ width: "100%" }}
          >
            <Row gutter={40} className="p4">
              {data &&
                data.length > 0 &&
                data.map((item) => (
                  <Col
                    span={this.state.windowWidth > 778 ? 8 : 24}
                    className="py-2"
                    key={item.id}
                  >
                    <Card
                      bordered={false}
                      className="items-center rounded-lg text-sm "
                      align="middle"
                      cover={
                        <div className="relative center-align text-white text-lg">
                          <div
                            style={{
                              backgroundImage: `url(${item.url})`,
                              borderRadius: "5px",
                              width: "100%",
                              maxHeight: 270,
                              boxShadow: "10px 10px 16px 2px #cacaca",
                              minHeight: 270,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                            }}
                          ></div>
                        </div>
                      }
                    >
                      <div className="category-details-wrapper flex pt-4">
                        <div className="item-name flex text-lg text-back-700 ">
                          {item.name}
                        </div>
                        <div className="flex justify-between">
                          <div className="flex items-center ">
                            <div className="star-icon flex ">
                              <StarIcon />
                            </div>
                            <div className="pl-2 detail-text">4.9(200)</div>
                          </div>
                          <div className="flex items-center pl-4">
                            <div className="star-icon flex ">
                              <ClockIcon />
                            </div>
                            <div className="pl-2 detail-text">15-20 min</div>
                          </div>
                          <div className="flex items-center pl-4">
                            <div className="truck-icon flex ">
                              <TruckIcon />
                            </div>
                            <div className="pl-2 detail-text">Delivery</div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
            </Row>
            <Row gutter={40} className="p4 mt-16 ">
              <Col span={this.state.windowWidth > 776 ? 6 : 6} className="p-2 ">
                <div className="pt-2 mb-8 ">
                  <div className="text-3xl sort-title">Sort</div>
                  <div className="pt-6">
                    {sortData &&
                      sortData.map((item) => (
                        <label class="container-check" key={item.id}>
                          <div className="text-xl check-title">
                            {item.title}
                          </div>
                          <input type="checkbox" name="radio" />
                          <span class="checkmark" />
                        </label>
                      ))}
                  </div>
                </div>
                <div className="pt-2 mb-8">
                  <div className="text-3xl sort-title">Dietary</div>
                  <div className="flex pt-6">
                    <div className="location-wrapper">
                      <div className="sort-label">
                        <span>€ Halal</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-2 mb-8">
                  <div className="text-3xl sort-title">Price Range</div>
                  <div className="flex pt-6">
                    <div className="location-wrapper mr-2">
                      <div className="sort-label">
                        <span>$</span>
                      </div>
                    </div>
                    <div className="location-wrapper mr-2">
                      <div className="sort-label">
                        <span>$$</span>
                      </div>
                    </div>
                    <div className="location-wrapper mr-2">
                      <div className="sort-label">
                        <span>$$$</span>
                      </div>
                    </div>
                    <div className="location-wrapper mr-2">
                      <div className="sort-label">
                        <span>$$$$</span>
                      </div>
                    </div>
                    <div className="location-wrapper mr-2">
                      <div className="sort-label">
                        <span>$$$$$</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col span={18} className="py-2 bg-white">
                <Row gutter={50} className="p4">
                  {this.state &&
                    this.state.data &&
                    this.state.data.map((item) => (
                      <Col
                        span={this.state.windowWidth > 778 ? 8 : 24}
                        className="py-2"
                        key={item.id}
                      >
                        <Card
                          bordered={false}
                          className="items-center rounded-lg text-sm "
                          align="middle"
                          cover={
                            <div className="relative center-align text-white text-lg">
                              <div
                                style={{
                                  backgroundImage: `url(${item.url})`,
                                  borderRadius: "5px",
                                  width: "100%",
                                  maxHeight: 270,
                                  boxShadow: "10px 10px 16px 2px #cacaca",
                                  minHeight: 270,
                                  backgroundRepeat: "no-repeat",
                                  backgroundPosition: "center",
                                  backgroundSize: "cover",
                                }}
                              ></div>
                            </div>
                          }
                        >
                          <div className="category-details-wrapper flex pt-4">
                            <div className="item-name flex text-lg text-back-700 ">
                              {item.name}
                            </div>
                            <div className="flex justify-between">
                              <div className="flex items-center ">
                                <div className="star-icon flex ">
                                  <StarIcon />
                                </div>
                                <div className="pl-2 detail-text">4.9(200)</div>
                              </div>
                              <div className="flex items-center pl-4">
                                <div className="star-icon flex ">
                                  <ClockIcon />
                                </div>
                                <div className="pl-2 detail-text">
                                  15-20 min
                                </div>
                              </div>
                              <div className="flex items-center pl-4">
                                <div className="truck-icon flex ">
                                  <TruckIcon />
                                </div>
                                <div className="pl-2 detail-text">Delivery</div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    ))}
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default FoodContent2;
