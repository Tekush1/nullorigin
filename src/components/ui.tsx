import { ReactNode, useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (typeof IntersectionObserver === "undefined") {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  tag,
  title,
  sub,
  center = true,
}: {
  tag: string;
  title: ReactNode;
  sub?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
      <span className={`eyebrow ${center ? "eyebrow--center" : ""}`}>{tag}</span>
      <h2 className="h-display text-[clamp(1.7rem,4vw,2.6rem)] mt-4">{title}</h2>
      {sub && <p className="lead mt-4">{sub}</p>}
    </div>
  );
}
