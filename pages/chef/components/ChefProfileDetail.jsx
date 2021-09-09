import React, { useEffect, useState } from "react";
import { cheffApi } from "../../../src/api";
import { Col, Row, Typography } from "antd";
import { FaUser } from "react-icons/fa";

const ChefProfileDetail = () => {
  const { Text } = Typography;
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    cheffApi.getUserData().then(({ data }) => {
      setUser(data);
    });
  }, []);

  return (
    <>
      {user && (
        <div className="py-10">
          <Row gutter={[80, 40]}>
            <Col className="" xs={20} sm={20} md={10} lg={10} xl={10} justify="center">
              {user.imagePath != "null" ? (
                <div className="photo-wrapper p-2">
                  <img
                    className="w-200 h-200 rounded-full mx-auto"
                    src={`${user.imagePath}`}
                    alt={user.name}
                  />
                </div>
              ) : (
                <div>
                  <FaUser
                    fill="#D73D36"
                    className="text-red-500 text-3xl pb-1 inline-block"
                    size={200}
                  />
                </div>
              )}
            </Col>
            <Col xs={20} sm={20} md={12} lg={12} xl={12} align="middle">
              <Row className="px-2 py-2">
                <Text className="text-2xl">
                  {user.name}
                </Text>
              </Row>
              <Row className="px-2 py-2">
                <Text className="text-1xl">
                  {user.email}
                </Text>
              </Row>
              <Row className="px-2 py-2">
                <Text className="text-1xl">
                  {user.phone_no || 'No phone number'}
                </Text>
              </Row>
            </Col>
          </Row>
        </div>
      )}
    </>
  )
};

export default ChefProfileDetail;
