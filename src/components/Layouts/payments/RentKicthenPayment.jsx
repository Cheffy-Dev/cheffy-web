import { HomeFilled } from "@ant-design/icons";
import { Col, Collapse, Input, Row, Typography } from "antd";
import Form from "antd/lib/form/Form";
import { useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import App from "../../../payments/App";
import { asyncLocalStorage } from "../../../utils/localStorage";

export default function Payment() {
  const [session, loading] = useSession();
  const dispatch = useDispatch();
  const { Panel } = Collapse;
  const { Text } = Typography;

  const [total, setTotal] = useState(0.0);
  const [data, setData] = useState([]);
  const [kitchenData, setKitchenData] = useState("");
  const [chefData, setChefData] = useState("");
  const [kitchenCostData, setKitchenCostData] = useState("");
  const [RentKitchenDate, setRentKitchenDate] = useState("");
  const [RentKitchenHour, setRentKitchenHour] = useState("");
  const [UserInfo, setUserInfo] = useState([]);

  const Item = ({ price, name, orderCount, plateID }) => {
    // console.log(key)
    const [numberof, setNumber] = useState(orderCount);

    const updateDOM = async (plateId, type) => {
      let cartitems = await asyncLocalStorage.getItem("cartitems");
      cartitems = JSON.parse(cartitems)["items"];
      if (cartitems.length > 0) {
        cartitems.forEach((item) => {
          if (item["plateId"] == plateId) {
            if (type === "add") {
              item["ordered"] = item["ordered"] + 1;
            } else {
              item["ordered"] = item["ordered"] - 1;
            }
          }
        });
        await asyncLocalStorage.setItem(
          "cartitems",
          JSON.stringify({ items: cartitems })
        );
        window.location.reload();
      }
    };
    return (
      <>
        <hr />
        <div className="cart-item flex flex-row justify-between">
          <div className="order-last py-4">
            <div className="flex flex-row items-center">
              <span className="flex space-x-2">
                <p className="font-bold space-x-1">${price}</p> <p>x</p>{" "}
                <p className="font-semibold">{numberof}</p>
              </span>
            </div>
          </div>
          <p className="text-base py-4 font-light">{name}</p>
        </div>
      </>
    );
  };

  useEffect(async () => {
    let kitchenInfo = await asyncLocalStorage.getItem("kitchenName");
    let chefInfo = await asyncLocalStorage.getItem("chefName");
    let kitchenCost = await asyncLocalStorage.getItem("kitchenCost");
    setKitchenData(kitchenInfo);
    setChefData(chefInfo);
    setKitchenCostData(kitchenCost);

    let RentKitchenDate = await asyncLocalStorage.getItem("saveDate");
    let RentKitchenHour = await asyncLocalStorage.getItem("saveHour");
    setRentKitchenDate(RentKitchenDate);
    setRentKitchenHour(RentKitchenHour);
  }, []);

  return (
    <div className="h-auto mt-10">
      <Row className="mt-20 pt-2 pb-4 mx-auto w-3/5" align="middle">
        <Col span={24} className="flex justify-start items-center">
          <HomeFilled />
          <Text strong className="text-black ml-4">
            Payments
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
            Payments
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
          <Collapse
            defaultActiveKey={["2"]}
            style={{ backgroundColor: "#fff", border: "none" }}
          >
            <Panel
              header="Personal Details"
              key="2"
              className="text-2xl font-bold"
            >
              <Form>
                <div className="mt-1">
                  <label for="name" style={{ fontSize: "16px" }}>
                    Name:
                  </label>
                  <Input
                    className="w-100 py-4 px-3 mt-1 text-lg font-normal"
                    value={session.user.name}
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
                    type="email"
                    className="w-100 py-4 px-3 mt-1 text-lg font-normal"
                    value={session.user.email}
                    name="email"
                    bordered={false}
                    style={{
                      backgroundColor: "#EDF2F7",
                      borderRadius: "10px",
                    }}
                  />
                </div>
                <div className="mt-5">
                  <label for="phone" style={{ fontSize: "16px" }}>
                    Phone:
                  </label>
                  <Input
                    type="text"
                    className="w-100 py-4 px-3 mt-1 text-lg font-normal"
                    value={session.user.phone}
                    name="phone"
                    bordered={false}
                    style={{
                      backgroundColor: "#EDF2F7",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              </Form>
            </Panel>
            <Panel header="Payment" key="3" className="text-2xl font-bold">
              <App />
            </Panel>
          </Collapse>
          <div>
            <div className="px-2 py-4">
              <h3 style={{ fontSize: "20px" }}>Kitchen Information</h3>
              <hr />
              <div className="cart-item flex flex-row justify-between">
                <p className="text-base py-4 font-light">{kitchenData}</p>
                <p className="text-base py-4 font-light">{chefData}</p>
              </div>
              <hr />
              <br />
              <h3 style={{ fontSize: "20px" }}>Date and Time</h3>
              <hr />
              <div className="cart-item flex flex-row justify-between">
                <p className="text-base py-4 font-light">{RentKitchenDate}</p>
                <p className="text-base py-4 font-light">{RentKitchenHour}</p>
              </div>
              <hr />
              <div className="pt-4 pb-2 cart-info ">
                <div className="flex cart-info justify-between pt-1">
                  <div className="cart-total order-last">
                    <p className="font-normal text-base">${kitchenCostData}</p>
                  </div>
                  <span className="font-normal text-lg">Subtotal</span>
                </div>
              </div>
              <div className="pt-2 pb-4 cart-info ">
                <div className="flex cart-info justify-between pt-1">
                  <div className="cart-total order-last">
                    <p className="font-bold  text-base">${kitchenCostData}</p>
                  </div>
                  <span className="font-bold text-lg">Total</span>
                </div>
              </div>
              <div className="flex flex-row-reverse checkout-btn cursor-pointer">
                <p className="py-4 px-10 text-center bg-red-500 text-white font-semibold">
                  Checkout &#8594;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
