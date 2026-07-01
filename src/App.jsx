import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout.jsx";
import { useVisitorLogger } from "./hooks/useVisitorLogger.js";
import OnePage from "./pages/OnePage.jsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.jsx";
import DeleteAccountPage from "./pages/DeleteAccountPage.jsx";

function App() {
  useVisitorLogger();

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<OnePage />} />
      </Route>
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/delete-account" element={<DeleteAccountPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
