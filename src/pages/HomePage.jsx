import HeroSection from "../components/home/HeroSection.jsx";
import DestinationCardsSection from "../components/home/DestinationCardsSection.jsx";

const HomePage = ({ onSelectDestination, activeDestinationId, setActiveDestinationId, isModalOpen }) => {
  return (
    <>
      <HeroSection
        onSelectDestination={onSelectDestination}
        activeDestinationId={activeDestinationId}
        setActiveDestinationId={setActiveDestinationId}
        isModalOpen={isModalOpen}
      />
      <DestinationCardsSection onSelectDestination={onSelectDestination} />
    </>
  );
};

export default HomePage;

