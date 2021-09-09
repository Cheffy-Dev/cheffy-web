import { DownOutlined } from "@ant-design/icons";
import { useLocalStorageState } from "ahooks";
import { Badge, Button, Dropdown, Menu, Tooltip, Row, Col } from "antd";
import { signOut, useSession } from "next-auth/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { connect, useDispatch } from "react-redux";
import {
  addItemsToCart,
  getUserBasket,
  setCartItems,
  setCartItemsWithoutSessionFlag,
  setCartItemsWithSessionFlag,
} from "../../../redux/actions/cart/cartAction";
import PredictionsOnInputChange from "../../auto-complete";
import LeftMenu from "../menu/LeftMenu";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import Search from "../../Search";
import LocationSearch from "../LocationSearch";

const dropmenu = (
  <Menu>
    <Menu.Item key="0">
      <Row className="flex justify-center items-center gap-1 md:gap-2">
        <Col>
          <Login />
        </Col>
      </Row>
    </Menu.Item>
    <Menu.Item key="1">
      <Row className="flex justify-center items-center gap-1 md:gap-2">
        <Col>
          <Signup />
        </Col>
      </Row>
    </Menu.Item>
  </Menu>
);

const FoodHeader = ({ cart }) => {
  const [session, loading ] = useSession();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [items, _] = useLocalStorageState("cartitems");
  const isChef = session?.role === "chef";
  const isDriver = session?.role === "driver";

  useEffect(async () => {
    try {
      console.log("SESSION: ", session);

      const localBasketItems = items ? items.items : [];
      const platesArray = [];
      const cartItemsArray = [];
      const deliveryType = "user";

      if (session) {
        if (!cart.cartItemSetWithSessionFlag) {
          const userBasketItemsBefore = await dispatch(
            getUserBasket(deliveryType)
          );
          localBasketItems.map((item) => {
            if (
              !userBasketItemsBefore?.items?.some(
                (basket) =>
                  basket.plate.id.toString() === item.plateId.toString()
              )
            ) {
              console.log("No Match: ", item.plateId);
              platesArray.push({
                quantity: 1,
                plateId: item.plateId,
                note: "Special instructions go here.",
              });
            }
          });

          if (platesArray.length > 0) {
            await dispatch(
              addItemsToCart({ deliveryType: "user", plates: platesArray })
            );
          }

          // Get user basket items.
          const userBasketItemsAfter = await dispatch(
            getUserBasket(deliveryType)
          );
          console.log(userBasketItemsAfter);

          // If basket is not empty.
          userBasketItemsAfter.items.map((item) => {
            cartItemsArray.push({
              ordered: item.quantity,
              plateId: item.plate.id,
            });
          });

          if (typeof window !== undefined) {
            window.localStorage.setItem(
              "cartitems",
              JSON.stringify({ items: cartItemsArray })
            );
          }
          dispatch(setCartItems(cartItemsArray));
          dispatch(setCartItemsWithSessionFlag());
        }
      } else {
        if (!cart.cartItemSetWithoutSessionFlag) {
          dispatch(setCartItems(localBasketItems));
          dispatch(setCartItemsWithoutSessionFlag());
        }
      }
      setCartCount(cart.itemCount);
    } catch (e) {
      console.log("Session Error:", e);
    }
  }, [cart, session]);

  const ImgIcon = () => {
    console.log(session.user.image);
    return <FaUser className="text-2xl h-8 w-8 rounded-full mr-2" />;
  };

  const DropDownMenu = () => (
    <Menu className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
      {[
        {
          label: "Dashboard",
          href: "/user/dashboard",
          hrefChef: "/chef",
          hrefDriver: "/driver",
          onClick: () => undefined,
        },
        {
          label: "Profile",
          href: "/user/profile",
          hrefChef: "/chef/profile",
          hrefDriver: "/driver/profile",
          onClick: () => undefined,
        },
        {
          label: "Sign Out",
          href: "#",
          hrefChef: "#",
          hrefDriver: "#",
          onClick: (e) => {
            e.preventDefault();
            signOut({ callbackUrl: "/" });
          },
        },
      ].map((l) => (
        <Menu.Item key={l.label}>
          <Link href={isChef ? l.hrefChef : isDriver ? l.hrefDriver : l.href}>
            <a
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              onClick={l.onClick}
            >
              {l.label}
            </a>
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <nav
      className="stickey"
      style={{ backgroundColor: "#F7F7F7", boxShadow: "0 0 5px #ddd" }}
    >
      <div className="mx-auto py-4">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-between items-center px-8 md:px-0">
            <div className="hidden md:block">
              <LeftMenu />
            </div>

            <div className="flex cursor-pointer red md:pl-8">
              <Link href="/">
                <a>
                  <img
                    src="/images/logo.png"
                    // className="hidden lg:block"
                    style={{ width: "90%" }}
                  />
                  {/* <img src="/images/mobile-logo.png" className="lg:hidden" /> */}
                </a>
              </Link>
            </div>

            <div className="flex md:hidden">
              <LeftMenu />
            </div>
          </div>

          <div className="hidden md:flex items-center justify-between flex-1">
            <div className="flex-row items-center ml-8 mr-4">
              <Link href="/chef">
                <a
                  style={{ fontFamily: "Poppins" }}
                  className="mr-2 pr-2 py-1 text-sm rounded-md"
                >
                  Chef
                </a>
              </Link>
              <Link href="/kitchen">
                <a
                  style={{ fontFamily: "Poppins" }}
                  className="mx-2 px-2 py-1 text-sm rounded-md"
                >
                  Rent a kitchen
                </a>
              </Link>
            </div>
            <div className="w-1/2 lg:w-2/5">
              <Search />

              {/*<PredictionsOnInputChange
                searchValue={search}
                setSearchValue={setSearch}
              />*/}
            </div>
            <LocationSearch context={{ search, setSearch }} />
            <div
              className="ml-6 flex items-center mt-4 md:mt-0"
              style={{ width: "15%", justifyContent: "space-evenly" }}
            >
            {/* Verify with jimmy if he wants cart when users are driver and chef. */}
              {session ? (
                <>
                  <Tooltip placement="bottom" title="View Cart">
                    <Badge count={cartCount}>
                      <Link href="/cart">
                        <a className="cursor-pointer flex items-center">
                          <AiOutlineShoppingCart
                            style={{ color: "#d73d36" }}
                            className="text-2xl"
                          />
                        </a>
                      </Link>
                    </Badge>
                  </Tooltip>
                  <div>
                    <Dropdown
                      className="flex flex-row justify-center items-center"
                      overlay={DropDownMenu}
                      trigger={["click", "contextMenu"]}
                      placement="bottomRight"
                    >
                      <Button
                        style={{ backgroundColor: "transparent" }}
                        className="px-6 flex flex-row justify-center items-center"
                        type="text"
                        icon={<ImgIcon />}
                      >
                        {session.user.name} <DownOutlined className="ml-2" />
                      </Button>
                    </Dropdown>
                  </div>
                </>
              ) : (
                <div className="wid-20">
                  <Dropdown overlay={dropmenu}>
                    <a
                      className="cursor-pointer flex items-center ant-dropdown-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      <AiOutlineUser
                        style={{ color: "#d73d36" }}
                        className="text-2xl"
                      />
                    </a>
                  </Dropdown>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const mapToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapToProps)(FoodHeader);
