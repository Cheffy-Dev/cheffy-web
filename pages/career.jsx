import MainFooter from "../src/components/Layouts/Footer/MainFooter";
import HomeHeader from "../src/components/Layouts/Header/HomeHeader";
import "../styles/career.css";
import CareerContent from "../src/components/Layouts/Career/CareerContent";

const Career = () => (
  <div className="about-page">
    <HomeHeader />
    <CareerContent />
    <MainFooter />
  </div>
);

export default Career;
