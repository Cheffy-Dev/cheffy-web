import { Button, Form, Input, Layout } from "antd";
import { BsMap, BsPhone } from "react-icons/bs";

const Contact = () => {
  const { Content } = Layout;
  const onFinish = () => {};

  return (
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
  );
};

export default Contact;
