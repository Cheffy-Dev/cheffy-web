import React from "react";
import { Row, Col, Select, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

class FoodBannerSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: undefined,
      data: [],
    };
  }

  searchHandler = async (query) => {
    if (!query) return;
    let response;
    try {
      response = await (
        await window.fetch(
          "https://mycheffy.herokuapp.com/user/search/" + query
        )
      ).json();
    } catch (e) {
      console.warn("fetch error while searching", e);
    }
    // Do plates for now. todo: mark if it's plate or restaurants
    const searchResults = [];
    if (response.status === 200) {
      for (const eachPlate of response.plates) {
        searchResults.push(
          <Option value={eachPlate.id}>${eachPlate.name}</Option>
        );
      }
    }
    this.setState({ data: searchResults });
  };

  render = () => {
    return (
      <Row
        gutter={24}
        align="middle"
        className="p-2 mt-12 search-row"
        justify="space-between"
      >
        <Col span={8} className="search-location text-center py-1 rounded-xl">
          <Select
            defaultValue="virginia"
            style={{ width: "100%" }}
            bordered={false}
          >
            <Option value="virginia">Virginia</Option>
            <Option value="richmond">RichMond</Option>
            <Option value="centreville">Centreville</Option>
          </Select>
        </Col>
        <Col span={16} className="flex flew-row justify-end items-center">
          <Select
            id="home-search"
            style={{ width: "100%" }}
            size="large"
            placeholder="Search, restaurant or a dish"
            showSearch
            value={this.state.value}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={this.searchHandler}
            onChange={(value) => this.setState({ value })}
            notFoundContent={null}
          >
            {this.state.data}
          </Select>
        </Col>
      </Row>
    );
  };
}

export default FoodBannerSearch;
