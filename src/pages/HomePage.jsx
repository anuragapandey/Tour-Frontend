import HeroSection from "../components/home/HeroSection.jsx";
import DestinationCardsSection from "../components/home/DestinationCardsSection.jsx";

const HomePage = ({ onSelectDestination, activeDestinationId, setActiveDestinationId, isModalOpen, destinationImageIndexes }) => {
  return (
    <>
      <HeroSection
        onSelectDestination={onSelectDestination}
        activeDestinationId={activeDestinationId}
        setActiveDestinationId={setActiveDestinationId}
        isModalOpen={isModalOpen}
        destinationImageIndexes={destinationImageIndexes}
      />
      <DestinationCardsSection
        onSelectDestination={onSelectDestination}
        destinationImageIndexes={destinationImageIndexes}
      />
    </>
  );
};

export default HomePage;
