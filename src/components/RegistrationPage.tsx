import React, { useState } from "react";
import { sound } from "../utils/audio";
import {
  ArrowRight,
  ShieldCheck,
  Terminal,
  Users,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Calendar,
  ChevronDown,
  ChevronUp,
  Hash,
  Globe,
  User,
  Mail,
} from "lucide-react";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxI8sK3VAPkyQxu9knSBii1orDbr37ZRU6zy_og9DGZsbnVH-YpWYp4ND-0YV9L9DGN2A/exec";

interface FormData {
  teamName: string;
  country: string;
  leaderName: string;
  leaderEmail: string;
  member1Discord: string;
  member1CTFtime: string;
  member2Discord: string;
  member2CTFtime: string;
  member3Discord: string;
  member3CTFtime: string;
  member4Discord: string;
  member4CTFtime: string;
}

const initialForm: FormData = {
  teamName: "",
  country: "",
  leaderName: "",
  leaderEmail: "",
  member1Discord: "",
  member1CTFtime: "",
  member2Discord: "",
  member2CTFtime: "",
  member3Discord: "",
  member3CTFtime: "",
  member4Discord: "",
  member4CTFtime: "",
};

interface Props {
  onBack: () => void;
}

export default function RegistrationPage({ onBack }: Props) {
  const [form, setForm] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [expandedMembers, setExpandedMembers] = useState<number[]>([1]);

  const handleChange = (field: keyof FormData, value: string) => {
    sound.playKey?.();
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleMember = (n: number) => {
    sound.playClick();
    setExpandedMembers((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setErrorMsg("");

    const payload = {
      teamName: form.teamName,
      country: form.country,
      leaderName: form.leaderName,
      leaderEmail: form.leaderEmail,
      member1Discord: form.member1Discord,
      member1CTFtime: form.member1CTFtime,
      member2Discord: form.member2Discord || "",
      member2CTFtime: form.member2CTFtime || "",
      member3Discord: form.member3Discord || "",
      member3CTFtime: form.member3CTFtime || "",
      member4Discord: form.member4Discord || "",
      member4CTFtime: form.member4CTFtime || "",
      timestamp: new Date().toISOString(),
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      // no-cors means we can't read the response, treat as success
      sound.playSuccess?.();
      setStatus("success");
    } catch (err) {
      sound.playError?.();
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  };

  const inputClass =
    "w-full bg-black/95 border border-zinc-850 hover:border-zinc-700 focus:border-red-600 focus:outline-none rounded px-3.5 py-2.5 text-xs md:text-sm tracking-wider text-emerald-400 placeholder-zinc-700 uppercase focus:ring-1 focus:ring-red-600/30 transition-all font-mono";

  const labelClass = "text-[10px] tracking-widest text-zinc-500 uppercase font-bold mb-1 flex items-center gap-1";

  const memberFields = (n: number, prefix: keyof FormData, prefix2: keyof FormData, optional = false) => (
    <div className="space-y-3">
      <div>
        <label className={labelClass}>
          <Hash className="h-3 w-3 text-red-500" />
          Member {n} Discord Username {optional && <span className="text-zinc-700">(Optional)</span>}
        </label>
        <input
          type="text"
          value={form[prefix] as string}
          onChange={(e) => handleChange(prefix, e.target.value)}
          placeholder={`MEMBER_${n}_DISCORD`}
          required={!optional}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>
          <ExternalLinkIcon className="h-3 w-3 text-red-500" />
          Member {n} CTFtime Profile {optional && <span className="text-zinc-700">(Optional)</span>}
        </label>
        <input
          type="text"
          value={form[prefix2] as string}
          onChange={(e) => handleChange(prefix2, e.target.value)}
          placeholder={`CTFTIME.ORG/TEAM/...`}
          required={!optional}
          className={inputClass}
        />
      </div>
    </div>
  );

  if (status === "success") {
    return (
      <div className="min-h-screen bg-[#020202] text-gray-100 font-mono flex flex-col relative overflow-x-hidden">
        <div className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="max-w-lg w-full bg-[#06060c]/85 border border-emerald-900/50 rounded-lg p-8 text-center space-y-6 shadow-[0_0_40px_rgba(34,197,94,0.1)]">
            <CheckCircle2 className="h-16 w-16 text-emerald-400 mx-auto animate-pulse" />
            <div>
              <h2 className="text-xl font-black tracking-widest text-emerald-400 uppercase mb-2">
                REGISTRATION CONFIRMED
              </h2>
              <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                Team <span className="text-emerald-400 font-bold">{form.teamName}</span> has been successfully registered for Null Origin CTF. Check your inbox for confirmation.
              </p>
            </div>
            <div className="bg-black/60 border border-zinc-800 rounded p-4 text-left space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-zinc-500">TEAM:</span>
                <span className="text-emerald-400 font-bold">{form.teamName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">LEADER:</span>
                <span className="text-zinc-300">{form.leaderName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">EMAIL:</span>
                <span className="text-zinc-300">{form.leaderEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">COUNTRY:</span>
                <span className="text-zinc-300">{form.country}</span>
              </div>
            </div>
            <button
              onClick={() => { setStatus("idle"); setForm(initialForm); }}
              onMouseEnter={() => sound.playHover?.()}
              className="w-full flex items-center justify-center space-x-2 bg-red-950/80 border border-red-600 hover:bg-red-900 text-red-100 font-bold tracking-widest px-4 py-3 rounded text-xs transition-all uppercase group cursor-pointer"
            >
              <span>REGISTER ANOTHER TEAM</span>
              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => { sound.playClick?.(); onBack(); }}
              className="text-xs text-zinc-500 hover:text-zinc-300 underline transition-colors"
            >
              ← BACK TO MAIN PORTAL
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-gray-100 font-mono flex flex-col relative overflow-x-hidden">
      
      {/* Header */}
      <header className="relative z-20 w-full px-6 py-4 flex justify-between items-center bg-black/85 backdrop-blur-md border-b border-red-600/30">
        <div className="flex items-center space-x-4">
          <img
            src="/mask.png"
            alt="Null Origin"
            className="h-10 md:h-14 object-contain filter drop-shadow-[0_0_12px_rgba(239,68,68,0.7)]"
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              if (t.src.endsWith("/mask.png")) t.src = "/logo.png";
              else t.style.display = "none";
            }}
          />
          <span className="text-[13px] md:text-base tracking-widest text-zinc-100 uppercase font-black font-sans">
            NULL ORIGIN <span className="hidden sm:inline text-red-500 font-mono">// SECURED PORTAL</span>
          </span>
        </div>
        <button
          onClick={() => { sound.playClick?.(); onBack(); }}
          onMouseEnter={() => sound.playHover?.()}
          className="flex items-center space-x-2 px-4 py-2 border border-zinc-800 rounded hover:border-red-600/50 hover:text-red-400 text-zinc-400 text-xs font-bold tracking-widest uppercase transition-all"
        >
          ← BACK TO PORTAL
        </button>
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 md:px-8 py-10 relative z-10">

        {/* Terminal breadcrumb */}
        <div className="mb-6 text-xs text-zinc-500 select-none flex items-center space-x-2">
          <span className="text-red-500 font-bold">operator@nullorigin:~$</span>
          <span className="text-emerald-400 font-semibold pl-1">./register --mode=team --portal=nullorigin.cyberhx.com</span>
          <span className="h-4 w-1.5 bg-red-600 inline-block animate-pulse"></span>
        </div>

        {/* Status Badges */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex items-center space-x-2 bg-emerald-950/30 border border-emerald-700/60 rounded px-3 py-2 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-[11px] tracking-widest text-emerald-400 font-black uppercase">
              REGISTRATION LIVE
            </span>
          </div>
          <div className="flex items-center space-x-2 bg-red-950/20 border border-red-800/40 rounded px-3 py-2">
            <Calendar className="h-3.5 w-3.5 text-red-400" />
            <span className="text-[11px] tracking-widest text-red-400 font-bold uppercase">
              Registration closes: 08 July 2025
            </span>
          </div>
          <div className="flex items-center space-x-2 bg-zinc-900/40 border border-zinc-800 rounded px-3 py-2">
            <Users className="h-3.5 w-3.5 text-zinc-400" />
            <span className="text-[11px] tracking-widest text-zinc-400 font-bold uppercase">
              Team Size: 1–4 Members
            </span>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-[#06060c]/85 border border-zinc-900 hover:border-red-900/30 transition-colors rounded-lg p-6 md:p-8 shadow-2xl relative">
          <div className="absolute top-0 right-0 px-3 py-1 bg-red-700 text-black text-[9px] font-black uppercase tracking-widest">
            REG OPEN
          </div>

          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-zinc-900">
            <Terminal className="h-5 w-5 text-red-500 animate-pulse" />
            <div>
              <h1 className="text-sm font-black tracking-widest text-zinc-100 uppercase">
                TEAM REGISTRATION FORM
              </h1>
              <p className="text-[10px] text-zinc-500 mt-0.5">NULL ORIGIN CTF // OFFICIAL OPERATOR ENROLLMENT</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Team Info */}
            <div className="space-y-4">
              <div className="text-[10px] tracking-widest text-red-400 font-black uppercase border-l-2 border-red-600 pl-2">
                TEAM INFORMATION
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>
                    <Users className="h-3 w-3 text-red-500" />
                    Team Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.teamName}
                    onChange={(e) => handleChange("teamName", e.target.value)}
                    placeholder="TEAM_NAME"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    <Globe className="h-3 w-3 text-red-500" />
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                    placeholder="COUNTRY"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Team Leader */}
            <div className="space-y-4">
              <div className="text-[10px] tracking-widest text-red-400 font-black uppercase border-l-2 border-red-600 pl-2">
                TEAM LEADER
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>
                    <User className="h-3 w-3 text-red-500" />
                    Leader Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.leaderName}
                    onChange={(e) => handleChange("leaderName", e.target.value)}
                    placeholder="LEADER_NAME"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    <Mail className="h-3 w-3 text-red-500" />
                    Leader Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={form.leaderEmail}
                    onChange={(e) => handleChange("leaderEmail", e.target.value)}
                    placeholder="LEADER@DOMAIN.COM"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Member 1 */}
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => toggleMember(1)}
                className="w-full flex items-center justify-between text-[10px] tracking-widest text-emerald-400 font-black uppercase border-l-2 border-emerald-600 pl-2 hover:text-emerald-300 transition-colors"
              >
                <span>MEMBER 1 <span className="text-red-500">*</span></span>
                {expandedMembers.includes(1) ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
              {expandedMembers.includes(1) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-3 border-l border-zinc-800">
                  <div>
                    <label className={labelClass}><Hash className="h-3 w-3 text-emerald-600" />Discord Username <span className="text-red-500">*</span></label>
                    <input type="text" required value={form.member1Discord} onChange={(e) => handleChange("member1Discord", e.target.value)} placeholder="USERNAME#0000" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}><Globe className="h-3 w-3 text-emerald-600" />CTFtime Profile <span className="text-red-500">*</span></label>
                    <input type="text" required value={form.member1CTFtime} onChange={(e) => handleChange("member1CTFtime", e.target.value)} placeholder="CTFTIME.ORG/USER/..." className={inputClass} />
                  </div>
                </div>
              )}
            </div>

            {/* Members 2–4 */}
            {[2, 3, 4].map((n) => {
              const dKey = `member${n}Discord` as keyof FormData;
              const cKey = `member${n}CTFtime` as keyof FormData;
              return (
                <div key={n} className="space-y-4">
                  <button
                    type="button"
                    onClick={() => toggleMember(n)}
                    className="w-full flex items-center justify-between text-[10px] tracking-widest text-zinc-500 font-black uppercase border-l-2 border-zinc-700 pl-2 hover:text-zinc-300 transition-colors"
                  >
                    <span>MEMBER {n} <span className="text-zinc-700">(OPTIONAL)</span></span>
                    {expandedMembers.includes(n) ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  </button>
                  {expandedMembers.includes(n) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-3 border-l border-zinc-800">
                      <div>
                        <label className={labelClass}><Hash className="h-3 w-3 text-zinc-600" />Discord Username <span className="text-zinc-700">(Optional)</span></label>
                        <input type="text" value={form[dKey] as string} onChange={(e) => handleChange(dKey, e.target.value)} placeholder="USERNAME#0000" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}><Globe className="h-3 w-3 text-zinc-600" />CTFtime Profile <span className="text-zinc-700">(Optional)</span></label>
                        <input type="text" value={form[cKey] as string} onChange={(e) => handleChange(cKey, e.target.value)} placeholder="CTFTIME.ORG/USER/..." className={inputClass} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Error */}
            {status === "error" && (
              <div className="flex items-start space-x-3 bg-red-950/30 border border-red-800/60 rounded p-3 text-xs">
                <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-red-400 font-bold uppercase tracking-wider">SUBMISSION FAILED</p>
                  <p className="text-red-300/70">{errorMsg}</p>
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              onMouseEnter={() => sound.playHover?.()}
              className="w-full flex items-center justify-center space-x-2 bg-red-950/80 border border-red-600 hover:bg-red-900 disabled:opacity-60 disabled:cursor-not-allowed hover:text-white text-red-100 font-bold tracking-widest px-4 py-3.5 rounded text-xs transition-all uppercase group cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_25px_rgba(239,68,68,0.3)]"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>ENCRYPTING TEAM DATA...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  <span>INITIALIZE TEAM REGISTRATION</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <p className="text-[10px] text-zinc-600 text-center tracking-wider">
              BY REGISTERING YOU AGREE TO PARTICIPATE ETHICALLY // NULL ORIGIN CTF 2025
            </p>

          </form>
        </div>

      </main>

      <footer className="relative z-10 w-full text-center py-6 bg-black/95 border-t border-zinc-950 mt-auto">
        <p className="text-[10px] text-zinc-600 tracking-widest font-mono">
          © {new Date().getFullYear()} NULL ORIGIN CTF // SECURED OVER HTTPS // DOMAIN APPROVED: NULLORIGIN.CYBERHX.COM
        </p>
      </footer>
    </div>
  );
}

// Small inline icon helper
function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}