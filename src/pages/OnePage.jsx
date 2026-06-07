import { useOutletContext } from "react-router-dom";
import AboutPage from "./AboutPage.jsx";
import ContactPage from "./ContactPage.jsx";
import GalleryPage from "./GalleryPage.jsx";
import HomePage from "./HomePage.jsx";

const OnePage = () => {
  const { setSelectedDestination, activeDestinationId, setActiveDestinationId, isModalOpen } = useOutletContext();

  return (
    <>
      <div id="home" className="scroll-mt-24">
        <HomePage
          onSelectDestination={setSelectedDestination}
          activeDestinationId={activeDestinationId}
          setActiveDestinationId={setActiveDestinationId}
          isModalOpen={isModalOpen}
        />
      </div>
      <div id="about" className="scroll-mt-24">
        <AboutPage />
      </div>
      <div id="gallery" className="scroll-mt-24">
        <GalleryPage />
      </div>
      <div id="contact" className="scroll-mt-24">
        <ContactPage />
      </div>
    </>
  );
};

export default OnePage;
