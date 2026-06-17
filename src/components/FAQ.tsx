import { MessageCircle, Calendar, HelpCircle } from "lucide-react";

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.034.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const FAQS = [
  { q: "Who can participate?", a: "Anyone! Open to students, professionals, and cybersecurity enthusiasts worldwide. Team size: 1–4 members." },
  { q: "Is it free to enter?", a: "Yes, Null Origin CTF is completely free to participate in." },
  { q: "What categories will challenges cover?", a: "Web Security, Cryptography, Reverse Engineering, Digital Forensics, OSINT, Binary Exploitation, and Miscellaneous." },
  { q: "How long is the CTF?", a: "The qualifiers run for 12 hours online. The final round details will be announced separately." },
  { q: "When does registration close?", a: "Registration deadline is June 26, 2026 at 12:00 AM IST. Register early to secure your spot!" },
  { q: "Where do I get support during the event?", a: "Reach out to admin@cyberhx.com or call +91 95694 72058. You can also join our Discord for real-time updates." },
];

const TIMELINE = [
  { date: "Now", label: "Registrations Open", done: true },
  { date: "26 Jun 2026", label: "Registration Deadline", done: false },
  { date: "11 Jul 2026, 10:00 AM IST", label: "Qualifiers Begin (12 hrs)", done: false },
  { date: "11 Jul 2026, 10:00 PM IST", label: "Qualifiers End", done: false },
  { date: "TBA", label: "Final Round", done: false },
];

export default function FAQ() {
  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12 space-y-12">

      {/* ── TIMELINE ── */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="h-4 w-4 text-red-500" />
          <h2 className="text-[11px] font-black tracking-widest text-red-400 uppercase">Event Timeline</h2>
        </div>
        <div className="relative pl-4">
          <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-gradient-to-b from-red-600/60 via-zinc-700/40 to-transparent" />
          <div className="space-y-5">
            {TIMELINE.map((item, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <div className={`relative shrink-0 w-3 h-3 rounded-full border-2 mt-0.5 -ml-[22px] ${item.done ? "bg-emerald-500 border-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" : "bg-zinc-900 border-zinc-600 group-hover:border-red-500 transition-colors"}`} />
                <div>
                  <p className="text-[10px] text-zinc-600 font-mono tracking-wider">{item.date}</p>
                  <p className={`text-[12px] font-semibold tracking-wide ${item.done ? "text-emerald-400" : "text-zinc-300"}`}>{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STAY CONNECTED ── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="h-4 w-4 text-red-500" />
          <h2 className="text-[11px] font-black tracking-widest text-red-400 uppercase">Stay Connected</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://discord.gg/cyberhx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-md text-[12px] font-bold tracking-wider transition-all border"
            style={{ background: "rgba(88,101,242,0.12)", borderColor: "rgba(88,101,242,0.35)", color: "#7289da" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(88,101,242,0.22)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(88,101,242,0.12)")}
          >
            <DiscordIcon />
            Join Discord
          </a>
          <a
            href="https://wa.me/919569472058"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-md text-[12px] font-bold tracking-wider transition-all border"
            style={{ background: "rgba(37,211,102,0.10)", borderColor: "rgba(37,211,102,0.30)", color: "#25d366" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(37,211,102,0.20)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(37,211,102,0.10)")}
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="h-4 w-4 text-red-500" />
          <h2 className="text-[11px] font-black tracking-widest text-red-400 uppercase">Frequently Asked Questions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="bg-zinc-950/80 border border-zinc-800/70 hover:border-red-800/40 rounded-lg p-4 transition-all group"
            >
              <p className="text-[12px] font-bold text-zinc-100 mb-1.5 group-hover:text-red-300 transition-colors">{faq.q}</p>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}