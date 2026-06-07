import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer.jsx";
import SectionTabs from "./SectionTabs.jsx";
import TopBar from "./TopBar.jsx";
import DestinationModal from "../common/DestinationModal.jsx";
import { destinations } from "../../data/destinations";

const MainLayout = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [activeDestinationId, setActiveDestinationId] = useState(destinations[0]?.id || "ladakh");

  const handleSelectDestination = (destination) => {
    setSelectedDestination(destination);
    if (destination) {
      setActiveDestinationId(destination.id);
    }
  };

  return (
    <div className="min-h-screen text-slate-900">
      <TopBar onSelectDestination={handleSelectDestination} activeDestinationId={activeDestinationId} />
      <SectionTabs onSelectDestination={handleSelectDestination} activeDestinationId={activeDestinationId} />
      <main>
        <Outlet context={{ setSelectedDestination: handleSelectDestination, activeDestinationId, setActiveDestinationId, isModalOpen: selectedDestination !== null }} />
      </main>
      <Footer />

      {/* Destination Detail Modal */}
      <DestinationModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
      />
    </div>
  );
};

export default MainLayout;
