import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HackerBackground from "./components/HackerBackground";
import HackerMask from "./components/HackerMask";
import RegistrationPage from "./components/RegistrationPage";
import { sound } from "./utils/audio";
import { 
  Volume2, 
  VolumeX, 
  Mail, 
  Terminal, 
  Calendar, 
  Share2, 
  Clipboard, 
  ShieldCheck, 
  Cpu, 
  ArrowRight,
  Download,
  Users,
  Trash2,
  Key,
  Info,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileSpreadsheet
} from "lucide-react";

interface Cadet {
  email: string;
  codename: string;
  solved: boolean;
  timestamp: string;
}

function HomePage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [codename, setCodename] = useState("");
  const [preRegistered, setPreRegistered] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  
  const [timeLeft, setTimeLeft] = useState({
    days: "24",
    hours: "08",
    minutes: "47",
    seconds: "12",
  });

  const [teaserInput, setTeaserInput] = useState("");
  const [teaserStatus, setTeaserStatus] = useState<"idle" | "correct" | "incorrect">("idle");

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
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 24);
    targetDate.setHours(targetDate.getHours() + 8);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(d).padStart(2, "0"),
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("null_origin_ctf_preregistered");
    if (saved === "true") {
      setPreRegistered(true);
      const savedEmail = localStorage.getItem("null_origin_ctf_email") || "";
      const savedCname = localStorage.getItem("null_origin_ctf_codename") || "";
      setEmail(savedEmail);
      setCodename(savedCname);
    }

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

  const handlePreRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    sound.playSuccess();
    const finalCodename = codename.trim() || `Operator_${Math.floor(1000 + Math.random() * 9000)}`;
    setCodename(finalCodename);
    setPreRegistered(true);

    localStorage.setItem("null_origin_ctf_preregistered", "true");
    localStorage.setItem("null_origin_ctf_email", email);
    localStorage.setItem("null_origin_ctf_codename", finalCodename);

    const newCadet: Cadet = {
      email: email.trim(),
      codename: finalCodename,
      solved: teaserStatus === "correct",
      timestamp: new Date().toISOString(),
    };

    const updatedRoster = [newCadet, ...registrations.filter(r => r.email.toLowerCase() !== email.trim().toLowerCase())];
    setRegistrations(updatedRoster);
    localStorage.setItem("null_origin_ctf_roster", JSON.stringify(updatedRoster));

    setLogs((prev) => [
      ...prev,
      `[REGISTRANT] Added '${finalCodename}' into Null Origin queue. Checksum active.`,
    ]);
  };

  const handleTeaserVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = teaserInput.trim().toLowerCase();
    
    if (cleanInput.includes("flag{nh11_rot13_d3c0d3}") || cleanInput === "flag{nh11_rot13_d3c0d3}") {
      setTeaserStatus("correct");
      sound.playSuccess();
      setLogs((prev) => [
        ...prev,
        `[TEASER SOLVED] Flag decrypted successfully! Decrypted message verified.`,
      ]);

      const currentEmail = localStorage.getItem("null_origin_ctf_email");
      if (currentEmail) {
        const updatedRoster = registrations.map(r => {
          if (r.email.toLowerCase() === currentEmail.trim().toLowerCase()) {
            return { ...r, solved: true };
          }
          return r;
        });
        setRegistrations(updatedRoster);
        localStorage.setItem("null_origin_ctf_roster", JSON.stringify(updatedRoster));
      }
    } else {
      setTeaserStatus("incorrect");
      sound.playError();
      setTimeout(() => setTeaserStatus("idle"), 2000);
    }
  };

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

  const shareOnTwitter = () => {
    sound.playEnter();
    const message = `I have secured my operator clearance code & codename "${codename || 'Anonym'}" for Null Origin CTF early access. Pre-registrations are live right now! Try to crack the teaser cipher if you dare. 💻🔓\n\nReserve portal here: https://nullorigin.cyberhx.com`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`, "_blank");
  };

  const shareOnTelegram = () => {
    sound.playEnter();
    const message = `Reserve your operator codename for Null Origin CTF. Solve the launch teaser cipher!\nLaunch link: https://nullorigin.cyberhx.com`;
    window.open(`https://t.me/share/url?url=https://nullorigin.cyberhx.com&text=${encodeURIComponent(message)}`, "_blank");
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

              <div 
                className="pt-2 text-md md:text-xl font-bold tracking-widest text-[#22c55e] flex items-center space-x-2 select-none"
                onMouseEnter={() => sound.playHover()}
              >
                <span>COMING SOON</span>
                <span className="w-2 h-4 bg-[#22c55e] animate-pulse"></span>
              </div>
            </div>

            {/* Countdown */}
            <div 
              onMouseEnter={() => sound.playHover()}
              className="w-full max-w-md bg-zinc-950/90 border border-zinc-900 rounded p-4 shadow-2xl relative overflow-hidden group hover:border-[#22c55e]/40 transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-16 h-[1px] bg-[#22c55e]/30"></div>
              <div className="absolute top-0 left-0 w-[1px] h-16 bg-[#22c55e]/30"></div>
              
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] tracking-widest text-[#22c55e] uppercase flex items-center space-x-1">
                  <Calendar className="h-3 w-3 text-[#22c55e] mr-1 animate-pulse" />
                  LAUNCH_TIMELINE_COUNTDOWN
                </span>
                <span className="text-[9px] bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/30 px-1.5 py-0.5 rounded uppercase font-bold select-none">
                  T-MINUS STATUS
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-[#050505] border border-zinc-900 p-2 rounded">
                  <p className="text-2xl md:text-3xl font-extrabold text-[#22c55e]">{timeLeft.days}</p>
                  <span className="text-[8px] tracking-wider text-zinc-500 uppercase">DAYS</span>
                </div>
                <div className="bg-[#050505] border border-zinc-900 p-2 rounded">
                  <p className="text-2xl md:text-3xl font-extrabold text-[#22c55e]">{timeLeft.hours}</p>
                  <span className="text-[8px] tracking-wider text-zinc-500 uppercase">HRS</span>
                </div>
                <div className="bg-[#050505] border border-zinc-900 p-2 rounded">
                  <p className="text-2xl md:text-3xl font-extrabold text-[#22c55e]">{timeLeft.minutes}</p>
                  <span className="text-[8px] tracking-wider text-zinc-500 uppercase">MINS</span>
                </div>
                <div className="bg-[#050505] border border-zinc-900 p-2 rounded">
                  <p className="text-2xl md:text-3xl font-extrabold text-red-600 animate-pulse">{timeLeft.seconds}</p>
                  <span className="text-[8px] tracking-wider text-zinc-500 uppercase">SECS</span>
                </div>
              </div>
            </div>

            {/* Pre-reg form */}
            <div className="w-full max-w-lg bg-[#06060c]/85 border border-zinc-900 hover:border-red-900/30 transition-colors rounded p-6 shadow-2xl relative">
              <div className="absolute top-0 right-0 px-2.5 py-0.5 bg-red-700 text-black text-[9px] font-black uppercase tracking-widest animate-pulse">
                Pre-Reg Active
              </div>

              {preRegistered ? (
                <div className="space-y-4 animate-[fadeIn_1s] py-2">
                  <div className="flex items-center space-x-3 text-emerald-400">
                    <ShieldCheck className="h-8 w-8 shrink-0" />
                    <div>
                      <h3 className="font-bold text-sm tracking-wide uppercase">PRE-REGISTRATION CONFIRMED</h3>
                      <p className="text-xs text-zinc-400">We have recorded your email and codename successfully.</p>
                    </div>
                  </div>
                  <div className="bg-[#09090c] border border-zinc-800 p-4 rounded text-xs space-y-2">
                    <p className="text-emerald-500 font-bold truncate">REGISTERED CODENAME: {codename || "ANONYMOUS CADET"}</p>
                    <p className="text-zinc-500">EMAIL ADDRESS: {email}</p>
                    <p className="text-zinc-500 text-[10.5px] pt-2 border-t border-zinc-900 leading-relaxed">
                      Your profile has been saved. We will now be able to automatically send you the launch invitation, official links, and start instructions directly to your email as soon as the tournament goes live!
                    </p>
                  </div>

                  <div className="pt-2 space-y-2">
                    <p className="text-[10px] text-zinc-500 tracking-wider">RECRUIT CO-OPERATORS TO FORM COMPROMISE SQUAD:</p>
                    <div className="flex flex-wrap gap-2">
                      <button 
                        onClick={shareOnTwitter}
                        onMouseEnter={() => sound.playHover()}
                        className="flex items-center space-x-1.5 px-3.5 py-2 bg-sky-950/20 border border-sky-900/60 hover:border-sky-500 hover:text-white text-sky-400 rounded text-[11px] font-bold tracking-wider cursor-pointer transition-all active:scale-95"
                      >
                        <Share2 className="h-3 w-3" />
                        <span>SHARE ON X / TWITTER</span>
                      </button>
                      <button 
                        onClick={shareOnTelegram}
                        onMouseEnter={() => sound.playHover()}
                        className="flex items-center space-x-1.5 px-3.5 py-2 bg-blue-950/20 border border-blue-900/60 hover:border-blue-500 hover:text-white text-blue-400 rounded text-[11px] font-bold tracking-wider cursor-pointer transition-all active:scale-95"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>SHARE ON TELEGRAM</span>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => { setPreRegistered(false); setEmail(""); }}
                    onMouseEnter={() => sound.playHover()}
                    className="text-xs text-zinc-400 underline hover:text-white transition-all cursor-pointer block pt-1"
                  >
                    Register another cadet profile
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePreRegister} className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold tracking-widest text-[#22c55e] uppercase flex items-center">
                      <Terminal className="h-3 w-3 text-red-500 mr-1 animate-pulse" />
                      PRE-REGISTER FOR LAUNCH NOTIFICATIONS
                    </h3>
                    <div className="space-y-1.5 text-xs text-zinc-400 leading-relaxed font-sans">
                      <p>
                        Enter your Email ID and Codename below! We log all registration entries so we can automatically deliver prompt launch invites, direct challenge links, and priority start codes via email the instant the platform goes live.
                      </p>
                      <p className="text-zinc-500 border-l-2 border-red-800/60 pl-2 italic">
                        All registered operators will receive exclusive challenge updates, early portal access instructions, and tournament details straight to their inbox.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <input
                      type="email"
                      required
                      value={email}
                      onMouseEnter={() => sound.playHover()}
                      onChange={(e) => { setEmail(e.target.value); handleKeyInteraction(); }}
                      placeholder="OPERATOR_EMAIL (e.g. cadet@domain.com)"
                      className="w-full bg-black/95 border border-zinc-850 hover:border-zinc-700 focus:border-red-600 focus:outline-none rounded px-3.5 py-2.5 text-xs md:text-sm tracking-wider text-emerald-400 placeholder-zinc-800 uppercase focus:ring-1 focus:ring-red-600/30 transition-all font-mono"
                    />
                    <input
                      type="text"
                      value={codename}
                      onMouseEnter={() => sound.playHover()}
                      onChange={(e) => { setCodename(e.target.value); handleKeyInteraction(); }}
                      placeholder="DESIRED_CODENAME (OPTIONAL)"
                      maxLength={24}
                      className="w-full bg-black/95 border border-zinc-850 hover:border-zinc-700 focus:border-[#22c55e] focus:outline-none rounded px-3.5 py-2.5 text-xs md:text-sm tracking-wider text-[#22c55e] placeholder-zinc-800 uppercase focus:ring-1 focus:ring-[#22c55e]/30 transition-all font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    onMouseEnter={() => sound.playHover()}
                    className="w-full flex items-center justify-center space-x-2 bg-red-950/80 border border-red-600 hover:bg-red-900 hover:text-white text-red-100 font-bold tracking-widest px-4 py-3 rounded text-xs transition-all uppercase group cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_20px_rgba(239,68,68,0.25)]"
                  >
                    <span>INITIALIZE SECURITY INGRESS</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* CTA to full registration */}
                  <button
                    type="button"
                    onClick={() => navigate("/registration")}
                    onMouseEnter={() => sound.playHover()}
                    className="w-full flex items-center justify-center space-x-2 bg-zinc-900/60 border border-zinc-700 hover:border-red-600/50 hover:text-red-400 text-zinc-400 font-bold tracking-widest px-4 py-2.5 rounded text-xs transition-all uppercase group cursor-pointer"
                  >
                    <span>TEAM REGISTRATION →</span>
                  </button>
                </form>
              )}
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

            {/* Teaser box */}
            <div 
              className="w-full max-w-sm bg-black/95 border border-zinc-900 rounded p-4 shadow-xl mt-4 space-y-3 hover:border-red-900/30 transition-all duration-300"
              onMouseEnter={() => sound.playHover()}
            >
              <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                <span className="text-[10px] tracking-widest text-[#22c55e] uppercase font-bold flex items-center">
                  <Cpu className="h-3.5 w-3.5 mr-1" />
                  ALPHA_NODE_ROT13_DECRYPTER
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-red-950/40 text-red-400 border border-red-900/40 select-none font-bold uppercase tracking-wider">
                  DIFFICULTY: EASY
                </span>
              </div>

              <div className="text-[11px] space-y-1.5 text-zinc-400 font-mono">
                <p className="text-zinc-500">Decrypt the teaser cipher block to captured credential:</p>
                <div className="p-2 bg-[#050505] border border-zinc-800 rounded font-mono text-[#22c55e] break-all select-all text-[11.5px] cursor-help tracking-widest">
                  Ciphertext: synt{"{aH11_ebg13_q3p0q3}"}
                </div>
              </div>

              <form onSubmit={handleTeaserVerify} className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="FLAG{...}"
                  value={teaserInput}
                  onMouseEnter={() => sound.playHover()}
                  onChange={(e) => { setTeaserInput(e.target.value); handleKeyInteraction(); }}
                  className="bg-black border border-zinc-850 hover:border-zinc-700 text-xs text-white rounded px-3 py-2 flex-1 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/30 transition-all font-mono uppercase"
                />
                <button
                  type="submit"
                  onMouseEnter={() => sound.playHover()}
                  className="bg-red-955 border border-red-900 hover:border-red-600 text-[10px] tracking-wider uppercase font-bold text-red-200 hover:text-white px-4 py-2 rounded transition-all cursor-pointer"
                >
                  VERIFY
                </button>
              </form>

              {teaserStatus === "correct" && (
                <div className="space-y-2 bg-emerald-950/20 border border-emerald-900/60 p-3 rounded">
                  <div className="text-[10px] text-emerald-400 font-bold uppercase animate-pulse leading-none">
                    ✓ ACCEPTED! Correct Decryption Flag captured. Added badge count.
                  </div>
                  <button 
                    onClick={() => {
                      sound.playEnter();
                      const txt = `I decrypted the teaser cipher on Null Origin CTF! Can you crack it too? Try the ROT13 challenge here: https://nullorigin.cyberhx.com ✨🔓 #CTF #Hacking`;
                      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(txt)}`, "_blank");
                    }}
                    className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-emerald-900/10 hover:bg-emerald-900/25 border border-emerald-600/30 text-emerald-400 rounded text-[9.5px] font-black tracking-widest cursor-pointer transition-all active:scale-95"
                  >
                    <Share2 className="h-3 w-3 text-emerald-400 animate-bounce" />
                    <span>BRAG ON TWITTER / X</span>
                  </button>
                </div>
              )}
              {teaserStatus === "incorrect" && (
                <div className="text-[10px] text-red-500 font-bold uppercase leading-none bg-red-950/30 border border-red-900/60 p-2 rounded">
                  ✗ INCORRECT. Standard Caesar rotation. Try ROT-13 decryption.
                </div>
              )}
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

       {/* Team registration CTA */}
<div className="w-full max-w-lg bg-[#06060c]/85 border border-zinc-900 hover:border-red-900/30 transition-colors rounded p-6 shadow-2xl relative">
  <div className="absolute top-0 right-0 px-2.5 py-0.5 bg-red-700 text-black text-[9px] font-black uppercase tracking-widest animate-pulse">
    REGISTRATION OPEN
  </div>
  <div className="space-y-4">
    <div className="space-y-2">
      <h3 className="text-xs font-bold tracking-widest text-red-400 uppercase flex items-center">
        <Terminal className="h-3 w-3 text-red-500 mr-1 animate-pulse" />
        NULL ORIGIN TEAM REGISTRATION
      </h3>
      <div className="space-y-1.5 text-xs text-zinc-400 leading-relaxed font-sans">
        <p>
          Register your team for Null Origin CTF and compete with hackers,
          researchers, and security enthusiasts from around the world.
        </p>
        <p className="text-zinc-500 border-l-2 border-red-800/60 pl-2 italic">
          Team Size: 1–4 Members • Registrations are now live.
          Secure your spot before registrations close.
        </p>
      </div>
    </div>
    <button
      type="button"
      onClick={() => navigate("/registration")}
      onMouseEnter={() => sound.playHover()}
      className="w-full flex items-center justify-center space-x-2 bg-red-950/80 border border-red-600 hover:bg-red-900 hover:text-white text-red-100 font-bold tracking-widest px-4 py-3 rounded text-xs transition-all uppercase group cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_20px_rgba(239,68,68,0.25)]"
    >
      <span>TEAM REGISTRATION</span>
      <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
    </button>
  </div>
</div>

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