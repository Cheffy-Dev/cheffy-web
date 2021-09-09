import React, { useState, useEffect } from 'react';
import { cheffApi } from '../../../api/';
import { Col, Divider, Row, Typography } from "antd";
import { AiFillCheckCircle } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import Link from "next/link";
import EmptyCart from "../cart/components/emptyCart";

const ReturnIcon = () => {
  return (
    <span className="mr-2">
      <svg
        className=""
        width="14"
        height="12"
        viewBox="0 0 14 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.37182 2.71571H3.58531V0.737305L0.407227 3.91555L3.58531 7.09364V5.04889H9.37182C10.3793 5.04889 11.1991 5.86864 11.1991 6.87617C11.1991 7.88375 10.3793 8.7034 9.37182 8.7034H2.77281V11.0366H9.37182C11.6659 11.0366 13.5322 9.17027 13.5322 6.87617C13.5322 4.58207 11.6659 2.71571 9.37182 2.71571Z"
          fill="white"
        />
      </svg>
    </span>
  );
};

const ProfileOrders = () => {
  const { Text } = Typography;
  const [userOrder, setUserOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  const filterDataToDisplay = orders => {
    return orders
      .filter(order => order.state_type === "accepted")
      .map(order => ({
        id: order.id,
        description: order.OrderItems[0]?.description || 'No Value present',
        items: order.OrderItems.map(item => ({
          name: item.name,
          quantity: item.quantity
        })),
        total: order.OrderPayment?.amount || 'No Value present'
      }));
  };

  useEffect(() => {
    cheffApi.getUserOrders().then(({ data }) => {
      setUserOrder(filterDataToDisplay(data));
      setLoading(false);
    });
  }, []);

  if (loading)
    return <h1>Loading...</h1>

  if (userOrder.length < 1)
    return <EmptyCart />

  return (
    <div className="flex py-2">
      <Row gutter={[2]} className="w-full">
        {userOrder.map(order => (
          <div id={order.id}>
            <Col sm={16} md={7}>
              <img src="/images/order.png" className="h-44 w-full rounded-lg" />
            </Col>
            <Col sm={16} md={14} className="w-full md:ml-10 ml-0">
              <span className="flex items-center justify-between">
                <p className="text-xl">
                  {order.description}
                </p>
                <p className="flex items-center text-xs text-gray-400">
                  <AiFillCheckCircle className="mr-2 lg:text-base text-3xl text-green-700" />
                  Delivered on Tue, Feb 16, 2021, 04:58 PM
                </p>
              </span>
              <Text className="flex text-sm font-semibold items-center py-2">
                <MdLocationOn /> 2179 Brooklyn Street
              </Text>

              <Text className="text-gray-400 font-bold py-3">
                {"ORDER #" + order.id + " | Tue, Feb 16, 2021, 04:32 PM"}
              </Text>
              <span className="flex items-center justify-between py-1">
                {order.items.map((item) => (
                  <p className="text-lg">{item.name + " Qty - " + item.quantity}</p>
                ))}
                <p className="font-bold">
                  {"Total Paid: $" + order.total}
                </p>
              </span>
              <div className="py-2 flex space-x-6">
                <a
                  href="/"
                  className="py-2 cursor-pointer flex items-center justify-center bg-black w-24 text-sm rounded-xl text-center text-white"
                >
                  <ReturnIcon />
                  Reorder
                </a>
                <Link href="/help">
                  <a className="py-2 cursor-pointer flex items-center justify-center bg-transparent border-2 border-black w-20 text-sm rounded-xl">
                    <BiHelpCircle className="mr-2" />
                    Help
                  </a>
                </Link>
              </div>
            </Col>
            <Divider />
          </div>
        ))}
      </Row>
    </div>
  );
};

export default ProfileOrders;
