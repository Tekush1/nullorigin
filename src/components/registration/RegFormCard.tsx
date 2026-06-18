import React from "react";
import { ArrowRight, ShieldCheck, Terminal, Users, AlertCircle, Loader2, Calendar } from "lucide-react";
import { sound } from "../../hooks/utils/audio";
import { FormData, SubmitStatus } from "./types";
import TeamLeaderFields from "./TeamLeaderFields";
import MemberField from "./MemberField";

interface Props {
  form: FormData; status: SubmitStatus; errorMsg: string; expandedMembers: number[];
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: keyof FormData, value: string) => void;
  onToggleMember: (n: number) => void;
}

export default function RegFormCard({ form, status, errorMsg, expandedMembers, onSubmit, onChange, onToggleMember }: Props) {
  return (
    <main className="flex-1 w-full max-w-3xl mx-auto px-4 md:px-8 py-10 relative z-10">
      <div className="mb-7 text-[11px] md:text-xs text-zinc-500 select-none flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="text-red-500 font-bold">operator@nullorigin:~$</span>
        <span className="text-emerald-400 font-semibold">./register --mode=team --portal=nullorigin.cyberhx.com</span>
        <span className="h-4 w-1.5 bg-red-600 inline-block animate-pulse" aria-hidden="true" />
      </div>

      <div className="flex flex-wrap gap-2 mb-8" role="status" aria-label="Registration status">
        <div className="flex items-center gap-2 bg-emerald-950/20 border border-emerald-800/50 rounded-md px-3 py-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
          <span className="text-[10px] tracking-widest text-emerald-400 font-black uppercase">Registration Live</span>
        </div>
        <div className="flex items-center gap-2 bg-zinc-900/40 border border-zinc-800 rounded-md px-3 py-1.5">
          <Calendar className="h-3 w-3 text-red-400 flex-shrink-0" aria-hidden="true" />
          <span className="text-[10px] tracking-widest text-zinc-400 font-bold uppercase">Closes 08 July 2025</span>
        </div>
        <div className="flex items-center gap-2 bg-zinc-900/40 border border-zinc-800 rounded-md px-3 py-1.5">
          <Users className="h-3 w-3 text-zinc-400 flex-shrink-0" aria-hidden="true" />
          <span className="text-[10px] tracking-widest text-zinc-400 font-bold uppercase">1–4 Members</span>
        </div>
      </div>

      <div className="bg-[#06060c]/90 border border-zinc-800/80 rounded-xl shadow-2xl relative overflow-hidden">
        <div className="h-[2px] w-full bg-gradient-to-r from-red-700 via-red-500 to-transparent" aria-hidden="true" />
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-7 pb-5 border-b border-zinc-800/80">
            <div className="p-2 bg-red-950/30 border border-red-900/40 rounded-md">
              <Terminal className="h-4 w-4 text-red-500" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-[13px] font-black tracking-widest text-zinc-100 uppercase">Team Registration Form</h1>
              <p className="text-[10px] text-zinc-600 mt-0.5 tracking-wider">NULL ORIGIN CTF · OFFICIAL OPERATOR ENROLLMENT</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-8" noValidate>
            <TeamLeaderFields form={form} onChange={onChange} />
            {[1, 2, 3, 4].map((n) => (
              <MemberField key={n} n={n} required={n === 1}
                expanded={expandedMembers.includes(n)}
                form={form} onToggle={onToggleMember} onChange={onChange} />
            ))}

            {status === "error" && (
              <div role="alert" aria-live="assertive" className="flex items-start gap-3 bg-red-950/25 border border-red-800/50 rounded-md p-4">
                <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-1">
                  <p className="text-[11px] text-red-400 font-black uppercase tracking-wider">Submission Failed</p>
                  <p className="text-[11px] text-red-300/70 font-sans">{errorMsg}</p>
                </div>
              </div>
            )}

            <div className="space-y-3 pt-1">
              <button type="submit" disabled={status === "loading"} onMouseEnter={() => sound.playHover?.()}
                aria-label="Submit team registration" aria-busy={status === "loading"}
                className="w-full flex items-center justify-center gap-3 bg-red-700 hover:bg-red-600 active:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed border border-red-500/60 hover:border-red-400 text-white font-black tracking-widest px-5 py-3.5 rounded-md text-[12px] transition-all uppercase cursor-pointer shadow-[0_0_20px_rgba(239,68,68,0.15)] hover:shadow-[0_0_35px_rgba(239,68,68,0.35)] focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-[#06060c] group">
                {status === "loading" ? (
                  <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /><span>Submitting Registration…</span></>
                ) : (
                  <><ShieldCheck className="h-4 w-4" aria-hidden="true" /><span>Register Team</span><ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" /></>
                )}
              </button>
              <p className="text-[10px] text-zinc-700 text-center tracking-wider font-sans">
                By registering you agree to participate ethically · Null Origin CTF 2025
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
