import { Shield, Globe, Zap } from "lucide-react";

export default function Footer() {
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
                { label: "Home", href: "#" },
                { label: "Rules", href: "#" },
                { label: "FAQ", href: "#" },
                { label: "Contact", href: "#" },
                { label: "Privacy Policy", href: "#" },
                { label: "Terms", href: "#" },
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
                { label: "Discord", href: "#", icon: "⚡" },
                { label: "LinkedIn", href: "#", icon: "◈" },
                { label: "Instagram", href: "#", icon: "◉" },
                { label: "X (Twitter)", href: "#", icon: "✕" },
                { label: "GitHub", href: "#", icon: "◎" },
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