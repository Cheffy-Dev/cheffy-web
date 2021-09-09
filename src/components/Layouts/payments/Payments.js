import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Divider,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Form as Fm,
  Switch,
  message,
  Typography,
} from "antd";
import Form from "antd/lib/form/Form";
import { useSession } from "next-auth/client";
import React, { useEffect, useState } from "react";
import { AiFillEdit, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BiCreditCard } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { VscLoading } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import App from "../../../payments/App";
import { getUserBasket } from "../../../redux/actions/cart/cartAction";
import { getShippingAddressById } from "../../../redux/actions/shipping-address/shippingAddressAction";
import { getUserInfo } from "../../../redux/actions/user/userAction";
import AppHead from "../Header/AppHead";
import { GEO_CODE_API_URL } from "../../../../constants";
import axiosClient from "../../../utils/axios-config";
const { Text } = Typography;
const { Option } = Select;

function Payments(props) {
  const [session, loading] = useSession();
  const dispatch = useDispatch();
  const [basketData, setBasketData] = useState({});
  const [subTotal, setSubTotal] = useState(0.0);
  const [total, setTotal] = useState(0.0);
  const [deliveryFee, setDeliveryFee] = useState(0.0);
  const [shippingAddress, setShippingAddress] = useState([]);
  const [shippingAddressList, setShippingAddressList] = useState([]);
  const [lonLat, setLonLat] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [dataFlag, setDataFlag] = useState(false);
  const [shippingAddressId, setShippingAddressId] = useState(null);
  const deliveryType = "user";
  // const [succeeded, setSucceeded] = useState(false);
  // const [error, setErrsor] = useState(null);
  // const [processing, setProcessing] = useState("");
  // const [disabled, setDisabled] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddAddressVisible, setIsAddAddressVisible] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [verify, setVerify] = useState(false);

  const AddPhoneNumber = () => {
    const [form] = Fm.useForm();
    const onFinish = async (values) => {
      const phonePayload = {
        country_code: values.country_code,
        phone_no: values.phone_no,
      };
      console.log("Received values of form: ", values);
      const res = await axiosClient
        .post("/user/phone", phonePayload)
        .then((res) => res.json());
      console.log(res);
      setVerify(true);
    };

    const formItemLayout = {
      wrapperCol: {
        span: 24,
      },
    };
    const buttonItemLayout = {
      wrapperCol: {
        span: 24,
      },
    };

    return (
      <Fm
        {...formItemLayout}
        layout="horizontal"
        form={form}
        // onSubmit={(e) => e.preventDefault()}
        onFinish={onFinish}
      >
        <Row gutter={12}>
          <Col span={6}>
            <Fm.Item
              name="country_code"
              rules={[
                {
                  required: true,
                  message: "Enter your Country Code",
                },
              ]}
              validateTrigger={["onChange", "onBlur"]}
            >
              <Input defaultValue="+01" prefix={<FaPhoneAlt />} size="large" />
            </Fm.Item>
          </Col>
          <Col span={18}>
            <Fm.Item
              name="phone_no"
              rules={[
                {
                  required: true,
                  message: "Enter your Phone No.",
                },
              ]}
              validateTrigger={["onChange", "onBlur"]}
            >
              <Input
                prefix={<FaPhoneAlt />}
                size="large"
                placeholder="Phone No."
              />
            </Fm.Item>
          </Col>
        </Row>
        <Fm.Item {...buttonItemLayout}>
          <Row justify="center">
            <Col span={24}>
              <Button block style={{height: "2.5rem" }} type="primary" htmlType="submit">
                <p className="" style={{ fontSize: "1.25rem" }}>
                  Verify
                </p>
              </Button>
            </Col>
          </Row>
        </Fm.Item>
      </Fm>
    );
  };

  const VerifyPhoneNumber = (props) => {
    const [form] = Fm.useForm();
    const onFinish = async (values) => {
      const verifyLoad = {
        sms_token: values.otp,
      };
      console.log("Received values of form: ", values);
      const res = await axiosClient
        .post("/user/verify-phone", verifyLoad)
        .then((res) => res.json());
      console.log(res);
    };

    const formItemLayout = {
      wrapperCol: {
        span: 24,
      },
    };
    const buttonItemLayout = {
      wrapperCol: {
        span: 24,
      },
    };

    return (
      <Fm
        {...formItemLayout}
        layout="horizontal"
        form={form}
        onFinish={onFinish}
        // onSubmit={(e) => e.preventDefault()}
      >
        <Row justify="center">
          <Col span={8}>
            <Fm.Item
              name="otp"
              rules={[
                {
                  required: true,
                  message: "Enter your OTP number",
                },
              ]}
              validateTrigger={["onChange", "onBlur"]}
            >
              <Input size="large" placeholder="OTP Number" />
            </Fm.Item>
          </Col>
        </Row>
        <Fm.Item {...buttonItemLayout}>
          <Row justify="center">
            <Col span={24}>
              <Button
                block
                style={{ height: "2.5rem" }}
                type="primary"
                htmlType="submit"
              >
                <p className="" style={{ fontSize: "1.25rem" }}>
                  Verify
                </p>
              </Button>
            </Col>
          </Row>
        </Fm.Item>
      </Fm>
    );
  };
  // const PaymentCard = (props) => {
  //   const [form] = Fm.useForm();

  //   const onFinish = async (fieldvalues) => {
  //     console.log(fieldvalues)
  //     const values = {
  //       ...fieldvalues,
  //       exp_month: fieldvalues["exp_time"].format("MM/YY").split("/")[0],
  //       exp_year: fieldvalues["exp_time"].format("MM/YY").split("/")[1],
  //     };
  //     const createCardPayload = {
  //       holder: session.user.name,
  //       number: values.cardId,
  //       exp_month: values.exp_month,
  //       exp_year: values.exp_year,
  //       cvc: values.cvc,
  //     };
  //     const paymentLoad = {
  //       shipping_id: props.shipping_id.toString(),
  //       deliveryType: "user",
  //       paymentType: "card",
  //       cardId: values.cardId,
  //       exp_month: values.exp_month,
  //       exp_year: values.exp_year,
  //       cvcNumber: values.cvc,
  //     };

  //     try {
  //       const res = await axiosClient
  //         .post("/card", createCardPayload)
  //         .then((res) => res.json())
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //       console.log(res);
  //       // message.info(res.message);
  //       message.loading("Payment in progress, Please wait...", 2);
  //     } catch (err) {
  //       message.error(err);
  //       console.log(err);
  //     } finally {
  //       // setTimeout(() => {}, 4000);
  //       // const setDefaultRes = await axiosClient
  //       //   .put("/card/" + values.cardId + "/set-default", {
  //       //     cardId: values.cardId,
  //       //     shipping_id: props.shipping_id.toString(),
  //       //   })
  //       //   .catch((err) => err.json());

  //       // // if (payRes.status ===)
  //       // console.log(setDefaultRes);
  //       // setTimeout(() => {}, 4000);
  //       const payRes = await axiosClient
  //         .post("/custom-plate/pay", paymentLoad)
  //         .then((res) => res.json())
  //         .catch((err) => {console.log(err)});

  //       // if (payRes.status ===)
  //       console.log(payRes);
  //       form.resetFields();
  //     }
  //   };

  //   const onChange = (e) => {
  //   };

  //   const formItemLayout = {
  //     wrapperCol: {
  //       span: 24,
  //     },
  //   };
  //   const buttonItemLayout = {
  //     wrapperCol: {
  //       span: 24,
  //     },
  //   };

  //   return (
  //     <Fm
  //       {...formItemLayout}
  //       layout="horizontal"
  //       form={form}
  //       onFinish={onFinish}
  //     >
  //       <Fm.Item
  //         name="cardId"
  //         rules={[
  //           {
  //             required: true,
  //             message: "Enter your Card Number",
  //           },
  //         ]}
  //         validateTrigger={["onChange", "onBlur"]}
  //       >
  //         <Input
  //           prefix={<BiCreditCard />}
  //           size="large"
  //           placeholder="Card No."
  //         />
  //       </Fm.Item>
  //       <Row justify="space-between">
  //         <Col span={14}>
  //           <Fm.Item
  //             name="exp_time"
  //             rules={[
  //               {
  //                 type: "object",
  //                 required: true,
  //                 message: "Enter Expiry Month and Year",
  //               },
  //             ]}
  //             validateTrigger={["onChange", "onBlur"]}
  //           >
  //             <DatePicker
  //               size="large"
  //               picker="month"
  //               format="MM/YY"
  //               style={{ backgroundColor: "#fff", color: "#222" }}
  //             />
  //           </Fm.Item>
  //         </Col>
  //         <Col span={8}>
  //           <Fm.Item
  //             name="cvc"
  //             rules={[
  //               {
  //                 // type: "number",
  //                 required: true,
  //                 // len: 3,
  //                 message: "Enter your cvc number",
  //               },
  //             ]}
  //             validateTrigger={["onChange", "onBlur"]}
  //           >
  //             <Input type="password" size="large" placeholder="CVC" />
  //           </Fm.Item>
  //         </Col>
  //       </Row>
  //       <Fm.Item {...buttonItemLayout}>
  //         <Row justify="center">
  //           <Col span={24}>
  //             <Button block style={{height: "2.5rem"}} type="primary" htmlType="submit">
  //               <p
  //                 className=""
  //                 style={{ fontSize: "1.25rem", lineHeight: "1.6rem", color: "#fff"}}
  //               >
  //                 Confirm Card
  //               </p>
  //             </Button>
  //           </Col>
  //         </Row>
  //       </Fm.Item>
  //     </Fm>
  //   );
  // };

  const AddAddressModal = ({
    isAddAddressVisible,
    handleAddressOk,
    handleAddressCancel,
    shippingAddressId,
    setShippingAddressId,
  }) => {
    const [form] = Fm.useForm();
    const onFinish = async (values) => {
      console.log("Received values of form: ", values);
      // Calculate latlong from address
      let address =
        values.addressLine1 +
        ", " +
        values.city +
        ", " +
        values.state +
        ", " +
        values.zipCode;
      let addressQuery = GEO_CODE_API_URL + "&address=" + address;
      let addressLatLon = await fetch(addressQuery).then((res) => res.json());
      console.log(addressLatLon);

      const payload = {
        addressLine1: values.addressLine1,
        addressLine2: "",
        city: values.city,
        state: values.state,
        zipCode: values.zipCode,
        lat: addressLatLon.results[0].geometry.location.lat,
        lon: addressLatLon.results[0].geometry.location.lng,
      };
      const res = await axiosClient
        .post("/shipping", payload)
        .then((res) => res.json());
      console.log(res);
      setShippingAddressId(res.data.id);
    };
    const onChange = (e) => {
      //  setShippingAddressId(e.target.value);
    };

    // const formItemLayout = {

    //   wrapperCol: {
    //     span: 22,
    //   },
    // };
    const buttonItemLayout = {
      wrapperCol: {
        span: 22,
      },
    };

    const zipLayout = {
      wrapperCol: {
        span: 10,
      },
    };

    return (
      <>
        <Modal
          title="Add Delivery Address"
          visible={isAddAddressVisible}
          onOk={handleAddressOk}
          onCancel={handleAddressCancel}
        >
          <Fm
            // {...formItemLayout}
            layout="horizontal"
            form={form}
            onFinish={onFinish}
            scrollToFirstError={true}
            justify="center"
          >
            <Fm.Item
              name="addressLine1"
              rules={[
                {
                  required: true,
                  message: "Enter Address",
                },
              ]}
              span={20}
              validateTrigger={["onChange", "onBlur"]}
            >
              <Input span={20} size="large" placeholder="Address" />
            </Fm.Item>
            <Fm.Item
              name="city"
              rules={[
                {
                  required: true,
                  message: "Enter a City",
                },
              ]}
              span={20}
              validateTrigger={["onChange", "onBlur"]}
            >
              <Input span={20} size="large" placeholder="City" />
            </Fm.Item>
            <Row justify="space-between">
              <Col span={10}>
                <Fm.Item
                  name="state"
                  rules={[
                    {
                      required: true,
                      message: "Enter a State",
                    },
                  ]}
                  // {...zipLayout}
                  validateTrigger={["onChange", "onBlur"]}
                >
                  <Input size="large" placeholder="State" />
                </Fm.Item>
              </Col>
              <Col span={10}>
                <Fm.Item
                  name="zipCode"
                  rules={[
                    {
                      required: true,
                      message: "Enter your Zipcode",
                    },
                  ]}
                  // {...zipLayout}
                  validateTrigger={["onChange", "onBlur"]}
                >
                  <Input size="large" placeholder="Zip Code" />
                </Fm.Item>
              </Col>
            </Row>
            <Fm.Item {...buttonItemLayout}>
              <Row justify="center">
                <Col>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Fm.Item>
          </Fm>
        </Modal>
      </>
    );
  };
  const ShippingAddressListModal = ({
    isModalVisible,
    showModal,
    handleOk,
    handleCancel,
    deliveryAddressList,
    shippingAddressId,
    setShippingAddressId,
  }) => {
    const onChange = (e) => {
      setShippingAddressId(e.target.value);
    };

    return (
      <>
        <Modal
          title="Shipping Addresses"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {deliveryAddressList ? (
            <Radio.Group onChange={onChange} value={shippingAddressId}>
              <Space direction="vertical">
                {deliveryAddressList.map((item, index) => {
                  let address =
                    item.addressLine1 +
                    " " +
                    item.addressLine2 +
                    " " +
                    item.city +
                    " " +
                    item.state +
                    " " +
                    item.zipCode;
                  return (
                    <>
                      <Radio value={item.id}>{address}</Radio>;
                    </>
                  );
                })}
              </Space>
            </Radio.Group>
          ) : (
            <> </>
          )}
        </Modal>
      </>
    );
  };

  const Item = ({ price, name, orderCount, plateID }) => {
    return (
      <>
        <hr />
        <div className="cart-item flex flex-row justify-between">
          <div className="order-last py-4">
            <div className="flex flex-row items-center">
              <span className="flex space-x-2">
                <p className="font-bold space-x-1">${price}</p> <p>x</p>{" "}
                <p className="font-semibold">{orderCount}</p>
              </span>
            </div>
          </div>
          <p className="text-base py-4 font-light">{name}</p>
        </div>
      </>
    );
  };

  const CollapseTitle = ({ title, number }) => {
    return (
      <span className="flex items-center">
        <p className="bg-primary pt-1 text-xs text-white text-center align-middle mr-2 px-1 rounded-full w-6 h-6">
          {number}
        </p>
        <Text strong className="text-lg font-extrabold">
          {title}
        </Text>
      </span>
    );
  };

  const CollapseItem = ({
    deliveryAddress,
    lonLat,
    deliveryAddressList,
    shippingAddressId,
    setShippingAddressId,
    getShipAddressById,
  }) => {
    const showModal = () => {
      setIsModalVisible(true);
    };

    const handleOk = () => {
      getShipAddressById(shippingAddressId);
      setIsModalVisible(false);
    };

    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const showAddAddress = () => {
      setIsAddAddressVisible(true);
    };

    const handleAddressOk = () => {
      // getShipAddressById(shippingAddressId);
      setIsAddAddressVisible(false);
    };

    const handleAddressCancel = () => {
      setIsAddAddressVisible(false);
    };

    return (
      <Row>
        {/* <Col
          style={{ backgroundColor: "#EDF2F7" }}
          className="px-3 justify-between flex items-start mx-1 w-full rounded-md py-4"
        >
          <span>
            <p className="text-base pb-1">Contactless Delivery</p>
            <p className="text-xs pt-1">
              Be safe, the rider will place your order at your door
            </p>
          </span>
          <Switch size="small" className="mt-2 ml-2" />
        </Col> */}
        {/* <Col className="mx-1 py-4 w-full felx flex-col">
          <Text strong>Delivery Time</Text>
          <div
            className="mt-4 rounded-md w-full"
            style={{ backgroundColor: "#EDF2F7" }}
          >
            <DatePicker
              popupStyle={{ textAlign: "center" }}
              picker={"date"}
              className="text-center w-full placeholder-gray-900 bg-red-500 py-4"
              suffixIcon={
                <IoIosArrowDown className="font-bold text-xl text-black" />
              }
              bordered={false}
              placeholder="Delivery time"
            />
          </div>
          <div
            className="mt-7 rounded-md w-full"
            style={{ backgroundColor: "#EDF2F7" }}
          >
            <Select
              allowClear
              optionFilterProp={"children"}
              bordered={false}
              showArrow={true}
              suffixIcon={<IoIosArrowDown className="text-black text-xl" />}
              className="w-full py-2 text-sm"
              size="large"
              placeholder="Select Delivery type"
            >
              <Option value="1">ASAP</Option>
              <Option value="2">Today</Option>
              <Option value="3">Tomorrow</Option>
              <Option value="4">Specify other?!</Option>
            </Select>
          </div>
        </Col> */}
        <Col className="pt-3 mx-1 w-full">
          <Text strong>Delivery Address</Text>
          {lonLat ? (
            <>
              <iframe
                src={lonLat}
                width="400"
                height="300"
                allowFullScreen=""
                loading="lazy"
                className="rounded-xl w-full mt-5"
              ></iframe>
              {/* <img src="/images/maps.png" className="rounded-xl w-full" /> */}
            </>
          ) : null}
          <span className="flex pt-6 items-center justify-between">
            <p className="w-3/6">{deliveryAddress ? deliveryAddress[0] : ""}</p>
            <Button
              className="rounded-lg py-4 px-2 mx-2 flex items-center"
              type="ghost"
              onClick={showModal}
            >
              <AiFillEdit className="mr-1" /> Change
            </Button>
            <Button
              className="rounded-lg py-4 px-2 mx-2 flex items-center"
              type="ghost"
              onClick={showAddAddress}
            >
              <AiFillEdit className="mr-1" /> Add Address
            </Button>
            <ShippingAddressListModal
              isModalVisible={isModalVisible}
              handleOk={handleOk}
              handleCancel={handleCancel}
              deliveryAddressList={deliveryAddressList}
              shippingAddressId={shippingAddressId}
              setShippingAddressId={setShippingAddressId}
            />
            <AddAddressModal
              isAddAddressVisible={isAddAddressVisible}
              handleAddressOk={handleAddressOk}
              handleAddressCancel={handleAddressCancel}
              shippingAddressId={shippingAddressId}
              setShippingAddressId={setShippingAddressId}
            />
          </span>
        </Col>
        {/* <Col className="w-full pt-4 mx-1">
          <Input
            placeholder="Address"
            bordered={false}
            className="py-4 rounded-md w-full"
            style={{ backgroundColor: "#EDF2F7" }}
          />
        </Col> */}
        <Col className="w-full pt-4 mx-1">
          <Input.TextArea
            placeholder="Note to chef or rider"
            bordered={false}
            className="py-5 rounded-md w-full"
            style={{ backgroundColor: "#EDF2F7" }}
          />
        </Col>
      </Row>
    );
  };

  useEffect(async () => {
    if (!dataFlag) {
      let basket = await dispatch(getUserBasket(deliveryType));
      setBasketData(basket);
      setSubTotal(basket.sub_total);
      setTotal(basket.total);
      setDeliveryFee(basket.delivery_fee);
      if (basket.shippingAddress) {
        let address =
          basket.shippingAddress.addressLine1 +
          " " +
          basket.shippingAddress.addressLine2 +
          " " +
          basket.shippingAddress.city +
          " " +
          basket.shippingAddress.state +
          " " +
          basket.shippingAddress.zipCode;
        setShippingAddress((add) => [address]);
        setShippingAddressId(basket.shippingAddress.id);

        let lonLat =
          "https://maps.google.com/maps?q=" +
          basket.shippingAddress.lat +
          ", " +
          basket.shippingAddress.lon +
          "&z=15&output=embed";
        setLonLat(lonLat);
      }

      let userDetail = await dispatch(getUserInfo());
      console.log("userDetail: ", userDetail.data);
      setUserInfo(userDetail.data);
      setShippingAddressList(userDetail.data.address);
      setDataFlag(true);

      // await fetch("https://mycheffy.herokuapp.com/order/payment-intent", {
      //   method: "POST",
      //   headers: {
      //     "x-access-token": session.apiToken,
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     amount: Number(basket.total) * 100,
      //     currency: "usd",
      //     payment_method_types: ["card"],
      //   }),
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     setClientSecret(data.clientSecret);
      //     console.log(data);
      //   });
    }
  }, []);
  const getShipAddressById = async (shipAddressId) => {
    let shippingAdd = await dispatch(getShippingAddressById(shipAddressId));
    shippingAdd = shippingAdd.data;
    console.log(shippingAdd);
    if (shippingAdd) {
      let address =
        shippingAdd.addressLine1 +
        " " +
        shippingAdd.addressLine2 +
        " " +
        shippingAdd.city +
        " " +
        shippingAdd.state +
        " " +
        shippingAdd.zipCode;
      setShippingAddress((add) => [address]);

      let lonLat =
        "https://maps.google.com/maps?q=" +
        shippingAdd.lat +
        ", " +
        shippingAdd.lon +
        "&z=15&output=embed";
      setLonLat(lonLat);
    }
  };

  return (
    <div>
      <AppHead title="Cheffy - Payments" />
      <Row
        className="w-full bg-fixed bg-cover bg-no-repeat bg-center relative mt-20 md:mt-12"
        style={{
          backgroundImage: `url(/images/payments.jpg)`,
          height: "40vh",
          backgroundSize: "cover",
          filter: "brightness(30%)",
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
        <Col span={32} className="lg:px-36">
          <Text strong className="block text-center text-white text-3xl">
            Payment
          </Text>
        </Col>
      </Row>
      {!dataFlag ? (
        <>
          <div className="flex pt-20 flex-col items-center justify-center">
            <p className="text-3xl">Loading</p>
            <VscLoading className="text-4xl animate-spin" />
          </div>
        </>
      ) : (
        <>
          <Row gutter={32} justify="center" className="pt-16 px-10 md:px-32">
            <Col
              className="md:ml-2 ml-2"
              xs={22}
              sm={22}
              md={16}
              lg={12}
              xl={12}
              xxl={12}
            >
              <div className="pt-6">
                <Text className="font-bold text-lg">Your order</Text>
                <div className="pt-10">
                  {basketData.items.map((basket, index) => {
                    return (
                      <>
                        <Item
                          key={index}
                          basketItemId={basket.basketItemId}
                          plateID={basket.plate.id}
                          name={basket.plate.name}
                          price={basket.plate.price}
                          orderCount={basket.quantity}
                        />
                      </>
                    );
                  })}

                  <hr />
                  <div className="pt-4 pb-2 cart-info ">
                    <div className="flex cart-info justify-between pt-1">
                      <div className="cart-total order-last">
                        <p className="font-normal text-base">
                          ${subTotal.toFixed(2)}
                        </p>
                      </div>
                      <span className="font-normal text-lg">Subtotal</span>
                    </div>
                  </div>
                  <div className="py-2 cart-info ">
                    <div className="flex cart-info justify-between pt-1">
                      <div className="cart-total order-last">
                        <p className="font-normal text-base">
                          ${deliveryFee.toFixed(2)}
                        </p>
                      </div>
                      <span className="font-normal text-lg">Delivery fee</span>
                    </div>
                  </div>
                  <div className="pt-2 pb-4 cart-info ">
                    <div className="flex cart-info justify-between pt-1">
                      <div className="cart-total order-last">
                        <p className="font-bold  text-base">
                          ${total.toFixed(2)}
                        </p>
                      </div>
                      <span className="font-bold text-lg">Total</span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col
              xs={22}
              sm={22}
              md={16}
              lg={12}
              xl={12}
              xxl={12}
              className="lg:mx-16"
            >
              <Divider className="m-2" />
              <div className="bg-white">
                <Collapse
                  className="bg-white"
                  defaultActiveKey="1"
                  collapsible="header"
                  bordered={false}
                  expandIconPosition={"right"}
                  expandIcon={(panelProps) => {
                    if (panelProps.isActive) {
                      return (
                        <Text>
                          <AiOutlineMinus
                            className="text-xl"
                            fontWeight="bold"
                          />
                        </Text>
                      );
                    } else {
                      return (
                        <Text>
                          <AiOutlinePlus
                            className="text-xl"
                            fontWeight="bold"
                          />
                        </Text>
                      );
                    }
                  }}
                >
                  <Collapse.Panel
                    key="1"
                    collapsible="header"
                    header={
                      <CollapseTitle title={"Personal Details"} number={"1"} />
                    }
                  >
                    <Form>
                      <div className="mt-1">
                        <label for="name" style={{ fontSize: "16px" }}>
                          Name:
                        </label>
                        <Input
                          disabled
                          className="w-100 py-4 px-3 mt-1 text-lg font-normal"
                          value={userInfo.name}
                          name="name"
                          bordered={false}
                          style={{
                            backgroundColor: "#EDF2F7",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                      <div className="mt-5">
                        <label for="email" style={{ fontSize: "16px" }}>
                          Email:
                        </label>
                        <Input
                          disabled
                          type="email"
                          className="w-100 py-4 px-3 mt-1 text-lg font-normal"
                          value={userInfo.email}
                          name="email"
                          bordered={false}
                          style={{
                            backgroundColor: "#EDF2F7",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                    </Form>
                    {userInfo.phone_no &&
                    userInfo.verification_phone_status === "verified" ? (
                      <div className="mt-5">
                        <label for="phone" style={{ fontSize: "16px" }}>
                          Phone:
                        </label>
                        <Input
                          disabled
                          type="text"
                          className="w-100 py-4 px-3 mt-1 text-lg font-normal"
                          value={userInfo.phone_no}
                          name="phone"
                          bordered={false}
                          style={{
                            backgroundColor: "#EDF2F7",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                    ) : (
                      <div className="mt-5">
                        {verify ? <VerifyPhoneNumber /> : <AddPhoneNumber />}
                      </div>
                    )}
                  </Collapse.Panel>
                  <Collapse.Panel
                    key="2"
                    header={
                      <CollapseTitle title={"Delivery Details"} number={"2"} />
                    }
                  >
                    <CollapseItem
                      deliveryAddress={shippingAddress}
                      deliveryAddressList={shippingAddressList}
                      shippingAddressId={shippingAddressId}
                      setShippingAddressId={setShippingAddressId}
                      lonLat={lonLat}
                      getShipAddressById={getShipAddressById}
                    />
                  </Collapse.Panel>
                  <Collapse.Panel
                    key="3"
                    collapsible="header"
                    header={<CollapseTitle title={"Payment"} number={"3"} />}
                  >
                    {/* <div
                      className="flex flex-row-reverse checkout-btn py-4"
                      style={{ minWidth: 360, width: "100%" }}
                    >
                      <App sec={clientSecret} />
                    </div> */}
                    <Row justify="center">
                      <Col span={20}>
                        <App shipping_id={shippingAddressId} />
                        {/* <PaymentCard shipping_id={shippingAddressId} /> */}
                      </Col>
                    </Row>
                  </Collapse.Panel>
                </Collapse>
              </div>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default Payments;
