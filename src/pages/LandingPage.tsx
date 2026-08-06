import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProcessSection from "../components/ProcessSection";
import CategoriesSection from "../components/CategoriesSection";
import StatsSection from "../components/StatsSection";
import RatingSection from "../components/RatingSection";
import CtaSection from "../components/CtaSection";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProcessSection />
      <CategoriesSection />
      <StatsSection />
      <RatingSection />
      <CtaSection />
      <Footer />
    </>
  );
}