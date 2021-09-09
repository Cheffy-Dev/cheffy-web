import { HomeFilled } from "@ant-design/icons";
import {
  Button,
  Col,
  Collapse,
  Input,
  Row,
  Select,
  Switch,
  Typography,
} from "antd";
import Form from "antd/lib/form/Form";
import Link from "next/link";
import { useEffect, useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import App from "../../../payments/App";
import { getPlateByID } from "../../../redux/actions/food";
import { asyncLocalStorage } from "../../../utils/localStorage";

export default function Payment() {
  const dispatch = useDispatch();
  const { Panel } = Collapse;
  const { Text } = Typography;
  const { Option } = Select;
  const [isCart, setisCart] = useState(false);
  const [total, setTotal] = useState(0.0);
  const [data, setData] = useState([]);

  const Item = ({ price, name, orderCount, plateID }) => {
    // console.log(key)
    const [numberof, setNumber] = useState(orderCount);

    const updateDOM = async (plateId, type) => {
      let cartitems = await asyncLocalStorage.getItem("cartitems");
      console.log(cartitems);
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
    if (!isCart) {
      let cartitems = await asyncLocalStorage.getItem("cartitems");
      cartitems = JSON.parse(cartitems);
      // if (cartitems) {
      //   for (const itemKey in cartitems["items"]) {
      //     const item = cartitems["items"][itemKey];
      //     const plateId = item["plateId"];
      //     let plateData = await dispatch(getPlateByID(plateId));
      //     const plateDataToPush = {
      //       plate_id: plateId,
      //       count: item["ordered"],
      //       plate_name: plateData.data.name,
      //       plate_price: plateData.data.price,
      //     };
      //     setTotal((total) => total + plateData.data.price * item["ordered"]);
      //     setData((data) => [...data, plateDataToPush]);
      //   }
      // }
      setisCart(true);
    }
  }, []);

  return (
    <div className="h-auto mt-10">
      <Row className="mt-10 pt-2 pb-4 mx-auto w-3/5" align="middle">
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
            defaultActiveKey={["1"]}
            style={{ backgroundColor: "#fff", border: "none" }}
          >
            <Panel
              header="Delivery details"
              key="1"
              className="text-2xl font-bold"
            >
              <div
                className="flex align-center justify-between p-4 my-4"
                style={{ background: "#EDF2F7", borderRadius: "10px" }}
              >
                <div
                  className="flex align-start justify-center"
                  style={{ flexDirection: "column" }}
                >
                  <h3 style={{ fontSize: "20px" }}>Contactless Delivery</h3>
                  <p
                    className="font-normal text-1xl"
                    style={{ fontSize: "16px" }}
                  >
                    Be safe, the rider will place your order at your door.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <h2 className="text-lg mt-7 block">Delivery time</h2>
              <Select
                className="w-100 py-4 px-2 mt-5 text-lg font-normal"
                defaultValue="Thu, Mar 18"
                bordered={false}
                style={{
                  backgroundColor: "#EDF2F7",
                  borderRadius: "10px",
                }}
              >
                <Option value="Thu, Mar 18">Thu, Mar 18</Option>
                <Option value="Fri, Mar 19">Fri, Mar 19</Option>
                <Option value="Sat, Mar 20">Sat, Mar 20</Option>
              </Select>

              <Select
                className="w-100 py-4 px-2 mt-5 text-lg font-normal"
                defaultValue="ASAP"
                bordered={false}
                style={{
                  backgroundColor: "#EDF2F7",
                  borderRadius: "10px",
                }}
              >
                <Option value="ASAP">ASAP</Option>
              </Select>
              <h2 className="text-lg mt-7 block">Delivery Address</h2>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29901.797762894632!2d-54.620473700000005!3d-20.476496599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9486e6034a797b1f%3A0x391170b8037b1c9!2sR.%20Treze%20de%20Maio%2C%201220%20-%20Vila%20Gloria%2C%20Campo%20Grande%20-%20MS%2C%2079004-420!5e0!3m2!1spt-BR!2sbr!4v1616110021970!5m2!1spt-BR!2sbr"
                width="400"
                height="300"
                allowFullScreen=""
                loading="lazy"
                className="w-100 mt-5"
              ></iframe>
              <Input
                className="w-100 py-4 px-3 mt-5 text-lg font-normal"
                value="Thu, Mar 18"
                bordered={false}
                style={{
                  backgroundColor: "#EDF2F7",
                  borderRadius: "10px",
                }}
              />
              <textarea
                name="observation"
                id="observation"
                placeholder="Note to chef or rider..."
                rows="5"
                className="w-100 mt-5 p-3 text-lg font-normal"
                style={{
                  backgroundColor: "#EDF2F7",
                  borderRadius: "10px",
                  resize: "none",
                }}
              ></textarea>
              <Button type="primary" danger className="text-xl h-auto mt-5">
                Add a plate
              </Button>
            </Panel>
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
                    disabled
                    className="w-100 py-4 px-3 mt-1 text-lg font-normal"
                    value="Lucas Silva"
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
                    value="lucascelestiano@gmail.com"
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
                    disabled
                    type="text"
                    className="w-100 py-4 px-3 mt-1 text-lg font-normal"
                    value="2756816515"
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
              {isCart === true && data.length > 0 ? (
                <>
                  {data.map((plate_data, index) => {
                    console.log(index);
                    return (
                      <>
                        <Item
                          key={index}
                          plateID={plate_data["plate_id"]}
                          name={plate_data["plate_name"]}
                          price={plate_data["plate_price"]}
                          orderCount={plate_data["count"]}
                        />
                      </>
                    );
                  })}
                  <hr />
                  <div className="pt-4 pb-2 cart-info ">
                    <div className="flex cart-info justify-between pt-1">
                      <div className="cart-total order-last">
                        <p className="font-normal text-base">
                          ${total.toFixed(2)}
                        </p>
                      </div>
                      <span className="font-normal text-lg">Subtotal</span>
                    </div>
                  </div>
                  <div className="py-2 cart-info ">
                    <div className="flex cart-info justify-between pt-1">
                      <div className="cart-total order-last">
                        <p className="font-normal text-base">
                          ${0.13 * total.toFixed(2)}
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
                  <div className="flex flex-row-reverse checkout-btn cursor-pointer">
                    <p className="py-4 px-10 text-center bg-red-500 text-white font-semibold">
                      Checkout &#8594;
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {isCart && data.length < 1 ? (
                    <p className="text-center text-3xl py-6">
                      Your Cart is empty
                      <Link href="/">
                        <a className="block text-xl pt-4">Go to Home &#8594;</a>
                      </Link>
                    </p>
                  ) : (
                    <div className="flex pt-20 flex-col items-center justify-center">
                      <p className="text-3xl">Loading</p>
                      <VscLoading className="text-4xl animate-spin" />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
