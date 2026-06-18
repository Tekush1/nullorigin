import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { sound } from "../../hooks/utils/audio";
import { FormData, initialForm } from "./types";
import { RegistrationHeader, RegistrationFooter } from "./RegLayout";

interface Props { form: FormData; onBack: () => void; onReset: (form: FormData) => void; }

export default function SuccessScreen({ form, onBack, onReset }: Props) {
  return (
    <div className="min-h-screen bg-[#020202] text-gray-100 font-mono flex flex-col relative overflow-x-hidden">
      <RegistrationHeader onBack={onBack} />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-[#06060c]/90 border border-emerald-900/40 rounded-xl p-8 md:p-10 text-center space-y-7 shadow-[0_0_60px_rgba(34,197,94,0.08)]">
          <div className="relative inline-block">
            <CheckCircle2 className="h-14 w-14 text-emerald-400 mx-auto" aria-hidden="true" />
            <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-xl" aria-hidden="true" />
          </div>
          <div className="space-y-2">
            <h1 className="text-lg font-black tracking-widest text-emerald-400 uppercase">Registration Confirmed</h1>
            <p className="text-[13px] text-zinc-400 font-sans leading-relaxed">
              Team <span className="text-emerald-400 font-bold">{form.teamName}</span> is registered for Null Origin CTF. Check your inbox for confirmation details.
            </p>
          </div>
          <div className="bg-black/60 border border-zinc-800 rounded-lg p-4 text-left space-y-2.5 text-[11px] font-mono">
            {[
              { label: "TEAM",    value: form.teamName,    accent: true },
              { label: "LEADER",  value: form.leaderName },
              { label: "EMAIL",   value: form.leaderEmail },
              { label: "COUNTRY", value: form.country },
            ].map(({ label, value, accent }) => (
              <div key={label} className="flex items-center justify-between gap-4">
                <span className="text-zinc-600 shrink-0">{label}</span>
                <span className={`truncate text-right ${accent ? "text-emerald-400 font-bold" : "text-zinc-300"}`}>{value}</span>
              </div>
            ))}
          </div>
          <div className="space-y-3 pt-1">
            <button onClick={() => onReset(initialForm)} onMouseEnter={() => sound.playHover?.()}
              className="w-full flex items-center justify-center gap-2.5 bg-red-700 hover:bg-red-600 active:bg-red-800 border border-red-500/60 text-white font-black tracking-widest px-4 py-3 rounded-md text-[11px] transition-all uppercase cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-[#06060c]">
              <span>Register Another Team</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <button onClick={() => { sound.playClick?.(); onBack(); }}
              className="w-full flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors py-2 focus:outline-none focus:ring-1 focus:ring-zinc-600 rounded">
              <ArrowLeft className="h-3 w-3" /> Back to Portal
            </button>
          </div>
        </div>
      </main>
      <RegistrationFooter />
    </div>
  );
}
