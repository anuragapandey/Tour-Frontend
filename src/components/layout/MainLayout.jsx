import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer.jsx";
import SectionTabs from "./SectionTabs.jsx";
import TopBar from "./TopBar.jsx";
import DestinationModal from "../common/DestinationModal.jsx";

const MainLayout = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);

  return (
    <div className="min-h-screen text-slate-900">
      <TopBar onSelectDestination={setSelectedDestination} />
      <SectionTabs onSelectDestination={setSelectedDestination} />
      <main>
        <Outlet />
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
