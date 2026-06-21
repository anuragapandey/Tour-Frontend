import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout.jsx";
import { useVisitorLogger } from "./hooks/useVisitorLogger.js";
import OnePage from "./pages/OnePage.jsx";

function App() {
  useVisitorLogger();

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<OnePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
