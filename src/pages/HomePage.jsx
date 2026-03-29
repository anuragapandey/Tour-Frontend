import HeroSection from "../components/home/HeroSection.jsx";
import HotelsInfoSection from "../components/home/HotelsInfoSection.jsx";
import PopularDestinations from "../components/home/PopularDestinations.jsx";
import TravelInfoSection from "../components/home/TravelInfoSection.jsx";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <PopularDestinations />
      <TravelInfoSection />
      <HotelsInfoSection />
    </>
  );
};

export default HomePage;


