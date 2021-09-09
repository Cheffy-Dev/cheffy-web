import React from "react";
import Header from "../Header/HomeHeader";
import MainFooter from "../Footer/MainFooter";

class MainLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <>
        <Header />
        <div>{children}</div>
        <MainFooter />
      </>
    );
  }
}

export default MainLayout;
