import { useRef, useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import logoUrl from '../assets/logo.png';

const memberBlocks = [
  { num: 1, required: true },
  { num: 2, required: false },
  { num: 3, required: false },
  { num: 4, required: false },
];

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function Register() {
  const formRef = useRef<HTMLFormElement>(null);
  const agreeCheckRef = useRef<HTMLInputElement>(null);
  const agreeRowRef = useRef<HTMLLabelElement>(null);
  const [openMembers, setOpenMembers] = useState<number[]>([1]);
  const [submitting, setSubmitting] = useState(false);
  const [formMsg, setFormMsg] = useState<{ type: string; text: string }>({ type: '', text: '' });

  function toggleMember(num: number) {
    setOpenMembers((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  }

  function getField(name: string): HTMLInputElement {
    return (formRef.current!.elements as any)[name];
  }

  function markInvalid(input: HTMLInputElement, isInvalid: boolean) {
    input.classList.toggle('invalid', isInvalid);
    input.setAttribute('aria-invalid', String(isInvalid));
  }

  function validateRegistration(): boolean {
    const errors: string[] = [];
    const requiredFields: [string, string][] = [
      ['teamName', 'Team name'],
      ['country', 'Country'],
      ['leaderName', 'Leader name'],
      ['leaderEmail', 'Leader email'],
      ['m1Discord', 'Member 1 Discord username'],
      ['m1Ctftime', 'Member 1 CTFtime profile'],
    ];

    formRef.current!.querySelectorAll('.invalid').forEach((el) => {
      el.classList.remove('invalid');
      el.removeAttribute('aria-invalid');
    });

    requiredFields.forEach(([name, label]) => {
      const input = getField(name);
      if (!input.value.trim()) {
        errors.push(label + ' is required.');
        markInvalid(input, true);
      }
    });

    const leaderEmail = getField('leaderEmail');
    if (leaderEmail.value.trim() && !isValidEmail(leaderEmail.value.trim())) {
      errors.push('Enter a valid leader email address.');
      markInvalid(leaderEmail, true);
    }

    for (let i = 2; i <= 4; i++) {
      const discord = getField('m' + i + 'Discord');
      const ctftime = getField('m' + i + 'Ctftime');
      const hasDiscord = discord.value.trim();
      const hasCtftime = ctftime.value.trim();

      if (hasDiscord && !hasCtftime) {
        errors.push('Member ' + i + ' CTFtime profile is required if Discord is filled.');
        markInvalid(ctftime, true);
      }
      if (hasCtftime && !hasDiscord) {
        errors.push('Member ' + i + ' Discord username is required if CTFtime is filled.');
        markInvalid(discord, true);
      }
    }

    const agreeCheck = agreeCheckRef.current!;
    const agreeRow = agreeRowRef.current!;
    agreeRow.classList.toggle('invalid', !agreeCheck.checked);
    if (!agreeCheck.checked) {
      errors.push('You must confirm the rules of engagement.');
    }

    if (errors.length) {
      const firstInvalid = formRef.current!.querySelector('.invalid') as HTMLElement | null;
      setFormMsg({ type: 'error', text: 'Please fix: ' + errors.slice(0, 3).join(' ') });
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInvalid.focus?.();
      }
      return false;
    }

    return true;
  }

  function getRegistrationData() {
    const members: { discord: string; ctftime: string }[] = [];
    for (let i = 1; i <= 4; i++) {
      const discord = getField('m' + i + 'Discord').value.trim();
      const ctftime = getField('m' + i + 'Ctftime').value.trim();
      if (discord || ctftime) {
        members.push({ discord, ctftime });
      }
    }
    return {
      teamName: getField('teamName').value.trim(),
      country: getField('country').value.trim(),
      leaderName: getField('leaderName').value.trim(),
      leaderEmail: getField('leaderEmail').value.trim(),
      members,
      agree: agreeCheckRef.current!.checked,
    };
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validateRegistration()) return;

    setSubmitting(true);
    setFormMsg({ type: 'success', text: 'TRANSMITTING TEAM DATA...' });

    // Same-origin in production; falls back to localhost:3000 for local dev
    // against the Node/SQLite backend in server.js.
    const apiRegisterUrl =
      window.location.port === '3000' ? '/api/register' : 'http://localhost:3000/api/register';

    try {
      const response = await fetch(apiRegisterUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(getRegistrationData()),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        setFormMsg({
          type: 'error',
          text: 'Server rejected registration: ' + (result.errors || ['Unknown error.']).join(' '),
        });
        return;
      }

      formRef.current!.reset();
      setFormMsg({ type: 'success', text: 'TEAM REGISTERED. Registration ID: ' + result.registrationId });
    } catch {
      setFormMsg({ type: 'error', text: 'Backend is offline. Start it with: node server.js' });
    } finally {
      setSubmitting(false);
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
        <div className="hud-cta">
          <Link className="pxbtn" style={{background: 'var(--white)', color: '#000'}} to="/">← BACK</Link>
          <a className="pxbtn primary" href="#registerForm">REGISTER</a>
        </div>
      </div>
    </div>
    
    <section className="term-header">
      <div className="wrap-narrow">
        <div className="term-line">
          <span className="prompt">operator@nullorigin:~$</span>
          <span className="cmd">./register --mode=team --portal=nullorigin.ctf</span>
          <span className="term-cursor"></span>
        </div>
    
        <div className="status-chips">
          <div className="chip live"><span className="dot"></span>REGISTRATION LIVE</div>
          <div className="chip">CLOSES 08 JULY 2026</div>
          <div className="chip">1–4 MEMBERS</div>
        </div>
    
        <div className="page-title">
          <div className="title-icon">&gt;_</div>
          <div>
            <h1>TEAM REGISTRATION FORM</h1>
            <div className="sub">NULL ORIGIN CTF · OFFICIAL OPERATOR ENROLLMENT</div>
          </div>
        </div>
    
        <form className="form-card" id="registerForm" ref={formRef} noValidate onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="section-label"><span className="bar"></span>TEAM INFORMATION</div>
            <div className="field-grid">
              <div className="field">
                <label>TEAM NAME <span className="req">*</span></label>
                <input type="text" name="teamName" placeholder="TEAM_NAME" maxLength={80} required />
              </div>
              <div className="field">
                <label>COUNTRY <span className="req">*</span></label>
                <input type="text" name="country" placeholder="COUNTRY" maxLength={60} required />
              </div>
            </div>
          </div>
    
          <div className="form-section">
            <div className="section-label"><span className="bar"></span>TEAM LEADER</div>
            <div className="field-grid">
              <div className="field">
                <label>FULL NAME <span className="req">*</span></label>
                <input type="text" name="leaderName" placeholder="LEADER_NAME" maxLength={80} required />
              </div>
              <div className="field">
                <label>EMAIL <span className="req">*</span></label>
                <input type="email" name="leaderEmail" placeholder="LEADER@DOMAIN.COM" maxLength={120} required />
              </div>
            </div>
          </div>
    
          <div className="form-section">
            {memberBlocks.map((m) => (
              <div className={"member-block" + (openMembers.includes(m.num) ? " open" : "")} data-member={m.num} key={m.num}>
                <div className={"member-head" + (m.required ? "" : " optional")} onClick={() => toggleMember(m.num)}>
                  <div className="mh-left">
                    <span className="bar"></span>
                    <span className="mh-title">
                      MEMBER {m.num}{" "}
                      {m.required ? <span className="req">*</span> : <span className="opt-tag">(optional)</span>}
                    </span>
                  </div>
                  <span className="arrow">▾</span>
                </div>
                <div className="member-body">
                  <div className="member-body-in">
                    <div className="field-grid">
                      <div className="field">
                        <label>DISCORD USERNAME {m.required && <span className="req">*</span>}</label>
                        <input type="text" name={`m${m.num}Discord`} placeholder="USERNAME" maxLength={40} required={m.required} />
                      </div>
                      <div className="field">
                        <label>CTFTIME PROFILE {m.required && <span className="req">*</span>}</label>
                        <input type="text" name={`m${m.num}Ctftime`} placeholder="CTFTIME.ORG/USER/..." maxLength={160} required={m.required} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
    
          <label className="agree-row" ref={agreeRowRef}>
            <input type="checkbox" ref={agreeCheckRef} required />
            <span>I confirm my team will participate ethically and follow the Null Origin rules of engagement.</span>
          </label>
    
          <button type="submit" className="pxbtn primary submit-btn" disabled={submitting}>
            <span>🛡</span> {submitting ? "TRANSMITTING..." : "REGISTER TEAM →"}
          </button>
    
          <div className={"form-msg" + (formMsg.text ? " show " + formMsg.type : "")}>{formMsg.text}</div>
    
          <div className="form-foot-note">By registering you agree to participate ethically · Null Origin CTF 2026</div>
        </form>
      </div>
    </section>
    
    <footer>
      <div className="wrap">
        <div className="foot-bottom">© 2026 NULL ORIGIN CTF · Built by Team CyberXoX · Powered by <a href="https://cyberhx.com/" target="_blank" rel="noopener noreferrer">CyberHX</a></div>
      </div>
    </footer>
    
    
    

    </>
  );
}
