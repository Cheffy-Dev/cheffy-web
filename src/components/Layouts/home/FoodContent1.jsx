import React, { Component, useState } from "react";
import { Card, Col, Row } from "antd";
import FoodLocationBar from "./FoodLocationBar";
import FoodSearchBar from "./FoodSearchBar";
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
const HeartIcon = () => {
  return <img src="/images/heart.png" alt="plus" />;
};

class FoodContent1 extends Component {
  state = { selected: false, selectedVal: "" };

  async componentDidMount() {
    const categories = await this.props.dispatch(foodCategories());
    this.setState({ data: categories.data });
  }

  render() {
    return (
      <div className="h-96 mt-24">
        <div className="h-3/5">
          <FoodLocationBar />
          <FoodSearchBar
            selected={this.state.selected}
            selectedVal={this.state.selectedVal}
          />
          {this.state && this.state.selected ? (
            <div
              className="category-card-wrapper p-4 absolute"
              style={{ width: "100%" }}
            >
              <Row gutter={4}>
                {this.state &&
                  this.state.data &&
                  this.state.data.map((item) => (
                    <Col span={24} className="py-2" key={item.id}>
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
                                maxHeight: 150,
                                boxShadow: "10px 10px 16px 2px #cacaca",
                                minHeight: 150,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                              }}
                            >
                              <div className="favourite-wrapper p-4">
                                <HeartIcon />
                              </div>
                            </div>
                          </div>
                        }
                      >
                        <div className="category-details-wrapper flex pt-4">
                          <div className="item-name flex text-lg text-back-700 ">
                            {item.name}
                          </div>
                          <div className="flex">
                            <div className="flex items-center ">
                              <div className="star-icon flex ">
                                <StarIcon />
                              </div>
                              <div className="pl-1 detail-text">4.9(200)</div>
                            </div>
                            <div className="flex items-center pl-4">
                              <div className="star-icon flex ">
                                <ClockIcon />
                              </div>
                              <div className="pl-1 detail-text">15-20 min</div>
                            </div>
                            <div className="flex items-center pl-4">
                              <div className="truck-icon flex ">
                                <TruckIcon />
                              </div>
                              <div className="pl-1 detail-text">Delivery</div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </div>
          ) : (
            <div
              className="category-card-wrapper p-4 absolute"
              style={{ width: "100%" }}
            >
              <Row gutter={(16, 16)}>
                {this.state &&
                  this.state.data &&
                  this.state.data.map((item) => (
                    <Col
                      span={12}
                      className="py-2"
                      key={item.id}
                      onClick={() =>
                        this.setState({
                          selected: true,
                          selectedVal: item.name,
                        })
                      }
                    >
                      <Card
                        bordered={false}
                        className="items-center rounded-lg text-sm "
                        align="middle"
                        cover={
                          <div className="realtive center-align text-white text-lg">
                            <div
                              style={{
                                backgroundImage: `linear-gradient(to bottom, rgb(248 248 248 / 0%), rgb(65 63 63)),url(${item.url})`,
                                borderRadius: "10px",
                                width: "100%",
                                maxHeight: 150,
                                minHeight: 150,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                              }}
                            ></div>
                            <div
                              className="absolute"
                              style={{
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                              }}
                            >
                              {item.name}
                            </div>
                          </div>
                        }
                      />
                    </Col>
                  ))}
              </Row>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default FoodContent1;
