import { EnvironmentOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React, { Component } from "react";

const ArrowIcon = () => {
  return <img src="/images/next-arrow.png" alt="plus" />;
};
class FoodLocationBar extends Component {
  render() {
    return (
      <div className="px-4 py-4 md:hidden">
        <Input
          value="2179 Brooklyn Street"
          prefix={<EnvironmentOutlined style={{ color: "#c92c37" }} />}
          suffix={<ArrowIcon />}
        />
      </div>
    );
  }
}

export default FoodLocationBar;
