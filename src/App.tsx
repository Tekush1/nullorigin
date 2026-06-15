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
  FileSpreadsheet,
  Shield,
  Zap,
  Globe,
  CheckCircle,
} from "lucide-react";

interface Cadet {
  email: string;
  codename: string;
  solved: boolean;
  timestamp: string;
}

// ─────────────────────────────────────────────
//  PREMIUM FOOTER
// ─────────────────────────────────────────────
function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="relative z-10 w-full bg-[#040406] border-t border-zinc-900 mt-auto"
    >
      {/* Glow accent line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand Column */}
        <div className="space-y-4 lg:col-span-1">
          <div className="flex items-center gap-3">
            <img
              src="/mask.png"
              alt="Null Origin"
              className="h-9 object-contain filter drop-shadow-[0_0_10px_rgba(239,68,68,0.6)]"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                if (t.src.endsWith("/mask.png")) t.src = "/logo.png";
                else t.style.display = "none";
              }}
            />
            <div>
              <p className="text-xs font-black tracking-widest text-zinc-100 uppercase">NULL ORIGIN CTF</p>
              <p className="text-[10px] text-zinc-600 tracking-wider uppercase mt-0.5">Team CyberXoX presents</p>
            </div>
          </div>
          <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">
            A premier CTF experience by{" "}
            <a
              href="https://cyberhx.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 transition-colors underline underline-offset-2"
            >
              CyberHX
            </a>
            . Hack. Exploit. Escape.
          </p>
          {/* Trust badges */}
          <div className="flex flex-col gap-2 pt-1">
            <div className="flex items-center gap-2">
              <Shield className="h-3 w-3 text-emerald-500 shrink-0" />
              <span className="text-[10px] text-zinc-500 tracking-wider">Hosted by CyberHX</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-3 w-3 text-red-500 shrink-0" />
              <span className="text-[10px] text-zinc-500 tracking-wider">Security Research Community</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-3 w-3 text-yellow-500 shrink-0" />
              <span className="text-[10px] text-zinc-500 tracking-wider">Community Driven</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <p className="text-[10px] font-black tracking-widest text-red-400 uppercase border-l-2 border-red-600 pl-2">
            Quick Links
          </p>
          <nav aria-label="Footer quick links">
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "Rules", href: "/rules" },
                { label: "FAQ", href: "/faq" },
                { label: "Contact", href: "mailto:contact@cyberhx.com" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-[11px] text-zinc-500 hover:text-red-400 transition-colors tracking-wider group flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-zinc-700 group-hover:bg-red-500 transition-colors" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Community */}
        <div className="space-y-4">
          <p className="text-[10px] font-black tracking-widest text-red-400 uppercase border-l-2 border-red-600 pl-2">
            Community
          </p>
          <nav aria-label="Footer community links">
            <ul className="space-y-2.5">
              {[
                { label: "Discord", href: "https://discord.gg/cyberhx", icon: "⚡" },
                { label: "LinkedIn", href: "https://linkedin.com/company/cyberhx", icon: "◈" },
                { label: "Instagram", href: "https://instagram.com/cyberhx", icon: "◉" },
                { label: "X (Twitter)", href: "https://x.com/cyberhx", icon: "✕" },
                { label: "GitHub", href: "https://github.com/cyberhx", icon: "◎" },
              ].map(({ label, href, icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-zinc-500 hover:text-red-400 transition-colors tracking-wider group flex items-center gap-2"
                  >
                    <span className="text-[10px] text-zinc-700 group-hover:text-red-500 transition-colors font-mono">{icon}</span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Organised By */}
        <div className="space-y-4">
          <p className="text-[10px] font-black tracking-widest text-red-400 uppercase border-l-2 border-red-600 pl-2">
            Organised By
          </p>
          <a
            href="https://cyberhx.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 bg-red-950/20 border border-red-900/40 hover:border-red-600/50 rounded transition-all group"
          >
            <img
              src="/mask.png"
              alt="CyberHX"
              className="h-5 object-contain filter drop-shadow-[0_0_6px_rgba(239,68,68,0.5)]"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <span className="text-[11px] text-zinc-400 group-hover:text-red-300 tracking-widest uppercase transition-colors font-mono">CyberHX</span>
          </a>

          <div className="pt-2 space-y-1.5">
            <p className="text-[10px] text-zinc-600 tracking-wider uppercase">Powered by</p>
            <p className="text-[11px] text-zinc-500 font-mono">CyberHX Infrastructure</p>
          </div>

          <div className="pt-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/20 border border-emerald-900/40 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-emerald-500 tracking-widest uppercase font-bold">Portal Secured</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-900/60">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-zinc-600 tracking-wider font-mono">
            © {new Date().getFullYear()} NULL ORIGIN CTF · NULLORIGIN.CYBERHX.COM
          </p>
          <p className="text-[10px] text-zinc-600 tracking-wider font-sans">
            Made with ❤️ by{" "}
            <span className="text-zinc-500">Team CyberXoX</span>
            {" · "}
            <a
              href="https://cyberhx.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500/70 hover:text-red-400 transition-colors"
            >
              Powered by CyberHX
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────
//  HOME PAGE
// ─────────────────────────────────────────────
function HomePage() {
  const navigate = useNavigate();
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

  const handleKeyInteraction = () => { sound.playKey(); };
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
      if (difference <= 0) { clearInterval(interval); return; }
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
    const stored = localStorage.getItem("null_origin_ctf_roster");
    if (stored) {
      try { setRegistrations(JSON.parse(stored)); } catch (e) {}
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

  const handleTeaserVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = teaserInput.trim().toLowerCase();
    if (cleanInput.includes("flag{nh11_rot13_d3c0d3}") || cleanInput === "flag{nh11_rot13_d3c0d3}") {
      setTeaserStatus("correct");
      sound.playSuccess();
      setLogs((prev) => [...prev, `[TEASER SOLVED] Flag decrypted successfully! Decrypted message verified.`]);
    } else {
      setTeaserStatus("incorrect");
      sound.playError();
      setTimeout(() => setTeaserStatus("idle"), 2500);
    }
  };

  const handleStatusClick = () => {
    sound.playClick();
    setStatusClicks((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        setShowAdmin(true);
        sound.playSuccess();
        setLogs((prevLogs) => [...prevLogs, `[OVERSEER] Tactical Administrator panel decrypted! Access granted.`]);
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
    if (window.confirm("Purge the local registries roster?")) {
      sound.playError();
      localStorage.removeItem("null_origin_ctf_roster");
      const defaultRoster = [{ email: "neo@cyberhx.com", codename: "NE0_BYPASS", solved: true, timestamp: new Date().toISOString() }];
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

      {/* ── HEADER ── */}
      <header className="relative z-20 w-full px-5 md:px-8 py-3 md:py-4 flex justify-between items-center bg-black/90 backdrop-blur-md border-b border-red-600/25 transition-all duration-300">
        <div className="flex items-center space-x-3 md:space-x-4">
          <img
            src="/mask.png"
            alt="Null Origin Icon"
            className="h-9 md:h-14 object-contain filter drop-shadow-[0_0_12px_rgba(239,68,68,0.7)] hover:scale-105 transition-all duration-300"
            onMouseEnter={() => sound.playHover()}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src.endsWith("/mask.png")) target.src = "/logo.png";
              else target.style.display = "none";
            }}
          />
          <button
            onClick={handleStatusClick}
            onMouseEnter={() => sound.playHover()}
            title="PORTAL ACCESS INDICATOR"
            aria-label="Null Origin Portal Status"
            className="flex items-center space-x-2.5 cursor-pointer group select-none bg-transparent border-0 p-0"
          >
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)] group-hover:bg-red-400 flex-shrink-0" aria-hidden="true" />
            <span className="text-[12px] md:text-[14px] tracking-widest text-zinc-100 uppercase font-black font-sans group-hover:text-red-400 transition-colors">
              NULL ORIGIN <span className="hidden sm:inline text-red-500 font-mono">// SECURED PORTAL</span>
            </span>
          </button>
        </div>

        <nav className="flex items-center space-x-2 md:space-x-3" aria-label="Primary navigation">
          <button
            onClick={toggleSound}
            onMouseEnter={() => sound.playHover()}
            aria-label={audioEnabled ? "Mute sounds" : "Unmute sounds"}
            className="p-2.5 border border-zinc-800 rounded-md bg-zinc-900/50 hover:bg-red-950/20 hover:border-red-700/40 transition-all text-zinc-500 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:ring-offset-1 focus:ring-offset-black cursor-pointer"
          >
            {audioEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
          </button>

          <button
            onClick={copyShareLink}
            onMouseEnter={() => sound.playHover()}
            aria-label="Copy share link"
            className="flex items-center space-x-2 px-3 md:px-4 py-2 border border-zinc-800 rounded-md bg-zinc-900/50 hover:text-red-400 text-zinc-500 hover:bg-red-950/20 hover:border-red-700/40 transition-all text-[11px] font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:ring-offset-1 focus:ring-offset-black cursor-pointer"
          >
            <Share2 className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="hidden sm:inline">{copiedLink ? "COPIED ✓" : "SHARE"}</span>
          </button>

          <button
            onClick={() => navigate("/registration")}
            onMouseEnter={() => sound.playHover()}
            aria-label="Register for Null Origin CTF"
            className="flex items-center space-x-2 px-4 md:px-5 py-2 bg-red-700 hover:bg-red-600 active:bg-red-800 border border-red-500/80 text-white text-[11px] font-black tracking-widest uppercase rounded-md transition-all shadow-[0_0_18px_rgba(239,68,68,0.25)] hover:shadow-[0_0_24px_rgba(239,68,68,0.4)] focus:outline-none focus:ring-2 focus:ring-red-400/70 focus:ring-offset-1 focus:ring-offset-black cursor-pointer"
          >
            <ArrowRight className="h-3.5 w-3.5 flex-shrink-0" />
            <span>REGISTER</span>
          </button>
        </nav>
      </header>

      {/* ── MAIN ── */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col justify-center relative z-10">

        {/* Terminal breadcrumb — DO NOT TOUCH */}
        <div className="mb-5 text-xs md:text-sm text-zinc-500 select-none flex items-center space-x-2">
          <span className="text-red-500 font-bold">operator@nullorigin:~$</span>
          <span className="text-[#22c55e] font-semibold pl-1">./initialize_portal --domain=nullorigin.cyberhx.com</span>
          <span className="h-4 w-1.5 bg-red-600 inline-block animate-pulse" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">

          {/* ── LEFT ── */}
          <div className="lg:col-span-7 flex flex-col items-start text-left justify-center space-y-7">

            {/* LOGO — DO NOT TOUCH */}
            <div className="w-full relative space-y-4">
              <div
                className="flex items-center justify-start mb-2 max-w-md md:max-w-xl"
                onMouseEnter={() => sound.playHover()}
              >
                <img
                  src="/logo.png"
                  alt="Null Origin Logo"
                  referrerPolicy="no-referrer"
                  onError={(e) => { (e.target as HTMLElement).style.display = "none"; }}
                  className="max-h-[360px] md:max-h-[480px] w-full object-contain filter drop-shadow-[0_0_45px_rgba(239,68,68,0.75)] transition-all hover:scale-105 duration-500 cursor-crosshair"
                />
              </div>

              <div
                className="pt-1 text-sm md:text-lg font-bold tracking-widest text-[#22c55e] flex items-center space-x-2 select-none"
                onMouseEnter={() => sound.playHover()}
              >
                <span>COMING SOON</span>
                <span className="w-2 h-4 bg-[#22c55e] animate-pulse" aria-hidden="true" />
              </div>
            </div>

            {/* ── COUNTDOWN — improved labels only ── */}
            <div
              onMouseEnter={() => sound.playHover()}
              className="w-full max-w-md bg-zinc-950/90 border border-zinc-800/80 rounded-lg p-5 shadow-2xl relative overflow-hidden group hover:border-[#22c55e]/30 transition-all duration-300"
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-12 h-[1px] bg-[#22c55e]/40" aria-hidden="true" />
              <div className="absolute top-0 left-0 w-[1px] h-12 bg-[#22c55e]/40" aria-hidden="true" />
              <div className="absolute bottom-0 right-0 w-12 h-[1px] bg-red-600/20" aria-hidden="true" />
              <div className="absolute bottom-0 right-0 w-[1px] h-12 bg-red-600/20" aria-hidden="true" />

              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] tracking-widest text-[#22c55e] uppercase flex items-center gap-1.5 font-bold">
                  <Calendar className="h-3 w-3" aria-hidden="true" />
                  LAUNCH IN
                </span>
                <span className="text-[9px] bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/30 px-2 py-0.5 rounded uppercase font-black tracking-widest select-none">
                  T-MINUS
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 md:gap-3 text-center" role="timer" aria-label="Time until CTF launch">
                {[
                  { val: timeLeft.days, label: "DAYS" },
                  { val: timeLeft.hours, label: "HOURS" },
                  { val: timeLeft.minutes, label: "MINS" },
                  { val: timeLeft.seconds, label: "SECS", pulse: true },
                ].map(({ val, label, pulse }) => (
                  <div key={label} className="bg-[#050505] border border-zinc-800/80 p-2.5 md:p-3 rounded-md group-hover:border-zinc-700/50 transition-colors">
                    <p className={`text-2xl md:text-3xl font-extrabold tabular-nums ${pulse ? "text-red-500 animate-pulse" : "text-[#22c55e]"}`}>
                      {val}
                    </p>
                    <span className="text-[9px] tracking-widest text-zinc-600 uppercase font-bold mt-1 block">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── REGISTRATION CARD — improved ── */}
            <div className="w-full max-w-lg bg-[#06060c]/90 border border-zinc-800/80 hover:border-red-800/40 transition-all duration-300 rounded-lg shadow-2xl relative overflow-hidden group">
              {/* Top accent bar */}
              <div className="h-[2px] w-full bg-gradient-to-r from-red-700 via-red-500 to-transparent" />

              {/* Registration open badge */}
              <div className="absolute top-3 right-3">
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-700/90 rounded text-[9px] font-black uppercase tracking-widest text-white shadow-[0_0_10px_rgba(239,68,68,0.4)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  OPEN
                </div>
              </div>

              <div className="p-6 md:p-7 space-y-5">
                {/* Card heading */}
                <div className="pr-16">
                  <div className="flex items-center gap-2 mb-2">
                    <Terminal className="h-3.5 w-3.5 text-red-500 flex-shrink-0" aria-hidden="true" />
                    <h2 className="text-[10px] font-black tracking-widest text-red-400 uppercase">
                      TEAM REGISTRATION
                    </h2>
                  </div>
                  <p className="text-sm md:text-[15px] font-bold text-zinc-100 tracking-wide leading-snug">
                    Register for Null Origin CTF
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-2 text-[12px] md:text-[13px] text-zinc-400 leading-relaxed font-sans">
                  <p>
                    Compete with hackers, researchers, and security enthusiasts from around the world.
                    Cryptography · Binary Exploitation · Web Security · Forensics · OSINT.
                  </p>
                  <div className="flex items-start gap-2 border-l-2 border-red-800/50 pl-3 py-0.5">
                    <Users className="h-3.5 w-3.5 text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-zinc-500 text-[11px]">
                      Team Size: 1–4 Members · Registrations are now live. Secure your spot before they close.
                    </p>
                  </div>
                </div>

                {/* Quick trust row */}
                <div className="flex flex-wrap gap-2">
                  {["Free to Enter", "Online Event", "Global"].map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 bg-zinc-900/70 border border-zinc-800 rounded text-[10px] text-zinc-500 tracking-wider font-mono">
                      <CheckCircle className="h-2.5 w-2.5 text-emerald-500" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button
                  type="button"
                  onClick={() => navigate("/registration")}
                  onMouseEnter={() => sound.playHover()}
                  aria-label="Go to team registration form"
                  className="w-full flex items-center justify-center gap-2.5 bg-red-700 hover:bg-red-600 active:bg-red-800 border border-red-500/60 hover:border-red-400/80 text-white font-black tracking-widest px-5 py-3.5 rounded-md text-[12px] transition-all uppercase shadow-[0_0_20px_rgba(239,68,68,0.15)] hover:shadow-[0_0_30px_rgba(239,68,68,0.35)] focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-[#06060c] group cursor-pointer"
                >
                  <span>REGISTER YOUR TEAM</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </button>
              </div>
            </div>

          </div>

          {/* ── RIGHT ── */}
          <div className="lg:col-span-5 flex flex-col justify-center items-center gap-5 py-2 relative">

            {/* HackerMask — DO NOT TOUCH */}
            <div
              className="relative w-full flex justify-center"
              onMouseEnter={() => sound.playHover()}
            >
              <HackerMask />
            </div>

            {/* ── CIPHER CHALLENGE — improved ── */}
            <div
              className="w-full max-w-sm bg-black/95 border border-zinc-800/80 rounded-lg shadow-xl space-y-0 hover:border-zinc-700/50 transition-all duration-300 overflow-hidden"
              onMouseEnter={() => sound.playHover()}
            >
              {/* Card header */}
              <div className="flex justify-between items-center px-4 py-3 bg-zinc-950/80 border-b border-zinc-800/80">
                <span className="text-[10px] tracking-widest text-[#22c55e] uppercase font-black flex items-center gap-1.5">
                  <Cpu className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                  CIPHER CHALLENGE
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded-sm bg-amber-900/30 text-amber-400 border border-amber-800/50 font-black uppercase tracking-wider">
                  EASY
                </span>
              </div>

              <div className="p-4 space-y-4">
                {/* Prompt */}
                <div className="space-y-2">
                  <p className="text-[11px] text-zinc-500 font-mono leading-relaxed">
                    Decrypt the teaser cipher to capture the credential:
                  </p>
                  <div
                    className="p-3 bg-[#050505] border border-zinc-800 rounded-md font-mono text-[#22c55e] break-all select-all text-[11.5px] cursor-text tracking-wider leading-relaxed"
                    title="Select all to copy"
                    role="region"
                    aria-label="Cipher text to decrypt"
                  >
                    synt{"{aH11_ebg13_q3p0q3}"}
                  </div>
                </div>

                {/* Input + button */}
                <form onSubmit={handleTeaserVerify} className="space-y-2.5" noValidate>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="flag{...}"
                      value={teaserInput}
                      aria-label="Enter decrypted flag"
                      autoComplete="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      onMouseEnter={() => sound.playHover()}
                      onChange={(e) => { setTeaserInput(e.target.value); handleKeyInteraction(); }}
                      className={`w-full bg-zinc-950 border rounded-md px-3.5 py-2.5 text-[12px] text-white placeholder-zinc-700 font-mono uppercase transition-all focus:outline-none focus:ring-1 focus:ring-offset-0 ${
                        teaserStatus === "incorrect"
                          ? "border-red-700/70 focus:border-red-600 focus:ring-red-600/40"
                          : teaserStatus === "correct"
                          ? "border-emerald-700/70 focus:border-emerald-600 focus:ring-emerald-600/40"
                          : "border-zinc-800 hover:border-zinc-600 focus:border-red-600 focus:ring-red-600/30"
                      }`}
                    />
                  </div>
                  <button
                    type="submit"
                    onMouseEnter={() => sound.playHover()}
                    className="w-full py-2.5 px-4 bg-zinc-900 border border-zinc-700 hover:border-red-600/60 hover:bg-red-950/30 hover:text-red-300 text-[11px] tracking-widest uppercase font-black text-zinc-300 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:ring-offset-1 focus:ring-offset-black active:scale-[0.98] cursor-pointer"
                  >
                    VERIFY FLAG
                  </button>
                </form>

                {/* States */}
                {teaserStatus === "correct" && (
                  <div
                    role="alert"
                    className="space-y-3 bg-emerald-950/20 border border-emerald-800/50 p-3.5 rounded-md animate-in fade-in duration-300"
                  >
                    <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-black uppercase">
                      <CheckCircle className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                      FLAG ACCEPTED — Well done, Operator.
                    </div>
                    <button
                      onClick={() => {
                        sound.playEnter();
                        const txt = `I cracked the Null Origin CTF teaser cipher! Can you? Try it: https://nullorigin.cyberhx.com 🔓 #CTF #NullOrigin`;
                        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(txt)}`, "_blank");
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 bg-emerald-900/15 hover:bg-emerald-900/30 border border-emerald-700/30 hover:border-emerald-600/50 text-emerald-400 rounded text-[10px] font-black tracking-widest transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-600/50"
                    >
                      <Share2 className="h-3 w-3" aria-hidden="true" />
                      SHARE ON X / TWITTER
                    </button>
                  </div>
                )}
                {teaserStatus === "incorrect" && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="flex items-center gap-2 text-[10px] text-red-400 font-bold uppercase bg-red-950/25 border border-red-900/50 p-2.5 rounded-md"
                  >
                    <span className="text-red-500 font-mono">✗</span>
                    Incorrect flag. Hint: try ROT-13 decryption.
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* ── AMBIENT LOGS — DO NOT TOUCH ── */}
        <div className="mt-8 border-t border-zinc-900/80 pt-6">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              <span className="text-[9px] tracking-widest text-zinc-500 uppercase font-bold">AMBIENT_LOGS_STREAM</span>
            </div>
            <span className="text-[9px] text-zinc-700 uppercase font-mono hidden sm:block">CHANNEL PORTAL ACTIVE // SECURE CONTEXT</span>
          </div>
          <div
            className="bg-[#040406] border border-zinc-900 rounded-md p-3 h-24 overflow-y-auto font-mono text-[9px] md:text-[10px] text-zinc-500 space-y-1 scrollbar-thin select-none"
            aria-label="Ambient system logs"
            role="log"
            aria-live="polite"
          >
            {logs.map((log, index) => (
              <div key={index} className="flex space-x-2 border-l border-zinc-800/70 pl-2">
                <span className="text-red-900 shrink-0" aria-hidden="true">&raquo;</span>
                <span className="break-all">{log}</span>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}

// ─────────────────────────────────────────────
//  APP ROOT
// ─────────────────────────────────────────────
export default function App() {
  return (
    <Routes>
      <Route path="/registration" element={<RegistrationPage onBack={() => (window.location.href = "/")} />} />
      <Route path="/*" element={<HomePage />} />
    </Routes>
  );
}
