import { useState } from "react";
import HackerBackground from "./components/HackerBackground";
import Navbar from "./components/Navbar";
import HomeHero from "./components/HomeHero";
import HomeSidebar from "./components/HomeSidebar";
import AmbientLogs from "./components/AmbientLogs";
import About from "./components/sections/About";
import Highlights from "./components/sections/Highlights";
import Sponsors from "./components/sections/Sponsors";
import Impact from "./components/sections/Impact";
import Schedule from "./components/sections/Schedule";
import Prizes from "./components/sections/Prizes";
import Closer from "./components/sections/Closer";
import FAQ from "./components/sections/FAQ";
import SiteFooter from "./components/SiteFooter";
import RegistrationPage from "./components/RegistrationPage";
import { useHomeState } from "./hooks/useHomeState";
import { useScrollReveal } from "./components/ui";

export default function App() {
  const [page, setPage] = useState<"home" | "register">("home");
  const state = useHomeState();
  useScrollReveal();

  if (page === "register") {
    return <RegistrationPage onBack={() => setPage("home")} />;
  }

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] overflow-x-hidden">
      <HackerBackground />
      <div className="relative z-10">
        <Navbar
          audioEnabled={state.audioEnabled}
          onToggleSound={state.toggleSound}
          onRegister={() => setPage("register")}
        />

        {/* Hero section — keeps existing terminal/sidebar layout */}
        <section id="top" className="relative pt-24 pb-12">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <main className="relative z-10 flex flex-col lg:flex-row gap-6 px-4 py-8 max-w-7xl mx-auto">
            <HomeHero {...state} onRegister={() => setPage("register")} />
            <HomeSidebar
              teaserInput={state.teaserInput}
              teaserStatus={state.teaserStatus}
              setTeaserInput={state.setTeaserInput}
              handleTeaserVerify={state.handleTeaserVerify}
              handleKeyInteraction={state.handleKeyInteraction}
            />
          </main>
        </section>

        <AmbientLogs logs={state.logs} />

        {/* New design sections */}
        <About />
        <Highlights />
        <Sponsors />
        <Impact />
        <Schedule />
        <Prizes />
        <Closer />
        <FAQ />

        <SiteFooter />
      </div>
    </div>
  );
}
