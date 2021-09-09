import MainFooter from "../src/components/Layouts/Footer/MainFooter";
import HomeHeader from "../src/components/Layouts/Header/HomeHeader";
import "../styles/cities.css";
import CitiesContent from "../src/components/Layouts/Cities/CitiesContent";

const Cities = () => (
  <div className="about-page">
    <HomeHeader />
    <CitiesContent />
    <MainFooter />
  </div>
);

export default Cities;
