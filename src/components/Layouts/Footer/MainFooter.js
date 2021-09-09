import { MailOutlined, SendOutlined } from "@ant-design/icons";
import { Image, Card, Row, Col, Input, Typography, message, Form } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Meta from "antd/lib/card/Meta";
import Link from "next/link";
import React from "react";
import { BiMailSend } from "react-icons/bi";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "../../../../styles/footer.css";
const { Text } = Typography;
// const client = require("@mailchimp/mailchimp_marketing");
// const axios = require("axios");

const MainFooter = () => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    const result = await fetch(
      "https://mycheffy.herokuapp.com/home/subscribe",
      {
        method: "POST",
        mode: "cors",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: values.email,
        }),
      }
    );
    if(result.status === 200) {
      message.info("You have successfully subscribed to out Newsletter", 3)
    }
    else{
      console.log(result)
    }
    // ef3fa5d91868185ea30badcdafe9a869-us6
    // client.setConfig({
    //   apiKey: "ef3fa5d91868185ea30badcdafe9a869-us6",
    //   server: "us6",
    // });

    // const run = async () => {
    //   const response = await client.lists.batchListMembers(680981, {
    //     members: [{
    //     }],
    //   });
    //   console.log(response);
    // };
    // const run = async () => {
    //   const response = await client.lists.getList(680981);
    //   console.log(response);
    // };
    // run();
    // const data = {
    //   members: [
    //     {
    //       email_address: values.email,
    //       status: "subscribed",
    //     },
    //   ],
    // };
    // const jsonData = JSON.stringify(data);
    // // const url = "https://us6.api.mailchimp.com/3.0/lists/e5d145c2f3";
    // // const options = {
    // //   method: "POST",
    // //   mode: "no-cors",
    // //   headers: {
    // //     "Accept": "application/json",
    // //     "Content-Type": "application/json",
    // //     "Authorization": "Bearer ef3fa5d91868185ea30badcdafe9a869-us6",
    // //   },
    // //   body: jsonData,
    // // };
    // // const response = await fetch(url, options);
    // // console.log(await response);
    // let headers = new Headers();

    // headers.append("Content-Type", "application/json");
    // headers.append("Accept", "application/json");

    // headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
    // headers.append("Access-Control-Allow-Origin", "http://cheffy.us");
    // headers.append("GET", "POST", "OPTIONS");

    // const config = {
    //   method: "post",
    //   url: "https://us6.api.mailchimp.com/3.0/lists/e5d145c2f3",
    //   mode: "cors",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //     // "Access-Control-Allow-Origin": "http://cheffy.us",
    //     "Access-Control-Allow-Credentials": "true",
    //     Authorization: "Bearer ef3fa5d91868185ea30badcdafe9a869-us6",
    //   },

    //   data: jsonData,
    // };
    // axios(config)
    //   .then(function (response) {
    //     console.log(JSON.stringify(response.data));
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    form.resetFields();
  };

  return (
    <>
      <div className="footer-food">
        <Row
          gutter={[40, 40]}
          justify="space-around"
          className="flex footer-food-row"
        >
          <Col
            xs={20}
            sm={16}
            md={16}
            lg={8}
            xl={6}
            justify="center"
            className="text-gray-600 app-badges"
          >
            <div className="justify-center align-center">
              <h3>Download</h3>
              <div className="app-links">
                <a href="https://apps.apple.com/us/app/cheffy-quality-food/id1476147583">
                  <Image
                    preview={false}
                    width={150}
                    src="/images/app-store-logo.png"
                  />
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.app.cheffyuser">
                  <Image
                    preview={false}
                    width={152}
                    src="/images/google-play-badge.png"
                  />
                </a>
              </div>
            </div>
          </Col>

          <Col
            xs={20}
            sm={16}
            md={16}
            lg={8}
            xl={6}
            justify="center"
            className="text-gray-600"
          >
            <div className="justify-center align-center">
              <h3>About</h3>
              <ul>
                <li>
                  <Link href="/about">
                    <a>About Cheffy</a>
                  </Link>
                </li>
                <li>
                  <Link href="/blog">
                    <a>Read our blog</a>
                  </Link>
                </li>
                <li>
                  <Link href="/career">
                    <a>Careers</a>
                  </Link>
                </li>
                <li>
                  <Link href="/cities">
                    <a>All cities</a>
                  </Link>
                </li>
              </ul>
            </div>
          </Col>

          <Col
            xs={20}
            sm={16}
            md={16}
            lg={8}
            xl={6}
            justify="center"
            className="text-gray-600"
          >
            <div className="justify-center align-center">
              <h3>More</h3>
              <ul>
                <li>
                  <Link href="/kitchen">
                    <a>Rent a Kitchen</a>
                  </Link>
                </li>
                <li>
                  <Link href="/faq">
                    <a>Read FAQs</a>
                  </Link>
                </li>
                <li>
                  <Link href="/help">
                    <a>Get Help</a>
                  </Link>
                </li>
                {/* Terms and privacyPolicy path should be included*/}
                <li>
                  <Link href="/privacyPolicy">
                    <a>Privacy Policy</a>
                  </Link>
                </li>
                <li>
                  <Link href="/privacyPolicy">
                    <a>Terms</a>
                  </Link>
                </li>
              </ul>
            </div>
          </Col>

          <Col
            xs={20}
            sm={12}
            md={12}
            lg={6}
            xl={6}
            justify="center"
            className="footer-news"
          >
            <Row justify="center" gutter={[0, 16]}>
              <Col xs={20} sm={20} md={20} lg={20} xl={20} justify="center">
                <h3>Newsletter Subscription</h3>
                <Form onFinish={onFinish} form={form}>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Enter your Email",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your email"
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    suffix={<SendOutlined onClick={onFinish} />}
                  />
                </Form.Item>
                {/* <Form.Item>
                  <Button>

                  </Button>
                </Form.Item> */}
              </Form>
              </Col>
              <Col
                xs={20}
                sm={20}
                md={20}
                lg={20}
                xl={20}
                justify="center"
                className="social-links"
              >
                <Row>
                  <Col span={24}>
                    <h3>Reach us on</h3>
                  </Col>
                  <Col span={24}>
                    {/* TODO: Fix Facebook and Email links. */}
                    <Row className="" gutter={[12, 6]}>
                      <Col className="cursor-pointer text-3xl">
                        <a target="_blank" href="https://www.facebook.com/OluhaIC/">
                          <FaFacebook />
                        </a>
                      </Col>
                      <Col className="cursor-pointer text-3xl">
                        <a target="_blank" href="https://twitter.com/Cheffy_official">
                          <FaTwitter />
                        </a>
                      </Col>
                      <Col className="cursor-pointer text-3xl">
                        <a target="_blank" href="https://www.instagram.com/cheffy.group/">
                          <FaInstagram />
                        </a>
                      </Col>
                      <Col className="cursor-pointer text-3xl">
                        <a target="_blank" href="mailto:jimmy@oluha.com">
                          <BiMailSend />
                        </a>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      <div className="copyright">
        <Row className="flex px-16 py-8" justify="center">
          <Col
            xs={20}
            sm={20}
            md={14}
            lg={14}
            xl={14}
            justify="center"
            className=""
            style={{ textAlign: "center" }}
          >
            Copyright © 2021, Oluha Company. All rights reserved.
          </Col>
        </Row>
      </div>
    </>
  );
};

export default MainFooter;
