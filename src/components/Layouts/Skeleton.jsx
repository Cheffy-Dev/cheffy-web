import { Row, Col, Skeleton } from "antd";

export const FoodGridSkeleton = () => {
  const data = [1, 2, 3, 4, 5, 6];
  return (
    <Row
      className="food-grid"
      justify="center"
      gutter={[32, 48]}
      align="middle"
    >
      {data.map((index) => (
        <Col
          xs={12}
          sm={8}
          md={6}
          lg={4}
          xl={4}
          xxl={4}
          className="gutter-row"
          key={index}
        >
          <div className="flex flex-col food-card">
            <Skeleton.Avatar
              active
              shape="circle"
              size={120}
              className="mb-4"
            />
            <Skeleton.Input className="w-28 rounded-lg" size="small" active />
          </div>
        </Col>
      ))}
    </Row>
  );
};

export const NewAndPopularSkeleton = ({ title }) => {
  const data = [1, 2, 3, 4];
  return (
    <>
      <Row
        className="food-grid mt-16 mb-4 sm:mb-10"
        gutter={[32, 48]}
        justify="start"
        align="middle"
      >
        <Col className="my-5">
          <label className="font-extrabold md:text-5xl text-3xl sm:text-4xl">
            {title}
          </label>
        </Col>
      </Row>
      <Row className="food-grid" gutter={32} justify="center" align="top">
        {data.map((index) => (
          <Col
            xs={24}
            sm={12}
            md={12}
            lg={8}
            xl={6}
            xxl={6}
            key={index}
            className="new-food-card"
          >
            <Skeleton.Avatar
              shape="square"
              active
              className="new-food-image"
              style={{ width: "100%", height: "40vh" }}
            ></Skeleton.Avatar>
            <Row className="my-5 ml-1 mr-2">
              <Col span={8}>
                <Row align="middle">
                  {/* <Skeleton.Avatar active shape="circle" size={4} /> */}
                  <Skeleton.Input
                    className="w-12 rounded"
                    size="small"
                    active
                  />
                </Row>
              </Col>
              <Col span={8}>
                <Row align="middle">
                  {/* <Skeleton.Avatar active shape="circle" size={4} /> */}
                  <Skeleton.Input
                    className="w-20 rounded"
                    size="small"
                    active
                  />
                </Row>
              </Col>
              <Col span={8}>
                <Row align="middle" justify="end">
                  {/* <Skeleton.Avatar active shape="circle" size={4} /> */}
                  <Skeleton.Input
                    className="w-20 rounded"
                    size="small"
                    active
                  />
                </Row>
              </Col>
            </Row>
            <Row>
              <Skeleton.Input className="w-32 rounded-lg" size="small" active />
            </Row>
          </Col>
        ))}
      </Row>
    </>
  );
};
