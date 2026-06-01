import { Outlet } from "react-router-dom";
import Footer from "./Footer.jsx";
import SectionTabs from "./SectionTabs.jsx";
import TopBar from "./TopBar.jsx";

const MainLayout = () => {
  return (
    <div className="min-h-screen text-slate-900">
      <TopBar />
      <SectionTabs />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
