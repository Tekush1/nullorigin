import { useState } from "react";
import { ChevronDown } from "lucide-react";

/* ─── Mr. Robot style custom SVGs ─────────────────────────────── */
const SVGHoodie = () => (
  <svg viewBox="0 0 48 48" fill="none" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="11" r="7" stroke="#22c55e" strokeWidth="1.5"/>
    <path d="M10 42c0-9 4-14 14-14s14 5 14 14" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10 42c-2-4-2-10 0-14l4-6" stroke="#22c55e" strokeWidth="1" strokeDasharray="2 2" opacity=".5"/>
    <path d="M38 42c2-4 2-10 0-14l-4-6" stroke="#22c55e" strokeWidth="1" strokeDasharray="2 2" opacity=".5"/>
    <circle cx="21" cy="10" r="1.2" fill="#ef4444"/>
    <circle cx="27" cy="10" r="1.2" fill="#ef4444"/>
    <path d="M21 14 q3 2 6 0" stroke="#22c55e" strokeWidth="1" strokeLinecap="round"/>
    <rect x="18" y="3" width="12" height="5" rx="2.5" stroke="#22c55e" strokeWidth="1" opacity=".4"/>
  </svg>
);

const SVGLock = () => (
  <svg viewBox="0 0 48 48" fill="none" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="22" width="32" height="22" rx="3" stroke="#f59e0b" strokeWidth="1.5"/>
    <path d="M14 22v-7a10 10 0 0 1 20 0v7" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="24" cy="33" r="3" stroke="#f59e0b" strokeWidth="1.5"/>
    <line x1="24" y1="36" x2="24" y2="40" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M5 26 h3 M40 26 h3" stroke="#f59e0b" strokeWidth="1" strokeDasharray="1 2" opacity=".5"/>
    <text x="11" y="19" fontSize="5" fill="#f59e0b" opacity=".6" fontFamily="monospace">01</text>
    <text x="30" y="19" fontSize="5" fill="#f59e0b" opacity=".6" fontFamily="monospace">10</text>
  </svg>
);

const SVGTerminal = () => (
  <svg viewBox="0 0 48 48" fill="none" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="8" width="40" height="32" rx="3" stroke="#3b82f6" strokeWidth="1.5"/>
    <rect x="4" y="8" width="40" height="8" rx="3" fill="#3b82f6" fillOpacity=".12"/>
    <circle cx="11" cy="12" r="1.5" fill="#ef4444"/>
    <circle cx="17" cy="12" r="1.5" fill="#f59e0b"/>
    <circle cx="23" cy="12" r="1.5" fill="#22c55e"/>
    <path d="M10 24 l5 4 -5 4" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="19" y1="32" x2="32" y2="32" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="19" y1="27" x2="28" y2="27" stroke="#3b82f6" strokeWidth="1" strokeLinecap="round" opacity=".6"/>
  </svg>
);

const SVGSkull = () => (
  <svg viewBox="0 0 48 48" fill="none" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 6 C12 6 9 16 9 22 C9 28 12 32 16 34 L16 40 L32 40 L32 34 C36 32 39 28 39 22 C39 16 36 6 24 6Z" stroke="#ef4444" strokeWidth="1.5"/>
    <ellipse cx="18" cy="21" rx="4" ry="5" stroke="#ef4444" strokeWidth="1.2" fill="#ef4444" fillOpacity=".1"/>
    <ellipse cx="30" cy="21" rx="4" ry="5" stroke="#ef4444" strokeWidth="1.2" fill="#ef4444" fillOpacity=".1"/>
    <path d="M22 31 h4" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M19 36 h2 M24 36 h2 M27 36 h2" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16 36 v4 M32 36 v4" stroke="#ef4444" strokeWidth="1" opacity=".4"/>
  </svg>
);

const SVGTrophy = () => (
  <svg viewBox="0 0 48 48" fill="none" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 8 h20 v14 a10 10 0 0 1-20 0 Z" stroke="#f59e0b" strokeWidth="1.5"/>
    <path d="M8 10 h6 v10 a6 6 0 0 1-6 0 Z" stroke="#f59e0b" strokeWidth="1" opacity=".6"/>
    <path d="M34 10 h6 v10 a6 6 0 0 0-6 0 Z" stroke="#f59e0b" strokeWidth="1" opacity=".6"/>
    <line x1="24" y1="32" x2="24" y2="38" stroke="#f59e0b" strokeWidth="1.5"/>
    <path d="M16 38 h16" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 38 v4 M28 38 v4" stroke="#f59e0b" strokeWidth="1.2" strokeLinecap="round"/>
    <text x="19" y="24" fontSize="7" fill="#f59e0b" fontFamily="monospace" fontWeight="bold">01</text>
  </svg>
);

const SVGGlobe = () => (
  <svg viewBox="0 0 48 48" fill="none" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="17" stroke="#a855f7" strokeWidth="1.5"/>
    <ellipse cx="24" cy="24" rx="8" ry="17" stroke="#a855f7" strokeWidth="1" opacity=".6"/>
    <line x1="7" y1="24" x2="41" y2="24" stroke="#a855f7" strokeWidth="1" opacity=".5"/>
    <line x1="10" y1="16" x2="38" y2="16" stroke="#a855f7" strokeWidth="1" opacity=".3"/>
    <line x1="10" y1="32" x2="38" y2="32" stroke="#a855f7" strokeWidth="1" opacity=".3"/>
    <circle cx="24" cy="24" r="2" fill="#a855f7"/>
    <path d="M24 7 v4 M24 37 v4 M7 24 h4 M37 24 h4" stroke="#a855f7" strokeWidth="1" strokeLinecap="round" opacity=".4"/>
  </svg>
);

const SVGDiscord = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.034.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const SVGWhatsApp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

/* ─── Data ─────────────────────────────────────────────────────── */
const FAQS = [
  { q: "WHAT IS NULL ORIGIN CTF?", a: "Null Origin is a 24-hour online Capture The Flag competition where participants solve cybersecurity challenges across Web Security, Cryptography, Forensics, Reverse Engineering, OSINT, Binary Exploitation and Miscellaneous categories." },
  { q: "WHO CAN PARTICIPATE?", a: "Anyone! Open to students, professionals, and cybersecurity enthusiasts worldwide. Team size: 1–4 members including the team leader." },
  { q: "IS THIS AN ONLINE EVENT?", a: "Yes, Null Origin CTF is fully online. You can participate from anywhere in the world." },
  { q: "CAN I PARTICIPATE SOLO?", a: "Yes! You can register and compete solo (team of 1) or form a team of up to 4 members." },
  { q: "HOW DO I REGISTER?", a: "Click the Register Your Team button on this page or visit the event on Unstop. Registration deadline is June 26, 2026." },
  { q: "WHAT CATEGORIES WILL BE INCLUDED?", a: "Web Security, Cryptography, Reverse Engineering, Digital Forensics, OSINT, Binary Exploitation, and Miscellaneous Challenges." },
  { q: "ARE THERE ANY PRIZES?", a: "Prize details will be announced soon. Stay connected on Discord and WhatsApp for updates." },
  { q: "WILL PARTICIPANTS RECEIVE CERTIFICATES?", a: "Yes! All participants will receive participation certificates. Top performers will receive special achievement certificates." },
];

const TIMELINE = [
  { tag: "ACCESS GRANTED", label: "Registrations Open", date: "NOW · LIVE", desc: "Initialize your agent profile. Secure your slot before the window closes.", bullets: ["Free to enter", "Team formation (1–4 members)", "Access to prep resources"], SVGIcon: SVGHoodie, color: "#22c55e", dot: "#22c55e", done: true },
  { tag: "COUNTDOWN", label: "Registration Closes", date: "26 JUN 2026", desc: "Last packet transmitted. No late entries accepted by the system.", bullets: ["Team finalised", "No registrations after deadline"], SVGIcon: SVGLock, color: "#f59e0b", dot: "#3b82f6", done: false },
  { tag: "ROUND 01", label: "Qualifiers Begin", date: "11 JUL · 10:00 AM IST", desc: "Root access initiated. 12-hour qualifier window opens across all nodes.", bullets: ["All challenge categories live", "Real-time leaderboard", "Top teams qualify for Finals"], SVGIcon: SVGTerminal, color: "#ef4444", dot: "#ef4444", done: false },
  { tag: "BREACH END", label: "Qualifiers End", date: "11 JUL · 10:00 PM IST", desc: "Connection terminated. Scores locked. Finalists extracted from data.", bullets: ["Scores finalised", "Finalists notified via encrypted channel"], SVGIcon: SVGSkull, color: "#a855f7", dot: "#a855f7", done: false },
  { tag: "FINALE", label: "Final Round & Awards", date: "TBA", desc: "The final exploit. Only the elite reach this node. Hack to own.", bullets: ["Elite challenge set", "Prizes & certificates distributed", "Hall of Fame updated"], SVGIcon: SVGTrophy, color: "#f59e0b", dot: "#f59e0b", done: false },
];

/* ─── Accordion Item ────────────────────────────────────────────── */
interface AccordionItemProps { q: string; a: string; open: boolean; onToggle: () => void; }
function AccordionItem({ q, a, open, onToggle }: AccordionItemProps) {
  return (
    <div
      className="border transition-all duration-200 cursor-pointer select-none"
      style={{ borderColor: open ? "rgba(239,68,68,0.5)" : "rgba(39,39,42,0.9)", background: open ? "rgba(239,68,68,0.03)" : "rgba(9,9,11,0.8)" }}
      onClick={onToggle}
    >
      <div className="flex items-center justify-between px-5 py-4 gap-4">
        <span className="text-[12px] md:text-[13px] font-black tracking-widest transition-colors"
          style={{ fontFamily: "'Courier New', monospace", color: open ? "#ef4444" : "#a1a1aa" }}>
          <span style={{ color: open ? "#ef4444" : "#3f3f46", marginRight: 8 }}>▸</span>{q}
        </span>
        <ChevronDown className="shrink-0 h-4 w-4 transition-transform duration-300"
          style={{ color: open ? "#ef4444" : "#52525b", transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
      </div>
      {open && (
        <div className="px-5 pb-5">
          <div className="w-full h-[1px] mb-4" style={{ background: "rgba(239,68,68,0.2)" }} />
          <p className="text-[12px] text-zinc-400 leading-relaxed tracking-wide" style={{ fontFamily: "'Courier New', monospace" }}>
            <span style={{ color: "#ef4444" }}>// </span>{a}
          </p>
        </div>
      )}
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────────── */
export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16 space-y-24">

      {/* ── TIMELINE ── */}
      <div>
        <div className="mb-10">
          <p className="text-[10px] tracking-[0.3em] text-red-500 uppercase font-black mb-1" style={{ fontFamily: "'Courier New',monospace" }}>
            <span className="opacity-50">// </span>NULL_ORIGIN.exe
          </p>
          <h2 className="text-2xl md:text-4xl font-black tracking-widest text-zinc-100 flex items-center gap-3"
            style={{ fontFamily: "'Impact','Arial Black',sans-serif" }}>
            <SVGGlobe />
            EVENT_TIMELINE
          </h2>
          <div className="mt-2 h-[2px] w-32 bg-gradient-to-r from-red-600 to-transparent" />
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2"
            style={{ background: "linear-gradient(to bottom, #22c55e60, #ef444440, #a855f730, transparent)" }} />

          <div className="flex flex-col gap-12">
            {TIMELINE.map((item, i) => {
              const isLeft = i % 2 === 0;
              const Icon = item.SVGIcon;
              return (
                <div key={i} className={`flex flex-col md:flex-row items-center ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>

                  {/* Card */}
                  <div className={`w-full md:w-[46%] ${isLeft ? "md:pr-8" : "md:pl-8"}`}>
                    <div className="rounded-none p-5 group hover:translate-y-[-2px] transition-all duration-300"
                      style={{
                        background: "rgba(9,9,11,0.9)",
                        border: `1px solid ${item.done ? item.color + "50" : "rgba(39,39,42,0.8)"}`,
                        borderLeft: `3px solid ${item.color}`,
                        boxShadow: item.done ? `0 0 24px ${item.color}18` : "none",
                      }}>
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 p-2 rounded"
                          style={{ background: item.color + "12", border: `1px solid ${item.color}30` }}>
                          <Icon />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-[9px] font-black tracking-widest px-2 py-0.5 uppercase"
                              style={{ background: item.color + "18", border: `1px solid ${item.color}35`, color: item.color, fontFamily: "'Courier New',monospace" }}>
                              {item.tag}
                            </span>
                            {item.done && (
                              <span className="text-[9px] font-black tracking-widest px-2 py-0.5 animate-pulse"
                                style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e" }}>
                                ◉ LIVE
                              </span>
                            )}
                          </div>
                          <p className="text-[15px] font-black tracking-wide text-zinc-100 mb-1"
                            style={{ fontFamily: "'Impact','Arial Black',sans-serif" }}>{item.label}</p>
                          <p className="text-[11px] mb-3 leading-relaxed" style={{ color: "#52525b", fontFamily: "'Courier New',monospace" }}>
                            <span style={{ color: item.color + "80" }}>$ </span>{item.desc}
                          </p>
                          <ul className="space-y-1">
                            {item.bullets.map((b, j) => (
                              <li key={j} className="flex items-center gap-2 text-[11px]" style={{ color: "#71717a", fontFamily: "'Courier New',monospace" }}>
                                <span style={{ color: item.color }}>›</span> {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex flex-col items-center w-[8%]">
                    <div className="w-4 h-4 rounded-full z-10 flex items-center justify-center"
                      style={{ background: item.dot, boxShadow: `0 0 16px ${item.dot}90, 0 0 32px ${item.dot}40` }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-black" />
                    </div>
                  </div>

                  {/* Date side */}
                  <div className={`hidden md:flex w-[46%] items-center gap-2 ${isLeft ? "md:pl-8 justify-start" : "md:pr-8 justify-end"}`}>
                    <p className="text-[13px] font-black tracking-widest"
                      style={{ color: item.color, fontFamily: "'Courier New',monospace" }}>
                      [{item.date}]
                    </p>
                  </div>

                  {/* Mobile date */}
                  <p className="md:hidden text-[11px] font-bold mt-2" style={{ color: item.color, fontFamily: "'Courier New',monospace" }}>
                    [{item.date}]
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── STAY CONNECTED ── */}
      <div>
        <div className="mb-6">
          <p className="text-[10px] tracking-[0.3em] text-red-500 uppercase font-black mb-1" style={{ fontFamily: "'Courier New',monospace" }}>
            <span className="opacity-50">// </span>SECURE_CHANNEL
          </p>
          <h2 className="text-2xl md:text-3xl font-black tracking-widest text-zinc-100"
            style={{ fontFamily: "'Impact','Arial Black',sans-serif" }}>STAY_CONNECTED</h2>
          <div className="mt-2 h-[2px] w-24 bg-gradient-to-r from-red-600 to-transparent" />
        </div>
        <div className="flex flex-wrap gap-4">
          <a href="https://discord.gg/cyberhx" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 px-5 py-3 transition-all duration-200"
            style={{ background: "rgba(88,101,242,0.1)", border: "1px solid rgba(88,101,242,0.3)", color: "#7289da" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(88,101,242,0.22)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(88,101,242,0.2)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(88,101,242,0.1)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
            <SVGDiscord />
            <span className="text-[12px] font-black tracking-widest uppercase" style={{ fontFamily: "'Courier New',monospace" }}>JOIN DISCORD</span>
          </a>
          <a href="https://wa.me/919569472058" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 px-5 py-3 transition-all duration-200"
            style={{ background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.25)", color: "#25d366" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(37,211,102,0.18)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(37,211,102,0.15)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(37,211,102,0.08)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
            <SVGWhatsApp />
            <span className="text-[12px] font-black tracking-widest uppercase" style={{ fontFamily: "'Courier New',monospace" }}>WHATSAPP</span>
          </a>
        </div>
      </div>

      {/* ── FAQ ACCORDION ── */}
      <div>
        <div className="mb-8">
          <p className="text-[10px] tracking-[0.3em] text-red-500 uppercase font-black mb-1" style={{ fontFamily: "'Courier New',monospace" }}>
            <span className="opacity-50">// </span>DECRYPT_MODULE
          </p>
          <h2 className="text-2xl md:text-4xl font-black tracking-widest text-zinc-100 flex items-center gap-3"
            style={{ fontFamily: "'Impact','Arial Black',sans-serif" }}>
            <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
              <rect x="3" y="3" width="34" height="34" rx="2" stroke="#ef4444" strokeWidth="1.5"/>
              <text x="8" y="24" fontSize="14" fill="#ef4444" fontFamily="monospace" fontWeight="bold">?_</text>
              <circle cx="32" cy="8" r="4" fill="#ef4444" fillOpacity=".2" stroke="#ef4444" strokeWidth="1"/>
              <text x="30" y="11" fontSize="6" fill="#ef4444" fontFamily="monospace">!</text>
            </svg>
            INTEL_FAQS
          </h2>
          <div className="mt-2 h-[2px] w-28 bg-gradient-to-r from-red-600 to-transparent" />
        </div>
        <div className="flex flex-col gap-1 max-w-4xl">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              q={faq.q}
              a={faq.a}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>
      </div>

    </section>
  );
}