import { useState, useEffect } from "react";
import golfVideo from "./assets/videogolf.mp4";
import logoImg from "./assets/TheJacket.png";


// ─── DESIGN TOKENS — "fairway green jacket" ──────────────────
const C = {
  green: "#158445",
  greenHov: "#006B32",
  greenAccent: "#42AA60",
  dark: "#072212",
  darkMid: "#102F1D",
  black: "#101511",
  white: "#F7FBF8",
  greenWash: "#EAF8E9",
  cream: "#FAECDA",
  brass: "#D3A35D",
  brassHov: "#BE8E48",
  gray: "#525D54",
  grayLight: "#E4E1D8",
};

// ─── BOOKING LINKS ───────────────────────────────────────────
const LINKS = {
  bookBay: "https://yourgolfbooking.com/venues/the-jacket-indoor-golf-and-sports-bar/booking/bays",
  food: "https://order.spoton.com/so-the-green-jacket-indoor-golf-bar-21647/mansfield-tx/673cf383d1ca532904506cd6",
  memberStandard: "https://app.joinit.com/o/the-green-jacket-indoor-golf-sports-bar/ogReMyiagq4EfqGrq",
  memberCorporate: "https://app.joinit.com/o/the-green-jacket-indoor-golf-sports-bar/XG3Bf2uEuo8M49kj7",
  memberSocial: "https://app.joinit.com/o/the-green-jacket-indoor-golf-sports-bar/zr7trSNt2XdFc6476",
  lessons: "https://book.squareup.com/appointments/h9f4f6u81hfjgr/location/L44ADQKX5R2J8/services/Q23BD3HDHDHEK7G6IMSVERDK",
  clubFitting: "https://book.squareup.com/appointments/65915qkfdscltl/location/L44ADQKX5R2J8/services/NFV36VXUSHG6EOZFRGFWSJJO",
  directions: "https://maps.app.goo.gl/uycXTiqz3eNsDgwJ8",
  facebook: "https://www.facebook.com/profile.php?id=61588283642572",
  instagram: "https://www.instagram.com/thegreenjacketindoorgolf/",
  tiktok: "https://www.tiktok.com/@thegreenjacketindoorgolf",
};

// ─── LOGO ────────────────────────────────────────────────────
function Logo({ size = 52 }) {
  return (
    <img src={logoImg} alt="The Jacket" width={size} height={size} style={{ objectFit: "contain", transition: "all 0.3s" }} />
  );
}

// ─── PILL BUTTON ─────────────────────────────────────────────
function Btn({ children, variant = "green", href, onClick, full = false, size = "md", style: extra = {} }) {
  const sizes = {
    sm: { padding: "11px 22px", fontSize: 13 },
    md: { padding: "14px 26px", fontSize: 14 },
    lg: { padding: "16px 32px", fontSize: 15 }
  };
  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    borderRadius: 999, fontFamily: "'Public Sans', sans-serif", fontWeight: 600, letterSpacing: 0.4,
    cursor: "pointer", transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)", width: full ? "100%" : "auto", textAlign: "center",
    boxShadow: variant === "green" ? "0 4px 14px rgba(21,132,69,0.3)" : variant === "brass" ? "0 4px 14px rgba(211,163,93,0.35)" : "none",
    ...sizes[size],
  };
  const variants = {
    green: { background: C.green, color: C.white, border: `2px solid ${C.green}` },
    outline: { background: "transparent", color: C.white, border: "2px solid rgba(255,255,255,0.8)" },
    outlineD: { background: "transparent", color: C.black, border: `2px solid ${C.black}` },
    dark: { background: C.dark, color: C.white, border: `2px solid ${C.dark}` },
    white: { background: C.white, color: C.black, border: `2px solid ${C.white}` },
    brass: { background: C.brass, color: C.black, border: `2px solid ${C.brass}` },
  };
  const s = { ...base, ...variants[variant], ...extra };
  const hoverClass = `btn-hover-${variant}`;

  if (href) return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={s} className={hoverClass}>{children}</a>
  );
  return (
    <button onClick={onClick} style={s} className={hoverClass}>{children}</button>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────
const MENU_GROUPS = [
  { title: "Play", items: [
    { id: "home", label: "Book A Bay" },
    { id: "ways-to-play", label: "Ways To Play" },
    { id: "leagues", label: "Leagues" },
  ]},
  { title: "Learn & Improve", items: [
    { id: "lessons", label: "Lessons & Coaching" },
    { id: "club-fittings", label: "Club Fittings" },
    { id: "technology", label: "Our Technology" },
  ]},
  { title: "Events & Groups", items: [
    { id: "events", label: "Events & Parties" },
    { id: "private-parties", label: "Private Parties" },
    { id: "corporate-events", label: "Corporate Events" },
  ]},
  { title: "Visit & Join", items: [
    { id: "memberships", label: "Memberships" },
    { id: "contact", label: "Contact & Hours" },
  ]},
];

function Navbar({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navItems = [
    { id: "home", label: "Book A Bay" },
    { id: "memberships", label: "Memberships" },
    { id: "lessons", label: "Lessons" },
    { id: "contact", label: "Food + Drinks" }
  ];

  return (
    <>
      {/* Top Banner Utility Row */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: "var(--z-banner)", background: C.dark,
        height: 32, padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center",
        transition: "transform 0.3s ease", transform: scrolled ? "translateY(-100%)" : "translateY(0)",
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}>
        <a href={LINKS.directions} target="_blank" rel="noopener noreferrer"
          style={{ fontSize: 12, fontFamily: "'Public Sans', sans-serif", color: "rgba(247,251,248,0.6)", fontWeight: 400, letterSpacing: 0.4 }}>
          2000 Matlock Rd, Mansfield, TX
        </a>
        <a href="tel:6824008055" style={{ fontSize: 12, fontFamily: "'Public Sans', sans-serif", color: C.brass, fontWeight: 600, letterSpacing: 0.4 }}>
          (682) 400-8055
        </a>
      </div>

      {/* Main Bar Navigation Container */}
      <nav style={{
        position: "fixed", top: scrolled ? 0 : 32, left: 0, right: 0, zIndex: "var(--z-nav)",
        background: scrolled ? "rgba(7,34,18,0.94)" : "rgba(7,34,18,0.85)",
        backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0.04)",
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 76,
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16
        }}>

          {/* Brand Identity Branding Frame */}
          <div onClick={() => { setPage("home"); setMenuOpen(false); window.scrollTo(0, 0); }}
            style={{ display: "flex", alignItems: "center", cursor: "pointer", flexShrink: 0 }}>
            <Logo size={64} />
          </div>

          {/* Inline Navigation Menu (Desktop Mode) */}
          <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="tj-desk-nav">
            {navItems.map(item => (
              <span key={item.id} onClick={() => { setPage(item.id); window.scrollTo(0, 0); }}
                className="nav-link"
                style={{ fontSize: 14, fontFamily: "'Public Sans', sans-serif", fontWeight: 500, letterSpacing: 0.3, color: page === item.id ? C.brass : "rgba(247,251,248,0.85)", cursor: "pointer", transition: "color 0.2s" }}
              >
                {item.label}
              </span>
            ))}
          </div>

          {/* Contextual Layout Actions */}
          <div className="tj-desk-nav" style={{ flexShrink: 0 }}>
            <Btn href={LINKS.bookBay} size="sm">Book A Bay</Btn>
          </div>

          {/* Action Trigger Node (Mobile Toggle Mode) */}
          <div className="tj-mob-btn" onClick={() => setMenuOpen(!menuOpen)}
            style={{
              width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.06)",
              display: "none", flexDirection: "column", alignItems: "center", center: "center", gap: 5, cursor: "pointer"
            }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: 20, height: 2, background: C.white, borderRadius: 1, transition: "transform 0.3s, opacity 0.3s",
                transform: menuOpen && i === 0 ? "rotate(45deg) translate(5px, 5px)" : menuOpen && i === 2 ? "rotate(-45deg) translate(5px, -5px)" : "none",
                opacity: menuOpen && i === 1 ? 0 : 1
              }} />
            ))}
          </div>
        </div>

        {/* Mobile Menu — grouped by what guests come in to do */}
        {menuOpen && (
          <div style={{
            background: "#04170C", borderTop: "1px solid rgba(255,255,255,0.08)",
            padding: "8px 20px 24px", display: "flex", flexDirection: "column",
            maxHeight: "calc(100vh - 76px)", overflowY: "auto"
          }}>
            {MENU_GROUPS.map(group => (
              <div key={group.title} style={{ paddingTop: 22 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "rgba(247,251,248,0.4)", marginBottom: 6, padding: "0 12px" }}>{group.title}</p>
                {group.items.map(item => (
                  <div key={item.id} onClick={() => { setPage(item.id); setMenuOpen(false); window.scrollTo(0, 0); }}
                    style={{
                      padding: "12px", fontSize: 17, fontFamily: "'Bitter', serif", fontWeight: 700, borderRadius: 12,
                      background: page === item.id ? "rgba(211,163,93,0.14)" : "transparent",
                      color: page === item.id ? C.brass : "rgba(247,251,248,0.92)", cursor: "pointer"
                    }}
                  >{item.label}</div>
                ))}
              </div>
            ))}
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <Btn href={LINKS.bookBay} size="lg" full>Book A Bay Now</Btn>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────
function Footer({ setPage }) {
  const large = [{ id: "home", label: "Book A Bay", href: LINKS.bookBay }, { id: "memberships", label: "Memberships" }, { id: "lessons", label: "Lessons" }, { id: "contact", label: "Food & Drinks", href: LINKS.food }];
  const small = [
    [{ id: "ways-to-play", label: "Ways To Play" }, { id: "club-fittings", label: "Club Fittings" }, { id: "private-parties", label: "Private Parties" }, { id: "corporate-events", label: "Corporate Events" }],
    [{ id: "events", label: "Events" }, { id: "leagues", label: "Leagues" }, { id: "technology", label: "Our Technology" }, { id: "contact", label: "Contact Us" }],
  ];

  return (
    <>
      {/* Messaging Signup & Social Identity Segment */}
      <div style={{ background: C.cream, padding: "64px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{
            display: "flex", gap: 12, background: C.white, padding: "16px", borderRadius: 16,
            boxShadow: "0 4px 20px rgba(0,0,0,0.03)", alignItems: "flex-start", textAlign: "left", marginBottom: 40
          }}>
            <input type="checkbox" id="sms" style={{ accentColor: C.green, width: 18, height: 18, marginTop: 2, flexShrink: 0 }} />
            <label htmlFor="sms" style={{ fontSize: 13, color: C.gray, lineHeight: 1.6 }}>
              Get texts about flash deals, league updates, and upcoming events at The Jacket. Reply STOP anytime to opt out.
            </label>
          </div>

          <div>
            <p style={{ fontFamily: "'Bitter', serif", fontSize: 18, fontWeight: 700, marginBottom: 20, letterSpacing: 0.3 }}>Follow Us</p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
              {[
                { href: LINKS.facebook, icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg> },
                { href: LINKS.instagram, icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg> },
                { href: LINKS.tiktok, icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.61a8.18 8.18 0 0 0 4.78 1.52V6.68a4.85 4.85 0 0 1-1.01.01z" /></svg> }
              ].map((soc, idx) => (
                <a key={idx} href={soc.href} target="_blank" rel="noopener noreferrer"
                  style={{
                    width: 48, height: 48, borderRadius: "50%", background: C.white, display: "flex",
                    alignItems: "center", justifyContent: "center", color: C.dark, border: `1.5px solid ${C.brass}`, transition: "all 0.2s"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.08)"; e.currentTarget.style.background = C.brass; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.background = C.white; }}
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Structural Nav Floor */}
      <footer style={{ background: C.white, borderTop: `1px solid ${C.grayLight}`, padding: "64px 24px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          <div className="responsive-grid responsive-grid-3" style={{ gap: 40, marginBottom: 64 }}>
            {/* Primary Global Navigation Map */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {large.map(item => (
                <div key={item.label} style={{ fontFamily: "'Bitter', serif", fontSize: 20, fontWeight: 800 }}>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ color: C.black }} onMouseEnter={e => e.currentTarget.style.color = C.green} onMouseLeave={e => e.currentTarget.style.color = C.black}>{item.label}</a>
                  ) : (
                    <span onClick={() => { setPage(item.id); window.scrollTo(0, 0); }} style={{ color: C.black, cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.color = C.green} onMouseLeave={e => e.currentTarget.style.color = C.black}>{item.label}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Supplementary Links Col 1 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: C.gray, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Play</p>
              {small[0].map(item => (
                <span key={item.label} onClick={() => { setPage(item.id); window.scrollTo(0, 0); }} style={{ fontSize: 14, fontWeight: 500, color: C.black, cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.color = C.green} onMouseLeave={e => e.currentTarget.style.color = C.black}>{item.label}</span>
              ))}
            </div>

            {/* Supplementary Links Col 2 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: C.gray, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Events & Community</p>
              {small[1].map(item => (
                <span key={item.label} onClick={() => { setPage(item.id); window.scrollTo(0, 0); }} style={{ fontSize: 14, fontWeight: 500, color: C.black, cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.color = C.green} onMouseLeave={e => e.currentTarget.style.color = C.black}>{item.label}</span>
              ))}
            </div>
          </div>

          {/* Legal Meta Frame */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24,
            borderTop: `1px solid ${C.grayLight}`, paddingTop: 32
          }}>
            <Logo size={46} />
            <div style={{ textAlign: "right", minWidth: 240 }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: C.black }}>2000 Matlock Rd, Ste 100, Mansfield, TX 76063</p>
              <p style={{ fontSize: 12, color: C.gray, marginTop: 4 }}>© 2026 The Jacket LLC. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

// ─── HERO (rotating text) ────────────────────────────────────
const ROTATING_WORDS = ["birthday parties", "date nights", "corporate events", "league play", "family fun"];

function Hero({ setPage }) {
  const [idx, setIdx] = useState(0);
  const [animState, setAnimState] = useState("stable");

  useEffect(() => {
    const id = setInterval(() => {
      setAnimState("out");
      setTimeout(() => { setIdx(i => (i + 1) % ROTATING_WORDS.length); setAnimState("in"); }, 320);
      setTimeout(() => setAnimState("stable"), 700);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  const cls = animState === "out" ? "rotating-out" : animState === "in" ? "rotating-in" : "";

  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
      position: "relative", overflow: "hidden",
      padding: "120px 24px 80px",
    }}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0
        }}
      >
        <source src={golfVideo} type="video/mp4" />
      </video>

      {/* Dark overlay to ensure text legibility */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "linear-gradient(to bottom, rgba(7,34,18,0.55) 0%, rgba(7,34,18,0.8) 100%)" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", width: "100%" }}>
        <p className="fade-up" style={{ fontSize: 13, color: C.brass, marginBottom: 16, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase" }}>
          Premium Indoor Simulation Lounge
        </p>
        <h1 className="fade-up-1" style={{
          fontFamily: "'Bitter', serif", fontWeight: 800, fontSize: "clamp(38px, 6.5vw, 76px)",
          color: C.white, lineHeight: 1.1, maxWidth: 850, marginBottom: 24,
        }}>
          Indoor golf<br />reimagined for<br />
          <span className={cls} style={{ color: C.greenAccent, display: "inline-block", position: "relative" }}>{ROTATING_WORDS[idx]}</span>
        </h1>
        <p className="fade-up-2" style={{ fontSize: "clamp(15px, 2vw, 17px)", color: "rgba(247,251,248,0.78)", maxWidth: 560, lineHeight: 1.7, marginBottom: 40 }}>
          Step up to a Trackman iO bay and play world-famous courses with pinpoint accuracy, then settle in for great food, drinks, and good company.
        </p>
        <div className="fade-up-3" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Btn href={LINKS.bookBay} size="lg">Book A Bay</Btn>
          <Btn variant="outline" size="lg" onClick={() => { setPage("memberships"); window.scrollTo(0, 0); }}>Become A Member</Btn>
        </div>
      </div>
    </section>
  );
}

// ─── ENJOY GOLF SECTION ──────────────────────────────────────
function EnjoyGolf({ setPage }) {
  return (
    <section style={{ background: C.white, padding: "96px 24px" }}>
      <div className="responsive-grid responsive-grid-half" style={{ maxWidth: 1280, margin: "0 auto", gap: 64, alignItems: "center" }}>
        <div className="fade-up">
          <h2 style={{ fontFamily: "'Bitter', serif", fontWeight: 800, fontSize: "clamp(32px, 5vw, 54px)", lineHeight: 1.15, marginBottom: 24 }}>
            Enjoy golf <span style={{ color: C.green }}>on your own schedule.</span>
          </h2>
          <p style={{ fontSize: 16, color: C.gray, lineHeight: 1.75, marginBottom: 16 }}>
            The Jacket pairs Trackman-accurate simulators with a relaxed bar and lounge, so you get serious golf and a great hang in one place.
          </p>
          <p style={{ fontSize: 16, color: C.gray, lineHeight: 1.75, marginBottom: 36 }}>
            Squeeze in 9 holes on your lunch break, gather the crew for a group outing, or bring the whole family in for a weekend hangout. However you want to play, we've got the space and the comfort to match.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Btn href={LINKS.bookBay} size="lg">Book A Bay</Btn>
            <Btn variant="outlineD" size="lg" onClick={() => { setPage("memberships"); window.scrollTo(0, 0); }}>Explore Memberships</Btn>
          </div>
        </div>

        <div className="fade-up-2" style={{ position: "relative" }}>
          <div style={{
            borderRadius: 28, overflow: "hidden", aspectRatio: "4 / 5", maxHeight: 520,
            boxShadow: "0 24px 60px rgba(7,34,18,0.16)"
          }}>
            <img
              src="https://images.unsplash.com/photo-1762951160993-de1082c7721e?auto=format&fit=crop&w=1200&q=80"
              alt="A guest practicing chip shots on an indoor putting green at The Jacket"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
          <div style={{
            position: "absolute", left: -20, bottom: 32, background: C.cream, borderRadius: 16,
            padding: "16px 24px", boxShadow: "0 12px 28px rgba(7,34,18,0.18)", border: `1px solid ${C.brass}`,
            maxWidth: 240
          }}>
            <p style={{ fontFamily: "'Bitter', serif", fontWeight: 800, fontSize: 15, color: C.black, marginBottom: 2 }}>Trackman iO Powered</p>
            <p style={{ fontSize: 13, color: C.gray, lineHeight: 1.5 }}>Tour-grade ball and club data on every shot.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── IMAGE CARDS ─────────────────────────────────────────────
function ImageCards({ setPage }) {
  const cards = [
    {
      title: "Book A Simulator Bay",
      desc: "Step up to a Trackman iO bay and play world-famous courses, dial in your swing, or jump into one of our arcade-style mini games.",
      cta: "Book A Bay", href: LINKS.bookBay,
      img: "https://images.unsplash.com/photo-1762952078331-a680492cffe3?auto=format&fit=crop&w=1200&q=80",
      alt: "An indoor golf bay with a wide screen showing a course and a putting mat"
    },
    {
      title: "Join A League",
      desc: "Sharpen your game season after season, climb the leaderboard, and meet other golfers from around the area.",
      cta: "See League Options", page: "leagues",
      img: "https://plus.unsplash.com/premium_photo-1661353216079-d2d45be6ece4?auto=format&fit=crop&w=1200&q=80",
      alt: "A group of friends laughing together after a round of golf"
    },
    {
      title: "Book Professional Lessons",
      desc: "Work one-on-one with a certified coach using real-time Trackman data to fix what's holding your swing back.",
      cta: "Book A Lesson", href: LINKS.lessons,
      img: "https://images.unsplash.com/photo-1683418097311-9f0930001470?auto=format&fit=crop&w=1200&q=80",
      alt: "A golfer mid-swing, working on form"
    },
  ];

  return (
    <section style={{ background: C.cream, padding: "40px 24px 96px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }} className="responsive-grid responsive-grid-3">
        {cards.map((c, i) => (
          <div key={i} style={{
            position: "relative", borderRadius: 24, overflow: "hidden", minHeight: 380,
            display: "flex", flexDirection: "column", justifyContent: "flex-end",
            boxShadow: "0 10px 30px rgba(7,34,18,0.12)", transition: "transform 0.3s var(--ease-out-expo)"
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-6px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <img src={c.img} alt={c.alt} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(7,34,18,0.94) 0%, rgba(7,34,18,0.5) 55%, rgba(7,34,18,0.05) 100%)" }} />
            <div style={{ position: "relative", padding: "32px" }}>
              <h3 style={{ fontFamily: "'Bitter', serif", fontWeight: 800, fontSize: 24, color: C.white, marginBottom: 12, lineHeight: 1.25 }}>{c.title}</h3>
              <p style={{ fontSize: 14, color: "rgba(247,251,248,0.8)", lineHeight: 1.65, marginBottom: 24 }}>{c.desc}</p>
              {c.href
                ? <Btn href={c.href} size="md" full>{c.cta}</Btn>
                : <Btn size="md" variant="white" full onClick={() => { setPage(c.page); window.scrollTo(0, 0); }}>{c.cta}</Btn>
              }
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── MEMBER SECTION ──────────────────────────────────────────
function MemberSection({ setPage }) {
  const perks = [
    { icon: "👨‍👩‍👧", title: "Family Memberships", desc: "Add your whole household to one membership and everyone gets the perks." },
    { icon: "⛳", title: "Daily Simulator Time", desc: "A set amount of bay time included every day, no extra fees." },
    { icon: "🍺", title: "Always-On Happy Hour", desc: "Members get happy hour drink prices any day we're open." },
  ];

  return (
    <section style={{ background: `linear-gradient(145deg, ${C.dark} 0%, ${C.darkMid} 100%)`, padding: "96px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="responsive-grid responsive-grid-half" style={{ gap: 56, alignItems: "center" }}>
          <div>
            <h2 style={{ fontFamily: "'Bitter', serif", fontWeight: 800, fontSize: "clamp(30px, 4.5vw, 48px)", color: C.white, marginBottom: 20, lineHeight: 1.15 }}>Become A Member</h2>
            <p style={{ fontSize: 16, color: "rgba(247,251,248,0.75)", lineHeight: 1.75, marginBottom: 36 }}>
              Members get priority booking windows, guest passes for friends and family, and a flat 20% off food and drinks every visit.
            </p>
            <Btn onClick={() => { setPage("memberships"); window.scrollTo(0, 0); }} size="lg">See Membership Plans</Btn>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{
              display: "flex", alignItems: "flex-start", gap: 18, background: C.cream,
              borderRadius: 20, padding: "28px", marginBottom: 12
            }}>
              <span style={{ fontSize: 32, lineHeight: 1 }}>🏷️</span>
              <div>
                <p style={{ fontFamily: "'Bitter', serif", fontWeight: 800, fontSize: 19, color: C.black, marginBottom: 6, lineHeight: 1.3 }}>20% off everything, every visit</p>
                <p style={{ fontSize: 14, color: C.gray, lineHeight: 1.6 }}>Lessons, bay time, private events, and merch — the discount applies automatically, no codes to remember.</p>
              </div>
            </div>

            {perks.map((f, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 18, padding: "16px 4px",
                borderTop: i === 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
                borderBottom: i < perks.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none"
              }}>
                <span style={{ fontSize: 22, lineHeight: 1, flexShrink: 0 }}>{f.icon}</span>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: C.white, fontFamily: "'Bitter', serif" }}>{f.title}</p>
                  <p style={{ fontSize: 13, color: "rgba(247,251,248,0.6)", lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── REVIEWS CAROUSEL ────────────────────────────────────────
const REVIEWS = [
  { name: "Robin Moore", ago: "1 year ago", text: "Service and food were excellent!! 20 of us coming back in 2 weeks! Let go!! Thanks so much Germany, Ashton (server/hostess) and Tanner! Oh let's not forget the food and drinks, they were outstanding!!" },
  { name: "Deidre Gwin", ago: "1 year ago", text: "Excellent service, great food, we will be back! Thank you! 🎉🎉🎉🎉🎉 Shout out to Tanner, Ashton our amazing hostess and server, Germany, Anthony and the whole staff." },
  { name: "DeAndrea Adanandus", ago: "1 year ago", text: "I recently hosted a surprise birthday party for my Husband at The Green Jacket, and it was nothing short of phenomenal! From start to finish, the experience was incredible." },
  { name: "Marcus Thompson", ago: "8 months ago", text: "Best indoor golf experience in the DFW area. The Trackman simulators are incredibly accurate and the staff is super friendly. Will definitely be back!" },
  { name: "Sarah Williams", ago: "6 months ago", text: "We came for a corporate event and everyone had a blast. The food was great, the bays are spacious, and the technology is top notch. Highly recommend!" },
];

function Reviews() {
  const [start, setStart] = useState(0);

  const prev = () => setStart(s => Math.max(0, s - 1));
  const next = () => setStart(s => Math.min(REVIEWS.length - 1, s + 1));

  return (
    <section style={{ background: C.greenWash, padding: "96px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Bitter', serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 42px)", textAlign: "center", marginBottom: 48 }}>What Guests Are Saying</h2>

        <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center" }}>
          <button onClick={prev} disabled={start === 0}
            style={{
              width: 44, height: 44, borderRadius: "50%", border: `1px solid ${C.grayLight}`, background: C.white,
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 20,
              opacity: start === 0 ? 0.3 : 1, boxShadow: "0 2px 8px rgba(7,34,18,0.05)", flexShrink: 0
            }}>‹</button>

          <div style={{ overflow: "hidden", flex: 1, maxWidth: 640 }}>
            <div style={{ display: "flex", transform: `translateX(-${start * 100}%)`, transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}>
              {REVIEWS.map((r, i) => (
                <div key={i} style={{ width: "100%", flexShrink: 0, padding: "8px" }}>
                  <div style={{
                    background: C.white, borderRadius: 24, padding: "36px 24px",
                    boxShadow: "0 10px 30px rgba(7,34,18,0.06)", border: `1px solid ${C.grayLight}`, textAlign: "center"
                  }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: "50%", background: C.dark, margin: "0 auto 16px",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, color: C.white, fontFamily: "'Bitter', serif"
                    }}>
                      {r.name.charAt(0)}
                    </div>
                    <p style={{ fontWeight: 700, fontSize: 16 }}>{r.name}</p>
                    <p style={{ fontSize: 12, color: C.gray, marginBottom: 12 }}>{r.ago}</p>
                    <div style={{ display: "flex", gap: 2, justifyContent: "center", marginBottom: 16 }}>
                      {"★★★★★".split("").map((s, j) => <span key={j} style={{ color: "#FBBC04", fontSize: 16 }}>{s}</span>)}
                    </div>
                    <p style={{ fontSize: 14, color: C.black, lineHeight: 1.6, fontStyle: "italic" }}>"{r.text}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={next} disabled={start === REVIEWS.length - 1}
            style={{
              width: 44, height: 44, borderRadius: "50%", border: `1px solid ${C.grayLight}`, background: C.white,
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 20,
              opacity: start === REVIEWS.length - 1 ? 0.3 : 1, boxShadow: "0 2px 8px rgba(7,34,18,0.05)", flexShrink: 0
            }}>›</button>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────
const FAQS = [
  { q: "How Long Does It Take to Play 18 Holes?", a: "A round of golf usually takes an hour for an average player. It's recommended to add an additional hour for every player in your group when reserving a bay." },
  { q: "Do I need to bring my own clubs?", a: "Most customers bring their own clubs. But if you don't have any or forget yours, rental sets are available for $10. Free club rentals for Players Club and Corporate members." },
  { q: "What kind of clubs are the rental sets?", a: "Rental sets include the latest Srixon Irons, fairway woods, and driver, as well as Cleveland wedges and putter." },
  { q: "Is there a dress code?", a: "Feel relaxed and comfortable. Dress however you'd like and enjoy the laid-back atmosphere. No golf shoes required; spikeless or rubber spikes only if you do wear them." },
  { q: "How accurate is Trackman?", a: "Trackman iO combines radar, infrared and high-speed imaging to deliver real data — including measured 3D spin and spin axis — in real time, accurate within 1½ feet up to 300 yards." },
  { q: "How many players can play per bay?", a: "Groups should limit themselves to four players per bay for the best experience." },
  { q: "Do I need to have a membership?", a: "No membership is needed to rent bays! Rental rates start at $70 per hour and can be split with friends." },
  { q: "Will you offer food & drinks?", a: "Enjoy a diverse dining experience at The Back 9 Bar and Grill with both classic bar food and a full restaurant menu. The bar offers local craft beers, wine and craft cocktails." },
];

function FAQBlock({ faqs = FAQS }) {
  const [open, setOpen] = useState(null);
  return (
    <section style={{ background: C.white, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }} className="responsive-grid responsive-grid-half">
        <div>
          <h2 style={{ fontFamily: "'Bitter', serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 42px)", lineHeight: 1.2 }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: C.gray, marginTop: 12, fontSize: 15, lineHeight: 1.7 }}>
            Can't find what you're looking for? Give us a call at{" "}
            <a href="tel:6824008055" style={{ color: C.green, fontWeight: 700 }}>(682) 400-8055</a> and we'll help out.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {faqs.map((f, i) => (
            <div key={i} style={{ borderBottom: `1px solid ${C.grayLight}`, paddingBottom: 4 }}>
              <div onClick={() => setOpen(open === i ? null : i)}
                style={{ padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                <span style={{ fontFamily: "'Public Sans', sans-serif", fontWeight: 600, fontSize: 15, paddingRight: 16, color: C.black }}>{f.q}</span>
                <span style={{ fontSize: 20, color: open === i ? C.greenHov : C.green, transition: "transform 0.2s, color 0.2s", transform: open === i ? "rotate(45deg)" : "none" }}>+</span>
              </div>
              <div style={{ maxHeight: open === i ? "300px" : "0px", overflow: "hidden", transition: "max-height 0.3s ease-out" }}>
                <p style={{ paddingBottom: 20, fontSize: 14, color: C.gray, lineHeight: 1.65 }}>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── REUSABLE PAGE HERO ──────────────────────────────────────
function PageHero({ title, titleGreen, subtitle, cta1, cta2 }) {
  return (
    <section style={{
      background: `linear-gradient(135deg, ${C.dark} 0%, ${C.darkMid} 100%)`,
      padding: "160px 24px 80px", position: "relative", overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", inset: 0, opacity: 0.06,
        backgroundImage: "radial-gradient(rgba(211,163,93,0.6) 1px, transparent 1px)", backgroundSize: "24px 24px"
      }} />
      <div style={{ maxWidth: 840, margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
        <h1 style={{ fontFamily: "'Bitter', serif", fontWeight: 800, fontSize: "clamp(32px, 5.5vw, 60px)", color: C.white, lineHeight: 1.15, marginBottom: 20 }}>
          {title}{titleGreen && <> <span style={{ color: C.greenAccent }}>{titleGreen}</span></>}
        </h1>
        {subtitle && <p style={{ fontSize: 16, color: "rgba(247,251,248,0.75)", maxWidth: 600, margin: "0 auto 36px", lineHeight: 1.7 }}>{subtitle}</p>}
        {(cta1 || cta2) && (
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>{cta1}{cta2}</div>
        )}
      </div>
    </section>
  );
}

// ─── REUSABLE SECTION ────────────────────────────────────────
function Sec({ children, bg = C.white, pad = "80px 24px" }) {
  return <section style={{ background: bg, padding: pad }}><div style={{ maxWidth: 1280, margin: "0 auto" }}>{children}</div></section>;
}

function SecTitle({ title, green, sub, center = true }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: 48, padding: "0 8px" }}>
      <h2 style={{ fontFamily: "'Bitter', serif", fontWeight: 800, fontSize: "clamp(26px, 3.5vw, 42px)", lineHeight: 1.2 }}>
        {title}{green && <> <span style={{ color: C.green }}>{green}</span></>}
      </h2>
      {sub && <p style={{ fontSize: 15, color: C.gray, maxWidth: 600, margin: center ? "16px auto 0" : "12px 0 0", lineHeight: 1.65 }}>{sub}</p>}
    </div>
  );
}

function Card({ title, desc }) {
  return (
    <div style={{
      background: C.white, borderRadius: 20, padding: "32px 24px", border: `1px solid ${C.grayLight}`,
      boxShadow: "0 4px 20px rgba(0,0,0,0.02)", transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = C.green; e.currentTarget.style.boxShadow = "0 12px 30px rgba(21,132,69,0.1)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = C.grayLight; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.02)"; }}
    >
      <h4 style={{ fontFamily: "'Bitter', serif", fontWeight: 700, fontSize: 18, marginBottom: 10, color: C.black }}>{title}</h4>
      <p style={{ fontSize: 14, color: C.gray, lineHeight: 1.6 }}>{desc}</p>
    </div>
  );
}

// ─── PAGE: HOME ──────────────────────────────────────────────
function HomePage({ setPage }) {
  return (
    <>
      <Hero setPage={setPage} />
      <EnjoyGolf setPage={setPage} />
      <ImageCards setPage={setPage} />
      <MemberSection setPage={setPage} />
      <Reviews />
      <FAQBlock />
    </>
  );
}

// ─── PAGE: MEMBERSHIPS ───────────────────────────────────────
function MembershipsPage() {
  const tiers = [
    {
      name: "Social", price: "$99/mo", link: LINKS.memberSocial, highlight: false,
      perks: ["Happy hour pricing every day (Mon–Sun)", "20% off bay rentals (Mon–Fri)", "1 free swing evaluation with a coach", "20% off merchandise"]
    },
    {
      name: "Standard", price: "$200/mo", link: LINKS.memberStandard, highlight: true,
      perks: ["90 minutes of simulator time daily (Mon–Fri)", "Happy hour pricing every day (Mon–Sun)", "20% off bay bookings, every day", "Free club rentals", "1 free swing evaluation with a coach", "20% off merchandise"]
    },
    {
      name: "Corporate", price: "$500/mo", link: LINKS.memberCorporate, highlight: false,
      perks: ["Happy hour pricing every day (Mon–Sun)", "25 hours of bay time per month, use anytime", "2 hosted private events per year", "1 free swing evaluation with a coach", "20% off everything: bays, lessons, and merch", "Your business featured on our screens & social media"]
    },
  ];

  return (
    <>
      <PageHero label="Membership" title="Membership That" titleGreen="Pays For Itself" subtitle="Daily simulator time, 20% off across the board, and perks built for however often you play."
        cta1={<Btn href={LINKS.memberStandard} size="lg">Join Standard</Btn>}
        cta2={<Btn variant="outline" size="lg" href={LINKS.memberSocial}>View Social Plan</Btn>}
      />
      <Sec>
        <SecTitle label="Member Perks" title="Why Members Love" green="The Jacket" />
        <div className="responsive-grid responsive-grid-2 responsive-grid-3" style={{ marginBottom: 80 }}>
          {[{ icon: "⛳", t: "90 Minutes Daily", d: "Use your included simulator time any weekday between 10 AM and 6 PM." }, { icon: "🎟️", t: "Bring A Guest", d: "Invite friends, family, or coworkers to play alongside you." }, { icon: "🍸", t: "Happy Hour, Always", d: "Happy hour food and drink prices apply every time you visit." }, { icon: "🏷️", t: "20% Off Across The Board", d: "Save on lessons, private events, club fittings, and more." }, { icon: "🏌️", t: "Free Club Rentals", d: "Play with our latest Srixon and Cleveland rental sets at no extra cost." }, { icon: "📊", t: "Free Swing Evaluation", d: "Get a Trackman swing analysis from one of our coaches." }].map((f, i) => <Card key={i} icon={f.icon} title={f.t} desc={f.d} />)}
        </div>

        <SecTitle label="Pricing" title="Find Your Plan" />
        <div className="responsive-grid responsive-grid-3" style={{ alignItems: "start", gap: 32 }}>
          {tiers.map((t, i) => (
            <div key={i} style={{
              borderRadius: 24, padding: "44px 32px", position: "relative",
              background: t.highlight ? C.dark : C.white,
              border: t.highlight ? `2px solid ${C.green}` : `1px solid ${C.grayLight}`,
              boxShadow: t.highlight ? "0 20px 40px rgba(13,46,32,0.15)" : "0 4px 20px rgba(0,0,0,0.02)"
            }}>
              {t.highlight && <div style={{
                position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                background: C.green, color: C.white, padding: "6px 20px", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase"
              }}>Most Popular</div>}
              <h3 style={{ fontFamily: "'Bitter', serif", fontWeight: 800, fontSize: 24, color: t.highlight ? C.white : C.black, marginBottom: 8 }}>{t.name}</h3>
              <p style={{ fontSize: 36, fontFamily: "'Bitter', serif", fontWeight: 800, color: C.green, marginBottom: 28 }}>{t.price}</p>
              <div style={{ marginBottom: 40, display: "flex", flexDirection: "column", gap: 14 }}>
                {t.perks.map((p, pi) => (
                  <div key={pi} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ color: C.green, fontSize: 15, fontWeight: "bold" }}>✓</span>
                    <span style={{ fontSize: 14, color: t.highlight ? "rgba(255,255,255,0.75)" : C.gray, lineHeight: 1.5 }}>{p}</span>
                  </div>
                ))}
              </div>
              <Btn href={t.link} full variant={t.highlight ? "green" : "dark"} size="md">Join Now</Btn>
            </div>
          ))}
        </div>
      </Sec>
    </>
  );
}

// ─── PAGE: LESSONS ───────────────────────────────────────────
function LessonsPage() {
  return (
    <>
      <PageHero label="Lessons & Coaching" title="Better Golf Starts" titleGreen="With The Right Coach"
        subtitle="Work one-on-one with a certified coach using real Trackman data to fix what's holding your swing back."
        cta1={<Btn href={LINKS.lessons} size="lg">Book A Lesson</Btn>}
        cta2={<Btn variant="outline" size="lg" href={LINKS.memberStandard}>View Membership Plans</Btn>}
      />
      <Sec>
        <SecTitle label="Lesson Packages" title="Find Your Program" sub="Whether you're just starting out or chasing single digits, regular coaching backed by real data makes the difference." />
        <div className="responsive-grid responsive-grid-3" style={{ marginBottom: 64 }}>
          {[
            { name: "Swing Evaluation", price: "$49.99", note: "Free for members", desc: "A full Trackman breakdown of your swing, with a coach walking you through what's working and what's not." },
            { name: "Private 1-on-1 Lesson", price: "$149.99", note: "60-minute session", desc: "Focused, one-on-one coaching built around your goals, your swing, and your game." },
            { name: "Junior Lessons", price: "$119.99", note: "Ages 6–17", desc: "Build solid fundamentals early with coaching designed for young golfers." },
          ].map((l, i) => (
            <div key={i} style={{
              background: C.white, borderRadius: 24, padding: "44px 32px", textAlign: "center",
              border: `1px solid ${C.grayLight}`, boxShadow: "0 4px 20px rgba(0,0,0,0.02)"
            }}
            >
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: C.green, marginBottom: 12 }}>{l.note}</p>
              <h3 style={{ fontFamily: "'Bitter', serif", fontWeight: 800, fontSize: 22, marginBottom: 8 }}>{l.name}</h3>
              <p style={{ fontSize: 34, fontFamily: "'Bitter', serif", fontWeight: 800, color: C.green, marginBottom: 20 }}>{l.price}</p>
              <p style={{ fontSize: 14, color: C.gray, lineHeight: 1.6, marginBottom: 32 }}>{l.desc}</p>
              <Btn href={LINKS.lessons} variant="dark" full>Book This Lesson</Btn>
            </div>
          ))}
        </div>
        <div className="responsive-grid responsive-grid-3">
          {[{ icon: "🎯", t: "Fix Your Downswing", d: "Spot and correct the small flaws in your downswing using slow-motion video and Trackman data." }, { icon: "🗺️", t: "Smarter Course Management", d: "Learn to read a course, manage risk, and make better decisions on every shot." }, { icon: "🧘", t: "Mental Game Coaching", d: "Build pre-shot routines and focus habits that hold up under pressure." }].map((f, i) => <Card key={i} icon={f.icon} title={f.t} desc={f.d} />)}
        </div>
      </Sec>
    </>
  );
}

// ─── PAGE: WAYS TO PLAY ──────────────────────────────────────
function WaysToPlayPage() {
  return (
    <>
      <PageHero label="Ways To Play" title="More Than Just" titleGreen="18 Holes"
        subtitle="Play 250+ courses with pinpoint Trackman accuracy, or switch it up with target games, long-drive challenges, and more."
        cta1={<Btn href={LINKS.bookBay} size="lg">Book A Bay</Btn>}
      />
      <Sec>
        <SecTitle label="Game Modes" title="Mix Up Your Round" />
        <div className="responsive-grid responsive-grid-2 responsive-grid-3" style={{ marginBottom: 64 }}>
          {[
            { icon: "🎯", t: "Target Tracker", d: "Test your accuracy by landing shots as close as possible to the target." },
            { icon: "🌃", t: "Neon Mini Golf", d: "Putt your way through glow-in-the-dark mini golf courses." },
            { icon: "💥", t: "Long Drive Challenge", d: "See how far you can really hit it, tracked down to the yard." },
            { icon: "📍", t: "Closest To The Pin", d: "Take on par-3 challenges with changing wind and weather conditions." },
            { icon: "🚩", t: "Flag Hunt", d: "A short-game challenge that mixes accuracy with friendly competition." },
            { icon: "🐉", t: "Magic Pond", d: "A playful target game that's perfect for kids and first-timers." },
          ].map((f, i) => <Card key={i} icon={f.icon} title={f.t} desc={f.d} />)}
        </div>

        <SecTitle label="Online Play" title="Play Bay-To-Bay, Or Around The World" sub="Connect with other bays in our lounge, or jump online to play golfers from anywhere." />
        <div style={{ textAlign: "center", marginBottom: 80 }}><Btn href={LINKS.bookBay} size="lg">Book A Bay</Btn></div>

        <SecTitle label="Tournament Formats" title="Classic Ways To Compete" />
        <div className="responsive-grid responsive-grid-2 responsive-grid-4">
          {[{ icon: "🏌️", t: "Stroke Play", d: "Every shot counts. Lowest total score wins." }, { icon: "🤝", t: "Alternate Shot", d: "Partners take turns hitting the same ball. Teamwork is everything." }, { icon: "👥", t: "Scramble", d: "Everyone tees off, the team picks the best shot, and plays from there." }, { icon: "⛳", t: "Pitch & Putt", d: "Focus on your short game with formats built around wedges and putters." }].map((f, i) => <Card key={i} icon={f.icon} title={f.t} desc={f.d} />)}
        </div>
      </Sec>
    </>
  );
}

// ─── PAGE: EVENTS ────────────────────────────────────────────
function EventsPage({ setPage }) {
  return (
    <>
      <PageHero label="Social Gathering Frameworks" title="Assembled Experiences Tailored" green="For Any Group Setup"
        subtitle="From highly structured corporate mixers to low-stress social operations, our spaces configure dynamically to meet group constraints."
        cta1={<Btn variant="outline" size="lg" href={LINKS.bookBay}>Review Live Openings</Btn>}
      />
      <Sec>
        <SecTitle label="Configurable Layout Schematics" title="Select Event Environment Type" />
        <div className="responsive-grid responsive-grid-3">
          {[
            { icon: "🎉", t: "Private Social Parties", d: "Unify responsive spatial entertainment with high-end hospitality features for memorable personal milestones.", page: "private-parties" },
            { icon: "💼", t: "Corporate Outing Modules", d: "Deploy streamlined team-building games alongside dedicated high-contrast workspace settings.", page: "corporate-events" },
            { icon: "🏆", t: "Custom Tournament Series", d: "Run complex individual or multi-team competitive formats supported by digital tracking structures.", page: "home" },
          ].map((c, i) => (
            <div key={i} style={{ background: C.dark, borderRadius: 24, padding: "44px 32px", cursor: "pointer", transition: "all 0.3s ease", border: "2px solid transparent" }}
              onClick={() => { setPage(c.page); window.scrollTo(0, 0); }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.green; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.transform = ""; }}
            >
              <h4 style={{ fontFamily: "'Bitter', serif", fontWeight: 800, fontSize: 22, color: C.white, marginBottom: 12 }}>{c.t}</h4>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.65 }}>{c.d}</p>
            </div>
          ))}
        </div>
      </Sec>
    </>
  );
}

// ─── PAGE: LEAGUES ───────────────────────────────────────────
function LeaguesPage() {
  return (
    <>
      <PageHero label="Tournament Infrastructure" title="Continuous Regional Leagues" green="Across Seasons"
        subtitle="Maintain sharp kinetic baselines year-round while embedding directly into local developer and enthusiast circles."
        cta1={<Btn href={LINKS.bookBay} size="lg">Register Profile</Btn>}
      />
      <Sec>
        <SecTitle label="Systemic Benefits" title="Why Play In Structured Leagues?" />
        <div className="responsive-grid responsive-grid-2 responsive-grid-3" style={{ marginBottom: 64 }}>
          {[{ icon: "🏆", t: "Adaptive Tracking Ladders", d: "Experience fair, dynamic grouping logic that balances brackets around verified handicap outputs." }, { icon: "📅", t: "Predictable Routing Schedules", d: "Plan around reliable match windows designed to respect business or corporate schedules easily." }, { icon: "📈", t: "Continuous Skill Benchmarking", d: "Evaluate execution metrics under competitive pressure states to accelerate technical breakthroughs." }, { icon: "🤝", t: "Network Integration", d: "Connect with regional professionals and community members who share high-level design and play values." }, { icon: "🎊", t: "Hosted Mixer Finales", d: "Celebrate tournament completions during customized social gatherings with catering and live metrics boards." }, { icon: "⏰", t: "Climate-Controlled Safety", d: "Eliminate weather anomalies completely from long-term tracking profiles inside safe indoor settings." }].map((f, i) => <Card key={i} icon={f.icon} title={f.t} desc={f.d} />)}
        </div>

        <div style={{ background: C.dark, borderRadius: 24, padding: "56px 32px", textAlign: "center" }}>
          <h3 style={{ fontFamily: "'Bitter', serif", fontWeight: 800, fontSize: 28, color: C.white, marginBottom: 16 }}>League Options</h3>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 40 }}>
            {["Men's Championship Division", "Women's Elite Bracket", "Jack & Jill Social Pairings", "Advanced Telemetry Skills League"].map(l => (
              <span key={l} style={{ padding: "10px 20px", borderRadius: 999, border: `1px solid rgba(44,198,76,0.3)`, fontSize: 13, color: "rgba(255,255,255,0.84)", fontWeight: 500, background: "rgba(255,255,255,0.02)" }}>{l}</span>
            ))}
          </div>
          <Btn href={LINKS.bookBay} size="lg">Initialize Roster Spot</Btn>
        </div>
      </Sec>
    </>
  );
}

// ─── PAGE: PRIVATE PARTIES ───────────────────────────────────
function PrivatePartiesPage() {
  return (
    <>
      <PageHero label="Exclusive Allocations" title="Premium Social Milestone" green="Celebration Modules"
        subtitle="Host high-end personal celebrations inside dedicated, sound-insulated simulation lounges designed for relaxation."
        cta1={<Btn href={LINKS.bookBay} size="lg">Lock Spatial Date</Btn>}
      />
      <Sec>
        <SecTitle label="VIP Frameworks" title="Elevate Standard Social Gatherings" />
        <div className="responsive-grid responsive-grid-3" style={{ marginBottom: 64 }}>
          {[{ icon: "☀️", t: "Absolute Weather Insulated", d: "Guarantee consistent, uncompromised group execution metrics across any extreme environmental shifts outside." }, { icon: "🎨", t: "Granular Room Control", d: "Configure unique aesthetic presets, media playback streams, and seating parameters tailored to your target circle." }, { icon: "🤝", t: "Relaxed Communication Layouts", d: "Fluid architecture zones allowing guests to converse comfortably without breaking engagement from active gameplay spaces." }].map((f, i) => <Card key={i} icon={f.icon} title={f.t} desc={f.d} />)}
        </div>

        <div style={{ background: C.dark, borderRadius: 24, padding: "56px 32px", textAlign: "center" }}>
          <h3 style={{ fontFamily: "'Bitter', serif", fontWeight: 800, fontSize: 28, color: C.white, marginBottom: 16 }}>Private Suite Specs</h3>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", maxWidth: 540, margin: "0 auto 36px", lineHeight: 1.7 }}>
            Each luxury suite comfortably handles up to 10 active profiles. Outfitted with high-speed computational backends and dedicated catering access configurations.
          </p>
          <Btn href={LINKS.bookBay} size="lg">Deploy Group Booking</Btn>
        </div>
      </Sec>
    </>
  );
}

// ─── PAGE: CORPORATE EVENTS ──────────────────────────────────
function CorporateEventsPage() {
  return (
    <>
      <PageHero label="Enterprise Functions" title="Drive Corporate Connection" green="With Dynamic Activity Models"
        subtitle="Align organizational communication goals with high-morale group recreational mechanics inside specialized executive zones."
        cta1={<Btn href={LINKS.bookBay} size="lg">Request Enterprise Proposal</Btn>}
        cta2={<Btn variant="outline" size="lg" href={LINKS.memberCorporate}>View Corporate Rates</Btn>}
      />
      <Sec>
        <SecTitle label="Strategic Alignments" title="Why Modern Corporate Teams Outsource to Us" />
        <div className="responsive-grid responsive-grid-3">
          {[{ icon: "🎨", t: "Dedicated Event Architects", d: "Collaborate straight with platform operational managers to sync timeline scripts and culinary configurations precisely." }, { icon: "👥", t: "High-Yield Team Synchronization", d: "Break down cross-department communication silos through accessible, gamified collaborative mechanics." }, { icon: "✨", t: "Impeccable Business Contexts", d: "A polished, professional environment balancing reliable technology spaces with high-end customer relaxation setups." }].map((f, i) => <Card key={i} icon={f.icon} title={f.t} desc={f.d} />)}
        </div>
      </Sec>
    </>
  );
}

// ─── PAGE: CLUB FITTINGS ─────────────────────────────────────
function ClubFittingsPage() {
  const fittings = [
    ["Master System Bag", "Complete woods, irons, wedges, putter configuration", "$375", "2.5 hrs"],
    ["Core Setup Matrix", "Complete bag metrics minus putting calibration tools", "$275", "2.5 hrs"],
    ["Launch Optimization", "Isolate driver and wood launch path variables", "$275", "2 hrs"],
    ["Iron & Wedge Gapping", "Map precise loft, bounce, and stepping arrays", "$225", "1 hr"],
    ["Pure Iron Tracking", "Stabilize dispersion profiles via custom shafts", "$175", "1 hr"],
    ["Driver Path Calibration", "Extract maximum potential ball speed off the tee face", "$175", "1 hr"],
    ["Fairway & Hybrid Integration", "Secure reliable attack angles and spin ratios", "$175", "1 hr"],
    ["Putter Alignment Diagnostics", "Verify true face orientation at critical impact states", "$150", "1 hr"],
    ["Short-Game Wedge Profiling", "Establish predictable bounce behavior across turf conditions", "$125", "1 hr"],
  ];

  return (
    <>
      <PageHero label="Equipment Mechanics" title="Optimize Hardware Geometry" green="To Your Kinetic Blueprint"
        subtitle="Eliminate gear variables entirely by engineering club properties directly around structural mechanics."
        cta1={<Btn href={LINKS.clubFitting} size="lg">Reserve Fitting Session</Btn>}
      />
      <Sec>
        <SecTitle label="Precision Pricing Matrix" title="Equipment Calibration Options" />
        <div className="responsive-grid responsive-grid-2" style={{ gap: 16, marginBottom: 56 }}>
          {fittings.map(([name, desc, price, time], i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "20px 24px", background: C.white, borderRadius: 16, border: `1px solid ${C.grayLight}`, gap: 16, transition: "all 0.2s"
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.green; e.currentTarget.style.background = "#F4FBF6"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.grayLight; e.currentTarget.style.background = C.white; }}
            >
              <div>
                <p style={{ fontFamily: "'Bitter', serif", fontWeight: 700, fontSize: 15, marginBottom: 4, color: C.black }}>{name}</p>
                <p style={{ fontSize: 13, color: C.gray }}>{desc} · <span style={{ fontWeight: 600 }}>{time}</span></p>
              </div>
              <span style={{ fontFamily: "'Bitter', serif", fontWeight: 800, fontSize: 20, color: C.green, flexShrink: 0 }}>{price}</span>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginBottom: 80 }}><Btn href={LINKS.clubFitting} size="lg">Book Master Fitting Session</Btn></div>
        <div className="responsive-grid responsive-grid-3">
          {[{ icon: "🎯", t: "Minimized Dispersion Patterns", d: "Proper shaft and face pairings guarantee consistent impact points even on off-center strikes." }, { icon: "📏", t: "Maximized Force Multiplication", d: "Align launch angles and spin axis logic to convert raw clubhead speed into clean distance down the fairway." }, { icon: "💪", t: "Ergonomic Swing Comfort", d: "Gear matched precisely to your natural physical leverage points helps prevent execution fatigue over time." }].map((f, i) => <Card key={i} icon={f.icon} title={f.t} desc={f.d} />)}
        </div>
      </Sec>
    </>
  );
}

// ─── PAGE: TECHNOLOGY ────────────────────────────────────────
function TechnologyPage() {
  return (
    <>
      <PageHero label="Telemetry Architectures" title="The High-Definition Tracking" green="Powerhouse: Trackman iO"
        subtitle="Engineered exclusively to capture lightning-fast indoor mechanics using dual-radar infrared optical systems."
        cta1={<Btn href={LINKS.bookBay} size="lg">Initialize Data Capture</Btn>}
      />
      <Sec>
        <SecTitle label="Advanced Telemetry Metrics" title="Uncompromised Real-Time Tracking Vectors" />
        <div className="responsive-grid responsive-grid-3" style={{ marginBottom: 64 }}>
          {[{ icon: "📐", t: "Instant Spatial Detection", d: "Industry-leading instant validation triggers register the ball location the moment it touches the strike zone." }, { icon: "🏌️", t: "Dynamic Clubhead Capture", d: "Tracks attack angle paths, accurate dynamic loft parameters, and face-to-path relationships down to micro-degrees." }, { icon: "🚀", t: "3D True Spin Measurement", d: "Calculates actual backspin, sidespin, and spin axis orientation without relying on speculative software approximations." }].map((f, i) => <Card key={i} icon={f.icon} title={f.t} desc={f.d} />)}
        </div>

        <div style={{ background: C.dark, borderRadius: 24, padding: "56px 32px", textAlign: "center" }}>
          <h3 style={{ fontFamily: "'Bitter', serif", fontWeight: 800, fontSize: 28, color: C.white, marginBottom: 16 }}>Data Integrity Standards</h3>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", maxWidth: 640, margin: "0 auto 36px", lineHeight: 1.7 }}>
            By blending raw radar echoes with high-frequency optical imaging arrays, Trackman iO maintains a margin of error within 1.5 feet over a 300-yard flight simulation window.
          </p>
          <Btn href={LINKS.bookBay} size="lg">Test Your Numbers Now</Btn>
        </div>
      </Sec>
    </>
  );
}

// ─── PAGE: CONTACT ───────────────────────────────────────────
function ContactPage() {
  return (
    <>
      <PageHero label="Support Channels" title="Connect Directly With" green="Operations Personnel"
        subtitle="Our staff handles spatial adjustments, group allocations, and custom corporate packages around the clock."
        cta1={<Btn href={LINKS.bookBay} size="lg">Secure Simulation Bay</Btn>}
        cta2={<Btn variant="outline" size="lg" href={LINKS.food}>View Lounge Menus</Btn>}
      />
      <Sec>
        <div className="responsive-grid responsive-grid-half" style={{ gap: 64 }}>
          <div>
            <h2 style={{ fontFamily: "'Bitter', serif", fontWeight: 800, fontSize: 32, marginBottom: 28 }}>Direct Communication Channels</h2>
            {[{ icon: "📞", label: "Operations Hot Line", val: "(682) 400-8055", href: "tel:6824008055" }, { icon: "📍", label: "Geographic Space Coordinates", val: "2000 Matlock Rd, Ste 100, Mansfield, TX 76063", href: LINKS.directions }].map((c, i) => (
              <a key={i} href={c.href} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "20px 0", borderBottom: `1px solid ${C.grayLight}` }}>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: C.green, marginBottom: 4 }}>{c.label}</p>
                  <p style={{ fontSize: 15, color: C.black, fontWeight: 600 }}>{c.val}</p>
                </div>
              </a>
            ))}
            <div style={{ marginTop: 40 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: C.green, marginBottom: 16 }}>Weekly Operating Matrices</p>
              {[["Monday – Thursday", "10:00 AM – 12:00 AM"], ["Friday – Saturday", "10:00 AM – 02:00 AM"], ["Sunday", "10:00 AM – 10:00 PM"]].map(([d, h]) => (
                <div key={d} style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: `1px solid ${C.grayLight}`, fontSize: 14 }}>
                  <span style={{ color: C.gray, fontWeight: 500 }}>{d}</span><span style={{ fontWeight: 600, color: C.black }}>{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 style={{ fontFamily: "'Bitter', serif", fontWeight: 800, fontSize: 32, marginBottom: 28 }}>Inquire Systematically</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {["User Profile Name", "Active Contact Email", "Phone Validation Number"].map(f => (
                <div key={f}>
                  <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: C.gray, display: "block", marginBottom: 8 }}>{f}</label>
                  <input type="text" placeholder={`Provide ${f.toLowerCase()}...`} style={{
                    width: "100%", padding: "14px 16px", borderRadius: 12, border: `2px solid ${C.grayLight}`,
                    fontFamily: "'Public Sans', sans-serif", fontSize: 14, outline: "none", transition: "border 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                  }}
                    onFocus={e => e.target.style.borderColor = C.green}
                    onBlur={e => e.target.style.borderColor = C.grayLight}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: C.gray, display: "block", marginBottom: 8 }}>Scope of Inquiry Message</label>
                <textarea rows={4} placeholder="Detail requirements, specific date requests, or structural tier customizations..." style={{
                  width: "100%", padding: "14px 16px", borderRadius: 12,
                  border: `2px solid ${C.grayLight}`, fontFamily: "'Public Sans', sans-serif", fontSize: 14, outline: "none", resize: "none", transition: "border 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
                  onFocus={e => e.target.style.borderColor = C.green}
                  onBlur={e => e.target.style.borderColor = C.grayLight}
                />
              </div>
              <Btn full size="lg" style={{ marginTop: 8 }}>Dispatch Message Routing</Btn>
            </div>
          </div>
        </div>
      </Sec>
    </>
  );
}

// ─── MAIN APP CONTAINER ──────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");

  const pages = {
    home: <HomePage setPage={setPage} />,
    memberships: <MembershipsPage />,
    lessons: <LessonsPage />,
    "ways-to-play": <WaysToPlayPage />,
    events: <EventsPage setPage={setPage} />,
    leagues: <LeaguesPage />,
    "private-parties": <PrivatePartiesPage />,
    "corporate-events": <CorporateEventsPage />,
    "club-fittings": <ClubFittingsPage />,
    technology: <TechnologyPage />,
    contact: <ContactPage />,
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar page={page} setPage={setPage} />
      <div style={{ flex: "1 0 auto" }}>
        {pages[page] || pages.home}
      </div>
      <Footer setPage={setPage} />
    </div>
  );
}