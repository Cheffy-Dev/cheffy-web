import { Button, Drawer } from "antd";
import { useState } from "react";
import "../../../../../styles/input.css";
import Page1 from "./Page1";
import Page2 from "./Page2";

const Signup = ({ isMobile }) => {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState({
    page1: true,
    page2: false,
    page3: false,
    page4: false,
  });
  const moveToPage2 = () => {
    setState({
      ...state,
      page1: false,
      page2: true,
    });
  };

  const handleDrawerClose = () => {
    setState({
      page1: true,
      page2: false,
      page3: false,
      page4: false,
    });
    setVisible(false);
  };

  return (
    <>
      {isMobile ? (
        <a
          onClick={() => setVisible(true)}
          className="mx-2 mt-2 md:mt-0 px-2 py-1 text-sm rounded-md"
        >
          Signup
        </a>
      ) : (
        <Button
          className="ml-5 mr-2 rounded-xl px-7 py-5 flex items-center"
          onClick={() => setVisible(true)}
        >
          Signup
        </Button>
      )}
      <Drawer
        destroyOnClose
        placement="left"
        closable={false}
        onClose={() => handleDrawerClose()}
        visible={visible}
        width={isMobile ? "100%" : "35%"}
        drawerStyle={{
          width: "83%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        keyboard={true}
      >
        {state.page1 && (
          <Page1
            onClick={() => setVisible(false)}
            onPartnerSignUpClick={moveToPage2}
            onUserSignUpClick={moveToPage2}
          />
        )}
        {state.page2 && <Page2 onClick={() => handleDrawerClose()} />}
      </Drawer>
    </>
  );
};

export default Signup;
