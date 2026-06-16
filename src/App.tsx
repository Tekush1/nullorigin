import { useState } from "react";
import HomeHeader from "./components/HomeHeader";
import HomeHero from "./components/HomeHero";
import HomeSidebar from "./components/HomeSidebar";
import AmbientLogs from "./components/AmbientLogs";
import HackerBackground from "./components/HackerBackground";
import RegistrationPage from "./components/RegistrationPage";
import Footer from "./components/Footer";
import { useHomeState } from "./hooks/useHomeState";

export default function App() {
  const [page, setPage] = useState<"home" | "register">("home");
  const state = useHomeState();

  if (page === "register") {
    return <RegistrationPage onBack={() => setPage("home")} />;
  }

  return (
    <div className="relative min-h-screen bg-black text-green-400 overflow-x-hidden">
      <HackerBackground />
      <HomeHeader
        audioEnabled={state.audioEnabled}
        toggleSound={state.toggleSound}
        copyShareLink={state.copyShareLink}
        copiedLink={state.copiedLink}
        onRegister={() => setPage("register")}
      />
      <main className="relative z-10 flex flex-col lg:flex-row gap-6 px-4 py-8 max-w-7xl mx-auto">
        <HomeHero {...state} onRegister={() => setPage("register")} />
        <HomeSidebar {...state} onRegister={() => setPage("register")} />
      </main>
      <AmbientLogs logs={state.logs} />
      <Footer />
    </div>
  );
}