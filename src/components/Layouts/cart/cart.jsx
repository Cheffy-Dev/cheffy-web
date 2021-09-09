// import { DeleteFilled, HomeFilled, InfoCircleFilled } from "@ant-design/icons";
// import { Col, Drawer, Row, Typography } from "antd";
// import { useSession } from "next-auth/client";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { VscLoading } from "react-icons/vsc";
// import { useDispatch } from "react-redux";
// import {
//   decreaseItemToCart,
//   getUserBasket,
//   increaseItemToCart,
//   removeInCart
// } from "../../../redux/actions/cart/cartAction";
// import { asyncLocalStorage } from "../../../utils/localStorage";
// import { currencyFormat } from "../../../utils/util";
// import LoginPage1 from "../../Layouts/Header/Login/LoginPage1";
// import LoginPage2 from "../../Layouts/Header/Login/LoginPage2";

// const { Text } = Typography;

// const Item = ({
//   price,
//   name,
//   orderCount,
//   plateID,
//   basketItemId,
//   plateOrKitchen,
// }) => {
//   const [session, loading] = useSession();
//   const dispatch = useDispatch();
//   const [quantity, setQuantity] = useState(orderCount);
//   // const [change, setChange] = useState(false);
//   const itemId = basketItemId;
//   // useEffect(async () => {
//   //   window.location.reload();
//   // }, [quantity]);

//   // useEffect(async () => {
//   //   let cartitems = await asyncLocalStorage.getItem("cartitems");
//   //   cartitems = JSON.parse(cartitems)["items"];
//   //   if (cartitems.length > 0) {
//   //     cartitems.forEach((item) => {
//   //       if (item["plateId"] == plateId) {
//   //         console.log("found");
//   //         if (type === "add") {
//   //           item["ordered"] = item["ordered"] + 1;
//   //         } else {
//   //           item["ordered"] = item["ordered"] - 1;
//   //         }
//   //         console.log(item);
//   //       }
//   //     });
//   //     console.log(cartitems);
//   //     await asyncLocalStorage.setItem(
//   //       "cartitems",
//   //       JSON.stringify({ items: cartitems })
//   //     );
//   //     console.log("items set");
//   //     try {
//   //       if (session) {
//   //         let deliveryType = "user";
//   //         if (type === "add") {
//   //           await dispatch(increaseItemToCart(itemId, deliveryType));
//   //         } else {
//   //           await dispatch(decreaseItemToCart(itemId, deliveryType));
//   //         }
//   //       }
//   //     } catch {
//   //       console.log("dispatch error");
//   //     }
//   //     window.location.reload();
//   //   }
//   // }, [quantity])
//   const updateDOM = async (
//     basketItemId,
//     plateOrKitchenId,
//     type,
//     plateOrKitchen
//   ) => {
//     let cartitems = await asyncLocalStorage.getItem("cartitems");
//     cartitems = JSON.parse(cartitems)["items"];
//     if (cartitems.length > 0) {
//       cartitems.forEach((item) => {
//         if (item[`${plateOrKitchen}Id`] == plateOrKitchenId) {
//           console.log("found");
//           if (type === "add") {
//             item["ordered"] = item["ordered"] + 1;
//           } else {
//             item["ordered"] = item["ordered"] - 1;
//           }
//           console.log(item);
//         }
//       });
//       console.log(cartitems);
//       await asyncLocalStorage.setItem(
//         "cartitems",
//         JSON.stringify({ items: cartitems })
//       );
//       console.log("items set");
//       if (session) {
//         let deliveryType = "user";
//         if (type === "add") {
//           await dispatch(increaseItemToCart(itemId, deliveryType));
//         } else {
//           await dispatch(decreaseItemToCart(itemId, deliveryType));
//         }
//       }
//       // setChange((val) => !val);
//       window.location.reload();
//     }
//   };

//   const AddOne = (basketItemId, plateOrKitchenID, plateOrKitchen) => {
//     console.log("AddOne");
//     console.log(quantity);
//     if (quantity < 10) {
//       setQuantity(quantity + 1);
//       updateDOM(basketItemId, plateOrKitchenID, "add", plateOrKitchen);
//     }
//   };

//   const removeOne = (basketItemId, plateOrKitchenID, plateOrKitchen) => {
//     console.log("removeOne");
//     console.log(quantity);
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//       updateDOM(basketItemId, plateOrKitchenID, "remove", plateOrKitchen);
//     } else {
//       // setQuantity(0);
//       removeItemInCart(basketItemId, plateOrKitchenID, plateOrKitchen);
//     }
//   };

//   const removeItemInCart = async (basketItemId, plateOrKitchenID, name) => {
//     let deliveryType = "user";
//     await dispatch(removeInCart(basketItemId, deliveryType, plateOrKitchenID));

//     let cartitems = await asyncLocalStorage.getItem("cartitems");
//     cartitems = JSON.parse(cartitems)["items"];

//     if (plateOrKitchen === "plate") {
//       cartitems = cartitems.filter(
//         (e) => e.plateId.toString() !== plateOrKitchenID.toString()
//       );
//     } else {
//       cartitems = cartitems.filter(
//         (e) =>
//           e.kitchenId.toString() !== plateOrKitchenID.toString() &&
//           e.kitchenName.toString() !== name
//       );
//     }

//     if (cartitems.length > 0) {
//       await asyncLocalStorage.setItem(
//         "cartitems",
//         JSON.stringify({ items: cartitems })
//       );
//     } else {
//       await asyncLocalStorage.removeItem("cartitems");
//     }
//     // setCartData(cartitems);
//     setQuantity(0);
//     window.location.reload();
//   };

//   return (
//     <>
//       <hr />
//       <Row gutter={2} className="py-4 px-2 items-center">
//         <Col span={16} className="flex items-center">
//           <DeleteFilled
//             onClick={() => removeItemInCart(itemId, plateID, name)}
//             className="mr-3 text-lg pb-1 cursor-pointer"
//           />
//           <p>{name}</p>
//         </Col>
//         <Col
//           span={4}
//           className="lg:ml-auto py-1 border-b-2 border-gray-400 bg-gray-300"
//         >
//           <Row justify="space-around" gutter={8}>
//             <Col>
//               <button onClick={() => AddOne(itemId, plateID, plateOrKitchen)}>
//                 +
//               </button>
//             </Col>
//             <Col>
//               <p className="mx-2">{quantity}</p>
//             </Col>
//             <Col>
//               <button
//                 onClick={() => removeOne(itemId, plateID, plateOrKitchen)}
//               >
//                 -
//               </button>
//             </Col>
//           </Row>
//         </Col>
//         <Col span={3} className="text-right ml-auto">
//           {currencyFormat(price)}
//         </Col>
//       </Row>
//     </>
//   );
// };

// function Cart() {
//   const [session, loading] = useSession();
//   const dispatch = useDispatch();
//   const [data, setData] = useState([]);
//   const [isCart, setisCart] = useState(false);
//   const [change, setChange] = useState(false);
//   const [sessionFlag, setSessionFlag] = useState(false);
//   const [total, setTotal] = useState(0.0);
//   const [isMobile, setIsMobile] = useState(false);
//   const [visible, setVisible] = useState(false);
//   const [state, setState] = useState({
//     customer: "",
//     page1: true,
//     page2: false,
//   });

//   const moveToPage2 = () => {
//     setState({
//       ...state,
//       page1: false,
//       page2: true,
//     });
//   };

//   const goToPage1 = () => {
//     setState({
//       ...state,
//       page1: true,
//       page2: false,
//     });
//   };

//   const onClose = () => {
//     setTimeout(() => {
//       setState({
//         ...state,
//         page1: true,
//         page2: false,
//       });
//     }, 500);
//     setVisible(false);
//   };

//   useEffect(async () => {
//     window.screen.width < 780 ? setIsMobile(true) : setIsMobile(false);
//     if (!isCart) {
//       let cartitems = await asyncLocalStorage.getItem("cartitems");
//       cartitems = JSON.parse(cartitems);

//       if (cartitems) {
//         let deliveryType = "user";
//         //get basket items here
//         if (session) {
//           let basketData = await dispatch(getUserBasket(deliveryType));
//           setData((data) => basketData.items);
//           setTotal((total) => basketData.total);
//           setSessionFlag(true);
//         } else {
//           //   for (const itemKey in cartitems["items"]) {
//           //     const item = cartitems["items"][itemKey];

//           //     if (!item["kitchenId"]) {
//           //       const plateId = item["plateId"];
//           //       let plateData = await dispatch(getPlateByID(plateId));
//           //       const plateDataToPush = {
//           //         id: plateId,
//           //         count: item["ordered"],
//           //         plate_name: plateData.data.name,
//           //         plate_price: (plateData.data.price * item["ordered"]).toFixed(2),
//           //       };
//           //       console.log("Pushed", plateDataToPush);
//           //       // console.log(data)
//           //       setTotal((total) => total + plateData.data.price * item["ordered"]);
//           //       setData((data) => [...data, plateDataToPush]);

//           //     } else {
//           //       const kitchenId = item["kitchenId"];
//           //       const kitchenName = item["kitchenName"];
//           //       // TODO: we need to get kitchen by ID! Need to implement on API
//           //       let kitchenData = await dispatch(getKitchenByName(kitchenName));
//           //       const kitchenDataToPush = {
//           //         id: kitchenId,
//           //         count: item["ordered"],
//           //         kitchen_name: kitchenData.name,
//           //         kitchen_price: (kitchenData.price_per_time * item["ordered"]).toFixed(2),
//           //       };
//           //       console.log("Pushed", kitchenDataToPush);
//           //       // console.log(data)
//           //       setTotal((total) => total + kitchenData.price_per_time * item["ordered"]);
//           //       setData((data) => [...data, kitchenDataToPush]);
//           //     }
//           //   }
//           setSessionFlag(false);
//         }
//       }
//       setisCart(true);
//     }
//   }, []);
//   useEffect(async () => {
//     if (!isCart) {
//       let cartitems = await asyncLocalStorage.getItem("cartitems");
//       cartitems = JSON.parse(cartitems);
//       if (cartitems) {
//         let deliveryType = "user";
//         //get basket items here
//         if (session) {
//           let basketData = await dispatch(getUserBasket(deliveryType));
//           setData((data) => basketData.items);
//           setTotal((total) => basketData.total);
//           setSessionFlag(true);
//         } else {
//           setSessionFlag(false);
//         }
//       }
//     }
//   });
//   // useEffect(async () => {
//   //   if (!isCart) {
//   //     let cartitems = await asyncLocalStorage.getItem("cartitems");
//   //     cartitems = JSON.parse(cartitems);
//   //     if (cartitems) {
//   //       let deliveryType = "user";
//   //       //get basket items here
//   //       if (session) {
//   //         let basketData = await dispatch(getUserBasket(deliveryType));
//   //         setData((data) => basketData.items);
//   //         setTotal((total) => basketData.total);
//   //         setSessionFlag(true);
//   //       } else {
//   //         for (const itemKey in cartitems["items"]) {
//   //           const item = cartitems["items"][itemKey];
//   //           const plateId = item["plateId"];
//   //           let plateData = await dispatch(getPlateByID(plateId));
//   //           const plateDataToPush = {
//   //             plate_id: plateId,
//   //             count: item["ordered"],
//   //             plate_name: plateData.data.name,
//   //             plate_price: (plateData.data.price * item["ordered"]).toFixed(2),
//   //           };
//   //           console.log("Pushed", plateDataToPush);
//   //           console.log(total + plateData.data.price * item["ordered"]);
//   //           setTotal((total) => total + plateData.data.price * item["ordered"]);
//   //           setData((data) => [...data, plateDataToPush]);
//   //         }
//   //         setSessionFlag(false);
//   //       }
//   //     }
//   //     setisCart(true);
//   //   }
//   // }, [change]);
//   // const setCartData = async (cartitems) => {
//   //   for (const itemKey in cartitems["items"]) {
//   //     const item = cartitems["items"][itemKey];
//   //     const plateId = item["plateId"];
//   //     let plateData = await dispatch(getPlateByID(plateId));
//   //     const plateDataToPush = {
//   //       plate_id: plateId,
//   //       count: item["ordered"],
//   //       plate_name: plateData.data.name,
//   //       plate_price: (plateData.data.price * item["ordered"]).toFixed(2),
//   //     };
//   //     setTotal((total) => total + plateData.data.price * item["ordered"]);
//   //     setData((data) => [...data, plateDataToPush]);
//   //   }
//   // };

//   return (
//     <div>
//       <div className="cart-banner">
//         <Row className="mt-10 pt-2 pb-4 mx-auto w-3/5" align="middle">
//           <Col span={24} className="flex justify-start items-center">
//             <HomeFilled />
//             <Text strong className="text-black ml-4">
//               Cart
//             </Text>
//           </Col>
//         </Row>
//         <Row
//           className="w-full bg-fixed bg-cover bg-no-repeat bg-center relative"
//           style={{
//             backgroundImage: "url(/images/cartbg.jpg)",
//             height: "40vh",
//             backgroundSize: "100%",
//             filter: "brightness(50%)",
//           }}
//           justify="center"
//           align="middle"
//         ></Row>
//         <Row
//           className="absolute w-full"
//           style={{ height: "40vh", transform: "translateY(-100%)" }}
//           justify="center"
//           align="middle"
//         >
//           <Col>
//             <Text strong className="block text-white text-3xl">
//               Cart
//             </Text>
//           </Col>
//         </Row>
//       </div>
//       <div className="cart-main lg:px-36 md:px-20 px-2 py-20">
//         {!isCart && data.length > 1 && (
//           <Text className="lg:px-36 md:px-20 px-2 text-2xl" strong>
//             Items
//           </Text>
//         )}

//         <div className="lg:px-36 md:px-20 px-2 py-4">
//           {session && sessionFlag ? (
//             <>
//               {isCart === true && data.length > 0 ? (
//                 <>
//                   {data.map((basket, index) => {
//                     return (
//                       <Item
//                         key={index}
//                         basketItemId={basket.basketItemId}
//                         plateID={basket.plate.id}
//                         name={basket.plate.name}
//                         price={basket.total_value}
//                         orderCount={basket.quantity}
//                       />
//                     );
//                   })}
//                   <hr />
//                   <div className="py-4 cart-info ">
//                     <div className="flex cart-info justify-between pt-1">
//                       <div className="cart-total order-last">
//                         <p className="font-semibold text-base">${total}</p>
//                       </div>
//                       <span className="font-semibold text-lg">
//                         Subtotal
//                         <p className="flex items-center text-xs">
//                           <InfoCircleFilled className="mr-1 text-red-500" />{" "}
//                           Extra charges may apply
//                         </p>
//                       </span>
//                     </div>
//                   </div>
//                   <div>
//                     <div className="flex flex-row-reverse checkout-btn">
//                       <p className="py-4 px-10 text-center bg-red-500 text-white font-semibold">
//                         <Link href="/payments">
//                           <a> Checkout &#8594;</a>
//                         </Link>
//                       </p>
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   {isCart && data.length < 1 ? (
//                     <Row>
//                       <Col span={12} style={{ alignSelf: "center" }}>
//                         <h3 className="font-extrabold text-2xl sm:text-4xl md:text-4xl lg:text-5xl py-10">
//                           Your Cart is Empty
//                         </h3>
//                         <Link href="/">
//                           <a className="block text-lg">
//                             <button
//                               type="button"
//                               className="ant-btn ant-btn-primary mr-4 rounded-md px-7 py-6 flex items-center"
//                             >
//                               <strong>Find something to Eat &#8594;</strong>
//                             </button>
//                           </a>
//                         </Link>
//                       </Col>
//                       <Col span={12}>
//                         <img src="/images/empty-cart.jpg" />
//                       </Col>
//                     </Row>
//                   ) : (
//                     <div className="flex pt-20 flex-col items-center justify-center">
//                       <p className="text-3xl">Loading</p>
//                       <VscLoading className="text-4xl animate-spin" />
//                     </div>
//                   )}
//                 </>
//               )}

//               <Drawer
//                 destroyOnClose
//                 placement="left"
//                 closable={false}
//                 onClose={onClose}
//                 visible={visible}
//                 width={isMobile ? "100%" : "35%"}
//                 drawerStyle={{
//                   width: "83%",
//                   marginLeft: "auto",
//                   marginRight: "auto",
//                 }}
//                 keyboard={true}
//               >
//                 {state.page1 && (
//                   <LoginPage1
//                     onClick={() => setVisible(false)}
//                     onPartnerSignInClick={moveToPage2}
//                     onUserSignInClick={moveToPage2}
//                   />
//                 )}
//                 {state.page2 && (
//                   <LoginPage2
//                     onClick={onClose}
//                     goBack={goToPage1}
//                     customer={state.customer}
//                   />
//                 )}
//               </Drawer>
//             </>
//           ) : (
//             <>
//               <Row>
//                 <Col span={12} style={{ alignSelf: "center" }}>
//                   <h3 className="font-extrabold text-2xl sm:text-4xl md:text-4xl lg:text-5xl py-10">
//                     Please Login to order food
//                   </h3>

//                   <button
//                     onClick={() => setVisible(true)}
//                     className="ant-btn ant-btn-primary mr-4 rounded-md px-7 py-6 flex items-center"
//                   >
//                     <strong>Login &#8594;</strong>
//                   </button>
//                 </Col>
//                 <Col span={12}>
//                   <img src="/images/empty-cart.jpg" />
//                 </Col>
//               </Row>
//               {/* <Row>
//                 <Col style={{ alignSelf: "center" }}>
//                   <h3 className="font-extrabold text-2xl sm:text-4xl md:text-4xl lg:text-5xl py-10"></h3>
//                 </Col>
//               </Row>
//               <>
//                 <div
//                   className="flex flex-row-reverse checkout-btn"
//                   onClick={() => setVisible(true)}
//                 >
//                   <p className="py-4 px-10 text-center bg-red-500 text-white font-semibold">
//                     <a> Login &#8594;</a>
//                   </p>
//                 </div>
//               </> */}
//               {/* {data.map((plate_data, index) => {
//                     return (
//                       <Item
//                         key={index}
//                         plateID={plate_data["id"]}
//                         name={
//                           plate_data["plate_name"] ?? plate_data["kitchen_name"]
//                         }
//                         price={
//                           plate_data["plate_price"] ??
//                           plate_data["kitchen_price"]
//                         }
//                         orderCount={plate_data["count"]}
//                         plateOrKitchen={
//                           plate_data["plate_name"] ? "plate" : "kitchen"
//                         }
//                       />
//                     );
//                   })} */}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Cart;
import { DeleteFilled, HomeFilled, InfoCircleFilled } from "@ant-design/icons";
import { Col, Drawer, Row, Typography, Button } from "antd";
import { useSession } from "next-auth/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import {
  decreaseItemToCart,
  getUserBasket,
  increaseItemToCart,
  removeInCart,
} from "../../../redux/actions/cart/cartAction";
import { getPlateByID } from "../../../redux/actions/food";
import { asyncLocalStorage } from "../../../utils/localStorage";
import LoginPage1 from "../../Layouts/Header/Login/LoginPage1";
import LoginPage2 from "../../Layouts/Header/Login/LoginPage2";

const { Text } = Typography;

const Item = ({
  price,
  name,
  orderCount,
  plateId,
  basketItemId,
  updateDOM,
}) => {
  const [quantity, setQuantity] = useState(orderCount);
  const AddOne = (basketItemId, plateId) => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
      updateDOM(basketItemId, plateId, "add");
    }
  };
  const removeOne = (basketItemId, plateId) => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      updateDOM(basketItemId, plateId, "remove");
    } else {
      removeItemInCart(basketItemId, plateId);
    }
  };

  const removeItemInCart = async (basketItemId, plateId) => {
    updateDOM(basketItemId, plateId, "delete");
  };

  return (
    <div>
      <hr />
      <Row gutter={2} className="py-4 px-2 items-center">
        <Col span={16} className="flex items-center">
          <DeleteFilled
            onClick={() => removeItemInCart(basketItemId, plateId)}
            className="mr-3 text-lg pb-1 cursor-pointer"
          />
          <p>{name}</p>
        </Col>
        <Col
          span={4}
          className="lg:ml-auto py-1 border-b-2 border-gray-400 bg-gray-300"
        >
          <Row justify="space-around" gutter={8}>
            <Col>
              <button onClick={() => AddOne(basketItemId, plateId)}>+</button>
            </Col>
            <Col>
              <p className="mx-2">{quantity}</p>
            </Col>
            <Col>
              <button onClick={() => removeOne(basketItemId, plateId)}>
                -
              </button>
            </Col>
          </Row>
        </Col>
        <Col span={3} className="text-right ml-auto">
          {"$ " + price}
        </Col>
      </Row>
    </div>
  );
};

function Cart() {
  const [session, loading] = useSession();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isCart, setisCart] = useState(false);
  const [sessionFlag, setSessionFlag] = useState(false);
  const [total, setTotal] = useState(0.0);
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState({
    customer: "",
    page1: true,
    page2: false,
  });

  const moveToPage2 = () => {
    setState({
      ...state,
      page1: false,
      page2: true,
    });
  };

  const goToPage1 = () => {
    setState({
      ...state,
      page1: true,
      page2: false,
    });
  };

  const onClose = () => {
    setTimeout(() => {
      setState({
        ...state,
        page1: true,
        page2: false,
      });
    }, 500);
    setVisible(false);
  };

  useEffect(async () => {
    window.screen.width < 780 ? setIsMobile(true) : setIsMobile(false);
    if (!isCart) {
      let cartitems = await asyncLocalStorage.getItem("cartitems");
      cartitems = JSON.parse(cartitems);
      if (cartitems) {
        let deliveryType = "user";
        //get basket items here
        if (session) {
          let basketData = await dispatch(getUserBasket(deliveryType));
          setData((data) => basketData.items);
          setTotal((total) => basketData.total);
          setSessionFlag(true);
        }
      }
      setisCart(true);
    }
  }, []);

  // useEffect(async () => {
  //   let cartitems = await asyncLocalStorage.getItem("cartitems");
  //   cartitems = JSON.parse(cartitems);
  //   if (cartitems) {
  //     let deliveryType = "user";
  //     let basketData = await dispatch(getUserBasket(deliveryType));
  //     setData((data) => basketData.items);
  //     setTotal((total) => basketData.total);
  //   }
  // },[data]);

  const updateDOM = async (basketItemId, plateId, type) => {
    let cartitems = await asyncLocalStorage.getItem("cartitems");
    cartitems = JSON.parse(cartitems)["items"];
    let deliveryType = "user";
    if (type === "delete") {
      cartitems = cartitems.filter(
        (e) => e.plateId.toString() !== plateId.toString()
      );
      if (cartitems.length > 0) {
        await asyncLocalStorage.setItem(
          "cartitems",
          JSON.stringify({ items: cartitems })
        );
        dispatch(removeInCart(basketItemId, deliveryType, plateId));
        let basketData = await dispatch(getUserBasket(deliveryType));
        setData((data) => basketData.items);
        setTotal((total) => basketData.total);
        window.location.reload();
      } else {
        await asyncLocalStorage.removeItem("cartitems");
        dispatch(removeInCart(basketItemId, deliveryType, plateId));
        window.location.reload();
      }
    } else if (cartitems.length > 0) {
      cartitems.forEach((item) => {
        if (item["plateId"] == plateId) {
          if (type === "add") {
            item["ordered"] = item["ordered"] + 1;
            dispatch(increaseItemToCart(basketItemId, deliveryType));
          } else if (type === "remove") {
            item["ordered"] = item["ordered"] - 1;
            dispatch(decreaseItemToCart(basketItemId, deliveryType));
          }
        } else {
          console.log("plate not found");
        }
      });
      await asyncLocalStorage.setItem(
        "cartitems",
        JSON.stringify({ items: cartitems })
      );
      let basketData = await dispatch(getUserBasket(deliveryType));
      setData((data) => basketData.items);
      setTotal((total) => basketData.total);
    }
  };
  // const setCartData = async (cartitems) => {
  //   for (const itemKey in cartitems["items"]) {
  //     const item = cartitems["items"][itemKey];
  //     const plateId = item["plateId"];
  //     let plateData = await dispatch(getPlateByID(plateId));
  //     const plateDataToPush = {
  //       plate_id: plateId,
  //       count: item["ordered"],
  //       plate_name: plateData.data.name,
  //       plate_price: (plateData.data.price * item["ordered"]).toFixed(2),
  //     };
  //     setTotal((total) => total + plateData.data.price * item["ordered"]);
  //     setData((data) => [...data, plateDataToPush]);
  //   }
  // };

  return (
    <div>
      <div className="cart-banner">
        <Row className=" pt-2 pb-4 mx-auto w-3/5" align="middle">
          <Col span={24} className="flex justify-start items-center">
            <HomeFilled />
            <Text strong className="text-black ml-4">
              Cart
            </Text>
          </Col>
        </Row>
        <Row
          className="w-full bg-fixed bg-cover bg-no-repeat bg-center relative"
          style={{
            backgroundImage: "url(/images/cartbg.jpg)",
            height: "30vh",
            backgroundSize: "100%",
            filter: "brightness(50%)",
            backgroundAttachment: "fixed",
          }}
          justify="center"
          align="middle"
        ></Row>
        <Row
          className="absolute w-full"
          style={{ height: "30vh", transform: "translateY(-100%)" }}
          justify="center"
          align="middle"
        >
          <Col>
            <h3
              strong
              className="block text-white text-3xl"
              style={{ fontWeight: "900" }}
            >
              Cart
            </h3>
          </Col>
        </Row>
      </div>
      <div className="cart-main lg:px-36 md:px-20 px-5 py-20">
        {isCart && data && data.length > 0 ? (
          <>
            <Text className="lg:px-36 md:px-20 px-2 text-2xl" strong>
              Items
            </Text>
            <div className="lg:px-36 md:px-20 px-2 py-4">
              <div>
                {session && sessionFlag ? (
                  <div>
                    {data.map((basket, index) => {
                      return (
                        <Item
                          key={index}
                          basketItemId={basket.basketItemId}
                          plateId={basket.plate.id}
                          name={basket.plate.name}
                          price={basket.total_value}
                          orderCount={basket.quantity}
                          updateDOM={updateDOM}
                          setData={setData}
                          setTotal={setTotal}
                        />
                      );
                    })}
                    <hr />
                    <div className="py-4 cart-info ">
                      <div className="flex cart-info justify-between pt-1">
                        <div className="cart-total order-last">
                          <p className="font-semibold text-base">${total}</p>
                        </div>
                        <span className="font-semibold text-lg">
                          Subtotal
                          <p className="flex items-center text-xs">
                            <InfoCircleFilled className="mr-1 text-red-500" />{" "}
                            Extra charges may apply
                          </p>
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-row-reverse checkout-btn">
                        <p className="py-4 px-10 text-center bg-red-500 text-white font-semibold">
                          <Link href="/payments">
                            <a> Checkout &#8594;</a>
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Row>
                      <Col span={12} style={{ alignSelf: "center" }}>
                        <h3 className="font-extrabold text-2xl sm:text-4xl md:text-4xl lg:text-5xl py-10">
                          Please Login to order food
                        </h3>
                        {/* <Link href="/">
                          <a className="block text-lg"> */}
                        <Button
                          type="primary"
                          className="mr-4 rounded-md px-7 py-6 flex items-center"
                          onClick={() => setVisible(true)}
                        >
                          <strong>Log in &#8594;</strong>
                        </Button>
                        {/* </a>
                        </Link> */}
                      </Col>
                      <Col span={12}>
                        <img src="/images/empty-cart.jpg" />
                      </Col>
                    </Row>
                  </div>
                )}

                <Drawer
                  destroyOnClose
                  placement="left"
                  closable={false}
                  onClose={onClose}
                  visible={visible}
                  width={isMobile ? "100%" : "35%"}
                  drawerStyle={{
                    width: "83%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  keyboard={true}
                >
                  {state.page1 && (
                    <LoginPage1
                      onClick={() => setVisible(false)}
                      onPartnerSignInClick={moveToPage2}
                      onUserSignInClick={moveToPage2}
                    />
                  )}
                  {state.page2 && (
                    <LoginPage2
                      onClick={onClose}
                      goBack={goToPage1}
                      customer={state.customer}
                    />
                  )}
                </Drawer>
              </div>
            </div>
          </>
        ) : (
          <div>
            {isCart && data && data.length < 1 ? (
              <Row>
                <Col span={12} style={{ alignSelf: "center" }}>
                  <h3 className="font-extrabold text-2xl sm:text-4xl md:text-4xl lg:text-5xl py-10">
                    Your Cart is Empty
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
            ) : (
              <div className="flex pt-20 flex-col items-center justify-center">
                <p className="text-3xl">Loading</p>
                <VscLoading className="text-4xl animate-spin" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
