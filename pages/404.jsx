import { Divider } from "antd";
import Head from "next/head";
import Link from "next/link";
// import FoodHeader from "../src/components/Layouts/Header/HomeHeader";
// import MainFooter from "../src/components/Layouts/Footer/MainFooter";
import MainLayout from "../src/components/Layouts/home/MainLayout";

function Custom404() {
  return (
    <div className="min-h-full">
      <Head>
        <title>Cheffy - Not Found</title>
      </Head>
      {/* <FoodHeader /> */}
      <div className="error w-4/5 md:w-3/5 mx-auto pt-36 pb-10 md:pb-20 mt-10 min-h-full text-center">
        <p className="font-bold text-5xl mb-10">404</p>
        <Divider className="pb-10" />
        <div className="error-msg pb-20 md:pb-36  px-4 text-xl flex flex-col items-center justify-center">
          <span>
            <p>It's quite unexpected, but I couldn't find this page.</p>
            <p className="text-center py-1">
              Why don't you check out something else?!
            </p>
            <Link href="/">
              <a>
                <p className="bg-primary mt-4 w-2/5 text-white rounded-md py-2 mx-auto">
                  Home
                </p>
              </a>
            </Link>
          </span>
        </div>
      </div>
      {/* <MainFooter /> */}
    </div>
  );
}

Custom404.Layout = MainLayout;
export default Custom404;
