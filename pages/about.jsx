import MainFooter from "../src/components/Layouts/Footer/MainFooter";
import HomeHeader from "../src/components/Layouts/Header/HomeHeader";
import Head from "next/head";
import "../styles/about.css";
import AboutContent from "../src/components/Layouts/about/AboutContent";

const About = () => (
  <div className="about-page">
    <Head>
      <title>Cheffy - About Us</title>
    </Head>
    <HomeHeader />
    <AboutContent />
    <MainFooter />
  </div>
);

export default About;
