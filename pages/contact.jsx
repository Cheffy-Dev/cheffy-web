import { MailOutlined, MobileOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Layout, Select } from "antd";
import MainFooter from "../src/components/Layouts/Footer/MainFooter";
import HomeHeader from "../src/components/Layouts/Header/HomeHeader";
import "../styles/contact.css";
import axiosClient from "../src/utils/axios-config";

const { Option } = Select;
const { Content } = Layout;

const Contact = () => {
  const [form] = Form.useForm();

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onFinish = async (values) => {
    try{
      console.log(values);
      const res = await axiosClient.post("/feedback", values);
      console.log(res);
      message.success("Thank you for your feedback", 2)
    }
    catch (err) {
      message.error("There was some error, while posting your feedback", 2);
    }
    finally{
      form.resetFields();
    }
  }
  return (
    <div className="about-page">
      <HomeHeader />
      <Content className="pb-20">
        <div className="text-center mt-5 px-10 md:px-32 text-3xl sm:text-5xl font-extrabold text-white banner-about">
          We would love to hear from you
        </div>
        <Form
          form={form}
          onFinish={onFinish}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 gap-x-12 mt-6 md:mt-12 grid grid-cols-2"
        >
          <Form.Item
            className="col-span-2 md:col-span-1"
            name="feedbackType"
            rules={[{ required: true, message: "Please select an option!" }]}
          >
            <Select
              placeholder="How can we help you?"
              className="form-input-contact"
              size="large"
              onChange={handleChange}
            >
              <Option value="suggestion">
                I would like to give feedback/suggestions
              </Option>
              <Option value="help_order">I need help with my order</Option>
              <Option value="help_blog">I need some help with my blog</Option>
              <Option value="other">Other reasons</Option>
            </Select>
          </Form.Item>
          <Form.Item
            className="col-span-2 md:col-span-1"
            name="name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input
              size="large"
              className="form-input-contact"
              placeholder="Full Name"
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item
            className="col-span-2 md:col-span-1"
            name="email"
            rules={[
              { required: true, message: "Please enter your email address!" },
            ]}
          >
            <Input
              size="large"
              className="form-input-contact"
              placeholder="Email"
              prefix={<MailOutlined />}
            />
          </Form.Item>
          <Form.Item
            className="col-span-2 md:col-span-1"
            name="phone"
            rules={[
              { required: true, message: "Please enter a valid phone number!" },
            ]}
          >
            <Input
              size="large"
              className="form-input-contact"
              placeholder="Phone"
              prefix={<MobileOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="message"
            className="col-span-2"
            rules={[{ required: true, message: "Please enter a message!" }]}
          >
            <Input.TextArea
              rows={3}
              size="large"
              className="form-input-contact"
              placeholder="Message"
              //   prefix={<MobileOutlined />}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className="rounded max-w-xs mt-8"
            >
              Submit Feedback
            </Button>
          </Form.Item>
        </Form>
      </Content>
      <MainFooter />
    </div>
  );
};

export default Contact;
