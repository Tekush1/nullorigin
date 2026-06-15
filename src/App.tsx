import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HackerBackground from "./components/HackerBackground";
import HackerMask from "./components/HackerMask";
import RegistrationPage from "./components/RegistrationPage";
import { sound } from "./utils/audio";
import { 
  Volume2, 
  VolumeX, 
  Share2, 
  ArrowRight,
  Download,
  Users,
  Trash2,
  ShieldCheck,
} from "lucide-react";

interface Cadet {
  email: string;
  codename: string;
  solved: boolean;
  timestamp: string;
}

function HomePage() {
  const navigate = useNavigate();
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  const [logs, setLogs] = useState<string[]>([
    "INITIALIZING SECURE SOCKET SHELL v4.8...",
    "ESTABLISHING VPN TUNNEL FOR INGRESS...",
    "RESOLVING TARGET HOST: nullorigin.cyberhx.com [104.21.64.12]",
    "STATUS: LISTENING ON DECRYPT PORTS",
  ]);

  const [registrations, setRegistrations] = useState<Cadet[]>([]);
  const [statusClicks, setStatusClicks] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<"database" | "guide">("database");

  const handleKeyInteraction = () => {
    sound.playKey();
  };

  const toggleSound = () => {
    const nextState = sound.toggle();
    setAudioEnabled(nextState);
    sound.playClick();
  };

  useEffect(() => {
    const stored = localStorage.getItem("null_origin_ctf_roster");
    if (stored) {
      try {
        setRegistrations(JSON.parse(stored));
      } catch (e) {}
    } else {
      const initialRoster: Cadet[] = [
        { email: "neo@cyberhx.com", codename: "NE0_BYPASS", solved: true, timestamp: new Date(Date.now() - 3600000 * 3).toISOString() },
        { email: "trinity@cipher.org", codename: "TR1N1TY", solved: true, timestamp: new Date(Date.now() - 3600000 * 11).toISOString() },
        { email: "acid_burn@nullorigin.com", codename: "ACID_BURN", solved: false, timestamp: new Date(Date.now() - 3600000 * 24).toISOString() },
        { email: "zerocool@nullorigin.com", codename: "ZER0_C00L", solved: true, timestamp: new Date(Date.now() - 3600000 * 38).toISOString() },
      ];
      setRegistrations(initialRoster);
      localStorage.setItem("null_origin_ctf_roster", JSON.stringify(initialRoster));
    }
  }, []);

  useEffect(() => {
    const terminalFeeds = [
      "INGRESS FILTER: Bypassing regional proxy buffers...",
      "SYSTEM ALARM: Port scan detected from trace node 192.16.8.21",
      "SECURE CORE: Cryptographic keys locked within enclave-1A",
      "METADATA CHECK: Verification checksum match: OK",
      "TRANSMISSION LINK: Synchronizing system clock with GPS reference...",
      "FIREWALL NOTICE: Inbound ICMP block active on interface eth0",
      "CTF DEPLOYER: Challenges parsed and integrity validated successfully",
      "SHELL CONTEXT: Operator session granted with restricted sandbox clearances",
    ];

    const interval = setInterval(() => {
      const randomFeed = terminalFeeds[Math.floor(Math.random() * terminalFeeds.length)];
      setLogs((prev) => {
        const next = [...prev, `[${new Date().toLocaleTimeString()}] ${randomFeed}`];
        if (next.length > 5) next.shift();
        return next;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handleStatusClick = () => {
    sound.playClick();
    setStatusClicks((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        setShowAdmin(true);
        sound.playSuccess();
        setLogs((prevLogs) => [
          ...prevLogs,
          `[OVERSEER] Tactical Administrator panel decrypted! Access granted.`,
        ]);
        return 0;
      }
      return next;
    });
  };

  const downloadCSV = () => {
    sound.playEnter();
    const headers = "Email,Codename,Teaser Decrypted,Registration Dated\n";
    const body = registrations.map(r => 
      `"${r.email.replace(/"/g, '""')}","${r.codename.replace(/"/g, '""')}","${r.solved ? 'YES' : 'NO'}","${r.timestamp}"`
    ).join("\n");

    const blob = new Blob([headers + body], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `nullorigin_pre_registrations.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearDatabase = () => {
    if (window.confirm("Are you sure you want to purge the local registries roster? This will reset mockup entries to defaults.")) {
      sound.playError();
      localStorage.removeItem("null_origin_ctf_roster");
      const defaultRoster = [
        { email: "neo@cyberhx.com", codename: "NE0_BYPASS", solved: true, timestamp: new Date().toISOString() }
      ];
      setRegistrations(defaultRoster);
      localStorage.setItem("null_origin_ctf_roster", JSON.stringify(defaultRoster));
    }
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    sound.playEnter();
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div 
      className="min-h-screen bg-[#020202] text-gray-100 font-mono flex flex-col relative overflow-x-hidden selection:bg-red-500 selection:text-black"
      onKeyDown={handleKeyInteraction}
    >
      <HackerBackground />

      {/* Header */}
      <header className="relative z-20 w-full px-6 py-4 flex justify-between items-center bg-black/85 backdrop-blur-md border-b border-red-600/30 transition-all duration-300">
        <div className="flex items-center space-x-4">
          <img 
            src="/mask.png" 
            alt="Null Origin Icon" 
            className="h-10 md:h-16 object-contain filter drop-shadow-[0_0_12px_rgba(239,68,68,0.7)] hover:scale-105 transition-all duration-300"
            onMouseEnter={() => sound.playHover()}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src.endsWith("/mask.png")) {
                target.src = "/logo.png";
              } else {
                target.style.display = 'none';
              }
            }}
          />
          <div 
            onClick={handleStatusClick}
            onMouseEnter={() => sound.playHover()}
            title="PORTAL ACCESS INDICATOR (ADMIN SECRET: CLICK 5 TIMES TO DECRYPT OPERATOR CONSOLE)"
            className="flex items-center space-x-2.5 cursor-pointer group select-none"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)] group-hover:bg-red-400"></span>
            <span className="text-[13px] md:text-base tracking-widest text-zinc-100 uppercase font-black font-sans group-hover:text-red-400 transition-colors">
              NULL ORIGIN <span className="hidden sm:inline text-red-500 font-mono">// SECURED PORTAL</span>
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Sound Control */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => sound.playHover()}
            className="p-2.5 border border-red-950/60 rounded bg-red-950/10 hover:bg-red-900/20 active:bg-red-900/40 hover:border-red-600/50 transition-all text-zinc-400 hover:text-red-400 cursor-pointer"
            title={audioEnabled ? "Mute cyber synth sounds" : "Unmute cyber synth sounds"}
          >
            {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>

          {/* Share button */}
          <button
            onClick={copyShareLink}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center space-x-2 px-4 py-2 border border-red-950/60 rounded bg-red-950/15 hover:text-red-400 text-zinc-400 hover:bg-red-900/25 hover:border-red-600/50 transition-all text-xs font-black tracking-widest"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{copiedLink ? "COPIED" : "SHARE LINK"}</span>
          </button>

          {/* REGISTER NOW button */}
          <button
            onClick={() => navigate("/registration")}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center space-x-2 px-4 py-2 bg-red-700 hover:bg-red-600 border border-red-500 text-white text-xs font-black tracking-widest uppercase rounded transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)]"
          >
            <ArrowRight className="h-3.5 w-3.5" />
            <span>REGISTER NOW</span>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col justify-center relative z-10">
        
        <div className="mb-4 text-xs md:text-sm text-zinc-500 select-none flex items-center space-x-2">
          <span className="text-red-500 font-bold">operator@nullorigin:~$</span>
          <span className="text-[#22c55e] font-semibold pl-1">./initialize_portal --domain=nullorigin.cyberhx.com</span>
          <span className="h-4 w-1.5 bg-red-600 inline-block animate-pulse"></span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left */}
          <div className="lg:col-span-7 flex flex-col items-start text-left justify-center space-y-8">
            
            <div className="w-full relative space-y-4">
              <div 
                className="flex items-center justify-start mb-2 max-w-md md:max-w-xl"
                onMouseEnter={() => sound.playHover()}
              >
                <img 
                  src="/logo.png" 
                  alt="Null Origin Logo" 
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                  className="max-h-[380px] md:max-h-[500px] w-full object-contain filter drop-shadow-[0_0_45px_rgba(239,68,68,0.75)] transition-all hover:scale-105 duration-500 cursor-crosshair"
                />
              </div>


            </div>

            {/* Registration CTA */}
            <div className="w-full max-w-lg">
              <button
                onClick={() => { sound.playClick(); navigate("/registration"); }}
                onMouseEnter={() => sound.playHover()}
                className="w-full flex items-center justify-center space-x-3 bg-red-700 hover:bg-red-600 border border-red-500 hover:border-red-400 text-white font-black tracking-widest px-6 py-5 rounded text-sm md:text-base transition-all uppercase group cursor-pointer shadow-[0_0_25px_rgba(239,68,68,0.3)] hover:shadow-[0_0_40px_rgba(239,68,68,0.5)] active:scale-[0.98]"
              >
                <span>REGISTER NOW</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* Right */}
          <div className="lg:col-span-5 flex flex-col justify-center items-center py-4 relative">
            
            <div 
              className="relative w-full flex justify-center"
              onMouseEnter={() => sound.playHover()}
            >
              <HackerMask />
            </div>



          </div>

        </div>

        {/* Logs */}
        <div className="mt-8 border-t border-zinc-900 pt-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="text-[9px] tracking-widest text-zinc-500 uppercase font-bold">AMBIENT_LOGS_STREAM</span>
            </div>
            <span className="text-[9px] text-zinc-700 uppercase font-mono">CHANNEL PORTAL ACTIVE // SECURE CONTEXT</span>
          </div>

          <div className="bg-[#040406] border border-zinc-900 rounded p-3 h-24 overflow-y-auto font-mono text-[9px] md:text-[10px] text-zinc-500 space-y-1 scrollbar-thin select-none">
            {logs.map((log, index) => (
              <div key={index} className="flex space-x-2 border-l border-zinc-800 pl-2">
                <span className="text-red-900 shrink-0">&raquo;</span>
                <span className="break-all">{log}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Admin Panel */}
        {showAdmin && (
          <div className="mt-8 bg-zinc-950/98 border border-[#22c55e]/50 rounded-lg p-5 shadow-[0_0_35px_rgba(34,197,94,0.15)] relative overflow-hidden animate-[fadeIn_0.5s]">
            <div className="absolute top-0 right-0 py-1.5 px-4 bg-[#22c55e]/10 text-[#22c55e] text-[9.5px] font-black uppercase tracking-widest border-l border-b border-[#22c55e]/30 select-none animate-pulse">
              OPERATOR COMMAND ROOM ACTIVE
            </div>

            <div className="flex items-center space-x-2 text-[#22c55e] mb-4">
              <Users className="h-5 w-5 animate-pulse" />
              <h2 className="text-sm font-black tracking-widest uppercase">
                NULL ORIGIN // OVERSEER COMPROMISE MANAGEMENT CONSOLE
              </h2>
            </div>

            <div className="flex space-x-2 border-b border-zinc-900 pb-2.5 mb-4 text-xs">
              <button
                onClick={() => { sound.playClick(); setActiveTab("database"); }}
                className={`px-4 py-1.5 font-bold tracking-wider uppercase border transition-all ${
                  activeTab === "database"
                    ? "bg-[#22c55e]/10 border-[#22c55e] text-[#22c55e]"
                    : "border-transparent text-zinc-400 hover:text-zinc-200"
                }`}
              >
                1. Registrants Database ({registrations.length})
              </button>
              <button
                onClick={() => { sound.playClick(); setActiveTab("guide"); }}
                className={`px-4 py-1.5 font-bold tracking-wider uppercase border transition-all ${
                  activeTab === "guide"
                    ? "bg-[#22c55e]/10 border-[#22c55e] text-[#22c55e]"
                    : "border-transparent text-zinc-400 hover:text-zinc-200"
                }`}
              >
                2. Live Production Setup Guide
              </button>
              <button
                onClick={() => { sound.playClick(); setShowAdmin(false); }}
                className="ml-auto px-4 py-1.5 text-red-500 hover:text-red-400 font-bold border border-transparent hover:border-red-900/50 transition-all uppercase"
              >
                [X] Close Console
              </button>
            </div>

            {activeTab === "database" ? (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                  <p className="text-zinc-400 max-w-xl font-sans">
                    These are the live registrations collected from this browser.
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={downloadCSV}
                      className="flex items-center space-x-1.5 px-3 py-2 bg-emerald-950/40 hover:bg-emerald-900/30 border border-[#22c55e]/50 text-[#22c55e] font-bold rounded cursor-pointer transition-all active:scale-95"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>EXPORT CADETS LIST (CSV)</span>
                    </button>
                    <button
                      onClick={clearDatabase}
                      className="flex items-center space-x-1.5 px-3 py-2 hover:bg-red-900/30 border border-red-900/60 text-red-400 font-bold rounded cursor-pointer transition-all active:scale-95"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>CLEAR ALL RECORDS</span>
                    </button>
                  </div>
                </div>

                <div className="border border-zinc-900 rounded overflow-hidden">
                  <table className="w-full text-left text-[11px] md:text-xs">
                    <thead>
                      <tr className="bg-[#050505] border-b border-zinc-900 text-zinc-500 uppercase tracking-widest font-bold">
                        <th className="p-3">Rank</th>
                        <th className="p-3">Codename</th>
                        <th className="p-3">Email</th>
                        <th className="p-3 text-center">Teaser</th>
                        <th className="p-3 text-right">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900 font-mono text-zinc-300">
                      {registrations.map((cadet, i) => (
                        <tr key={i} className="hover:bg-zinc-900/40 transition-colors">
                          <td className="p-3 text-zinc-500">#{registrations.length - i}</td>
                          <td className="p-3 text-[#22c55e] font-extrabold">{cadet.codename}</td>
                          <td className="p-3 text-zinc-400 font-sans select-all">{cadet.email}</td>
                          <td className="p-3 text-center">
                            {cadet.solved ? (
                              <span className="px-2 py-0.5 bg-emerald-950/50 border border-emerald-900 text-emerald-400 rounded-full text-[9px] font-black uppercase tracking-wider">✓ Decrypted</span>
                            ) : (
                              <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-500 rounded-full text-[9px] uppercase tracking-wider">No Attempt</span>
                            )}
                          </td>
                          <td className="p-3 text-right text-zinc-500 text-[10px]">
                            {new Date(cadet.timestamp).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs font-sans text-zinc-300 leading-relaxed max-w-4xl">
                <div className="bg-red-950/15 border border-red-900/40 p-4 rounded text-xs text-red-300 font-mono">
                  <p className="font-bold uppercase text-[11px] mb-1 text-red-400 flex items-center">
                    <ShieldCheck className="h-4 w-4 mr-1.5 text-red-400 animate-pulse" />
                    PRODUCTION STATUS: PORTAL IS READY FOR HOSTING!
                  </p>
                  <p className="text-[11px] leading-relaxed">
                    All components are bundled, fully responsive, and styled directly using compiled Tailwind utilities.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full text-center py-8 bg-black/95 border-t border-zinc-950 mt-auto flex flex-col items-center justify-center space-y-4">
        <img 
          src="/mask.png" 
          alt="Null Origin logo small" 
          className="h-12 md:h-20 object-contain filter drop-shadow-[0_0_12px_rgba(239,68,68,0.7)] opacity-85 transition-all duration-300 hover:opacity-100 hover:scale-110 cursor-pointer"
          onMouseEnter={() => sound.playHover()}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src.endsWith("/mask.png")) {
              target.src = "/logo.png";
            } else {
              target.style.display = 'none';
            }
          }}
        />
        <p className="text-[10px] text-zinc-500 hover:text-zinc-400 tracking-widest font-mono max-w-2xl px-4 transition-colors duration-300">
          © {new Date().getFullYear()} NULL ORIGIN CTF // SECURED OVER HTTPS // DOMAIN APPROVED: NULLORIGIN.CYBERHX.COM
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/registration" element={<RegistrationPage onBack={() => window.location.href = "/"} />} />
      <Route path="/*" element={<HomePage />} />
    </Routes>
  );
}