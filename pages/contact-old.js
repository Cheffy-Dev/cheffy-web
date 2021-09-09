import { Button, Drawer, Form, Input, Layout, Menu } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { BiMailSend, BiMenuAltRight } from "react-icons/bi";
import { BsMap, BsPhone } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const { Header, Content, Footer } = Layout;

const About = () => {
  const router = useRouter();
  const changeRoute = (routeString) => {
    router.push(routeString);
  };
  const [visible, setVisible] = useState(false);

  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <>
      <Header className="bg-white ">
        <Drawer
          visible={visible}
          onClose={() => setVisible(false)}
          placement={"left"}
          width={220}
        >
          <Menu
            mode="inline"
            selectedKeys={["3"]}
            className="border-r-0 pt-11 w-10/12"
          >
            <Menu.Item
              onClick={() => changeRoute("/")}
              key="1"
              style={{ width: "100%" }}
            >
              Home
            </Menu.Item>
            <Menu.Item onClick={() => changeRoute("/about")} key={"2"}>
              About
            </Menu.Item>
            <Menu.Item onClick={() => changeRoute("/contact")} key={"3"}>
              Contact
            </Menu.Item>
          </Menu>
        </Drawer>
        <Menu
          className="block md:hidden"
          mode="horizontal"
          overflowedIndicator={<BiMenuAltRight className="text-4xl" />}
        >
          <Menu.Item
            key="10"
            className="pl-20 text-3xl text-red-600"
            style={{ marginBottom: 10 }}
          >
            Cheffy
          </Menu.Item>
          <Menu.Item
            onClick={() => setVisible(true)}
            style={{ float: "right" }}
          >
            <BiMenuAltRight className="text-4xl mt-5 border-b-0" />
          </Menu.Item>
        </Menu>
        <Menu
          mode="horizontal"
          selectedKeys={["1"]}
          className="hidden md:block"
        >
          <Menu.Item
            key="10"
            className="pl-20 text-3xl text-red-600"
            style={{ marginBottom: 10 }}
          >
            Cheffy
          </Menu.Item>
          <Menu.Item
            onClick={() => changeRoute("/contact")}
            style={{ float: "right" }}
            key="1"
          >
            Contact
          </Menu.Item>
          <Menu.Item
            onClick={() => changeRoute("/about")}
            style={{ float: "right" }}
            key="3"
          >
            About
          </Menu.Item>
          <Menu.Item
            onClick={() => changeRoute("/")}
            style={{ float: "right" }}
            key="2"
          >
            Home
          </Menu.Item>
        </Menu>
      </Header>
      <Content className="pb-20">
        <div className="text-center px-10 md:px-32 text-5xl py-24 font-semibold text-gray-700">
          Contact US
          <p className="text-xl mt-2 italic">"Team Cheffy"</p>
        </div>
        <div className="flex md:flex-row justify-between items-center flex-col px-10 md:px-32">
          <div className="w-10/12 md:w-5/12 md:mr-8 text-gray-600">
            <section className="flex flex-col justify-start items-center">
              <p className="text-4xl pb-6  text-red-600">
                <BsPhone />
              </p>
              <p className="text-2xl whitespace-nowrap font-semibold">
                (+1) 703 909 3859 (USA)
              </p>
              <p className="text-4xl pt-8 text-red-600">
                <BsMap />
              </p>
              <p className="text-2xl text-center font-semibold pt-4">
                8133 Leesburg Pike Old Courthouse <br />
                Providence, VA <br />
                Oluha Group
              </p>
            </section>
          </div>
          <div className="w-11/12 md:w-5/12 flex justify-center items-center pt-10">
            <iframe
              className="w-full h-96"
              src="https://api.mapbox.com/styles/v1/mapbox/streets-v11.html?zoomwheel=false&access_token=pk.eyJ1IjoiYjRzMzZ0NCIsImEiOiJja2phYmVwbzgyNmhtMndudmRpa3kxZ2tuIn0.MMztBFmZ1exNw1gVufnrwQ#15/37.771/-122.436"
            ></iframe>
          </div>
        </div>
        <div className="flex items-center mt-10 justify-center">
          <Form
            layout={"vertical"}
            className="w-10/12"
            onFinish={onFinish}
            size="large"
          >
            <div className="flex flex-wrap -mx-px overflow-hidden sm:-mx-px xl:-mx-2">
              <div className="my-px px-px md:w-1/2 w-full overflow-hidden sm:my-px sm:px-px xl:my-2 xl:px-2">
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Enter Name",
                    },
                  ]}
                  validateTrigger={["onChange", "onBlur"]}
                >
                  <Input size="large" placeholder="Enter Name" />
                </Form.Item>
              </div>
              <div className="my-px px-px md:w-1/2 w-full overflow-hidden sm:my-px sm:px-px xl:my-2 xl:px-2">
                <Form.Item
                  className="hover:border-red-500"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Enter Email",
                    },
                    {
                      type: "email",
                      message: "Please enter email",
                    },
                  ]}
                  validateTrigger={["onChange", "onBlur"]}
                >
                  <Input placeholder="Enter Email Address" size="large" />
                </Form.Item>
              </div>
              <div className="w-full xl:px-2">
                <Form.Item
                  name="subject"
                  rules={[{ required: true, message: "Enter Subject" }]}
                  validateTrigger={["onChange", "onBlur"]}
                >
                  <Input placeholder="Subject" size="large" />
                </Form.Item>
              </div>
              <div className="w-full xl:px-2">
                <Form.Item
                  name="message"
                  rules={[{ required: true, message: "Enter Message" }]}
                  validateTrigger={["onChange", "onBlur"]}
                >
                  <Input.TextArea rows={3} placeholder="Message" size="large" />
                </Form.Item>
              </div>
              <Form.Item className="xl:px-2">
                <Button
                  size="large"
                  type="primary"
                  className="h-12 w-52 font-semibold"
                  htmlType="submit"
                >
                  Send <p className="inline-block pl-1 text-xl">&#8594;</p>
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </Content>
      <Footer className="w-full">
        {/* TODO: Fix Facebook and Email links. */}
        <div className="flex justify-center items-center">
          <div className="mr-6 cursor-pointer text-3xl">
            <a target="_blank" href="https://www.instagram.com/cheffy.group/">
              <FaInstagram />
            </a>
          </div>
          <div className="mr-6 cursor-pointer text-3xl">
            <a target="_blank" href="https://twitter.com/Cheffy_official">
              <FaTwitter />
            </a>
          </div>
          <div className="mr-6 cursor-pointer text-3xl">
            <a target="_blank" href="https://www.instagram.com/cheffy.group/">
              <FaFacebook />
            </a>
          </div>
          <div className="mr-6 cursor-pointer text-3xl">
            <a target="_blank" href="https://www.instagram.com/cheffy.group/">
              <BiMailSend />
            </a>
          </div>
        </div>
        <div className="flex justify-center items-center pt-8">
          <div className="mr-6 cursor-pointer text-base font-semibold">
            <a>Download</a>
          </div>
          <div className="mr-6 cursor-pointer text-base font-semibold">
            <a>Privacy</a>
          </div>
          <div className="mr-6 cursor-pointer text-base font-semibold">
            <a>Support</a>
          </div>
        </div>
        <div className="text-center mt-6">
          <p className="text-base">
            Copyright &copy; {new Date().getFullYear()}, Oluha Company. All
            right reserverd
          </p>
        </div>
      </Footer>
    </>
  );
};

export default About;
