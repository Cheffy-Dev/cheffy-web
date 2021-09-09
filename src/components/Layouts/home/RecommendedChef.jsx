import { Col, Row } from "antd";
import Link from "next/link";

const RecommendedChef = ({ recommendedChefs: recommended = [] }) => (
  <>
    <Row
      className="food-grid mt-16 mb-4 md:mb-10"
      gutter={32}
      justify="start"
      align="middle"
    >
      <Col className="my-5">
        <label className="font-extrabold text-3xl sm:text-4xl lg:text-5xl">
          Recommended Chef
        </label>
      </Col>
    </Row>
    <Row className="food-grid" justify="center" gutter={32} align="middle">
      {recommended.length &&
        recommended.map((chef, index) => {
          return index < 6 ? (
            <Col
              className="gutter-row h-64"
              xs={12}
              sm={8}
              md={6}
              lg={4}
              xl={4}
              xxl={4}
              key={chef.id}
            >
              <Link href={`/chef/${encodeURIComponent(chef.id)}`}>
                <a>
                  <div className="flex flex-col py-6 px-3 items-center">
                    <img
                      className="category-icon mb-4"
                      src={chef.imagePath}
                      alt=""
                    />
                    <label className="category-label cursor-pointer">
                      {chef.name}
                    </label>
                  </div>
                </a>
              </Link>
            </Col>
          ) : (
            ""
          );
        })}
    </Row>
  </>
);

export default RecommendedChef;
