import { useState, useEffect, useRef } from "react";
import logoImg from "./assets/TheJacket.png";
import simulatorBaySwing from "./assets/simulator-bay-swing.jpg";
import simulatorBayLounge from "./assets/simulator-bay-lounge.jpg";
import lessonClubFitting from "./assets/lesson-club-fitting.jpg";
import golfBall from "./assets/golfball.jpg";
import leagueTeamPhoto from "./assets/league-team-photo.jpg";
import memberTechBay from "./assets/member-tech-bay.jpg";
import bartenderCocktail from "./assets/bartender-cocktail.jpg";
import membershipLounge from "./assets/membership-lounge.jpg";
import foodBurger from "./assets/food-burger.jpg";


// ─── DESIGN TOKENS — "fairway green jacket" ──────────────────
const C = {
  green: "var(--green)",
  greenHov: "var(--green-hover)",
  greenAccent: "var(--green-accent)",
  dark: "var(--brand-dark)",
  darkMid: "var(--brand-dark-mid)",
  black: "var(--text)",
  white: "var(--white)",
  surface: "var(--surface)",
  greenWash: "var(--surface-green)",
  cream: "var(--surface-warm)",
  brass: "var(--brass)",
  brassHov: "var(--brass-hover)",
  gray: "var(--text-muted)",
  grayLight: "var(--border)",
  ink: "#101511",
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
    <img src={logoImg} alt="The Jacket" height={size} style={{ width: "auto", objectFit: "contain", transition: "all 0.3s" }} />
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
    white: { background: C.white, color: C.ink, border: `2px solid ${C.white}` },
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

// ─── ICONS ───────────────────────────────────────────────────
function Icon({ name, size = 24, stroke = 1.75, color = "currentColor", style = {} }) {
  const p = { fill: "none", stroke: color, strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    flag:  <><path {...p} d="M5 21V4" /><path {...p} d="M5 4c3-2 6 2 9 0s4-2 4-2v8s-1 2-4 2-6-2-9 0" /></>,
    clock: <><circle {...p} cx="12" cy="12" r="9" /><path {...p} d="M12 7v5l3.5 2" /></>,
    glass: <><path {...p} d="M5 4h14l-6 7v7" /><path {...p} d="M9 18h8" /><path {...p} d="M8 8h8" /></>,
    tag:   <><path {...p} d="M3 12V4h8l9 9-8 8-9-9z" /><circle {...p} cx="7.5" cy="7.5" r="1.4" /></>,
    users: <><circle {...p} cx="9" cy="8" r="3.2" /><path {...p} d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><path {...p} d="M16 5.4a3.2 3.2 0 0 1 0 5.9" /><path {...p} d="M17.6 14.2c2 .9 3.4 2.9 3.4 5.3" /></>,
    star:  <path {...p} d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8L3.5 9.7l5.9-.9z" />,
    spark: <><path {...p} d="M12 3v3.5M12 17.5V21M3 12h3.5M17.5 12H21" /><path {...p} d="M12 7l1.7 3.3L17 12l-3.3 1.7L12 17l-1.7-3.3L7 12l3.3-1.7z" /></>,
    pin:   <><path {...p} d="M12 21s7-5.3 7-11a7 7 0 1 0-14 0c0 5.7 7 11 7 11z" /><circle {...p} cx="12" cy="10" r="2.5" /></>,
    check: <path {...p} d="M5 12.5l4.5 4.5L19 7" />,
    mail:  <><path {...p} d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" /><path {...p} d="M4 6.5l8 6 8-6" /></>,
    phone: <path {...p} d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.1-2.1a1.2 1.2 0 0 1 1.27-.27c1 .35 2.1.55 3.2.55.7 0 1.3.6 1.3 1.3V20c0 .7-.6 1.2-1.3 1.2C10.8 21.2 2.8 13.2 2.8 4.3 2.8 3.6 3.3 3 4 3h3.3c.7 0 1.3.6 1.3 1.3 0 1.1.2 2.2.55 3.2.1.44 0 .93-.28 1.27z" />,
    sun:   <><circle {...p} cx="12" cy="12" r="4" /><path {...p} d="M12 2.5V5M12 19v2.5M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2.5 12H5M19 12h2.5M4.2 19.8L6 18M18 6l1.8-1.8" /></>,
    moon:  <path {...p} d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />,
    chevronDown: <path {...p} d="M5 9l7 7 7-7" />,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" style={style} aria-hidden="true">{paths[name]}</svg>;
}

// ─── STAR RATING ─────────────────────────────────────────────
function Stars({ size = 16, color = C.brass }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }} aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8L3.5 9.7l5.9-.9z" fill={color} />
        </svg>
      ))}
    </span>
  );
}

// ─── SCROLL REVEAL ───────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setVisible(true); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { setVisible(true); io.unobserve(entry.target); }
      });
    }, { threshold, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ children, as: Tag = "div", delay = 0, zoom = false, className = "", style = {}, ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`${zoom ? "reveal-zoom" : "reveal"} ${visible ? "is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms", ...style }}
      {...rest}
    >
      {children}
    </Tag>
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

function ThemeToggle({ theme, toggleTheme }) {
  const dark = theme === "dark";
  return (
    <button
      onClick={toggleTheme}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        position: "fixed", right: "max(20px, env(safe-area-inset-right))", bottom: "max(20px, env(safe-area-inset-bottom))",
        zIndex: "var(--z-float)", width: 46, height: 46, borderRadius: "50%", flexShrink: 0,
        background: C.surface, border: `1px solid ${C.grayLight}`, boxShadow: "0 6px 20px rgba(0,0,0,0.16)",
        backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
        color: C.gray, transition: "color 0.2s, border-color 0.2s, transform 0.2s"
      }}
      onMouseEnter={e => { e.currentTarget.style.color = C.green; e.currentTarget.style.borderColor = C.green; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.color = C.gray; e.currentTarget.style.borderColor = C.grayLight; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <Icon name={dark ? "sun" : "moon"} size={19} stroke={1.7} />
    </button>
  );
}

function Navbar({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "memberships", label: "Memberships" },
    { id: "lessons", label: "Lessons" },
    { id: "food", label: "Food + Drinks", href: LINKS.food },
    { id: "contact", label: "Contact Us" }
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
          maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 96,
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16
        }}>

          {/* Brand Identity Branding Frame */}
          <div onClick={() => { setPage("home"); setMenuOpen(false); window.scrollTo(0, 0); }}
            style={{ display: "flex", alignItems: "center", cursor: "pointer", flexShrink: 0 }}>
            <Logo size={88} />
          </div>

          {/* Inline Navigation Menu (Desktop Mode) */}
          <div style={{ display: "flex", alignItems: "center", gap: 28, flexShrink: 0 }} className="tj-desk-nav">
            {navItems.map(item => (
              item.href ? (
                <a key={item.id} href={item.href} target="_blank" rel="noopener noreferrer"
                  className="nav-link"
                  style={{ fontSize: 14, fontFamily: "'Public Sans', sans-serif", fontWeight: 500, letterSpacing: 0.3, whiteSpace: "nowrap", color: "rgba(247,251,248,0.85)", cursor: "pointer", transition: "color 0.2s" }}
                >
                  {item.label}
                </a>
              ) : (
                <span key={item.id} onClick={() => { setPage(item.id); window.scrollTo(0, 0); }}
                  className="nav-link"
                  style={{ fontSize: 14, fontFamily: "'Public Sans', sans-serif", fontWeight: 500, letterSpacing: 0.3, whiteSpace: "nowrap", color: page === item.id ? C.brass : "rgba(247,251,248,0.85)", cursor: "pointer", transition: "color 0.2s" }}
                >
                  {item.label}
                </span>
              )
            ))}
          </div>

          {/* Contextual Layout Actions */}
          <div className="tj-desk-nav" style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 12 }}>
            <Btn href={LINKS.bookBay} size="sm">Book A Bay</Btn>
          </div>

          {/* Mobile action: menu trigger */}
          <div className="tj-mob-btn" style={{ display: "none", alignItems: "center", gap: 10 }}>
            <div onClick={() => setMenuOpen(!menuOpen)}
              style={{
                width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.06)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, cursor: "pointer"
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
                      padding: "12px", fontSize: 17, fontFamily: "'Familjen Grotesk', sans-serif", fontWeight: 700, borderRadius: 12,
                      background: page === item.id ? "rgba(211,163,93,0.14)" : "transparent",
                      color: page === item.id ? C.brass : "rgba(247,251,248,0.92)", cursor: "pointer"
                    }}
                  >{item.label}</div>
                ))}
              </div>
            ))}
            <div style={{ marginTop: 22, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <Btn href={LINKS.bookBay} size="lg" full>Book A Bay Now</Btn>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────
const FOOTER_SOCIALS = [
  { href: LINKS.facebook, label: "Facebook", icon: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg> },
  { href: LINKS.instagram, label: "Instagram", icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg> },
  { href: LINKS.tiktok, label: "TikTok", icon: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.61a8.18 8.18 0 0 0 4.78 1.52V6.68a4.85 4.85 0 0 1-1.01.01z" /></svg> },
];

const FOOTER_NAV = [
  { title: "Play", items: [
    { id: "home", label: "Book A Bay", href: LINKS.bookBay },
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
    { id: "food", label: "Food & Drinks", href: LINKS.food },
    { id: "contact", label: "Contact & Hours" },
  ]},
];

function FooterNavLink({ item, setPage }) {
  const style = {
    fontSize: 14, fontWeight: 500, color: "rgba(247,251,248,0.8)", cursor: "pointer",
    transition: "color 0.2s", width: "fit-content"
  };
  const onMouseEnter = e => e.currentTarget.style.color = C.brass;
  const onMouseLeave = e => e.currentTarget.style.color = "rgba(247,251,248,0.8)";

  if (item.href) return (
    <a href={item.href} target="_blank" rel="noopener noreferrer" style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>{item.label}</a>
  );
  return (
    <span onClick={() => { setPage(item.id); window.scrollTo(0, 0); }} style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>{item.label}</span>
  );
}

function FooterSocialRow({ size = 36 }) {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      {FOOTER_SOCIALS.map(soc => (
        <a key={soc.label} href={soc.href} target="_blank" rel="noopener noreferrer" aria-label={soc.label}
          style={{
            width: size, height: size, borderRadius: "50%", background: "rgba(255,255,255,0.08)", display: "flex",
            alignItems: "center", justifyContent: "center", color: C.white, transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)", flexShrink: 0
          }}
          onMouseEnter={e => { e.currentTarget.style.background = C.brass; e.currentTarget.style.color = "#072212"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = C.white; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          {soc.icon}
        </a>
      ))}
    </div>
  );
}

function FooterInput({ icon, ...props }) {
  return (
    <div style={{ position: "relative", flex: "1 1 190px" }}>
      <Icon name={icon} size={15} stroke={1.8} style={{ position: "absolute", left: 15, top: "50%", transform: "translateY(-50%)", color: "rgba(247,251,248,0.4)", pointerEvents: "none" }} />
      <input
        {...props}
        style={{
          width: "100%", padding: "13px 14px 13px 40px", borderRadius: 10, border: "1.5px solid rgba(255,255,255,0.14)",
          background: "rgba(255,255,255,0.05)", color: C.white, fontFamily: "'Public Sans', sans-serif", fontSize: 14,
          outline: "none", transition: "border-color 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
        onFocus={e => e.target.style.borderColor = C.brass}
        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.14)"}
      />
    </div>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ background: "#072212", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "72px 24px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Subscribe card */}
        <div style={{
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(211,163,93,0.22)", borderRadius: 20,
          padding: "30px 32px", marginBottom: 48, display: "flex", flexWrap: "wrap", gap: "24px 40px", alignItems: "flex-start"
        }}>
          <div style={{ flex: "1 1 260px", maxWidth: 320 }}>
            <p style={{ fontFamily: "'Familjen Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: C.white, marginBottom: 6, lineHeight: 1.3 }}>
              Get $20 off your first bay
            </p>
            <p style={{ fontSize: 13.5, color: "rgba(247,251,248,0.6)", lineHeight: 1.6 }}>
              Subscribe for flash deals, league updates, and event info from The Jacket.
            </p>
          </div>

          <div style={{ flex: "2 1 380px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 14 }}>
              <FooterInput icon="mail" type="email" placeholder="Email" />
              <FooterInput icon="phone" type="tel" placeholder="Phone Number" />
              <Btn variant="brass" size="md">Subscribe</Btn>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <input type="checkbox" id="sms" style={{ accentColor: C.brass, width: 15, height: 15, marginTop: 2, flexShrink: 0 }} />
              <label htmlFor="sms" style={{ fontSize: 11.5, color: "rgba(247,251,248,0.5)", lineHeight: 1.5 }}>
                I agree to receive recurring SMS/text messages from The Jacket for updates, promotions, and event info. Message & data rates may apply. Msg frequency varies. Reply STOP to opt out or HELP for help. See our Privacy Policy & Terms.
              </label>
            </div>
          </div>
        </div>

        {/* Brand + Navigation */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "48px 56px", marginBottom: 40 }}>

          {/* Brand column */}
          <div style={{ flex: "1 1 260px", maxWidth: 300, display: "flex", flexDirection: "column", gap: 20 }}>
            <Logo size={54} />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a href={LINKS.directions} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13.5, color: "rgba(247,251,248,0.75)", lineHeight: 1.5, transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = C.brass} onMouseLeave={e => e.currentTarget.style.color = "rgba(247,251,248,0.75)"}>
                <Icon name="pin" size={16} stroke={1.8} style={{ color: C.brass, marginTop: 1, flexShrink: 0 }} />
                2000 Matlock Rd, Ste 100<br />Mansfield, TX 76063
              </a>
              <a href="tel:6824008055"
                style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 13.5, fontWeight: 600, color: "rgba(247,251,248,0.9)", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = C.brass} onMouseLeave={e => e.currentTarget.style.color = "rgba(247,251,248,0.9)"}>
                <Icon name="phone" size={16} stroke={1.8} style={{ color: C.brass, flexShrink: 0 }} />
                (682) 400-8055
              </a>
            </div>
            <FooterSocialRow />
          </div>

          {/* Nav groups */}
          <div style={{ flex: "3 1 480px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "36px 24px" }}>
            {FOOTER_NAV.map(group => (
              <div key={group.title} style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(247,251,248,0.4)", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 2 }}>{group.title}</p>
                {group.items.map(item => <FooterNavLink key={item.label} item={item} setPage={setPage} />)}
              </div>
            ))}
          </div>
        </div>

        {/* Legal bar */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
          borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, fontSize: 12.5, color: "rgba(247,251,248,0.5)"
        }}>
          <p>© 2026 The Jacket LLC. All rights reserved.</p>
          <p>Mansfield, TX</p>
        </div>
      </div>
    </footer>
  );
}

// ─── HERO (rotating text) ────────────────────────────────────
const ROTATING_WORDS = ["Birthday Parties", "Date Nights", "Corporate Events", "League Play", "Family Fun"];

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
      padding: "172px 24px 96px",
      background: "linear-gradient(160deg, #000000 0%, #0A0A0A 50%, #000000 100%)",
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
        <source src="https://m6ecrhz9ymkalaxg.public.blob.vercel-storage.com/video-C3wqwOPRrsEQ5HmT9bpeZ1Ro8JC9rE.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay to ensure text legibility */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.75) 100%)" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", width: "100%" }}>
        <h1 className="fade-up" style={{
          fontFamily: "'Familjen Grotesk', sans-serif", fontWeight: 600, fontSize: "clamp(42px, 9vw, 64px)",
          color: C.white, lineHeight: 1.15, letterSpacing: "-0.02em", maxWidth: 850, marginBottom: 32,
        }}>
          Indoor Golf<br />Reimagined For<br />
          <span className={cls} style={{ color: C.greenAccent, fontWeight: 700, display: "inline-block", position: "relative", lineHeight: 1.3, paddingBottom: "0.12em" }}>{ROTATING_WORDS[idx]}</span>
        </h1>
        <p className="fade-up-1" style={{ fontSize: "clamp(16px, 2vw, 17px)", color: "rgba(247,251,248,0.78)", maxWidth: 560, lineHeight: 1.7, marginBottom: 48 }}>
          Play a quick 9 holes on your lunch break or take the whole family out for a unique indoor golf experience, rain or shine.
        </p>
        <div className="fade-up-2" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Btn href={LINKS.bookBay} size="lg">Book A Bay</Btn>
          <Btn variant="outline" size="lg" onClick={() => { setPage("memberships"); window.scrollTo(0, 0); }}>Become A Member</Btn>
        </div>

        {/* Social proof + credibility row */}
        <div className="fade-up-3" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px 26px", marginTop: 52 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
            <Stars size={17} />
            <span style={{ fontSize: 14, color: C.white, fontWeight: 600 }}>4.9 on Google</span>
          </span>
          {[
            { icon: "spark", label: "Trackman iO bays" },
            { icon: "glass", label: "Back 9 Bar & Grill" },
            { icon: "clock", label: "Open late, 7 days" },
          ].map(item => (
            <span key={item.label} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <Icon name={item.icon} size={18} color={C.brass} stroke={1.6} />
              <span style={{ fontSize: 14, color: "rgba(247,251,248,0.82)", fontWeight: 500 }}>{item.label}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="scroll-cue" style={{ position: "absolute", left: "50%", bottom: 36, transform: "translateX(-50%)", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(247,251,248,0.55)" }}>Scroll</span>
        <Icon name="chevronDown" size={18} stroke={1.8} color="rgba(247,251,248,0.55)" />
      </div>
    </section>
  );
}

// ─── ENJOY GOLF SECTION ──────────────────────────────────────
function EnjoyGolf({ setPage }) {
  return (
    <section style={{ background: C.surface, padding: "128px 24px" }}>
      <div className="responsive-grid responsive-grid-half" style={{ maxWidth: 1280, margin: "0 auto", gap: 64, alignItems: "center" }}>
        <Reveal>
          <h2 style={{ fontFamily: "'Familjen Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(34px, 5.5vw, 58px)", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 24 }}>
            Enjoy golf <span style={{ color: C.green }}>on your own schedule.</span>
          </h2>
          <p style={{ fontSize: 16, color: C.gray, lineHeight: 1.75, marginBottom: 16, maxWidth: 480 }}>
            The Jacket pairs Trackman-accurate simulators with a relaxed bar and lounge, so you get serious golf and a great hang in one place.
          </p>
          <p style={{ fontSize: 16, color: C.gray, lineHeight: 1.75, marginBottom: 36, maxWidth: 480 }}>
            Squeeze in 9 holes on your lunch break, gather the crew for a group outing, or bring the whole family in for a weekend hangout. However you want to play, we've got the space and the comfort to match.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Btn href={LINKS.bookBay} size="lg">Book A Bay</Btn>
            <Btn variant="outlineD" size="lg" onClick={() => { setPage("memberships"); window.scrollTo(0, 0); }}>Explore Memberships</Btn>
          </div>
        </Reveal>

        <Reveal zoom delay={120} style={{ position: "relative" }}>
          <div style={{
            borderRadius: 28, overflow: "hidden", aspectRatio: "4 / 5", maxHeight: 580,
            boxShadow: "0 24px 60px rgba(7,34,18,0.16)"
          }}>
            <img
              src={simulatorBaySwing}
              alt="A guest mid-swing on a Trackman iO simulator bay at The Jacket, with shot data and course view on the bay screen"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
          <div style={{
            position: "absolute", left: -20, bottom: 32, background: C.green, borderRadius: 16,
            padding: "16px 24px", boxShadow: "0 16px 32px rgba(7,34,18,0.3)",
            maxWidth: 240
          }}>
            <p style={{ fontFamily: "'Familjen Grotesk', sans-serif", fontWeight: 700, fontSize: 15, color: C.white, marginBottom: 2 }}>Trackman iO Powered</p>
            <p style={{ fontSize: 13, color: "rgba(247,251,248,0.85)", lineHeight: 1.5 }}>Tour-grade ball and club data on every shot.</p>
          </div>
        </Reveal>
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
      img: simulatorBayLounge,
      alt: "A simulator bay lounge at The Jacket with the Trackman screen, leather seating, and a marble coffee table"
    },
    {
      title: "Join A League",
      desc: "Sharpen your game season after season, climb the leaderboard, and meet other golfers from around the area.",
      cta: "See League Options", page: "leagues",
      img: leagueTeamPhoto,
      alt: "The Jacket team and league players posing together outside the venue"
    },
    {
      title: "Book Professional Lessons",
      desc: "Work one-on-one with a certified coach using real-time Trackman data to fix what's holding your swing back.",
      cta: "Book A Lesson", href: LINKS.lessons,
      img: lessonClubFitting,
      alt: "A coach at The Jacket guiding a student's grip and swing position on a Trackman simulator bay"
    },
  ];

  return (
    <section style={{ background: C.surface, padding: "48px 24px 128px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }} className="responsive-grid responsive-grid-3">
        {cards.map((c, i) => (
          <Reveal key={i} delay={i * 110} className="hover-lift" style={{
            position: "relative", borderRadius: 24, overflow: "hidden", minHeight: 440,
            display: "flex", flexDirection: "column", justifyContent: "flex-end",
            boxShadow: "0 10px 30px rgba(7,34,18,0.12)"
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-6px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <img src={c.img} alt={c.alt} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.05) 100%)" }} />
            <div style={{ position: "relative", padding: "32px" }}>
              <h3 style={{ fontFamily: "'Familjen Grotesk', sans-serif", fontWeight: 700, fontSize: 26, color: C.white, marginBottom: 12, lineHeight: 1.2, letterSpacing: "-0.01em" }}>{c.title}</h3>
              <p style={{ fontSize: 14, color: "rgba(247,251,248,0.8)", lineHeight: 1.65, marginBottom: 24 }}>{c.desc}</p>
              {c.href
                ? <Btn href={c.href} size="md" full>{c.cta}</Btn>
                : <Btn size="md" variant="white" full onClick={() => { setPage(c.page); window.scrollTo(0, 0); }}>{c.cta}</Btn>
              }
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── EVENTS TEASER (Private Parties + Corporate Events) ───────
function EventsTeaser({ setPage }) {
  return (
    <section style={{ background: C.greenWash, padding: "128px 24px" }}>
      <div className="responsive-grid responsive-grid-half" style={{ maxWidth: 1280, margin: "0 auto", gap: 64, alignItems: "center" }}>
        <Reveal zoom style={{
          borderRadius: 28, overflow: "hidden", aspectRatio: "4 / 3",
          boxShadow: "0 24px 60px rgba(7,34,18,0.16)"
        }}>
          <img
            src={bartenderCocktail}
            alt="A bartender at The Jacket mixing a cocktail in front of the neon Green Jacket sign"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </Reveal>

        <Reveal delay={120}>
          <h2 style={{ fontFamily: "'Familjen Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(34px, 5.5vw, 58px)", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 24 }}>
            Elevate your next <span style={{ color: C.green }}>private event or party.</span>
          </h2>
          <p style={{ fontSize: 16, color: C.gray, lineHeight: 1.75, marginBottom: 36, maxWidth: 480 }}>
            The Jacket offers an unparalleled private party experience, combining the excitement of golf with the convenience of indoor entertainment to create a memorable, tailored event that caters to your needs and preferences.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Btn size="lg" onClick={() => { setPage("private-parties"); window.scrollTo(0, 0); }}>Private Parties</Btn>
            <Btn variant="outlineD" size="lg" onClick={() => { setPage("corporate-events"); window.scrollTo(0, 0); }}>Corporate Events</Btn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── MEMBER SECTION ──────────────────────────────────────────
function MemberSection({ setPage }) {
  const perks = [
    { icon: "users", title: "Family Memberships", desc: "Add your whole household to one membership and everyone gets the perks." },
    { icon: "flag", title: "Daily Simulator Time", desc: "A set amount of bay time included every day, no extra fees." },
    { icon: "glass", title: "Always-On Happy Hour", desc: "Members get happy hour drink prices any day we're open." },
  ];

  return (
    <section style={{ position: "relative", overflow: "hidden", padding: "132px 24px" }}>
      <img
        src={memberTechBay}
        alt=""
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
      />
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "linear-gradient(110deg, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.86) 35%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.75) 100%)"
      }} />
      <div style={{
        position: "absolute", top: "-10%", right: "-8%", width: 560, height: 560, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(66,170,96,0.18) 0%, rgba(66,170,96,0) 70%)", filter: "blur(10px)", pointerEvents: "none", zIndex: 0
      }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div className="responsive-grid responsive-grid-half" style={{ gap: 56, alignItems: "center" }}>
          <Reveal>
            <h2 style={{ fontFamily: "'Familjen Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(32px, 4.8vw, 52px)", color: C.white, marginBottom: 20, lineHeight: 1.1, letterSpacing: "-0.02em" }}>Become A Member</h2>
            <p style={{ fontSize: 16, color: "rgba(247,251,248,0.75)", lineHeight: 1.75, marginBottom: 36, maxWidth: 460 }}>
              Members get priority booking windows, guest passes for friends and family, and a flat 20% off food and drinks every visit.
            </p>
            <Btn onClick={() => { setPage("memberships"); window.scrollTo(0, 0); }} size="lg">See Membership Plans</Btn>
          </Reveal>

          <Reveal delay={120} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{
              display: "flex", alignItems: "flex-start", gap: 18, background: C.dark,
              borderRadius: 20, padding: "28px", marginBottom: 12, border: "1px solid rgba(255,255,255,0.08)"
            }}>
              <span style={{ flexShrink: 0, width: 48, height: 48, borderRadius: 12, background: C.green, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="tag" size={26} color={C.white} stroke={1.7} />
              </span>
              <div>
                <p style={{ fontFamily: "'Familjen Grotesk', sans-serif", fontWeight: 700, fontSize: 19, color: C.greenAccent, marginBottom: 6, lineHeight: 1.3 }}>20% off everything, every visit</p>
                <p style={{ fontSize: 14, color: "rgba(247,251,248,0.72)", lineHeight: 1.6 }}>Lessons, bay time, private events, and merch. The discount applies automatically, no codes to remember.</p>
              </div>
            </div>

            {perks.map((f, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 18, padding: "16px 4px",
                borderTop: i === 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
                borderBottom: i < perks.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none"
              }}>
                <span style={{ flexShrink: 0, width: 40, height: 40, borderRadius: 10, background: "rgba(211,163,93,0.14)", border: "1px solid rgba(211,163,93,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name={f.icon} size={20} color={C.brass} stroke={1.7} />
                </span>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: C.white, fontFamily: "'Familjen Grotesk', sans-serif" }}>{f.title}</p>
                  <p style={{ fontSize: 13, color: "rgba(247,251,248,0.6)", lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── REVIEWS CAROUSEL ────────────────────────────────────────
const REVIEWS = [
  { name: "Robin Moore", ago: "1 year ago", text: "Service and food were excellent!! 20 of us coming back in 2 weeks! Let go!! Thanks so much Germany, Ashton (server/hostess) and Tanner! Oh let's not forget the food and drinks, they were outstanding!!" },
  { name: "Deidre Gwin", ago: "1 year ago", text: "Excellent service, great food, we will be back! Thank you! Shout out to Tanner, Ashton our amazing hostess and server, Germany, Anthony and the whole staff." },
  { name: "DeAndrea Adanandus", ago: "1 year ago", text: "I recently hosted a surprise birthday party for my Husband at The Green Jacket, and it was nothing short of phenomenal! From start to finish, the experience was incredible." },
  { name: "Marcus Thompson", ago: "8 months ago", text: "Best indoor golf experience in the DFW area. The Trackman simulators are incredibly accurate and the staff is super friendly. Will definitely be back!" },
  { name: "Sarah Williams", ago: "6 months ago", text: "We came for a corporate event and everyone had a blast. The food was great, the bays are spacious, and the technology is top notch. Highly recommend!" },
];

function Reviews() {
  const [start, setStart] = useState(0);

  const prev = () => setStart(s => Math.max(0, s - 1));
  const next = () => setStart(s => Math.min(REVIEWS.length - 1, s + 1));

  return (
    <section style={{ background: C.surface, padding: "112px 24px" }}>
      <Reveal as="div" style={{ maxWidth: 1280, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Familjen Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(30px, 4.2vw, 44px)", letterSpacing: "-0.015em", textAlign: "center", marginBottom: 16 }}>What Guests Are Saying</h2>

        <div style={{ display: "inline-flex", alignItems: "center", gap: 12, justifyContent: "center", width: "100%", marginBottom: 44 }}>
          <Stars size={20} />
          <span style={{ fontSize: 15, color: C.black, fontWeight: 600 }}>4.9 out of 5</span>
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: C.gray, opacity: 0.5 }} />
          <span style={{ fontSize: 15, color: C.gray }}>Rated by guests on Google</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center" }}>
          <button onClick={prev} disabled={start === 0}
            style={{
              width: 44, height: 44, borderRadius: "50%", border: `1px solid ${C.grayLight}`, background: C.surface,
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 20,
              opacity: start === 0 ? 0.3 : 1, boxShadow: "0 2px 8px rgba(7,34,18,0.05)", flexShrink: 0
            }}>‹</button>

          <div style={{ overflow: "hidden", flex: 1, maxWidth: 640 }}>
            <div style={{ display: "flex", transform: `translateX(-${start * 100}%)`, transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}>
              {REVIEWS.map((r, i) => (
                <div key={i} style={{ width: "100%", flexShrink: 0, padding: "8px" }}>
                  <div style={{
                    background: C.surface, borderRadius: 24, padding: "36px 24px",
                    boxShadow: "0 10px 30px rgba(7,34,18,0.06)", border: `1px solid ${C.grayLight}`, textAlign: "center"
                  }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: "50%", background: C.dark, margin: "0 auto 16px",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, color: C.white, fontFamily: "'Familjen Grotesk', sans-serif"
                    }}>
                      {r.name.charAt(0)}
                    </div>
                    <p style={{ fontWeight: 700, fontSize: 16 }}>{r.name}</p>
                    <p style={{ fontSize: 12, color: C.gray, marginBottom: 12 }}>{r.ago}</p>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                      <Stars size={17} color="#FBBC04" />
                    </div>
                    <p style={{ fontSize: 14, color: C.black, lineHeight: 1.6, fontStyle: "italic" }}>"{r.text}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={next} disabled={start === REVIEWS.length - 1}
            style={{
              width: 44, height: 44, borderRadius: "50%", border: `1px solid ${C.grayLight}`, background: C.surface,
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 20,
              opacity: start === REVIEWS.length - 1 ? 0.3 : 1, boxShadow: "0 2px 8px rgba(7,34,18,0.05)", flexShrink: 0
            }}>›</button>
        </div>
      </Reveal>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────
const FAQS = [
  { q: "How Long Does It Take to Play 18 Holes?", a: "A round of golf usually takes an hour for an average player. It's recommended to add an additional hour for every player in your group when reserving a bay." },
  { q: "Do I need to bring my own clubs?", a: "Most customers bring their own clubs. But if you don't have any or forget yours, rental sets are available for $10. Free club rentals for Players Club and Corporate members." },
  { q: "What kind of clubs are the rental sets?", a: "Rental sets include the latest Srixon Irons, fairway woods, and driver, as well as Cleveland wedges and putter." },
  { q: "Is there a dress code?", a: "Feel relaxed and comfortable. Dress however you'd like and enjoy the laid-back atmosphere. No golf shoes required; spikeless or rubber spikes only if you do wear them." },
  { q: "How accurate is Trackman?", a: "Trackman iO combines radar, infrared and high-speed imaging to deliver real data, including measured 3D spin and spin axis, in real time, accurate within 1.5 feet up to 300 yards." },
  { q: "How many players can play per bay?", a: "Groups should limit themselves to four players per bay for the best experience." },
  { q: "Do I need to have a membership?", a: "No membership is needed to rent bays! Rental rates start at $70 per hour and can be split with friends." },
  { q: "Will you offer food & drinks?", a: "Enjoy a diverse dining experience at The Back 9 Bar and Grill with both classic bar food and a full restaurant menu. The bar offers local craft beers, wine and craft cocktails." },
];

function FAQBlock({ faqs = FAQS }) {
  const [open, setOpen] = useState(null);
  return (
    <section style={{ background: C.surface, padding: "112px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }} className="responsive-grid responsive-grid-half">
        <Reveal>
          <h2 style={{ fontFamily: "'Familjen Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(30px, 4vw, 44px)", letterSpacing: "-0.015em", lineHeight: 1.15 }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: C.gray, marginTop: 12, fontSize: 15, lineHeight: 1.7 }}>
            Can't find what you're looking for? Give us a call at{" "}
            <a href="tel:6824008055" style={{ color: C.green, fontWeight: 700 }}>(682) 400-8055</a> and we'll help out.
          </p>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {faqs.map((f, i) => (
            <Reveal key={i} delay={i * 60} style={{ borderBottom: `1px solid ${C.grayLight}`, paddingBottom: 4 }}>
              <div onClick={() => setOpen(open === i ? null : i)}
                style={{ padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                <span style={{ fontFamily: "'Public Sans', sans-serif", fontWeight: 600, fontSize: 15, paddingRight: 16, color: C.black }}>{f.q}</span>
                <span style={{ fontSize: 20, color: open === i ? C.greenHov : C.green, transition: "transform 0.2s, color 0.2s", transform: open === i ? "rotate(45deg)" : "none" }}>+</span>
              </div>
              <div style={{ maxHeight: open === i ? "300px" : "0px", overflow: "hidden", transition: "max-height 0.3s ease-out" }}>
                <p style={{ paddingBottom: 20, fontSize: 14, color: C.gray, lineHeight: 1.65 }}>{f.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── REUSABLE PAGE HERO ──────────────────────────────────────
function PageHero({ title, titleGreen, subtitle, cta1, cta2, image, imageAlt = "" }) {
  return (
    <section style={{
      background: `linear-gradient(135deg, ${C.dark} 0%, ${C.darkMid} 100%)`,
      padding: "clamp(148px, 22vw, 192px) 24px clamp(64px, 8vw, 96px)", position: "relative", overflow: "hidden"
    }}>
      {image && (
        <>
          <img src={image} alt={imageAlt} aria-hidden={!imageAlt} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.78) 100%)" }} />
        </>
      )}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.06,
        backgroundImage: "radial-gradient(rgba(211,163,93,0.6) 1px, transparent 1px)", backgroundSize: "24px 24px"
      }} />
      <div style={{ maxWidth: 840, margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
        <h1 className="fade-up" style={{ fontFamily: "'Familjen Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(38px, 8vw, 60px)", color: C.white, lineHeight: 1.15, marginBottom: 20, letterSpacing: "-0.015em" }}>
          {title}{titleGreen && <> <span style={{ color: C.greenAccent }}>{titleGreen}</span></>}
        </h1>
        {subtitle && <p className="fade-up-1" style={{ fontSize: 16, color: "rgba(247,251,248,0.75)", maxWidth: 600, margin: "0 auto 36px", lineHeight: 1.7 }}>{subtitle}</p>}
        {(cta1 || cta2) && (
          <div className="fade-up-2" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>{cta1}{cta2}</div>
        )}
      </div>
    </section>
  );
}

// ─── REUSABLE SECTION ────────────────────────────────────────
function Sec({ children, bg = C.surface, pad = "80px 24px" }) {
  return <section style={{ background: bg, padding: pad }}><div style={{ maxWidth: 1280, margin: "0 auto" }}>{children}</div></section>;
}

function SecTitle({ title, green, sub, center = true }) {
  return (
    <Reveal as="div" style={{ textAlign: center ? "center" : "left", marginBottom: 48, padding: "0 8px" }}>
      <h2 style={{ fontFamily: "'Familjen Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(26px, 3.5vw, 42px)", lineHeight: 1.2, letterSpacing: "-0.015em" }}>
        {title}{green && <> <span style={{ color: C.green }}>{green}</span></>}
      </h2>
      {sub && <p style={{ fontSize: 15, color: C.gray, maxWidth: 600, margin: center ? "16px auto 0" : "12px 0 0", lineHeight: 1.65 }}>{sub}</p>}
    </Reveal>
  );
}

function Card({ title, desc, delay = 0 }) {
  return (
    <Reveal delay={delay} className="card-hover-lift" style={{
      background: C.surface, borderRadius: 20, padding: "32px 24px", border: `1px solid ${C.grayLight}`,
      boxShadow: "0 4px 20px rgba(0,0,0,0.02)"
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = C.green; e.currentTarget.style.boxShadow = "0 12px 30px rgba(21,132,69,0.1)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = C.grayLight; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.02)"; }}
    >
      <h4 style={{ fontFamily: "'Familjen Grotesk', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 10, color: C.black }}>{title}</h4>
      <p style={{ fontSize: 14, color: C.gray, lineHeight: 1.6 }}>{desc}</p>
    </Reveal>
  );
}

// ─── PAGE: HOME ──────────────────────────────────────────────
function HomePage({ setPage }) {
  return (
    <>
      <Hero setPage={setPage} />
      <EnjoyGolf setPage={setPage} />
      <ImageCards setPage={setPage} />
      <EventsTeaser setPage={setPage} />
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
      <PageHero title="Membership That" titleGreen="Pays For Itself" subtitle="Daily simulator time, 20% off across the board, and perks built for however often you play."
        image={membershipLounge} imageAlt="The lounge and bar seating area at The Jacket"
        cta1={<Btn href={LINKS.memberStandard} size="lg">Join Standard</Btn>}
        cta2={<Btn variant="outline" size="lg" href={LINKS.memberSocial}>View Social Plan</Btn>}
      />
      <Sec>
        <SecTitle title="Why Members Love" green="The Jacket" />
        <div className="responsive-grid responsive-grid-2 responsive-grid-3" style={{ marginBottom: 80 }}>
          {[{ t: "90 Minutes Daily", d: "Use your included simulator time any weekday between 10 AM and 6 PM." }, { t: "Bring A Guest", d: "Invite friends, family, or coworkers to play alongside you." }, { t: "Happy Hour, Always", d: "Happy hour food and drink prices apply every time you visit." }, { t: "20% Off Across The Board", d: "Save on lessons, private events, club fittings, and more." }, { t: "Free Club Rentals", d: "Play with our latest Srixon and Cleveland rental sets at no extra cost." }, { t: "Free Swing Evaluation", d: "Get a Trackman swing analysis from one of our coaches." }].map((f, i) => <Card key={i} title={f.t} desc={f.d} delay={(i % 3) * 70} />)}
        </div>

        <SecTitle title="Find Your Plan" />
        <div className="responsive-grid responsive-grid-3" style={{ alignItems: "start", gap: 32 }}>
          {tiers.map((t, i) => (
            <Reveal key={i} delay={i * 90} style={{
              borderRadius: 24, padding: "44px 32px", position: "relative",
              background: t.highlight ? C.dark : C.white,
              border: t.highlight ? `2px solid ${C.green}` : `1px solid ${C.grayLight}`,
              boxShadow: t.highlight ? "0 20px 40px rgba(13,46,32,0.15)" : "0 4px 20px rgba(0,0,0,0.02)"
            }}>
              {t.highlight && <div style={{
                position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                background: C.green, color: C.white, padding: "6px 20px", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase"
              }}>Most Popular</div>}
              <h3 style={{ fontFamily: "'Familjen Grotesk', sans-serif", fontWeight: 700, fontSize: 24, color: t.highlight ? C.white : C.black, marginBottom: 8 }}>{t.name}</h3>
              <p style={{ fontSize: 36, fontFamily: "'Familjen Grotesk', sans-serif", fontWeight: 700, color: C.green, marginBottom: 28 }}>{t.price}</p>
              <div style={{ marginBottom: 40, display: "flex", flexDirection: "column", gap: 14 }}>
                {t.perks.map((p, pi) => (
                  <div key={pi} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <Icon name="check" size={18} stroke={2.4} color={t.highlight ? C.greenAccent : C.green} style={{ flexShrink: 0, marginTop: 1 }} />
                    <span style={{ fontSize: 14, color: t.highlight ? "rgba(255,255,255,0.75)" : C.gray, lineHeight: 1.5 }}>{p}</span>
                  </div>
                ))}
              </div>
              <Btn href={t.link} full variant={t.highlight ? "green" : "dark"} size="md">Join Now</Btn>
            </Reveal>
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
      <PageHero title="Better Golf Starts" titleGreen="With The Right Coach"
        subtitle="Work one-on-one with a certified coach using real Trackman data to fix what's holding your swing back."
        image={golfBall} imageAlt="A golf ball at The Jacket's indoor golf simulator bay"
        cta1={<Btn href={LINKS.lessons} size="lg">Book A Lesson</Btn>}
        cta2={<Btn variant="outline" size="lg" href={LINKS.memberStandard}>View Membership Plans</Btn>}
      />
      <Sec>
        <SecTitle title="Find Your Program" sub="Whether you're just starting out or chasing single digits, regular coaching backed by real data makes the difference." />
        <div className="responsive-grid responsive-grid-3" style={{ marginBottom: 64 }}>
          {[
            { name: "Swing Evaluation", price: "$49.99", note: "Free for members", desc: "A full Trackman breakdown of your swing, with a coach walking you through what's working and what's not." },
            { name: "Private 1-on-1 Lesson", price: "$149.99", note: "60-minute session", desc: "Focused, one-on-one coaching built around your goals, your swing, and your game." },
            { name: "Junior Lessons", price: "$119.99", note: "Ages 6–17", desc: "Build solid fundamentals early with coaching designed for young golfers." },
          ].map((l, i) => (
            <Reveal key={i} delay={i * 80} style={{
              background: C.surface, borderRadius: 24, padding: "44px 32px", textAlign: "center",
              border: `1px solid ${C.grayLight}`, boxShadow: "0 4px 20px rgba(0,0,0,0.02)"
            }}
            >
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: C.green, marginBottom: 12 }}>{l.note}</p>
              <h3 style={{ fontFamily: "'Familjen Grotesk', sans-serif", fontWeight: 700, fontSize: 22, marginBottom: 8 }}>{l.name}</h3>
              <p style={{ fontSize: 34, fontFamily: "'Familjen Grotesk', sans-serif", fontWeight: 700, color: C.green, marginBottom: 20 }}>{l.price}</p>
              <p style={{ fontSize: 14, color: C.gray, lineHeight: 1.6, marginBottom: 32 }}>{l.desc}</p>
              <Btn href={LINKS.lessons} variant="dark" full>Book This Lesson</Btn>
            </Reveal>
          ))}
        </div>
        <div className="responsive-grid responsive-grid-3">
          {[{ t: "Fix Your Downswing", d: "Spot and correct the small flaws in your downswing using slow-motion video and Trackman data." }, { t: "Smarter Course Management", d: "Learn to read a course, manage risk, and make better decisions on every shot." }, { t: "Mental Game Coaching", d: "Build pre-shot routines and focus habits that hold up under pressure." }].map((f, i) => <Card key={i} title={f.t} desc={f.d} delay={i * 70} />)}
        </div>
      </Sec>
    </>
  );
}

// ─── PAGE: WAYS TO PLAY ──────────────────────────────────────
function WaysToPlayPage() {
  return (
    <>
      <PageHero title="More Than Just" titleGreen="18 Holes"
        subtitle="Play 250+ courses with pinpoint Trackman accuracy, or switch it up with target games, long-drive challenges, and more."
        image={simulatorBaySwing} imageAlt="A guest mid-swing on a Trackman iO simulator bay at The Jacket"
        cta1={<Btn href={LINKS.bookBay} size="lg">Book A Bay</Btn>}
      />
      <Sec>
        <SecTitle title="Mix Up Your Round" />
        <div className="responsive-grid responsive-grid-2 responsive-grid-3" style={{ marginBottom: 64 }}>
          {[
            { t: "Target Tracker", d: "Test your accuracy by landing shots as close as possible to the target." },
            { t: "Neon Mini Golf", d: "Putt your way through glow-in-the-dark mini golf courses." },
            { t: "Long Drive Challenge", d: "See how far you can really hit it, tracked down to the yard." },
            { t: "Closest To The Pin", d: "Take on par-3 challenges with changing wind and weather conditions." },
            { t: "Flag Hunt", d: "A short-game challenge that mixes accuracy with friendly competition." },
            { t: "Magic Pond", d: "A playful target game that's perfect for kids and first-timers." },
          ].map((f, i) => <Card key={i} title={f.t} desc={f.d} delay={(i % 3) * 70} />)}
        </div>

        <SecTitle title="Play Bay-To-Bay, Or Around The World" sub="Connect with other bays in our lounge, or jump online to play golfers from anywhere." />
        <Reveal as="div" style={{ textAlign: "center", marginBottom: 80 }}><Btn href={LINKS.bookBay} size="lg">Book A Bay</Btn></Reveal>

        <SecTitle title="Classic Ways To Compete" />
        <div className="responsive-grid responsive-grid-2 responsive-grid-4">
          {[{ t: "Stroke Play", d: "Every shot counts. Lowest total score wins." }, { t: "Alternate Shot", d: "Partners take turns hitting the same ball. Teamwork is everything." }, { t: "Scramble", d: "Everyone tees off, the team picks the best shot, and plays from there." }, { t: "Pitch & Putt", d: "Focus on your short game with formats built around wedges and putters." }].map((f, i) => <Card key={i} title={f.t} desc={f.d} delay={i * 70} />)}
        </div>
      </Sec>
    </>
  );
}

// ─── PAGE: EVENTS ────────────────────────────────────────────
function EventsPage({ setPage }) {
  return (
    <>
      <PageHero title="Events & Parties" titleGreen="Built Around You"
        subtitle="From birthday parties to corporate outings, we'll set up the space, the games, and the food so all you have to do is show up."
        image={bartenderCocktail} imageAlt="A bartender at The Jacket mixing a cocktail in front of the neon Green Jacket sign"
        cta1={<Btn variant="outline" size="lg" href={LINKS.bookBay}>Check Availability</Btn>}
      />
      <Sec>
        <SecTitle title="Pick Your Event Type" />
        <div className="responsive-grid responsive-grid-3">
          {[
            { t: "Private Parties", d: "Celebrate birthdays, anniversaries, or just because, with bays and a private space just for your group.", page: "private-parties" },
            { t: "Corporate Events", d: "Team outings, happy hours, and offsites that double as a great time and a great deal.", page: "corporate-events" },
            { t: "Tournaments", d: "Run your own bracket or join an upcoming one, with live leaderboards and prizes on the line.", page: "leagues" },
          ].map((c, i) => (
            <Reveal key={i} delay={i * 90} style={{ background: C.dark, borderRadius: 24, padding: "44px 32px", cursor: "pointer", border: "2px solid transparent" }}
              className="card-hover-lift"
              onClick={() => { setPage(c.page); window.scrollTo(0, 0); }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.green; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.transform = ""; }}
            >
              <h4 style={{ fontFamily: "'Familjen Grotesk', sans-serif", fontWeight: 700, fontSize: 22, color: C.white, marginBottom: 12 }}>{c.t}</h4>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.65 }}>{c.d}</p>
            </Reveal>
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
      <PageHero title="Leagues That Run" titleGreen="All Year"
        subtitle="Join a season, climb the leaderboard, and play with the same group week after week, no pressure, just good golf."
        image={simulatorBayLounge} imageAlt="The simulator bay lounge at The Jacket"
        cta1={<Btn href={LINKS.bookBay} size="lg">Join A League</Btn>}
      />
      <Sec>
        <SecTitle title="Why Join A League" />
        <div className="responsive-grid responsive-grid-2 responsive-grid-3" style={{ marginBottom: 64 }}>
          {[{ t: "Fair Matchups", d: "Brackets are balanced by handicap, so every match is close no matter your skill level." }, { t: "Schedules That Work", d: "Set match windows that fit around work and family, no last-minute scrambling." }, { t: "Track Your Progress", d: "See your stats improve week over week and measure yourself against the field." }, { t: "Meet Other Golfers", d: "Get to know other local players and coaches who share your love of the game." }, { t: "End-Of-Season Parties", d: "Wrap up every season with a celebration, food, drinks, and prizes for the top finishers." }, { t: "Always Climate-Controlled", d: "Rain, heat, or freezing cold outside, league night happens rain or shine, indoors." }].map((f, i) => <Card key={i} title={f.t} desc={f.d} delay={(i % 3) * 70} />)}
        </div>

        <Reveal as="div" style={{ background: C.dark, borderRadius: 24, padding: "56px 32px", textAlign: "center" }}>
          <img src={leagueTeamPhoto} alt="The Jacket league players and team posing together outside the venue" style={{ width: "100%", maxWidth: 560, borderRadius: 16, marginBottom: 32, display: "block", marginLeft: "auto", marginRight: "auto" }} />
          <h3 style={{ fontFamily: "'Familjen Grotesk', sans-serif", fontWeight: 700, fontSize: 28, color: C.white, marginBottom: 16 }}>Pick Your League</h3>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 40 }}>
            {["Men's Championship Division", "Women's Elite Bracket", "Jack & Jill Social Pairings", "Skills League For Beginners"].map(l => (
              <span key={l} style={{ padding: "10px 20px", borderRadius: 999, border: `1px solid rgba(44,198,76,0.3)`, fontSize: 13, color: "rgba(255,255,255,0.84)", fontWeight: 500, background: "rgba(255,255,255,0.02)" }}>{l}</span>
            ))}
          </div>
          <Btn href={LINKS.bookBay} size="lg">Reserve Your Spot</Btn>
        </Reveal>
      </Sec>
    </>
  );
}

// ─── PAGE: PRIVATE PARTIES ───────────────────────────────────
function PrivatePartiesPage() {
  return (
    <>
      <PageHero title="Private Parties," titleGreen="Done Right"
        subtitle="Book a private space for birthdays, anniversaries, or any reason to celebrate, just your group, the bays, and the bar."
        image={bartenderCocktail} imageAlt="A bartender at The Jacket mixing a cocktail in front of the neon Green Jacket sign"
        cta1={<Btn href={LINKS.bookBay} size="lg">Check Availability</Btn>}
      />
      <Sec>
        <SecTitle title="What's Included" />
        <div className="responsive-grid responsive-grid-3" style={{ marginBottom: 64 }}>
          {[{ t: "Rain Or Shine", d: "Your party stays exactly on schedule no matter what's happening outside." }, { t: "Set The Vibe", d: "Pick the music, the screens, and the seating layout to match your group." }, { t: "Easy To Mingle", d: "An open layout lets guests chat and relax without missing any of the action." }].map((f, i) => <Card key={i} title={f.t} desc={f.d} delay={i * 80} />)}
        </div>

        <Reveal as="div" style={{ background: C.dark, borderRadius: 24, padding: "56px 32px", textAlign: "center" }}>
          <h3 style={{ fontFamily: "'Familjen Grotesk', sans-serif", fontWeight: 700, fontSize: 28, color: C.white, marginBottom: 16 }}>Private Suites</h3>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", maxWidth: 540, margin: "0 auto 36px", lineHeight: 1.7 }}>
            Each private suite comfortably fits up to 10 guests, with fast Wi-Fi and catering options available on request.
          </p>
          <Btn href={LINKS.bookBay} size="lg">Book Your Suite</Btn>
        </Reveal>
      </Sec>
    </>
  );
}

// ─── PAGE: CORPORATE EVENTS ──────────────────────────────────
function CorporateEventsPage() {
  return (
    <>
      <PageHero title="Corporate Events" titleGreen="Worth Showing Up For"
        subtitle="Give your team a real break with team-building golf, great food, and a setting that's nothing like the office."
        image={simulatorBayLounge} imageAlt="The simulator bay lounge at The Jacket"
        cta1={<Btn href={LINKS.bookBay} size="lg">Get A Quote</Btn>}
        cta2={<Btn variant="outline" size="lg" href={LINKS.memberCorporate}>View Corporate Rates</Btn>}
      />
      <Sec>
        <SecTitle title="Why Companies Choose Us" />
        <div className="responsive-grid responsive-grid-3">
          {[{ t: "A Dedicated Planner", d: "Work directly with our team to plan the schedule, food, and setup down to the details." }, { t: "Real Team Building", d: "Friendly competition that gets people talking across departments, no awkward icebreakers required." }, { t: "A Polished Setting", d: "Modern bays and a relaxed lounge that still feels professional enough for client outings." }].map((f, i) => <Card key={i} title={f.t} desc={f.d} delay={i * 80} />)}
        </div>
      </Sec>
    </>
  );
}

// ─── PAGE: CLUB FITTINGS ─────────────────────────────────────
function ClubFittingsPage() {
  const fittings = [
    ["Full Bag Fitting", "Woods, irons, wedges, and putter, dialed in from top to bottom", "$375", "2.5 hrs"],
    ["Full Bag, No Putter", "Every club but the putter, fit to your exact swing", "$275", "2.5 hrs"],
    ["Driver & Wood Fitting", "Find the launch and spin numbers that add real distance off the tee", "$275", "2 hrs"],
    ["Iron & Wedge Fitting", "Get the lofts and gapping right across your full set", "$225", "1 hr"],
    ["Iron Fitting", "Tighten up your shot pattern with the right shafts", "$175", "1 hr"],
    ["Driver Fitting", "Maximize ball speed and distance off the tee", "$175", "1 hr"],
    ["Fairway & Hybrid Fitting", "Dial in launch angle and spin for more consistent long shots", "$175", "1 hr"],
    ["Putter Fitting", "Make sure your putter face is square at impact, every time", "$150", "1 hr"],
    ["Wedge Fitting", "Find the bounce and grind that match how you play out of the turf", "$125", "1 hr"],
  ];

  return (
    <>
      <PageHero title="Find The Right Clubs" titleGreen="For Your Swing"
        subtitle="Skip the guesswork. We use Trackman data to match your clubs to how you actually swing."
        image={leagueTeamPhoto} imageAlt="The Jacket team outside the venue"
        cta1={<Btn href={LINKS.clubFitting} size="lg">Book A Fitting</Btn>}
      />
      <Sec>
        <SecTitle title="Fitting Options" />
        <div className="responsive-grid responsive-grid-2" style={{ gap: 16, marginBottom: 56 }}>
          {fittings.map(([name, desc, price, time], i) => (
            <Reveal key={i} delay={(i % 4) * 60} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "20px 24px", background: C.surface, borderRadius: 16, border: `1px solid ${C.grayLight}`, gap: 16, transition: "border-color 0.2s, background 0.2s"
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.green; e.currentTarget.style.background = C.greenWash; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.grayLight; e.currentTarget.style.background = C.surface; }}
            >
              <div>
                <p style={{ fontFamily: "'Familjen Grotesk', sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 4, color: C.black }}>{name}</p>
                <p style={{ fontSize: 13, color: C.gray }}>{desc} · <span style={{ fontWeight: 600 }}>{time}</span></p>
              </div>
              <span style={{ fontFamily: "'Familjen Grotesk', sans-serif", fontWeight: 700, fontSize: 20, color: C.green, flexShrink: 0 }}>{price}</span>
            </Reveal>
          ))}
        </div>
        <Reveal as="div" style={{ textAlign: "center", marginBottom: 80 }}><Btn href={LINKS.clubFitting} size="lg">Book Master Fitting Session</Btn></Reveal>
        <div className="responsive-grid responsive-grid-3">
          {[{ t: "More Consistent Strikes", d: "The right shaft and face combination means solid contact even when you miss the center." }, { t: "More Distance", d: "Dial in launch angle and spin to turn your swing speed into real yards." }, { t: "More Comfort", d: "Clubs built around your body and swing feel better and hold up better over a full round." }].map((f, i) => <Card key={i} title={f.t} desc={f.d} delay={i * 80} />)}
        </div>
      </Sec>
    </>
  );
}

// ─── PAGE: TECHNOLOGY ────────────────────────────────────────
function TechnologyPage() {
  return (
    <>
      <PageHero title="Meet Trackman" titleGreen="iO"
        subtitle="The same tour-grade tracking technology the pros use, built into every bay."
        image={memberTechBay} imageAlt="The Trackman iO technology setup at The Jacket"
        cta1={<Btn href={LINKS.bookBay} size="lg">Book A Bay</Btn>}
      />
      <Sec>
        <SecTitle title="What Makes It Different" />
        <div className="responsive-grid responsive-grid-3" style={{ marginBottom: 64 }}>
          {[{ t: "Instant Ball Tracking", d: "Radar and camera tracking pick up your ball the moment it leaves the clubface." }, { t: "Full Clubhead Data", d: "See your attack angle, dynamic loft, and face-to-path on every single swing." }, { t: "True 3D Spin", d: "Real backspin, sidespin, and spin axis numbers, measured directly, not estimated." }].map((f, i) => <Card key={i} title={f.t} desc={f.d} delay={i * 80} />)}
        </div>

        <Reveal as="div" style={{ background: C.dark, borderRadius: 24, padding: "56px 32px", textAlign: "center" }}>
          <img src={simulatorBaySwing} alt="A guest mid-swing on a Trackman iO simulator bay at The Jacket" style={{ width: "100%", maxWidth: 480, borderRadius: 16, marginBottom: 32, display: "block", marginLeft: "auto", marginRight: "auto", aspectRatio: "4 / 5", objectFit: "cover" }} />
          <h3 style={{ fontFamily: "'Familjen Grotesk', sans-serif", fontWeight: 700, fontSize: 28, color: C.white, marginBottom: 16 }}>Built For Accuracy</h3>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", maxWidth: 640, margin: "0 auto 36px", lineHeight: 1.7 }}>
            By combining radar with high-speed cameras, Trackman iO stays accurate to within 1.5 feet over a 300-yard shot.
          </p>
          <Btn href={LINKS.bookBay} size="lg">See It For Yourself</Btn>
        </Reveal>
      </Sec>
    </>
  );
}

// ─── PAGE: CONTACT ───────────────────────────────────────────
function ContactPage() {
  return (
    <>
      <PageHero title="Get In Touch" titleGreen="With The Jacket"
        subtitle="Questions about booking, memberships, or a group event? Our team is happy to help."
        image={foodBurger} imageAlt="A burger and waffle fries served at The Back 9 Bar and Grill"
        cta1={<Btn href={LINKS.bookBay} size="lg">Book A Bay</Btn>}
        cta2={<Btn variant="outline" size="lg" href={LINKS.food}>View Our Menu</Btn>}
      />
      <Sec>
        <div className="responsive-grid responsive-grid-half" style={{ gap: 64 }}>
          <Reveal>
            <h2 style={{ fontFamily: "'Familjen Grotesk', sans-serif", fontWeight: 700, fontSize: 32, marginBottom: 28 }}>Reach Us Directly</h2>
            {[{ label: "Call Us", val: "(682) 400-8055", href: "tel:6824008055" }, { label: "Find Us", val: "2000 Matlock Rd, Ste 100, Mansfield, TX 76063", href: LINKS.directions }].map((c, i) => (
              <a key={i} href={c.href} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "20px 0", borderBottom: `1px solid ${C.grayLight}` }}>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: C.green, marginBottom: 4 }}>{c.label}</p>
                  <p style={{ fontSize: 15, color: C.black, fontWeight: 600 }}>{c.val}</p>
                </div>
              </a>
            ))}
            <div style={{ marginTop: 40 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: C.green, marginBottom: 16 }}>Hours</p>
              {[["Monday – Thursday", "10:00 AM – 12:00 AM"], ["Friday – Saturday", "10:00 AM – 02:00 AM"], ["Sunday", "10:00 AM – 10:00 PM"]].map(([d, h]) => (
                <div key={d} style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: `1px solid ${C.grayLight}`, fontSize: 14 }}>
                  <span style={{ color: C.gray, fontWeight: 500 }}>{d}</span><span style={{ fontWeight: 600, color: C.black }}>{h}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h2 style={{ fontFamily: "'Familjen Grotesk', sans-serif", fontWeight: 700, fontSize: 32, marginBottom: 28 }}>Send Us A Message</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {["Your Name", "Email Address", "Phone Number"].map(f => (
                <div key={f}>
                  <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: C.gray, display: "block", marginBottom: 8 }}>{f}</label>
                  <input type="text" placeholder={`Your ${f.toLowerCase()}`} style={{
                    width: "100%", padding: "14px 16px", borderRadius: 12, border: `2px solid ${C.grayLight}`,
                    fontFamily: "'Public Sans', sans-serif", fontSize: 16, outline: "none", transition: "border 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                  }}
                    onFocus={e => e.target.style.borderColor = C.green}
                    onBlur={e => e.target.style.borderColor = C.grayLight}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: C.gray, display: "block", marginBottom: 8 }}>Message</label>
                <textarea rows={4} placeholder="Tell us about your event, group size, or what you'd like to know..." style={{
                  width: "100%", padding: "14px 16px", borderRadius: 12,
                  border: `2px solid ${C.grayLight}`, fontFamily: "'Public Sans', sans-serif", fontSize: 16, outline: "none", resize: "none", transition: "border 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
                  onFocus={e => e.target.style.borderColor = C.green}
                  onBlur={e => e.target.style.borderColor = C.grayLight}
                />
              </div>
              <Btn full size="lg" style={{ marginTop: 8 }}>Send Message</Btn>
            </div>
          </Reveal>
        </div>
      </Sec>
    </>
  );
}

// ─── MAIN APP CONTAINER ──────────────────────────────────────
function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [page, setPage] = useState("home");
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === "dark" ? "light" : "dark"));

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
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
}