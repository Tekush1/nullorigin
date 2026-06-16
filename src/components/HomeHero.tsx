import { Calendar, Terminal, Users, CheckCircle, ArrowRight } from "lucide-react";
import { sound } from "../utils/audio";

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

interface HomeHeroProps {
  timeLeft: TimeLeft;
  onRegister: () => void;
}

export default function HomeHero({ timeLeft, onRegister }: HomeHeroProps) {
  return (
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

      {/* ── COUNTDOWN ── */}
      <div
        onMouseEnter={() => sound.playHover()}
        className="w-full max-w-md bg-zinc-950/90 border border-zinc-800/80 rounded-lg p-5 shadow-2xl relative overflow-hidden group hover:border-[#22c55e]/30 transition-all duration-300"
      >
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

      {/* ── REGISTRATION CARD ── */}
      <div className="w-full max-w-lg bg-[#06060c]/90 border border-zinc-800/80 hover:border-red-800/40 transition-all duration-300 rounded-lg shadow-2xl relative overflow-hidden group">
        <div className="h-[2px] w-full bg-gradient-to-r from-red-700 via-red-500 to-transparent" />

        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-700/90 rounded text-[9px] font-black uppercase tracking-widest text-white shadow-[0_0_10px_rgba(239,68,68,0.4)]">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            OPEN
          </div>
        </div>

        <div className="p-6 md:p-7 space-y-5">
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

          <div className="flex flex-wrap gap-2">
            {["Free to Enter", "Online Event", "Global"].map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 bg-zinc-900/70 border border-zinc-800 rounded text-[10px] text-zinc-500 tracking-wider font-mono">
                <CheckCircle className="h-2.5 w-2.5 text-emerald-500" />
                {tag}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={onRegister}
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
  );
}