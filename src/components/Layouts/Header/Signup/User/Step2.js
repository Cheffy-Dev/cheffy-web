import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, message, Spin, Typography } from "antd";
import React, { useState } from "react";
import axiosClient from "../../../../../utils/axios-config";
import OTPInput from "./OTPInput";

const Step2 = ({ form, prevStep, nextStep, onClick }) => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const { Text } = Typography;

  const continueHandler = async () => {
    setLoading(true);

    const { email, email_token, name, password, user_type } =
      form.getFieldsValue(true);

    // verify token
    try {
      const res = await axiosClient.post("user/verify-email-token", {
        email,
        email_token,
      });
      console.log(res);
      // if user doesn't already exists & is sent verification email
      if (res?.status === 200) {
        message.success(res.message);

        try {
          const completeRegRes = await axiosClient.post(
            "user/complete-registration",
            {
              email,
              name,
              password,
              user_type,
            }
          );
          if (res?.status === 200) {
            message.success(res.message);
          }
        } catch (err) {}
        nextStep();
      }
    } catch (error) {
      message.error(error?.response?.data?.message);
      if (error.response?.data.message?.includes("Already Verified")) {
        try {
          const completeRegRes = await axiosClient.post(
            "user/complete-registration",
            {
              email,
              name,
              password,
              user_type,
            }
          );
          message.success(res.message);
        } catch (err) {}
      }
    }

    setLoading(false);
    console.log("No errors FOUND");
  };

  return (
    <>
      <div className="flex flex-row justify-between align-center mb-6">
        <Text className="text-4xl font-extrabold">Verify Your Account</Text>
        <img
          src="/images/close.png"
          alt="close"
          className="h-4 w-4 cursor-pointer"
          onClick={onClick}
        />
      </div>
      <Text className="my-8">
        Enter 4-digit verification code we have sent on your email
      </Text>
      <Form
        form={form}
        name="signup-form"
        autoComplete="off"
        className="mt-10"
        layout="vertical"
      >
        <OTPInput
          autoFocus
          isNumberInput
          length={4}
          className="otpContainer flex gap-2"
          inputClassName="otpInput px-4 py-4 bg-inputBg w-16 h-16"
          onChangeOTP={(otp) =>
            form.setFields([{ name: "email_token", value: otp }])
          }
        />

        {/* </Form.Item> */}

        <Button
          className="py-6 flex my-4 mt-12 flex-row gap-2 justify-center items-center"
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

        <Button
          className="py-6 flex flex-row gap-2 justify-center items-center mt-0"
          block
          type="default"
          htmlType="submit"
          onClick={() => prevStep()}
        >
          <div>Back</div>
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
      </Form>
    </>
  );
};

export default Step2;
