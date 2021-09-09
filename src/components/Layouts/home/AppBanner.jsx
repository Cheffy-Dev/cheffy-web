import { AndroidFilled, AppleFilled } from "@ant-design/icons";
import { Row } from "antd";
import "../../../../styles/banner.css";

const AppBanner = () => (
  <>
    <Row
      id="app-banner"
      className="mt-16 w-full bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: 'url("/images/payments.jpg")',
        filter: "brightness(30%)",
      }}
    ></Row>
    <Row
      id="app-banner"
      className="text-white flex flex-wrap justify-center items-center text-3xl sm:text-4xl md:text-5xl text-center"
      style={{ transform: "translateY(-100%)" }}
    >
      <img src="/images/app-ico.png" className="mx-4" />{" "}
      <span className="block mx-4">There's more to love in the App.</span>{" "}
      <span className="block">
        <a
          href="https://apps.apple.com/us/app/cheffy-quality-food/id1476147583"
          className="rounded-full inline-flex mx-4"
          style={{
            backgroundColor: "#4A5568",
          }}
        >
          <AppleFilled className="p-2" />
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=com.app.cheffyuser"
          className="rounded-full inline-flex mx-4"
          style={{
            backgroundColor: "#4A5568",
          }}
        >
          <AndroidFilled className="p-2" />
        </a>
      </span>
    </Row>
  </>
);

export default AppBanner;
