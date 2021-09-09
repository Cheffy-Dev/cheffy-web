import { Tabs, Typography } from "antd";
import { useSession } from "next-auth/client";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import EarningComponent from "../../src/components/Layouts/chef/ChefEarning";
import ChefPlatesComponent from "../../src/components/Layouts/chef/ChefPlates";
import ChefLayout from "../../src/components/Layouts/home/FoodLayout";
import UserProfileComponent from "../../src/components/Layouts/User/Profile";
import ProfileAddresses from "../../src/components/Layouts/User/ProfileAddresses";
import { cheffApi } from '../../src/api';
import ProfileOrders from "../../src/components/Layouts/User/ProfileOrders";
const { TabPane } = Tabs;

const { Text } = Typography;
const UserProfile = (props) => {
  const [tab, setTab] = useState("Orders");
  const [session, loading] = useSession();
  const [profile, setProfile] = useState({ loading: true })
  const router = useRouter();

  useEffect(async () => {
    if (!loading) {
      console.log(session);
      if (session.role === "chef") {
        router.push("/chef/profile");
      }
      if (session.role === "driver") {
        router.push("/driver/profile");
      }

    }

    cheffApi.getUserData().then(({ data }) => {
      setProfile(Object.assign({}, { user: data, loading: false }));
    });

  }, []);

  const onChange = (key) => {
    if (key == "2") {
      return;
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {session && session.role === "user" ? (
        <>
          <Head>
            <title>Profile - {tab}</title>
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
                </p>{" "}
                | Profile
              </h1>
            </div>
            <div className="profile-block py-16 lg:px-32 px-14">
              <div className="lg:px-32 md:px-10 px-4">
                <p className="text-xl pb-4 font-semibold">
                  <FaUser
                    fill="#D73D36"
                    className="text-red-500 text-3xl pb-1 inline-block"
                  />
                  Profile
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
                        Personal Details
                      </Text>
                    }
                    key="1"
                  >
                    <div className="flex py-2">
                      <UserProfileComponent profile={profile}/>
                    </div>
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
                        Addresses
                      </Text>
                    }
                    key="5"
                  >
                    <ProfileAddresses address={profile} />
                  </TabPane>
                  <TabPane
                    tab={
                      <Text strong className="text-base">
                        Kitchen
                      </Text>
                    }
                    key="6"
                  >
                    Settings
                  </TabPane>
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

const ChefProfileComponent = UserProfile;
ChefProfileComponent.Layout = ChefLayout;
export default ChefProfileComponent;
