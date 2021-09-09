import { Carousel, Image, Card, Col, Layout, Row } from "antd";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import "../../../../styles/about.css";
import AppBanner from "../../Layouts/home/AppBanner";

const AboutContent = () => {
  const { Content } = Layout;
  const images = [
    "https://thecheffy.com/images/gallery/screen-01.png",
    "https://thecheffy.com/images/gallery/screen-02.png",
    "https://thecheffy.com/images/gallery/screen-03.png",
    "https://thecheffy.com/images/gallery/screen-04.png",
    "https://thecheffy.com/images/gallery/screen-05.png",
    "https://thecheffy.com/images/gallery/screen-06.png",
    "https://thecheffy.com/images/gallery/screen-07.png",
    "https://thecheffy.com/images/gallery/screen-08.png",
    "https://thecheffy.com/images/gallery/screen-09.png",
  ];
  const values = [
    {
      img: "data:image/png;base64,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",
      heading: "Resilience",
      text: "It is a long established fact that a reader will be distracted by the readable content of the page when looking at its layout.",
    },
    {
      img: "data:image/png;base64,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",
      heading: "Ownership",
      text: "There are many variations of lorem ipsum available online, but the majority have suffered alteration in some form.",
    },
    {
      img: "data:image/png;base64,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",
      heading: "Humility",
      text: "Lorem ipsum is simply the dummy text of the printing and typesetting industry.",
    },
  ];

  const renderImages = () => {
    return images.map((imageUrl, index) => {
      return (
        <div key={index}>
          <Image preview={false} src={imageUrl} className="w-60" height={467} />
        </div>
      );
    });
  };

  return (
    <>
      <Content className="pb-20">
        <div className="text-center mt-5 px-10 md:px-32 text-4xl md:text-5xl font-semibold text-white banner-about">
          About us
        </div>

        <Row
          gutter={[20, 20]}
          justify="space-around"
          className="flex md:flex-row items-center flex-col md:px-9 mx-auto mt-2 py-10"
        >
          <Col
            xs={20}
            sm={20}
            md={16}
            lg={12}
            xl={12}
            className="md:mr-8 text-gray-600 ab-text"
          >
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              This is our story.
            </p>
            <p className="text-base mt-6 md:pr-12 md:mt-8">
              TEAM Cheffy, we aim to bring opportunities to every people with
              any backgrounds. Because our app supports all different food
              categories for different health conditions, people with special
              dietary requirements can use Cheffy to meet their custom food
              needs. Plus, We do this by empowering local businesses and in
              turn, generate new ways for people to earn, work and live. We
              started this in 5 states including Washington, D.C., Virginia,
              Maryland, Pennsylvania, New York and with more coming soon..
            </p>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={8}
            xl={6}
            justify="center"
            className="items-center pt-10 ab-img"
          >
            <Carousel
              autoplaySpeed={1500}
              prevArrow={<BiArrowToLeft color={"red"} />}
              nextArrow={<BiArrowToRight color={"red"} />}
              arrows={true}
              dotPosition={"bottom"}
              autoplay={true}
              className="md:w-60 w-56"
            >
              {renderImages()}
            </Carousel>
          </Col>
        </Row>

        <AppBanner />

        <Row
          id="about-page"
          gutter={[24, 32]}
          justify="space-around"
        >
          {values.map((value) => (
            <Col
              key={value.heading}
              xs={20}
              sm={8}
              md={6}
              lg={6}
              xl={6}
              className="text-center"
              justify="center"
            >
              <img
                src={value.img}
                className="w-9 mx-auto"
                alt={value.heading}
              />
              <Card title={value.heading} bordered={false}>
                {value.text}
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </>
  );
};

export default AboutContent;
