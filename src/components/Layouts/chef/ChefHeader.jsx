import { Select } from "antd";
import { useSession } from "next-auth/client";
import Link from "next/link";
import React from "react";
import { Col, Row, Button, Dropdown, Menu} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { FaUser } from "react-icons/fa";

const ChefHeader = () => {
  const { Option } = Select;
  const [session, loading] = useSession();
  const ImgIcon = () => {
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
      style={{ backgroundColor: "#F7FCFF" }}
      className="dark:bg-gray-800 stickey"
    >
      <Row className="mx-8 py-4 flex items-center" justify="space-between">
        <Col>
          <div className="hidden md:flex cursor-pointer">
            <Link href="/">
              <img src="/images/logo.jpg" />
            </Link>
          </div>
          <div className="md:hidden cursor-pointer">
            <Link href="/">
              <img src="/images/mobile-logo.png" />
            </Link>
          </div>
        </Col>
        <Col className="flex flex-row items-center">
          <img
            src="/images/location.png"
            style={{ height: 24, width: 24 }}
            alt="location"
          />
          <Select
            dropdownStyle={{ zIndex: 11 }}
            defaultValue="northern-virginia"
            style={{ width: 180 }}
            bordered={false}
          >
            <Option value="northern-virginia">Northern Virginia</Option>
            <Option value="richmond">RichMond</Option>
            <Option value="centreville">Centreville</Option>
          </Select>
        </Col>
        <Col className="flex flex-col md:flex-row md:items-center">
          <Row className="flex mr-10">
            <Link href="/help">
              <a className="flex flex-row">
                <img src="/images/chef/contact_support.png" alt="help" />
                <span className="hidden md:flex">Help</span>
              </a>
            </Link>
          </Row>
          <div>
            {session && (
              <>
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
              </>
            )}
          </div>
        </Col>
      </Row>
    </nav>
  );
};

export default ChefHeader;
