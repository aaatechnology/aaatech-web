import { useState, useEffect, useRef } from "react";
import "./index.css";
import "./App.css";

/* ── tiny hook: reveal on scroll ── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ── NAV ── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__logo">
        <span className="logo-dot" />
        <span>Nexora</span>
      </div>
      <ul className="nav__links">
        <li><a href="#features">Features</a></li>
        <li><a href="#how">How it works</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ul>
      <div className="nav__cta">
        <a href="#" className="btn-ghost">Log in</a>
        <a href="#" className="btn-primary">Get started free</a>
      </div>
    </nav>
  );
}

/* ── HERO ── */
function Hero() {
  return (
    <section className="hero">
      <div className="hero__grid-bg" aria-hidden />
      <div className="hero__glow" aria-hidden />
      <div className="hero__content">
        <div className="hero__badge">
          <span className="badge-dot" />
          Now in public beta — join 4,200+ teams
        </div>
        <h1 className="hero__title">
          Ship faster.<br />
          <span className="gradient-text">Scale smarter.</span>
        </h1>
        <p className="hero__sub">
          Nexora unifies your workflow, analytics, and team collaboration in one
          elegant platform — so you can focus on building what matters.
        </p>
        <div className="hero__actions">
          <a href="#" className="btn-primary btn-lg">Start for free →</a>
          <a href="#how" className="btn-outline">See how it works</a>
        </div>
        <p className="hero__note">No credit card required · Free plan forever</p>
      </div>
      <div className="hero__dashboard">
        <DashboardMockup />
      </div>
    </section>
  );
}

function DashboardMockup() {
  const bars = [42, 68, 55, 80, 63, 91, 74, 88, 60, 95, 72, 85];
  return (
    <div className="mock">
      <div className="mock__bar">
        <div className="mock__dots">
          <span /><span /><span />
        </div>
        <span className="mock__title">Nexora Dashboard</span>
      </div>
      <div className="mock__body">
        <div className="mock__sidebar">
          {["Overview","Analytics","Projects","Team","Settings"].map((l,i) => (
            <div key={l} className={`mock__nav-item ${i===1?"mock__nav-item--active":""}`}>{l}</div>
          ))}
        </div>
        <div className="mock__main">
          <div className="mock__stats">
            {[["Revenue","$84.2k","↑ 18%"],["Users","12,400","↑ 9%"],["Uptime","99.98%","✓"]].map(([l,v,d]) => (
              <div key={l} className="mock__stat">
                <div className="mock__stat-label">{l}</div>
                <div className="mock__stat-val">{v}</div>
                <div className="mock__stat-delta">{d}</div>
              </div>
            ))}
          </div>
          <div className="mock__chart">
            {bars.map((h,i) => (
              <div key={i} className="mock__bar-wrap">
                <div className="mock__bar-fill" style={{height:`${h}%`, animationDelay:`${i*60}ms`}} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── LOGOS ── */
function Logos() {
  const logos = ["Stripe","Notion","Linear","Vercel","Figma","GitHub","Slack","Loom"];
  return (
    <section className="logos">
      <p className="logos__label">Trusted by teams at</p>
      <div className="logos__track">
        <div className="logos__inner">
          {[...logos,...logos].map((l,i) => (
            <span key={i} className="logos__item">{l}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FEATURES ── */
const features = [
  { icon: "⚡", title: "Blazing fast", desc: "Sub-50ms response times globally, powered by edge infrastructure." },
  { icon: "🔒", title: "Enterprise security", desc: "SOC 2 Type II, GDPR compliant. Your data never leaves your region." },
  { icon: "🧠", title: "AI-powered insights", desc: "Automatic anomaly detection and forecasting built right in." },
  { icon: "🔗", title: "100+ integrations", desc: "Connect Slack, GitHub, Jira, Salesforce and more in one click." },
  { icon: "📊", title: "Real-time analytics", desc: "Live dashboards with custom KPIs, updated every second." },
  { icon: "🤝", title: "Team collaboration", desc: "Comments, assignments, and notifications that actually work." },
];

function Features() {
  const [ref, visible] = useReveal();
  return (
    <section className="features" id="features" ref={ref}>
      <div className={`section-header ${visible?"reveal":""}`}>
        <div className="pill">Features</div>
        <h2>Everything your team needs</h2>
        <p>One platform to replace five tools — and actually enjoy using it.</p>
      </div>
      <div className={`features__grid ${visible?"reveal":""}`}>
        {features.map((f,i) => (
          <div key={f.title} className="feature-card" style={{animationDelay:`${i*80}ms`}}>
            <div className="feature-card__icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── HOW IT WORKS ── */
const steps = [
  { n:"01", title:"Connect your stack", desc:"Plug in your existing tools in minutes with our guided setup wizard." },
  { n:"02", title:"Invite your team", desc:"Add teammates with role-based permissions. They're onboarded in under 2 minutes." },
  { n:"03", title:"Ship with confidence", desc:"Real-time visibility into every metric that matters. Catch issues before users do." },
];

function HowItWorks() {
  const [ref, visible] = useReveal();
  return (
    <section className="how" id="how" ref={ref}>
      <div className={`section-header ${visible?"reveal":""}`}>
        <div className="pill">How it works</div>
        <h2>Up and running in minutes</h2>
      </div>
      <div className={`how__steps ${visible?"reveal":""}`}>
        {steps.map((s,i) => (
          <div key={s.n} className="step" style={{animationDelay:`${i*120}ms`}}>
            <div className="step__num">{s.n}</div>
            <div className="step__line" />
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── PRICING ── */
const plans = [
  {
    name:"Starter", price:"$0", period:"/mo",
    desc:"Perfect for indie makers and small projects.",
    features:["Up to 3 projects","5 team members","Basic analytics","Community support"],
    cta:"Get started free", highlight:false,
  },
  {
    name:"Pro", price:"$49", period:"/mo",
    desc:"For growing teams that need more power.",
    features:["Unlimited projects","25 team members","Advanced analytics","Priority support","Custom integrations","SSO"],
    cta:"Start free trial", highlight:true,
  },
  {
    name:"Enterprise", price:"Custom", period:"",
    desc:"For large organizations with custom needs.",
    features:["Unlimited everything","Dedicated CSM","SLA guarantee","Audit logs","On-prem option","Custom contracts"],
    cta:"Contact sales", highlight:false,
  },
];

function Pricing() {
  const [ref, visible] = useReveal();
  return (
    <section className="pricing" id="pricing" ref={ref}>
      <div className={`section-header ${visible?"reveal":""}`}>
        <div className="pill">Pricing</div>
        <h2>Simple, transparent pricing</h2>
        <p>Start free. Scale as you grow. No surprises.</p>
      </div>
      <div className={`pricing__grid ${visible?"reveal":""}`}>
        {plans.map((p,i) => (
          <div key={p.name} className={`plan ${p.highlight?"plan--highlight":""}`} style={{animationDelay:`${i*100}ms`}}>
            {p.highlight && <div className="plan__badge">Most popular</div>}
            <div className="plan__name">{p.name}</div>
            <div className="plan__price">{p.price}<span>{p.period}</span></div>
            <p className="plan__desc">{p.desc}</p>
            <ul className="plan__features">
              {p.features.map(f => <li key={f}><span className="check">✓</span>{f}</li>)}
            </ul>
            <a href="#" className={p.highlight?"btn-primary":"btn-outline"}>{p.cta}</a>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── FAQ ── */
const faqs = [
  { q:"Is there a free plan?", a:"Yes! Our Starter plan is free forever with no credit card required. You get full access to core features for up to 3 projects." },
  { q:"Can I switch plans anytime?", a:"Absolutely. Upgrade, downgrade, or cancel at any time. Billing is prorated automatically." },
  { q:"How does the 14-day trial work?", a:"Sign up for Pro and explore every feature, risk-free. No charge until day 15, and we'll remind you before then." },
  { q:"Do you offer discounts for startups?", a:"Yes — we offer 50% off for early-stage startups and non-profits. Reach out to our team." },
  { q:"Where is my data stored?", a:"Data is stored in the region you select at signup: US, EU, or APAC. We never share or sell your data." },
];

function FAQ() {
  const [open, setOpen] = useState(null);
  const [ref, visible] = useReveal();
  return (
    <section className="faq" id="faq" ref={ref}>
      <div className={`section-header ${visible?"reveal":""}`}>
        <div className="pill">FAQ</div>
        <h2>Questions? We've got answers.</h2>
      </div>
      <div className={`faq__list ${visible?"reveal":""}`}>
        {faqs.map((f,i) => (
          <div key={i} className={`faq__item ${open===i?"faq__item--open":""}`} onClick={()=>setOpen(open===i?null:i)}>
            <div className="faq__q">
              {f.q}
              <span className="faq__arrow">{open===i?"−":"+"}</span>
            </div>
            {open===i && <div className="faq__a">{f.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── CTA ── */
function CTA() {
  const [ref, visible] = useReveal();
  return (
    <section className="cta-section" ref={ref}>
      <div className={`cta-section__inner ${visible?"reveal":""}`}>
        <div className="cta-section__glow" aria-hidden />
        <h2>Ready to ship smarter?</h2>
        <p>Join thousands of teams already using Nexora to move faster and build better.</p>
        <div className="hero__actions">
          <a href="#" className="btn-primary btn-lg">Get started free →</a>
          <a href="#" className="btn-outline">Talk to sales</a>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <div className="nav__logo"><span className="logo-dot"/><span>Nexora</span></div>
          <p>The platform built for modern teams.</p>
        </div>
        {[
          { label:"Product", links:["Features","Pricing","Changelog","Roadmap"] },
          { label:"Company", links:["About","Blog","Careers","Press"] },
          { label:"Legal", links:["Privacy","Terms","Security","Cookies"] },
        ].map(col => (
          <div key={col.label} className="footer__col">
            <div className="footer__col-label">{col.label}</div>
            {col.links.map(l => <a key={l} href="#">{l}</a>)}
          </div>
        ))}
      </div>
      <div className="footer__bottom">
        <span>© 2026 Nexora, Inc. All rights reserved.</span>
        <span>Built with ♥ for teams everywhere</span>
      </div>
    </footer>
  );
}

/* ── APP ── */
export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Logos />
      <Features />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
