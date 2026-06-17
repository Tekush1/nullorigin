import React, { useState } from "react";
import { sound } from "../hooks/utils/audio";
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
  ArrowLeft,
  ExternalLink,
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
      sound.playSuccess?.();
      setStatus("success");
    } catch (err) {
      sound.playError?.();
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  };

  // ── shared classes ──
  const inputClass =
    "w-full bg-[#080810] border border-zinc-800 hover:border-zinc-600 focus:border-red-600 focus:outline-none rounded-md px-3.5 py-2.5 text-[12px] md:text-[13px] tracking-wider text-emerald-400 placeholder-zinc-700 uppercase focus:ring-1 focus:ring-red-600/25 transition-all font-mono";
  const labelClass =
    "text-[10px] tracking-widest text-zinc-500 uppercase font-bold mb-1.5 flex items-center gap-1.5 select-none";
  const sectionHeadingClass =
    "text-[10px] tracking-widest font-black uppercase border-l-2 pl-2.5";

  // ── SUCCESS PAGE ──
  if (status === "success") {
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
              <h1 className="text-lg font-black tracking-widest text-emerald-400 uppercase">
                Registration Confirmed
              </h1>
              <p className="text-[13px] text-zinc-400 font-sans leading-relaxed">
                Team{" "}
                <span className="text-emerald-400 font-bold">{form.teamName}</span>{" "}
                is registered for Null Origin CTF. Check your inbox for confirmation details.
              </p>
            </div>

            <div className="bg-black/60 border border-zinc-800 rounded-lg p-4 text-left space-y-2.5 text-[11px] font-mono">
              {[
                { label: "TEAM", value: form.teamName, accent: true },
                { label: "LEADER", value: form.leaderName },
                { label: "EMAIL", value: form.leaderEmail },
                { label: "COUNTRY", value: form.country },
              ].map(({ label, value, accent }) => (
                <div key={label} className="flex items-center justify-between gap-4">
                  <span className="text-zinc-600 shrink-0">{label}</span>
                  <span className={`truncate text-right ${accent ? "text-emerald-400 font-bold" : "text-zinc-300"}`}>{value}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-1">
              <button
                onClick={() => { setStatus("idle"); setForm(initialForm); }}
                onMouseEnter={() => sound.playHover?.()}
                className="w-full flex items-center justify-center gap-2.5 bg-red-700 hover:bg-red-600 active:bg-red-800 border border-red-500/60 text-white font-black tracking-widest px-4 py-3 rounded-md text-[11px] transition-all uppercase cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-[#06060c]"
              >
                <span>Register Another Team</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <button
                onClick={() => { sound.playClick?.(); onBack(); }}
                className="w-full flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors py-2 focus:outline-none focus:ring-1 focus:ring-zinc-600 rounded"
              >
                <ArrowLeft className="h-3 w-3" />
                Back to Portal
              </button>
            </div>
          </div>
        </main>
        <RegistrationFooter />
      </div>
    );
  }

  // ── FORM PAGE ──
  return (
    <div className="min-h-screen bg-[#020202] text-gray-100 font-mono flex flex-col relative overflow-x-hidden">
      <RegistrationHeader onBack={onBack} />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 md:px-8 py-10 relative z-10">

        {/* Terminal breadcrumb */}
        <div className="mb-7 text-[11px] md:text-xs text-zinc-500 select-none flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-red-500 font-bold">operator@nullorigin:~$</span>
          <span className="text-emerald-400 font-semibold">./register --mode=team --portal=nullorigin.cyberhx.com</span>
          <span className="h-4 w-1.5 bg-red-600 inline-block animate-pulse" aria-hidden="true" />
        </div>

        {/* Status row */}
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

        {/* Form card */}
        <div className="bg-[#06060c]/90 border border-zinc-800/80 rounded-xl shadow-2xl relative overflow-hidden">
          {/* Top gradient accent */}
          <div className="h-[2px] w-full bg-gradient-to-r from-red-700 via-red-500 to-transparent" aria-hidden="true" />

          <div className="p-6 md:p-8">
            {/* Card header */}
            <div className="flex items-center gap-3 mb-7 pb-5 border-b border-zinc-800/80">
              <div className="p-2 bg-red-950/30 border border-red-900/40 rounded-md">
                <Terminal className="h-4 w-4 text-red-500" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-[13px] font-black tracking-widest text-zinc-100 uppercase">
                  Team Registration Form
                </h1>
                <p className="text-[10px] text-zinc-600 mt-0.5 tracking-wider">
                  NULL ORIGIN CTF · OFFICIAL OPERATOR ENROLLMENT
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8" noValidate>

              {/* ── Team Information ── */}
              <fieldset className="space-y-4">
                <legend className={`${sectionHeadingClass} border-red-600 text-red-400`}>
                  Team Information
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="teamName" className={labelClass}>
                      <Users className="h-3 w-3 text-red-500" aria-hidden="true" />
                      Team Name <span className="text-red-500 ml-0.5" aria-label="required">*</span>
                    </label>
                    <input
                      id="teamName"
                      type="text"
                      required
                      value={form.teamName}
                      onChange={(e) => handleChange("teamName", e.target.value)}
                      placeholder="TEAM_NAME"
                      autoComplete="off"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className={labelClass}>
                      <Globe className="h-3 w-3 text-red-500" aria-hidden="true" />
                      Country <span className="text-red-500 ml-0.5" aria-label="required">*</span>
                    </label>
                    <input
                      id="country"
                      type="text"
                      required
                      value={form.country}
                      onChange={(e) => handleChange("country", e.target.value)}
                      placeholder="COUNTRY"
                      autoComplete="country-name"
                      className={inputClass}
                    />
                  </div>
                </div>
              </fieldset>

              {/* ── Team Leader ── */}
              <fieldset className="space-y-4">
                <legend className={`${sectionHeadingClass} border-red-600 text-red-400`}>
                  Team Leader
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="leaderName" className={labelClass}>
                      <User className="h-3 w-3 text-red-500" aria-hidden="true" />
                      Full Name <span className="text-red-500 ml-0.5" aria-label="required">*</span>
                    </label>
                    <input
                      id="leaderName"
                      type="text"
                      required
                      value={form.leaderName}
                      onChange={(e) => handleChange("leaderName", e.target.value)}
                      placeholder="LEADER_NAME"
                      autoComplete="name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="leaderEmail" className={labelClass}>
                      <Mail className="h-3 w-3 text-red-500" aria-hidden="true" />
                      Email <span className="text-red-500 ml-0.5" aria-label="required">*</span>
                    </label>
                    <input
                      id="leaderEmail"
                      type="email"
                      required
                      value={form.leaderEmail}
                      onChange={(e) => handleChange("leaderEmail", e.target.value)}
                      placeholder="LEADER@DOMAIN.COM"
                      autoComplete="email"
                      inputMode="email"
                      className={inputClass}
                    />
                  </div>
                </div>
              </fieldset>

              {/* ── Member 1 (required) ── */}
              <fieldset className="space-y-3">
                <button
                  type="button"
                  onClick={() => toggleMember(1)}
                  aria-expanded={expandedMembers.includes(1)}
                  aria-controls="member1-fields"
                  className="w-full flex items-center justify-between focus:outline-none focus:ring-1 focus:ring-emerald-600/40 rounded px-1 py-0.5"
                >
                  <legend className={`${sectionHeadingClass} border-emerald-600 text-emerald-400 cursor-pointer`}>
                    Member 1 <span className="text-red-500 ml-1" aria-label="required">*</span>
                  </legend>
                  {expandedMembers.includes(1)
                    ? <ChevronUp className="h-3 w-3 text-zinc-500" aria-hidden="true" />
                    : <ChevronDown className="h-3 w-3 text-zinc-500" aria-hidden="true" />}
                </button>
                {expandedMembers.includes(1) && (
                  <div id="member1-fields" className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-3 border-l border-zinc-800">
                    <div>
                      <label htmlFor="m1discord" className={labelClass}>
                        <Hash className="h-3 w-3 text-emerald-600" aria-hidden="true" />
                        Discord Username <span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input id="m1discord" type="text" required value={form.member1Discord} onChange={(e) => handleChange("member1Discord", e.target.value)} placeholder="USERNAME" autoComplete="off" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="m1ctftime" className={labelClass}>
                        <ExternalLink className="h-3 w-3 text-emerald-600" aria-hidden="true" />
                        CTFtime Profile <span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input id="m1ctftime" type="url" required value={form.member1CTFtime} onChange={(e) => handleChange("member1CTFtime", e.target.value)} placeholder="CTFTIME.ORG/USER/..." autoComplete="off" inputMode="url" className={inputClass} />
                    </div>
                  </div>
                )}
              </fieldset>

              {/* ── Members 2–4 (optional) ── */}
              {[2, 3, 4].map((n) => {
                const dKey = `member${n}Discord` as keyof FormData;
                const cKey = `member${n}CTFtime` as keyof FormData;
                return (
                  <fieldset key={n} className="space-y-3">
                    <button
                      type="button"
                      onClick={() => toggleMember(n)}
                      aria-expanded={expandedMembers.includes(n)}
                      aria-controls={`member${n}-fields`}
                      className="w-full flex items-center justify-between focus:outline-none focus:ring-1 focus:ring-zinc-600/40 rounded px-1 py-0.5"
                    >
                      <legend className={`${sectionHeadingClass} border-zinc-700 text-zinc-500 cursor-pointer`}>
                        Member {n}{" "}
                        <span className="text-zinc-700 font-normal normal-case ml-1 text-[9px]">(optional)</span>
                      </legend>
                      {expandedMembers.includes(n)
                        ? <ChevronUp className="h-3 w-3 text-zinc-600" aria-hidden="true" />
                        : <ChevronDown className="h-3 w-3 text-zinc-600" aria-hidden="true" />}
                    </button>
                    {expandedMembers.includes(n) && (
                      <div id={`member${n}-fields`} className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-3 border-l border-zinc-800">
                        <div>
                          <label htmlFor={`m${n}discord`} className={labelClass}>
                            <Hash className="h-3 w-3 text-zinc-600" aria-hidden="true" />
                            Discord Username
                          </label>
                          <input id={`m${n}discord`} type="text" value={form[dKey] as string} onChange={(e) => handleChange(dKey, e.target.value)} placeholder="USERNAME" autoComplete="off" className={inputClass} />
                        </div>
                        <div>
                          <label htmlFor={`m${n}ctftime`} className={labelClass}>
                            <ExternalLink className="h-3 w-3 text-zinc-600" aria-hidden="true" />
                            CTFtime Profile
                          </label>
                          <input id={`m${n}ctftime`} type="url" value={form[cKey] as string} onChange={(e) => handleChange(cKey, e.target.value)} placeholder="CTFTIME.ORG/USER/..." autoComplete="off" inputMode="url" className={inputClass} />
                        </div>
                      </div>
                    )}
                  </fieldset>
                );
              })}

              {/* ── Error ── */}
              {status === "error" && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="flex items-start gap-3 bg-red-950/25 border border-red-800/50 rounded-md p-4"
                >
                  <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="space-y-1">
                    <p className="text-[11px] text-red-400 font-black uppercase tracking-wider">Submission Failed</p>
                    <p className="text-[11px] text-red-300/70 font-sans">{errorMsg}</p>
                  </div>
                </div>
              )}

              {/* ── Submit ── */}
              <div className="space-y-3 pt-1">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  onMouseEnter={() => sound.playHover?.()}
                  aria-label="Submit team registration"
                  aria-busy={status === "loading"}
                  className="w-full flex items-center justify-center gap-3 bg-red-700 hover:bg-red-600 active:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed border border-red-500/60 hover:border-red-400 text-white font-black tracking-widest px-5 py-3.5 rounded-md text-[12px] transition-all uppercase cursor-pointer shadow-[0_0_20px_rgba(239,68,68,0.15)] hover:shadow-[0_0_35px_rgba(239,68,68,0.35)] focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-[#06060c] group"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      <span>Submitting Registration…</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                      <span>Register Team</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </>
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

      <RegistrationFooter />
    </div>
  );
}

// ─── Shared sub-components ───────────────────

function RegistrationHeader({ onBack }: { onBack: () => void }) {
  return (
    <header className="relative z-20 w-full px-5 md:px-8 py-3 md:py-4 flex justify-between items-center bg-black/90 backdrop-blur-md border-b border-red-600/25">
      <div className="flex items-center gap-3 md:gap-4">
        <img
          src="/mask.png"
          alt="Null Origin"
          className="h-9 md:h-12 object-contain filter drop-shadow-[0_0_10px_rgba(239,68,68,0.6)]"
          onError={(e) => {
            const t = e.target as HTMLImageElement;
            if (t.src.endsWith("/mask.png")) t.src = "/logo.png";
            else t.style.display = "none";
          }}
        />
        <span className="text-[12px] md:text-[14px] tracking-widest text-zinc-100 uppercase font-black font-sans">
          NULL ORIGIN <span className="hidden sm:inline text-red-500 font-mono">// SECURED PORTAL</span>
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

function RegistrationFooter() {
  return (
    <footer className="relative z-10 w-full text-center py-5 bg-black/95 border-t border-zinc-900/60 mt-auto">
      <p className="text-[10px] text-zinc-700 tracking-wider font-mono">
        © {new Date().getFullYear()} NULL ORIGIN CTF · NULLORIGIN.CYBERHX.COM · SECURED OVER HTTPS
      </p>
    </footer>
  );
}
