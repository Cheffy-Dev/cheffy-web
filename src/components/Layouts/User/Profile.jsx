import { Col, Row, Typography } from "antd";
import React from "react";
import { FaUser } from "react-icons/fa";

const Profile = (props) => {
  const { Text } = Typography;

  if (props.profile.loading)
    return <h1>loading</h1>

  return (
    <div className="py-10">
      <Row gutter={[80, 40]}>
        <Col className="" xs={20} sm={20} md={10} lg={10} xl={10} justify="center">
          {props.profile.user.imagePath != "null" ? (
            <div className="photo-wrapper p-2">
              <img
                className="w-200 h-200 rounded-full mx-auto"
                src={`${props.profile.user.imagePath}`}
                alt="John Doe"
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
              {props.profile.user.name}
            </Text>
          </Row>
          <Row className="px-2 py-2">
            <Text className="text-1xl">
              {props.profile.user.email}
            </Text>
          </Row>
          <Row className="px-2 py-2">
            <Text className="text-1xl">
              {props.profile.user.phone_no || 'No phone number'}
            </Text>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
