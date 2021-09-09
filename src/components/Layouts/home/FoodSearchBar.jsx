import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React, { Component } from "react";

const ListIcon = () => {
  return <img src="/images/list.png" alt="plus" />;
};
const CloseIcon = () => {
  return <img src="/images/close.png" alt="plus" />;
};

class FoodSearchBar extends Component {
  render() {
    return (
      <div className="px-4 md:hidden">
        <Input
          placeholder="Find a food or Restaurant"
          prefix={<SearchOutlined style={{ color: "#c92c37" }} />}
          suffix={!this.props.selected ? <ListIcon /> : <CloseIcon />}
          value={this.props.selectedVal}
        />
      </div>
    );
  }
}

export default FoodSearchBar;
