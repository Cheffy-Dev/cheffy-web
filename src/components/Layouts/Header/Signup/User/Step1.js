import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Row, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import axiosClient from "../../../../../utils/axios-config";
import FacebookLoginComp from "../../../../auth/facebookAuth";
import GoogleLoginComp from "../../../../auth/googleAuth";

const { Text } = Typography;

const Step1 = ({ form, prevStep, nextStep, onClick }) => {
  const [loading, setLoading] = useState(false);

  const continueHandler = async () => {
    setLoading(true);
    try {
      const errors = await form.validateFields();
    } catch (errors) {
      setLoading(false);
      return;
    }

    const { email } = form.getFieldsValue(true);

    // send verify token
    try {
      const res = await axiosClient.post("user/", { email });
      console.log(res);
      // if user doesn't already exists & is sent verification email
      if (
        res?.status === 201 ||
        res?.result?.verification_email_status === "pending"
      ) {
        nextStep();
      }

      if (res?.message?.includes("Already registered"))
        message.error(res.message);
    } catch (error) {
      message.error(error.message);
      console.log(error);
    }

    setLoading(false);
    console.log("No errors FOUND");
  };

  const googleHandler = async ({ profileObj }) => {
    try {
      const {
        email,
        name,
        googleId: provider_user_id,
        imageUrl: imagePath,
      } = profileObj;
      const userData = {
        email,
        name,
        provider_user_id,
        imagePath,
        provider: "google",
        user_type: "user",
      };
      const res = await axiosClient.post("user/socialauth/register", userData);
      console.log(res);
      nextStep(2);
    } catch (error) {
      message.error(error?.response?.data?.message);
    }
  };

  const facebookHandler = async ({
    email,
    name,
    userID: provider_user_id,
    picture,
  }) => {
    try {
      const userData = {
        email,
        name,
        provider_user_id,
        imagePath: picture?.data?.url,
        provider: "facebook",
        user_type: "user",
      };
      console.log(userData);
      const res = await axiosClient.post("user/socialauth/register", userData);
      nextStep(2);
    } catch (error) {
      message.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    form.setFields([{ name: "user_type", value: "user" }]);
  }, []);
  return (
    <>
      <div className="flex flex-row justify-between align-center mb-6">
        <Text className="text-4xl font-extrabold">Sign Up</Text>
        <img
          src="/images/close.png"
          alt="close"
          className="h-4 w-4 cursor-pointer"
          onClick={onClick}
        />
      </div>
      <Text className="my-8">
        or<Text className="text-red-500 ml-2">login to your account</Text>
      </Text>
      <Form form={form} name="signup-form" className="mt-10" layout="vertical">
        <Form.Item
          name="phone"
          rules={[
            { required: false, message: "Please input your phone number" },
          ]}
        >
          <Input
            className="signup-input"
            placeholder="Phone Number"
            type="integer"
          />
        </Form.Item>

        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your name" }]}
        >
          <Input className="signup-input" placeholder="Name" type="text" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email",
              type: "email",
            },
          ]}
        >
          <Input className="signup-input" placeholder="Email" type="email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input password" }]}
        >
          <Input.Password
            className="signup-input px-6 py-4 bg-inputBg"
            placeholder="Password"
          />
        </Form.Item>
        <Text className="mb-6">Have a referral code?</Text>
        <Form.Item>
          <Button
            className="py-6 flex flex-row gap-2 justify-center items-center"
            block
            type="primary"
            htmlType="submit"
            onClick={() => continueHandler()}
          >
            <div>Continue</div>
            {loading && (
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{ fontSize: 24, color: "white" }}
                    spin
                  />
                }
              />
            )}
          </Button>
        </Form.Item>
      </Form>
      <Text>
        By creating an account, I accept the{" "}
        <Text className="text-red-500">Terms & Conditions</Text>
      </Text>
      <Text className="text-center block mt-8 mb-4 font-semibold text-base md:text-xl">
        Or Sign Up With
      </Text>
      <Row className="flex justify-center items-center gap-2 md:gap-4">
        <FacebookLoginComp handler={facebookHandler} />
        <GoogleLoginComp handler={googleHandler} />
      </Row>
    </>
  );
};

export default Step1;
