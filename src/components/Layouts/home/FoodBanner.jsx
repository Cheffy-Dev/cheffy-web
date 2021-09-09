import { Col, Row, Select, Typography } from "antd";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoFastFoodOutline } from "react-icons/io5";
import Search from "../../Search";

const FoodBanner = () => {
  const { Text } = Typography;
  const { Option } = Select;
  const handleChange = (value) => {
    console.log(value);
  };

  return (
    <Row className="top-head mb-16 w-100" align="middle" justify="center">
      <Col span={18}>
        <Row justify="center">
          <Col>
            <Text
              className="text-primary text-6xl sm:text-5xl md:text-6xl lg:text-7xl md:ml-0 ml-4 font-extrabold m-auto md:mt-0 mt-0 mb-0 block"
              style={{
                fontFamily: "Montserrat",
                fontWeight: "700",
                marginTop: "-20px",
              }}
            >
              Craving for Food?
            </Text>
            <Text
              className="text-secondary text-xl sm:text-md md:text-xl lg:text-2xl md:ml-0 ml-4  m-auto md:mt-0 mt-0 mb-0 block"
              style={{
                fontFamily: "Poppins",
                fontWeight: "400",
                marginTop: "20px",
                textAlign: "center",
                color: "#6C6C80",
              }}
            >
              Find the best restaurant for hunger satisfaction.
            </Text>
          </Col>
        </Row>
        {/*}
        <Row
          gutter={24}
          align="middle"
          className="flex w-full mb-2 p-2 md:mt-12 items-center justify-center text-xl sm:text-2xl md:text-3xl xxl:text-4xl"
          style={{ width: "75%", margin: "auto" }}
        >
          <Col
            className=" md:my-0 md:mx-3 pb-2 md:pb-5 flex items-center font-extrabold"
            xs={20}
            sm={18}
            md={16}
          >
            <Search />
          </Col>
          <Col
            className="my-3 md:my-0 mx-0 md:mx-0 md:mx-3 py-4 md:py-4 md:px-3 xxl:text-4xl border rounded-xl flex items-center home-btn"
            xs={20}
            sm={18}
            md={6}
            style={{ paddingLeft: "20px", paddingRight: "20px" }}
          >
            <IoFastFoodOutline
              style={{ fontSize: "25px", fontWeight: "700" }}
            />
            <Select
              suffixIcon={
                <IoIosArrowDown
                  style={{ fontSize: "25px", fontWeight: "900" }}
                />
              }
              bordered={false}
              className="w-full"
              placeholder="Mode"
              showSearch
              defaultValue={"Delivery"}
            >
              {["Delivery", "Pickup"].map((mode) => (
                <Option value={mode} key={mode}>
                  {mode}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
              */}
      </Col>
    </Row>
  );
};

export default FoodBanner;
