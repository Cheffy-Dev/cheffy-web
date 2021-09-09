import React from "react";
import FoodHeader from "../Header/HomeHeader";
import FoodFooter from "./FoodFooter";

class FoodLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <>
        <FoodHeader />
        <div>{children}</div>
        <FoodFooter />
      </>
    );
  }
}

export default FoodLayout;
