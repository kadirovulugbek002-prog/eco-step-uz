import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import MapPage from "./pages/MapPage";
import RankingPage from "./pages/RankingPage";
import CouponsPage from "./pages/CouponsPage";
import DriverPage from "./pages/DriverPage";
import CategoryDetailPage from "./pages/CategoryDetailPage";

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/kirish" element={<LoginPage />} />
          <Route path="/royxat" element={<RegisterPage />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="/xarita" element={<MapPage />} />
          <Route path="/reyting" element={<RankingPage />} />
          <Route path="/kuponlar" element={<CouponsPage />} />
          <Route path="/haydovchi" element={<DriverPage />} />
          <Route path="/turlar/:id" element={<CategoryDetailPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}