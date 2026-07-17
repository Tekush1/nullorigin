import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logoUrl from '../assets/logo.png';
import unstopLogoUrl from '../assets/unstop-logo.jpg';

const faqItems = [
  { q: 'Who can participate?', a: 'Anyone — students, professionals and hobbyists from anywhere in the world. There are no restrictions.' },
  { q: 'Is it free to register?', a: 'Yes. Null Origin is completely free to enter — just register your team before slots close.' },
  { q: 'What is the team size?', a: 'Teams of 1–4 operators. Solo entries are welcome too.' },
  { q: 'Do I need prior CTF experience?', a: 'No. Challenges span Easy to Expert, so first-timers and veterans both have a path through.' },
  { q: 'Can organisations sponsor or partner?', a: 'Yes — see the Sponsors section above, or reach out at partners@cyberhx.com.' },
  { q: 'Where does the competition run?', a: 'Fully online, on a custom Null Origin platform. No travel required.' },
];

// CTF goes live: 10 Jul 2026, 18:00 IST (IST = UTC+5:30)
const TARGET = new Date('2026-07-10T18:00:00+05:30').getTime();

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export default function Home() {
  const confettiRef = useRef<HTMLDivElement>(null);
  const flagInputRef = useRef<HTMLInputElement>(null);
  const [openFaq, setOpenFaq] = useState(0);
  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [flagMsg, setFlagMsg] = useState('');
  const [flagMsgColor, setFlagMsgColor] = useState('');

  // scatter confetti dots across hero scene
  useEffect(() => {
    const wrap = confettiRef.current;
    if (!wrap) return;
    const count = 40;
    const dots: HTMLSpanElement[] = [];
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('span');
      dot.style.left = Math.random() * 100 + '%';
      dot.style.top = Math.random() * 78 + '%';
      const size = 3 + Math.random() * 4;
      dot.style.width = size + 'px';
      dot.style.height = size + 'px';
      wrap.appendChild(dot);
      dots.push(dot);
    }
    return () => dots.forEach((d) => d.remove());
  }, []);

  // countdown timer
  useEffect(() => {
    function tick() {
      const now = Date.now();
      let diff = Math.max(0, TARGET - now);
      const d = Math.floor(diff / 86400000); diff -= d * 86400000;
      const h = Math.floor(diff / 3600000); diff -= h * 3600000;
      const m = Math.floor(diff / 60000); diff -= m * 60000;
      const s = Math.floor(diff / 1000);
      setCountdown({ d, h, m, s });
    }
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  // reveal-on-scroll animation
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in');
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  function checkFlag() {
    const val = (flagInputRef.current?.value || '').trim();
    if (val.toLowerCase() === 'flag{ro11_rot13_d3c0d3}') {
      setFlagMsg('✓ CORRECT — FLAG CAPTURED.');
      setFlagMsgColor('var(--green)');
    } else {
      setFlagMsg('✗ INCORRECT. HINT: ROT13.');
      setFlagMsgColor('var(--red)');
    }
  }

  return (
    <>
    
    
    <div className="hud">
      <div className="wrap hud-row">
        <div className="hud-left">
          <div className="hud-icon"><img src={logoUrl} alt="Null Origin logo" /></div>
          <div>
            <div className="hud-title">NULL ORIGIN</div>
            <div className="hud-sub">CTF · 2026</div>
          </div>
        </div>
        <div className="hud-stats">
          <div className="stat-chip"><span className="ico"></span> LVL 6 DOMAINS</div>
          <div className="stat-chip red"><span className="ico"></span> 500+ PLAYERS</div>
          <div className="stat-chip amber"><span className="ico"></span> ₹50K POOL</div>
        </div>
        <div className="hud-cta">
          <a className="pxbtn ghost" href="#sponsors">PARTNER</a>
          <Link className="pxbtn primary" to="/register">REGISTER</Link>
        </div>
      </div>
    </div>
    
    <section className="hero">
      <div className="hero-scene">
        <div className="hero-moon"></div>
        <div className="hero-confetti" ref={confettiRef}></div>
        <svg className="hero-skyline" viewBox="0 0 1440 220" preserveAspectRatio="none" style={{height: '220px'}}>
          <g fill="#101c2e">
            <rect x="0" y="120" width="90" height="100"/>
            <rect x="90" y="90" width="70" height="130"/>
            <rect x="160" y="140" width="60" height="80"/>
            <rect x="220" y="70" width="80" height="150"/>
            <rect x="300" y="110" width="55" height="110"/>
            <rect x="355" y="60" width="90" height="160"/>
            <rect x="445" y="130" width="65" height="90"/>
            <rect x="510" y="95" width="75" height="125"/>
            <rect x="585" y="150" width="50" height="70"/>
            <rect x="635" y="40" width="100" height="180"/>
            <rect x="735" y="100" width="70" height="120"/>
            <rect x="805" y="135" width="60" height="85"/>
            <rect x="865" y="75" width="85" height="145"/>
            <rect x="950" y="115" width="55" height="105"/>
            <rect x="1005" y="55" width="95" height="165"/>
            <rect x="1100" y="125" width="65" height="95"/>
            <rect x="1165" y="90" width="75" height="130"/>
            <rect x="1240" y="145" width="55" height="75"/>
            <rect x="1295" y="65" width="85" height="155"/>
            <rect x="1380" y="115" width="60" height="105"/>
          </g>
          <g fill="#3a6ea5" opacity=".55">
            <rect x="20" y="140" width="6" height="8"/><rect x="40" y="160" width="6" height="8"/>
            <rect x="105" y="110" width="6" height="8"/><rect x="125" y="135" width="6" height="8"/>
            <rect x="235" y="95" width="6" height="8"/><rect x="260" y="125" width="6" height="8"/>
            <rect x="370" y="85" width="6" height="8"/><rect x="395" y="115" width="6" height="8"/>
            <rect x="650" y="65" width="6" height="8"/><rect x="675" y="100" width="6" height="8"/>
            <rect x="750" y="125" width="6" height="8"/><rect x="820" y="155" width="6" height="8"/>
            <rect x="880" y="100" width="6" height="8"/><rect x="1020" y="80" width="6" height="8"/>
            <rect x="1180" y="115" width="6" height="8"/><rect x="1310" y="90" width="6" height="8"/>
          </g>
          <rect x="0" y="210" width="1440" height="10" fill="#0a121f"/>
        </svg>
        <svg className="hero-monitor" style={{left: '7%'}} viewBox="0 0 40 40"><rect x="2" y="2" width="36" height="26" fill="#1c1c2a" stroke="#000" strokeWidth="2"/><rect x="6" y="6" width="28" height="18" fill="#39ff6a"/><rect x="14" y="30" width="12" height="4" fill="#1c1c2a"/><rect x="10" y="34" width="20" height="3" fill="#000"/></svg>
        <svg className="hero-monitor" style={{left: '20%', width: '38px'}} viewBox="0 0 40 40"><rect x="2" y="2" width="36" height="26" fill="#f4f6f5" stroke="#000" strokeWidth="2"/><circle cx="14" cy="14" r="2.5" fill="#000"/><circle cx="26" cy="14" r="2.5" fill="#000"/><rect x="13" y="20" width="14" height="3" fill="#000"/><rect x="14" y="30" width="12" height="4" fill="#cfd3d2"/><rect x="10" y="34" width="20" height="3" fill="#000"/></svg>
        <svg className="hero-monitor" style={{right: '8%'}} viewBox="0 0 40 40"><rect x="2" y="2" width="36" height="26" fill="#1c1c2a" stroke="#000" strokeWidth="2"/><rect x="6" y="6" width="28" height="18" fill="#39c9ff"/><rect x="14" y="30" width="12" height="4" fill="#1c1c2a"/><rect x="10" y="34" width="20" height="3" fill="#000"/></svg>
        <svg className="hero-monitor" style={{right: '18%', width: '30px'}} viewBox="0 0 40 40"><rect x="2" y="2" width="36" height="26" fill="#1c1c2a" stroke="#000" strokeWidth="2"/><rect x="6" y="6" width="28" height="18" fill="#ff3355"/><rect x="14" y="30" width="12" height="4" fill="#1c1c2a"/><rect x="10" y="34" width="20" height="3" fill="#000"/></svg>
      </div>
      <div className="wrap">
        <h1 className="marquee">NULL<br />ORIGIN</h1>
        <div className="hero-tagline">Select your domain. Beat the clock. Capture every flag — a 24-hour CTF across six attack levels.</div>
        <div className="start-row">
          <Link className="pxbtn primary pxbtn-lg" to="/register">▸ START GAME</Link>
          <a className="pxbtn pxbtn-lg" style={{background: 'var(--white)', color: '#000'}} href="#about">VIEW INTRO</a>
        </div>
        <div className="coin-counter block-sm">
          <div className="coin"><div className="n">{pad(countdown.d)}</div><div className="l">DAYS</div></div>
          <div className="coin"><div className="n">{pad(countdown.h)}</div><div className="l">HRS</div></div>
          <div className="coin"><div className="n">{pad(countdown.m)}</div><div className="l">MIN</div></div>
          <div className="coin r"><div className="n">{pad(countdown.s)}</div><div className="l">SEC</div></div>
        </div>
      </div>
    </section>
    
    <section id="about">
      <div className="wrap">
        <div className="level-tag reveal">LEVEL 01 · INTRO</div>
        <h2 className="reveal">What is Null Origin?</h2>
    
        <div className="about-grid reveal">
          <div>
            <div className="dialog">
              <div className="speaker">NPC // MISSION CONTROL</div>
              <p>Null Origin is a premier online Capture The Flag competition organised by Team CyberXoX and powered by CyberHX.</p>
              <p>Over 24 hours, teams race across six attack domains to exploit vulnerabilities, break ciphers, reverse binaries and recover forensic evidence.</p>
              <p>Designed for everyone from seasoned pentesters to first-time competitors — sharpen your skills, learn new techniques, connect with the community.</p>
            </div>
            <div className="stat-block">
              <div className="stat-tile"><span>Team size</span><b>1–4</b></div>
              <div className="stat-tile"><span>Format</span><b>JEOPARDY</b></div>
              <div className="stat-tile"><span>Duration</span><b>24H</b></div>
              <div className="stat-tile"><span>Difficulty</span><b>EASY→XP</b></div>
            </div>
          </div>
    
          <div className="char-select">
            <div className="csh">ORGANISED BY</div>
            <div className="char-grid">
              <div className="char-card"><div className="ic">🛡</div><div className="nm">CyberXoX</div><div className="role">Team / Host</div></div>
              <a className="char-card" href="https://cyberhx.com/" target="_blank" rel="noopener noreferrer"><div className="ic">⌬</div><div className="nm">CyberHX</div><div className="role">Platform ↗</div></a>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section id="highlights">
      <div className="wrap">
        <div className="level-tag red reveal">LEVEL 02 · DOMAINS</div>
        <h2 className="reveal">Character Select</h2>
        <div className="sec-desc reveal">Six attack domains. Pick your fighter, clear them in any order.</div>
    
        <div className="map-wrap reveal">
          <div className="roster-scroller">
            <div className="char-slot slot-1">
              <div className="char-portrait">
                <div className="num">01</div>
                <svg viewBox="0 0 64 64"><g fill="#000"><rect x="10" y="14" width="14" height="14"/><rect x="14" y="18" width="6" height="6" fill="#39ff6a"/><rect x="20" y="24" width="6" height="6"/><rect x="26" y="30" width="6" height="6"/><rect x="32" y="36" width="6" height="6"/><rect x="38" y="42" width="14" height="6"/><rect x="44" y="36" width="6" height="6"/></g></svg>
              </div>
              <div className="char-name">CRYPTO-<br />GRAPHY</div>
              <div className="char-desc">Ciphers, hashes, RSA & encryption.</div>
            </div>
    
            <div className="char-slot slot-2">
              <div className="char-portrait">
                <div className="num">02</div>
                <svg viewBox="0 0 64 64"><g fill="#000"><rect x="26" y="10" width="12" height="10"/><rect x="14" y="22" width="36" height="22"/><rect x="8" y="26" width="6" height="4"/><rect x="50" y="26" width="6" height="4"/><rect x="8" y="36" width="6" height="4"/><rect x="50" y="36" width="6" height="4"/><rect x="22" y="44" width="6" height="8"/><rect x="36" y="44" width="6" height="8"/><rect x="20" y="28" width="8" height="8" fill="#ff3355"/><rect x="36" y="28" width="8" height="8" fill="#ff3355"/></g></svg>
              </div>
              <div className="char-name">WEB<br />EXPLOIT</div>
              <div className="char-desc">SQLi, XSS, SSRF, IDOR.</div>
            </div>
    
            <div className="char-slot slot-3">
              <div className="char-portrait">
                <div className="num">03</div>
                <svg viewBox="0 0 64 64"><g fill="#000"><rect x="20" y="20" width="24" height="24"/><rect x="26" y="26" width="12" height="12" fill="#ffc23c"/><rect x="10" y="28" width="8" height="6"/><rect x="46" y="28" width="8" height="6"/><rect x="28" y="8" width="6" height="10"/><rect x="28" y="46" width="6" height="10"/><rect x="14" y="14" width="6" height="6"/><rect x="44" y="44" width="6" height="6"/></g></svg>
              </div>
              <div className="char-name">REVERSE<br />ENGINEER</div>
              <div className="char-desc">Disassemble & uncover logic.</div>
            </div>
    
            <div className="char-slot slot-4">
              <div className="char-portrait">
                <div className="num">04</div>
                <svg viewBox="0 0 64 64"><g fill="#000"><circle cx="26" cy="26" r="14"/><rect x="22" y="22" width="8" height="8" fill="#39c9ff"/><rect x="36" y="36" width="8" height="20" transform="rotate(45 40 46)"/></g></svg>
              </div>
              <div className="char-name">OSINT</div>
              <div className="char-desc">Track digital footprints.</div>
            </div>
    
            <div className="char-slot slot-5">
              <div className="char-portrait">
                <div className="num">05</div>
                <svg viewBox="0 0 64 64"><g fill="#000"><rect x="14" y="12" width="36" height="40"/><rect x="20" y="18" width="24" height="6" fill="#b066ff"/><rect x="20" y="28" width="24" height="4"/><rect x="20" y="36" width="16" height="4"/><circle cx="44" cy="44" r="4"/></g></svg>
              </div>
              <div className="char-name">FORENSICS</div>
              <div className="char-desc">Memory, disk & network artifacts.</div>
            </div>
    
            <div className="char-slot slot-6">
              <div className="char-portrait">
                <div className="num">06</div>
                <svg viewBox="0 0 64 64"><g fill="#000"><rect x="12" y="24" width="40" height="22"/><rect x="18" y="30" width="6" height="6" fill="#39ff6a"/><rect x="40" y="30" width="6" height="6" fill="#39ff6a"/><rect x="26" y="38" width="12" height="4"/><rect x="22" y="14" width="20" height="10"/></g></svg>
              </div>
              <div className="char-name">BINARY<br />EXPLOIT</div>
              <div className="char-desc">Overflows, ROP — own the box.</div>
            </div>
          </div>
          <div className="roster-hint">SCROLL FOR MORE →</div>
        </div>
    
        <div className="boss-card reveal">
          <div>
            <h4>⚔ BOSS CHALLENGE · EASY</h4>
            <p style={{color: 'var(--dim)', fontSize: '17px', marginBottom: '14px'}}>Decrypt the transmission to capture the flag.</p>
            <input className="px-input" defaultValue="synt{aH11_ebg13_q3p0q3}" readOnly />
          </div>
          <div>
            <input className="px-input" ref={flagInputRef} placeholder="flag{...}" />
            <a className="pxbtn green" style={{display: 'block', textAlign: 'center'}} onClick={checkFlag}>VERIFY FLAG</a>
            <div className="boss-msg" style={{color: flagMsgColor}}>{flagMsg}</div>
          </div>
        </div>
      </div>
    </section>
    
    <section className="hud-band">
      <div className="wrap">
        <div className="level-tag amber reveal">LEVEL 03 · STATS</div>
        <h2 className="reveal">Who You Reach</h2>
        <div className="sec-desc reveal">A focused, technical audience — exactly the people security brands want in the room.</div>
        <div className="hud-grid reveal">
          <div className="hud-tile"><div className="v">500+</div><div className="l">PLAYERS</div></div>
          <div className="hud-tile"><div className="v">30+</div><div className="l">CHALLENGES</div></div>
          <div className="hud-tile"><div className="v">6</div><div className="l">DOMAINS</div></div>
          <div className="hud-tile"><div className="v">24H</div><div className="l">NON-STOP</div></div>
          <div className="hud-tile"><div className="v">GLOBAL</div><div className="l">REACH</div></div>
          <div className="hud-tile"><div className="v">₹50K+</div><div className="l">PRIZE POOL</div></div>
        </div>
      </div>
    </section>
    
    <section id="sponsors">
      <div className="wrap">
        <div className="level-tag reveal">LEVEL 04 · ALLIES</div>
        <h2 className="reveal">Sponsors & Partners</h2>
        <div className="sec-desc reveal">Null Origin is built with its partners. These tiers are open now — your brand could anchor the next edition.</div>
    
        <div className="perk-row reveal">
          <div className="perk"><div className="ic">◎</div><h3>VETTED AUDIENCE</h3><p>Reach hundreds of motivated security practitioners and students.</p></div>
          <div className="perk"><div className="ic">⛓</div><h3>RECRUITING PIPELINE</h3><p>Surface top performers, connect with hard-to-reach talent.</p></div>
          <div className="perk"><div className="ic">✦</div><h3>BRAND × SKILL</h3><p>Sit next to genuine offensive-security excellence.</p></div>
        </div>
    
        <div className="inv-tier reveal">
          <div className="inv-head"><h3>PLATFORM PARTNER</h3><div className="meta">Registration & hosting platform</div></div>
          <div className="inv-grid t0">
            <div className="inv-slot filled">
              <img src={unstopLogoUrl} alt="Unstop logo" />
              <div className="tag">REGISTER VIA UNSTOP</div>
            </div>
          </div>
        </div>
        <div className="inv-tier reveal">
          <div className="inv-head"><h3>TITLE PARTNER</h3><div className="meta">Naming · keynote · top logo — 0/1</div></div>
          <div className="inv-grid t0"><div className="inv-slot"><div className="plus">+</div>YOUR BRAND HERE</div></div>
        </div>
        <div className="inv-tier reveal">
          <div className="inv-head"><h3>GOLD SPONSORS</h3><div className="meta">Prominent logo · category — 0/3</div></div>
          <div className="inv-grid t1">
            <div className="inv-slot"><div className="plus">+</div>GOLD 01</div>
            <div className="inv-slot"><div className="plus">+</div>GOLD 02</div>
            <div className="inv-slot"><div className="plus">+</div>GOLD 03</div>
          </div>
        </div>
        <div className="inv-tier reveal">
          <div className="inv-head"><h3>COMMUNITY PARTNERS</h3><div className="meta">Logo · shout-outs — 0/6</div></div>
          <div className="inv-grid t2">
            <div className="inv-slot"><div className="plus">+</div>01</div>
            <div className="inv-slot"><div className="plus">+</div>02</div>
            <div className="inv-slot"><div className="plus">+</div>03</div>
            <div className="inv-slot"><div className="plus">+</div>04</div>
            <div className="inv-slot"><div className="plus">+</div>05</div>
            <div className="inv-slot"><div className="plus">+</div>06</div>
          </div>
        </div>
    
        <div className="quest-cta reveal">
          <div><h3>ANCHOR THE NEXT EDITION</h3><p>Custom packages and category sponsorships available. We will send the full brief.</p></div>
          <div style={{display: 'flex', gap: '12px'}}>
            <a className="pxbtn primary" href="#">BECOME A SPONSOR</a>
            <a className="pxbtn" style={{background: 'var(--white)', color: '#000'}} href="#">REQUEST DECK</a>
          </div>
        </div>
      </div>
    </section>
    
    <section id="schedule">
      <div className="wrap">
        <div className="level-tag red reveal">LEVEL 05 · QUEST LOG</div>
        <h2 className="reveal">Event Timeline</h2>
    
        <div className="road-map reveal">
          <div className="road-log-line active">
            <div className="dot"></div>
            <div>
              <div className="qd">NOW</div>
              <h3>REGISTRATION OPEN</h3>
              <p>Teams sign up via Unstop and prepare for the competition.</p>
            </div>
            <div className="tag">LIVE</div>
          </div>
          <div className="road-log-line">
            <div className="dot"></div>
            <div>
              <div className="qd">10 JUL 2026</div>
              <h3>CTF GOES LIVE</h3>
              <p>The platform opens. 24 hours to capture as many flags as possible.</p>
            </div>
            <div className="tag">PENDING</div>
          </div>
          <div className="road-log-line">
            <div className="dot"></div>
            <div>
              <div className="qd">11 JUL 2026</div>
              <h3>FREEZE &amp; CLOSE</h3>
              <p>Scoreboard freezes and final standings are calculated.</p>
            </div>
            <div className="tag">PENDING</div>
          </div>
          <div className="road-log-line">
            <div className="dot"></div>
            <div>
              <div className="qd">JUL 2026</div>
              <h3>WINNERS ANNOUNCED</h3>
              <p>Top teams receive prizes, certificates and recognition.</p>
            </div>
            <div className="tag">PENDING</div>
          </div>
        </div>
      </div>
    </section>
    
    <section id="prizes">
      <div className="wrap">
        <div className="level-tag amber reveal" style={{margin: '0 auto 22px', display: 'table'}}>LEVEL 06 · REWARDS</div>
        <h2 className="reveal" style={{textAlign: 'center'}}>Prize Pool</h2>
        <div className="sec-desc reveal" style={{margin: '14px auto 0', textAlign: 'center'}}>Yet to be announced, but expect some exciting rewards for the top solvers!</div>
    
        <div className="loot-wrap reveal">
          <div className="loot-stage">
            <div className="loot-bubble">WIN<br />LOOT!</div>
            <div className="loot-row">
              <div className="loot-chip loot-diamond">💎</div>
              <div className="loot-chest">🎁</div>
              <div className="loot-chip">₹50K+</div>
            </div>
            <div className="loot-note">Every week leading up to the event, get a shot at instant prizes — swag, vouchers and cash drops.</div>
          </div>
        </div>
    
        <div className="podium reveal">
          <div className="pod silver"><div className="rank">🥈</div><h3>2ND PLACE</h3><p>+ Certificate + Swag</p></div>
          <div className="pod gold"><div className="rank">🏆</div><h3>1ST PLACE</h3><p>+ Certificate + Swag</p></div>
          <div className="pod bronze"><div className="rank">🥉</div><h3>3RD PLACE</h3><p>+ Certificate + Swag</p></div>
        </div>
        <div className="prize-note reveal">Additional category prizes and special mentions for top solvers.</div>
      </div>
    </section>
    
    <section id="faq">
      <div className="wrap">
        <div className="level-tag reveal" style={{margin: '0 auto 22px', display: 'table'}}>SUPPORT · FAQ</div>
        <h2 className="reveal" style={{textAlign: 'center'}}>Frequently Asked</h2>
    
        <div className="faq-list reveal">
          {faqItems.map((item, i) => (
            <div className={"faq-item" + (openFaq === i ? " open" : "")} key={item.q}>
              <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                <span>{item.q}</span><span className="arrow">▾</span>
              </div>
              <div className="faq-a"><div className="faq-a-in">{item.a}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
    
    <footer>
      <div className="wrap">
        <div className="go-text">GAME OVER?</div>
        <div className="foot-sub">Not yet. Register and continue the run — Null Origin, July 2026.</div>
        <div className="foot-links">
          <a href="#about">About</a><a href="#highlights">Domains</a><a href="#sponsors">Sponsors</a><a href="#schedule">Schedule</a><a href="#prizes">Prizes</a><a href="#faq">FAQ</a>
          <a href="https://www.instagram.com/cyberhx__/" target="_blank" rel="noopener noreferrer">Discord</a><a href="https://github.com/Tekush1" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <div className="foot-bottom">© 2026 NULL ORIGIN CTF · Built by Team CyberXoX · Powered by <a href="https://cyberhx.com/" target="_blank" rel="noopener noreferrer">CyberHX</a></div>
      </div>
    </footer>
    
    
    

    </>
  );
}
