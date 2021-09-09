import React from 'react';
import { HomeFilled, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Col, Collapse, Row, Typography } from "antd";

const Faq = () => {
  const { Text } = Typography;
  const { Panel } = Collapse;
//   const faqs = [
//     {
//       id: "1",
//       question: "How will I know my order is confirmed?",
//       answer:
//         "We will send you an order confirmation email once we recieve your order.",
//     },
//     {
//       id: "2",
//       question: "What payment methods do you accept?",
//       answer:
//         "We currently accept debit cards and credit cards but we will be adding support for UPI services soon.",
//     },
//     {
//       id: "3",
//       question: "How do I redeem a discount or a special offer?",
//       answer:
//         "You can redeem a discount by entering the coupon code during checkout.",
//     },
//     {
//       id: "4",
//       question: "What is the refund duration for a cancelled order?",
//       answer: "Your money will be refunded to your accounts within 2-3 hours.",
//     },
//     {
//       id: "5",
//       question: "How do I add my restaurant to Cheffy?",
//       answer: "You can add your restaurant to Cheffy by signing up as a chef.",
//     },
//   ];
//   const CreateQuestion = (faq) => {
// 	return (
//       <Panel
//         header={faq.question}
//         key={faq.id}
//         className="text-lg sm:text-xl md:text-2xl font-bold"
//       >
//         <p className="font-normal" style={{ fontSize: "18px" }}>
//           {faq.answer}
//         </p>
//       </Panel>
//     )
//   };
  return (
    <div className="h-auto">
      <Row className="mt-5 pt-2 pb-4 mx-auto w-3/5" align="middle">
        <Col span={24} className="flex justify-start items-center">
          <HomeFilled />
          <Text strong className="text-black ml-4">
            Faq
          </Text>
        </Col>
      </Row>
      <Row
        className="w-full bg-fixed bg-cover bg-no-repeat bg-center relative"
        style={{
          backgroundImage: `url(/images/blog-bg.png)`,
          height: "40vh",
          backgroundSize: "cover",
          objectFit: "cover",
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
            Faqs
          </Text>
        </Col>
      </Row>
      <div className="py-20 max-w-5xl px-3 mx-auto">
        <Collapse
          defaultActiveKey={["1"]}
          style={{ backgroundColor: "#fff", border: "none" }}
          expandIconPosition="right"
          expandIcon={({ isActive }) =>
            isActive ? <MinusOutlined /> : <PlusOutlined />
          }
        >
          <Panel
            header={"How will I know my order is confirmed?"}
            key="1"
            className="text-lg sm:text-xl md:text-2xl font-bold"
          >
            <p className="font-normal" style={{ fontSize: "18px" }}>
              We will send you an order confirmation email once we recieve your
              order.
            </p>
          </Panel>
          <Panel
            header="What payment methods do you accept?"
            key="2"
            className="text-lg sm:text-xl md:text-2xl font-bold"
          >
            <p className="font-normal" style={{ fontSize: "18px" }}>
              We currently accept debit cards and credit cards but we will be
              adding support for UPI services soon.
            </p>
          </Panel>
          <Panel
            header="How do I redeem a discount or a special offer?"
            key="3"
            className="text-lg sm:text-xl md:text-2xl font-bold"
          >
            <p className="font-normal" style={{ fontSize: "18px" }}>
              You can redeem a discount by entering the coupon code during
              checkout.
            </p>
          </Panel>
          <Panel
            header="What is the refund duration for a cancelled order?"
            key="4"
            className="text-lg sm:text-xl md:text-2xl font-bold"
          >
            <p className="font-normal" style={{ fontSize: "18px" }}>
              Your money will be refunded to your accounts within 2-3 hours.
            </p>
          </Panel>
          <Panel
            header="How do I add my restaurant to Cheffy?"
            key="5"
            className="text-lg sm:text-xl md:text-2xl font-bold"
          >
            <p className="font-normal" style={{ fontSize: "18px" }}>
              You can add your restaurant to Cheffy by signing up as a chef.
            </p>
          </Panel>
          {/* {faqs.forEach( faq => {
            CreateQuestion(faq)
          })} */}
        </Collapse>
      </div>
    </div>
  );
};

export default Faq;
