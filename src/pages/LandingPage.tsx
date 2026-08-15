import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProcessSection from "../components/ProcessSection";
import CategoriesSection from "../components/CategoriesSection";
import StatsSection from "../components/StatsSection";
import RatingSection from "../components/RatingSection";
import CtaSection from "../components/CtaSection";
import Footer from "../components/Footer";
import TabBar from "../components/TabBar";
import Reveal from "../components/Reveal";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Reveal>
        <ProcessSection />
      </Reveal>
      <Reveal>
        <CategoriesSection />
      </Reveal>
      <Reveal>
        <StatsSection />
      </Reveal>
      <Reveal>
        <RatingSection />
      </Reveal>
      <Reveal>
        <CtaSection />
      </Reveal>
      <Footer />
      <div className="h-[68px]" />
      <TabBar />
    </>
  );
}