import { Button, Drawer, Typography } from "antd";
import { useState } from "react";
import LoginPage1 from "./LoginPage1";
import LoginPage2 from "./LoginPage2";

const Login = ({ isMobile }) => {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState({
    customer: "",
    page1: true,
    page2: false,
  });

  const moveToPage2 = () => {
    setState({
      ...state,
      page1: false,
      page2: true,
    });
  };

  const goToPage1 = () => {
    setState({
      ...state,
      page1: true,
      page2: false,
    });
  };

  const onClose = () => {
    setTimeout(() => {
      setState({
        ...state,
        page1: true,
        page2: false,
      });
    }, 500);
    setVisible(false);
  };

  const { Text } = Typography;

  return (
    <>
      {isMobile ? (
        <a
          onClick={() => setVisible(true)}
          className="mx-2 mt-2 md:mt-0 px-2 py-1 text-sm rounded-md"
        >
          Login
        </a>
      ) : (
        <Button
          type="primary"
          className="ml-5 mr-2 rounded-xl px-7 py-5 flex items-center"
          onClick={() => setVisible(true)}
        >
          Login
        </Button>
      )}
      <Drawer
        destroyOnClose
        placement="left"
        closable={false}
        onClose={onClose}
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
          <LoginPage1
            onClick={() => setVisible(false)}
            onPartnerSignInClick={moveToPage2}
            onUserSignInClick={moveToPage2}
          />
        )}
        {state.page2 && (
          <LoginPage2
            onClick={onClose}
            goBack={goToPage1}
            customer={state.customer}
          />
        )}
      </Drawer>
    </>
  );
};

export default Login;
