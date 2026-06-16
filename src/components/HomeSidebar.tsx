import { FormEvent } from "react";
import { Cpu, Share2, CheckCircle } from "lucide-react";
import HackerMask from "./HackerMask";
import { sound } from "../hooks/utils/audio";

interface HomeSidebarProps {
  teaserInput: string;
  teaserStatus: "idle" | "correct" | "incorrect";
  setTeaserInput: (value: string) => void;
  handleTeaserVerify: (e: FormEvent) => void;
  handleKeyInteraction: () => void;
}

export default function HomeSidebar({
  teaserInput,
  teaserStatus,
  setTeaserInput,
  handleTeaserVerify,
  handleKeyInteraction,
}: HomeSidebarProps) {
  return (
    <div className="lg:col-span-5 flex flex-col justify-center items-center gap-5 py-2 relative">

      {/* HackerMask — DO NOT TOUCH */}
      <div
        className="relative w-full flex justify-center"
        onMouseEnter={() => sound.playHover()}
      >
        <HackerMask />
      </div>

      {/* ── CIPHER CHALLENGE ── */}
      <div
        className="w-full max-w-sm bg-black/95 border border-zinc-800/80 rounded-lg shadow-xl space-y-0 hover:border-zinc-700/50 transition-all duration-300 overflow-hidden"
        onMouseEnter={() => sound.playHover()}
      >
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
  );
}