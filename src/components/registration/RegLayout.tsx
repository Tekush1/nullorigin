import { ArrowLeft } from "lucide-react";
import { sound } from "../../hooks/utils/audio";

interface HeaderProps { onBack: () => void; }

export function RegistrationHeader({ onBack }: HeaderProps) {
  return (
    <header className="relative z-20 w-full px-5 md:px-8 py-3 md:py-4 flex justify-between items-center bg-black/90 backdrop-blur-md border-b border-red-600/25">
      <div className="flex items-center gap-3 md:gap-4">
        <img
          src="/mask.png" alt="Null Origin"
          className="h-9 md:h-12 object-contain filter drop-shadow-[0_0_10px_rgba(239,68,68,0.6)]"
          onError={(e) => {
            const t = e.target as HTMLImageElement;
            if (t.src.endsWith("/mask.png")) t.src = "/logo.png";
            else t.style.display = "none";
          }}
        />
        <span className="text-[12px] md:text-[14px] tracking-widest text-zinc-100 uppercase font-black font-sans">
          NULL ORIGIN{" "}
          <span className="hidden sm:inline text-red-500 font-mono">// SECURED PORTAL</span>
        </span>
      </div>
      <button
        onClick={onBack}
        onMouseEnter={() => sound.playHover?.()}
        aria-label="Back to portal"
        className="flex items-center gap-2 px-3 md:px-4 py-2 border border-zinc-800 rounded-md hover:border-red-600/40 hover:text-red-400 hover:bg-red-950/10 text-zinc-500 text-[11px] font-bold tracking-widest uppercase transition-all focus:outline-none focus:ring-2 focus:ring-red-600/40 focus:ring-offset-1 focus:ring-offset-black cursor-pointer"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="hidden sm:inline">Back</span>
      </button>
    </header>
  );
}

export function RegistrationFooter() {
  return (
    <footer className="relative z-10 w-full text-center py-5 bg-black/95 border-t border-zinc-900/60 mt-auto">
      <p className="text-[10px] text-zinc-700 tracking-wider font-mono">
        © {new Date().getFullYear()} NULL ORIGIN CTF · NULLORIGIN.CYBERHX.COM · SECURED OVER HTTPS
      </p>
    </footer>
  );
}
