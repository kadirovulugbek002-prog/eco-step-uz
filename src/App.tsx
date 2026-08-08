import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import MapPage from "./pages/MapPage";
import RankingPage from "./pages/RankingPage";
import CouponsPage from "./pages/CouponsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/xarita" element={<MapPage />} />
        <Route path="/reyting" element={<RankingPage />} />
        <Route path="/kuponlar" element={<CouponsPage />} />
      </Routes>
    </BrowserRouter>
  );
}