import { AlertFilled, HomeFilled } from "@ant-design/icons";
import { Button, Col, Input, Row, Typography, Form, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import { FaHandsHelping, FaUsers } from "react-icons/fa";
import { cheffAdminApi } from '../../../api/index';
import axiosClient from "../../../utils/axios-config";

const ISSUE_TYPE = {
  GENERAL_ISSUE: 'GENERAL_ISSUE',
  REPORT_SAFETY_EMERGENCY: 'REPORT_SAFETY_EMERGENCY',
  ISSUE_LIVE_ORDER: 'ISSUE_LIVE_ORDER',
  BUSINESS_ENQUIRIES: 'BUSINESS_ENQUIRIES'
};

export default function Help() {
  const [issueType, setIssueType] = useState(ISSUE_TYPE.GENERAL_ISSUE);
  const { Text } = Typography;
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try{
      console.log(values);
      const helpPayload = {
        issueType: issueType,
        ...values
      }
      const res = await axiosClient.post("/help", helpPayload);
      console.log(res);
      message.success("We will get back to you as soon as possible!", 5)
    }
    catch (err) {
      message.error("There was some error, while posting your query", 2);
    }
    finally{
      form.resetFields();
    }
  }
  return (
    <div className="h-auto mt-10">
      <Row className="mt-20 pt-2 pb-4 mx-auto w-3/5" align="middle">
        <Col span={24} className="flex justify-start items-center">
          <HomeFilled />
          <Text strong className="text-black ml-4">
            Contact Us
          </Text>
        </Col>
      </Row>
      <Row
        className="w-full bg-fixed bg-cover bg-no-repeat bg-center relative"
        style={{
          backgroundImage: `url(/images/blog-bg.png)`,
          height: "40vh",
          backgroundSize: "cover",
          filter: "brightness(50%)",
        }}
        justify="center"
        align="middle"
      ></Row>
      <Row
        className="absolute w-full"
        style={{ height: "40vh", transform: "translateY(-100%)" }}
        justify="center"
        align="middle"
      >
        <Col>
          <Text
            level={1}
            strong
            className="block text-white text-6xl font-bold"
          >
            We would love to hear from you!
          </Text>
        </Col>
      </Row>
      <div className="mx-auto w-4/5 my-20">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
          }}
        >
          <Form form={form} onFinish={onFinish}>
            <Form.Item
              name="issue"
              rules={[{ required: true, message: "Please enter your Issue!" }]}
            >
              <Input
                className="border-none"
                placeholder="How we can help you?*"
                style={{
                  backgroundColor: "#EDF2F7",
                  height: 76,
                  marginBottom: 24,
                  borderBottom: "2px solid #A0AEC0",
                }}
              />
            </Form.Item>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Input
                className="border-none"
                placeholder="Full name*"
                style={{
                  backgroundColor: "#EDF2F7",
                  height: 96,
                  marginBottom: 14,
                  borderBottom: "2px solid #A0AEC0",
                }}
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input
                type="email"
                className="border-none"
                placeholder="Email address*"
                style={{
                  backgroundColor: "#EDF2F7",
                  height: 96,
                  marginBottom: 14,
                  borderBottom: "2px solid #A0AEC0",
                }}
              />
            </Form.Item>
            <Form.Item
              name="phone"
              rules={[
                { required: true, message: "Please enter your phone number!" },
              ]}
            >
              <Input
                className="border-none"
                placeholder="Mobile number"
                style={{
                  backgroundColor: "#EDF2F7",
                  height: 96,
                  marginBottom: 14,
                  borderBottom: "2px solid #A0AEC0",
                }}
              />
            </Form.Item>
            <Form.Item
              name="comment"
            >
              <TextArea
                rows="6"
                className="border-none"
                placeholder="Comment"
                style={{
                  backgroundColor: "#EDF2F7",
                  marginBottom: 14,
                  borderBottom: "2px solid #A0AEC0",
                  resize: "none",
                  width: "100%",
                }}
              ></TextArea>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ height: 66, marginTop: 24, width: 126 }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
          <div>
            <Button
              className="flex align-center p-6 mb-8"
              type="button"
              block
              style={{ height: 96 }}
              onClick={() => setIssueType(ISSUE_TYPE.REPORT_SAFETY_EMERGENCY)}
            >
              <AlertFilled className="text-3xl text-red-500 mr-3" />
              <span className="text-2xl font-bold">
                Report a Safety Emergency
              </span>
            </Button>
            <Button
              className="flex align-center p-6 mb-8"
              type="button"
              block
              onClick={() => setIssueType(ISSUE_TYPE.ISSUE_LIVE_ORDER)}
              style={{ height: 96 }}
            >
              <FaHandsHelping className="text-3xl text-red-500 mr-5" />
              <span className="text-2xl font-bold">
                Issue with Your Live Order?
              </span>
            </Button>
            <Button
              className="flex align-center p-6"
              type="button"
              block
              onClick={() => setIssueType(ISSUE_TYPE.BUSINESS_ENQUIRIES)}
              style={{ height: 96 }}
            >
              <FaUsers className="text-3xl text-red-500 mr-5" />
              <span className="text-2xl font-bold">For Business Enquiries</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
