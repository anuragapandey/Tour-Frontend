import HeroSection from "../components/home/HeroSection.jsx";
import HotelsInfoSection from "../components/home/HotelsInfoSection.jsx";
import PopularDestinations from "../components/home/PopularDestinations.jsx";
import TravelInfoSection from "../components/home/TravelInfoSection.jsx";

const HomePage = ({ onSelectDestination, activeDestinationId, setActiveDestinationId, isModalOpen }) => {
  return (
    <>
      <HeroSection
        onSelectDestination={onSelectDestination}
        activeDestinationId={activeDestinationId}
        setActiveDestinationId={setActiveDestinationId}
        isModalOpen={isModalOpen}
      />
      <PopularDestinations />
      <TravelInfoSection />
      <HotelsInfoSection />
    </>
  );
};

export default HomePage;


