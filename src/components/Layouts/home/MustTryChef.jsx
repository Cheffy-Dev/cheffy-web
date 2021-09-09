import { StarFilled } from "@ant-design/icons";
import { Col, Row } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiLocationMarker } from "react-icons/hi";

// It's now Popular Chefs.
const MustTryChef = ({ mustTryChefs = [], className, isXs, isMd, isLg }) => {
  const [start, setStart] = useState(0);
  const [chefs, setChefs] = useState([]);

  useEffect(() => {
    if (isXs) {
      setChefs(mustTryChefs.slice(start, start + 1));
    } else if (isMd) {
      setChefs(mustTryChefs.slice(start, start + 2));
    } else if (isLg) {
      setChefs(mustTryChefs.slice(start, start + 3));
    } else {
      setChefs(mustTryChefs.slice(start, start + 1));
    }
  }, [start, isXs, isMd, isLg]);

  const plus = () => {
    if (isXs) {
      if (start < 15) setStart(start + 1);
      else setStart(0);
    } else if (isMd) {
      if (start === 12) setStart(13);
      else if (start < 12) setStart(start + 2);
      else setStart(0);
    } else {
      if (start < 12) setStart(start + 3);
      else setStart(0);
    }
  };

  const minus = () => {
    if (isXs) {
      if (start > 0) setStart(start - 1);
      else setStart(14);
    } else if (isMd) {
      if (start === 13) setStart(12);
      else if (start > 0) setStart(start - 2);
      else setStart(13);
    } else {
      if (start > 0) setStart(start - 3);
      else setStart(12);
    }
  };

  return (
    <div className={className}>
      <Row
        className="food-grid mt-16 mb-4 md:mb-10"
        gutter={32}
        justify="start"
        align="middle"
      >
        <Col className="my-5" xs={15} md={16}>
          <span className="font-extrabold text-2xl sm:text-4xl md:text-4xl lg:text-5xl">
            Popular Chefs
          </span>
        </Col>
        <Col className="justify-end" xs={9} md={8}>
          <span className="flex items-center md:items-baseline justify-end">
            {/* TODO: Broken Link. I can't page that shows all chefs or anything like that. */}
            <Link href="/chefs">
              <a className="font-semibold underline md:text-lg lg:text-xl">
                View all
              </a>
            </Link>
            <span className="hidden md:inline">&emsp;</span>
            <span className="md:hidden">&ensp;</span>
            <span>
              <button className="text-xl md:text-2xl" onClick={() => minus()}>
                {"<"}
              </button>
              &emsp;
              <button className="text-xl md:text-2xl" onClick={() => plus()}>
                {">"}
              </button>
            </span>
          </span>
        </Col>
      </Row>
      {/* I could not design the grid that was there in Figma because of irregular image sizes. */}
      <Row className="food-grid" gutter={[32, 48]} justify="center" align="top">
        {chefs.length &&
          chefs.map((chef) => (
            <Col xs={24} md={12} lg={8} key={chef.id} className="new-food-card">
              <Link href={`/chef/${encodeURIComponent(chef.id)}`}>
                <a>
                  <Row
                    justify="center"
                    className="bg-center bg-contain bg-no-repeat"
                    style={{
                      backgroundImage: `url(${chef.imagePath})`,
                      height: "20vh",
                    }}
                  ></Row>
                  <Row className="my-5" justify="space-between">
                    <Col span={8}>
                      <Row align="middle" justify="start">
                        <StarFilled className="pr-1 text-yellow-500 text-lg" />
                        <span>{chef.avgRating || 4}</span>
                      </Row>
                    </Col>
                    <Col span={16}>
                      <Row align="middle" justify="center">
                        <HiLocationMarker />
                        <span>
                          {chef.city || "Centreville"},{" "}
                          {chef.state || "Virginia"}
                        </span>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <span className="label">{chef.name}</span>
                  </Row>
                </a>
              </Link>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default MustTryChef;
