import { Tabs, Typography } from "antd";
import { useSession } from "next-auth/client";
import Head from "next/head";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import ChefLayout from "../../src/components/Layouts/home/FoodLayout";
import ProfileOrders from '../../src/components/Layouts/User/ProfileOrders';
import EarningComponent from "../../src/components/Layouts/chef/ChefEarning";
import ChefPlatesComponent from "../../src/components/Layouts/chef/ChefPlates";

const { TabPane } = Tabs;
const { Text } = Typography;

const UserDashboard = (props) => {
  const [tab, setTab] = useState("Orders");
  const [session, loading] = useSession();

  const onChange = (key) => {
    if (key == "2") {
      return;
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {session && session.role == "user" ? (
        <>
          <Head>
            <title>Dashboard - {tab}</title>
          </Head>
          <div className="chef-bg w-full">
            <div
              className="bg-gray-900 opacity-90"
              style={{
                backgroundImage: "url('/images/chef/chef-banner.png')",
                backgroundSize: "cover",
                height: "170px",
              }}
            >
              <h1 className="text-white px-10 py-16 text-2xl">
                Hey,{" "}
                <p className="inline-block text-4xl font-semibold">
                  {session && session.user.name + "!"}
                </p>
              </h1>
            </div>
            <div className="profile-block py-16 lg:px-32 px-14">
              <div className="lg:px-32 md:px-10 px-4">
                <p className="text-xl pb-4 font-semibold">
                  <FaUser
                    fill="#D73D36"
                    className="text-red-500 text-3xl pb-1 inline-block"
                  />
                  Dashboard
                </p>
                <hr />
              </div>
              <div className="lg:px-32 md:px-10 px-4">
                <Tabs
                  tabBarStyle={{ borderColor: "black" }}
                  onTabClick={onChange}
                >
                  <TabPane
                    tab={
                      <Text strong className="text-base">
                        Recent Activities
                      </Text>
                    }
                    key="1"
                  >
                    No Activities Yet..
                  </TabPane>
                  <TabPane
                    className="h-full"
                    tab={
                      <Text strong className="text-base">
                        Orders
                      </Text>
                    }
                    key="2"
                  >
                    <ProfileOrders />
                  </TabPane>
                  <TabPane
                    tab={
                      <Text strong className="text-base">
                        Favourites
                      </Text>
                    }
                    key="3"
                  >
                    <EarningComponent />
                  </TabPane>
                  <TabPane
                    tab={
                      <Text strong className="text-base">
                        Payments
                      </Text>
                    }
                    key="4"
                  >
                    <ChefPlatesComponent />
                  </TabPane>
                  <TabPane
                    tab={
                      <Text strong className="text-base">
                        Settings
                      </Text>
                    }
                    key="5"
                  ></TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-center text-3xl pt-10">You're not an User</h1>
        </>
      )}
    </div>
  );
};

const ChefProfileComponent = UserDashboard;

ChefProfileComponent.Layout = ChefLayout;

export default ChefProfileComponent;
