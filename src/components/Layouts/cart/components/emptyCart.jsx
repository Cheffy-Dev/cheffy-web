import React from 'react';
import Link from "next/link";
import { Col, Row } from "antd";

const EmptyCart = () => {
  return (
    <>
      <Row>
        <Col span={12} style={{ alignSelf: "center" }}>
          <h3 className="font-extrabold text-2xl sm:text-4xl md:text-4xl lg:text-5xl py-10">
            Nothing to show yet
          </h3>
          <Link href="/">
            <a className="block text-lg">
              <button
                type="button"
                className="ant-btn ant-btn-primary mr-4 rounded-md px-7 py-6 flex items-center"
              >
                <strong>Find something to Eat &#8594;</strong>
              </button>
            </a>
          </Link>
        </Col>
        <Col span={12}>
          <img src="/images/empty-cart.jpg" />
        </Col>
      </Row>
    </>
  )
};

export default EmptyCart;
