import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

type Page = "home" | "about" | "services" | "portfolio" | "contact";

const PAGES: Page[] = ["home", "about", "services", "portfolio", "contact"];

const NAV_LABELS: Record<Page, string> = {
  home: "الرئيسية",
  about: "من نحن",
  services: "خدماتنا",
  portfolio: "بروتفوليو",
  contact: "اتصل بنا",
};

const services = [
  {
    id: "s1",
    title: "تصميم الهوية البصرية",
    desc: "نبني هويات بصرية لا تُنسى تعكس جوهر علامتك التجارية وتميّزها",
    color: "#FF3C00",
  },
  {
    id: "s2",
    title: "التسويق الرقمي",
    desc: "حملات رقمية مدروسة تصل إلى جمهورك الصحيح وتحقق أهدافك",
    color: "#111111",
  },
  {
    id: "s3",
    title: "تصميم المواقع",
    desc: "مواقع سريعة وجميلة وعملية تحوّل الزوار إلى عملاء حقيقيين",
    color: "#1e1e1e",
  },
  {
    id: "s4",
    title: "الموشن جرافيك",
    desc: "محتوى متحرك يجذب الأنظار ويحكي قصتك بإبداع لا يُقاوم",
    color: "#FF3C00",
  },
];

const portfolio = [
  { id: "p1", title: "Lumina Brand", category: "هوية بصرية", year: "2024", accent: "#FF3C00" },
  { id: "p2", title: "UrbanFlow", category: "موقع إلكتروني", year: "2024", accent: "#fff" },
  { id: "p3", title: "Nexus Motion", category: "موشن جرافيك", year: "2023", accent: "#FF3C00" },
  { id: "p4", title: "Spark Campaign", category: "تسويق رقمي", year: "2023", accent: "#fff" },
  { id: "p5", title: "Arc Identity", category: "هوية بصرية", year: "2023", accent: "#FF3C00" },
  { id: "p6", title: "Pulse Digital", category: "تسويق رقمي", year: "2022", accent: "#fff" },
];

const BASE = import.meta.env.BASE_URL;

// ─── Logo ────────────────────────────────────────────────────────────────────
function Logo({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      className="flex items-center gap-2.5 group cursor-pointer"
    >
      <div
        style={{ background: "#FF3C00" }}
        className="w-8 h-8 rounded-lg flex items-center justify-center"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <line x1="2" y1="5" x2="14" y2="5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="2" y1="8" x2="10" y2="8" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="2" y1="11" x2="12" y2="11" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <span className="text-white font-semibold text-base tracking-wide leading-none">
        Smart<span style={{ color: "#FF3C00" }}>Lines</span>
      </span>
    </button>
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar({
  currentPage,
  onNavigate,
}: {
  currentPage: Page;
  onNavigate: (p: Page) => void;
}) {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        background: "rgba(0,0,0,0.55)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        zIndex: 1000,
      }}
      className="fixed top-0 left-0 right-0 px-8 py-4 flex items-center justify-between"
    >
      <Logo onClick={() => onNavigate("home")} />

      <div className="flex items-center gap-1" dir="rtl">
        {PAGES.map((page) => (
          <button
            key={page}
            onClick={() => onNavigate(page)}
            className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg cursor-pointer"
            style={{
              color: currentPage === page ? "#FF3C00" : "rgba(255,255,255,0.7)",
            }}
          >
            {NAV_LABELS[page]}
            {currentPage === page && (
              <motion.div
                layoutId="nav-indicator"
                style={{ background: "rgba(255,60,0,0.12)", borderRadius: 8 }}
                className="absolute inset-0"
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
          </button>
        ))}
      </div>
    </motion.nav>
  );
}

// ─── Home Page ───────────────────────────────────────────────────────────────
function HomePage({ direction }: { direction: number }) {
  return (
    <motion.div
      key="home"
      custom={direction}
      initial={{ opacity: 0, y: direction * 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: direction * -60 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        minHeight: "100vh",
        background: "#0a0a0a",
      }}
    >
      {/* Hero Section */}
      <div
        className="relative flex flex-col justify-center items-start px-16 pt-28 pb-16"
        style={{
          minHeight: "72vh",
          backgroundImage: `url(${BASE}hero-bg.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(120deg, rgba(0,0,0,0.82) 45%, rgba(0,0,0,0.25))",
          }}
        />
        <div className="relative z-10 max-w-xl" dir="rtl">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ color: "#FF3C00", letterSpacing: "0.15em" }}
            className="text-xs font-semibold uppercase mb-4 block"
          >
            وكالة إبداعية متكاملة
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl font-bold text-white leading-tight mb-6"
          >
            نصنع{" "}
            <span style={{ color: "#FF3C00" }}>هويات</span>
            <br />
            تُحفر في الأذهان
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-white/70 text-lg leading-relaxed mb-10"
          >
            من التصميم إلى التسويق، نحوّل أفكارك إلى تجارب بصرية
            <br />
            لا تُنسى تترك أثرًا حقيقيًا.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="flex gap-4"
            dir="rtl"
          >
            <button
              style={{
                background: "#FF3C00",
                color: "#fff",
                fontFamily: "'Space Grotesk', sans-serif",
                border: "none",
                padding: "12px 28px",
                borderRadius: 10,
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              اكتشف أعمالنا
            </button>
            <button
              style={{
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#fff",
                background: "transparent",
                fontFamily: "'Space Grotesk', sans-serif",
                padding: "12px 28px",
                borderRadius: 10,
                fontWeight: 500,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              تواصل معنا
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ zIndex: 10 }}
        >
          <span className="text-white/40 text-xs font-medium">اسكرول لاكتشاف المزيد</span>
          <div
            style={{
              width: 1,
              height: 40,
              background: "linear-gradient(to bottom, rgba(255,60,0,0.8), transparent)",
            }}
          />
        </motion.div>
      </div>

      {/* Stats Bar */}
      <div
        style={{
          background: "#111",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
        className="px-16 py-8"
      >
        <div className="grid grid-cols-4 gap-8" dir="rtl">
          {[
            { num: "+150", label: "مشروع منجز" },
            { num: "+8", label: "سنوات خبرة" },
            { num: "+60", label: "عميل راضٍ" },
            { num: "+4", label: "جوائز دولية" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div
                className="text-3xl font-bold mb-1"
                style={{ color: "#FF3C00" }}
              >
                {stat.num}
              </div>
              <div className="text-white/50 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Services Teaser */}
      <div className="px-16 py-16" dir="rtl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-10"
        >
          <span
            className="text-xs font-semibold uppercase tracking-widest mb-3 block"
            style={{ color: "#FF3C00" }}
          >
            خدماتنا
          </span>
          <h2 className="text-3xl font-bold text-white">
            ما نقدمه لك
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              style={{
                background: "#141414",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16,
              }}
              className="p-6 group cursor-pointer"
            >
              <div
                style={{ background: s.color, width: 36, height: 36, borderRadius: 10 }}
                className="mb-4"
              />
              <h3 className="text-white font-semibold text-base mb-2">
                {s.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Transition Image — shared element that morphs into About's background */}
      <motion.div
        layoutId="hero-transition"
        style={{
          backgroundImage: `url(${BASE}about-hero.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          height: "45vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.0) 40%, rgba(10,10,10,0.8) 100%)",
          }}
        />
        <div
          className="absolute bottom-8 right-12 text-right"
          dir="rtl"
          style={{ zIndex: 2 }}
        >
          <p className="text-white/60 text-sm mb-1">استمر للأسفل لتعرف</p>
          <h3 className="text-white text-2xl font-bold">من نحن</h3>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── About Page ──────────────────────────────────────────────────────────────
function AboutPage({ direction }: { direction: number }) {
  return (
    <motion.div
      key="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: direction * -60 }}
      transition={{ duration: 0.5 }}
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        minHeight: "100vh",
        background: "#0a0a0a",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Shared Element Background — expands from bottom of Home */}
      <motion.div
        layoutId="hero-transition"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${BASE}about-hero.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          zIndex: 0,
        }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Dark overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(120deg, rgba(0,0,0,0.88) 50%, rgba(0,0,0,0.55))",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col justify-center px-16 pt-32 pb-20"
        style={{ minHeight: "100vh" }}
        dir="rtl"
      >
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ color: "#FF3C00", letterSpacing: "0.15em" }}
          className="text-xs font-semibold uppercase mb-4 block"
        >
          من نحن
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl font-bold text-white leading-tight mb-6 max-w-xl"
        >
          وكالة تؤمن بأن
          <br />
          <span style={{ color: "#FF3C00" }}>التصميم</span> يُغيّر العالم
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-white/70 text-lg leading-loose mb-8 max-w-lg"
        >
          Smart Lines وكالة إبداعية متكاملة تأسست عام 2016 بهدف واحد:
          تحويل الأفكار الجريئة إلى هويات بصرية تترك أثرًا.
          نعمل مع علامات تجارية طموحة لبناء تجارب تصميمية
          تتجاوز التوقعات وتخلق اتصالًا حقيقيًا مع الجمهور.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="grid grid-cols-3 gap-6 max-w-xl"
        >
          {[
            { title: "رؤيتنا", text: "أن نكون الوكالة الإبداعية الأولى في المنطقة العربية" },
            { title: "رسالتنا", text: "تقديم حلول تصميمية مبتكرة تعزز هوية العلامات التجارية" },
            { title: "قيمنا", text: "الإبداع، الجودة، الشراكة الحقيقية مع عملائنا" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.12, duration: 0.5 }}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 14,
                backdropFilter: "blur(12px)",
              }}
              className="p-5"
            >
              <div
                style={{ width: 28, height: 3, background: "#FF3C00", borderRadius: 2, marginBottom: 12 }}
              />
              <h4 className="text-white font-semibold text-sm mb-2">{item.title}</h4>
              <p className="text-white/55 text-xs leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Team section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-12"
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-6"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            فريقنا الإبداعي
          </p>
          <div className="flex gap-3">
            {["م. أحمد", "م. سارة", "م. خالد", "م. لينا"].map((name, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: i % 2 === 0 ? "#FF3C00" : "rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                className="px-5 py-3 cursor-default"
              >
                <p className="text-white text-sm font-medium">{name}</p>
                <p className="text-white/60 text-xs mt-0.5">
                  {["مدير إبداعي", "مصممة جرافيك", "مطور ويب", "محتوى رقمي"][i]}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Services Page ────────────────────────────────────────────────────────────
function ServicesPage({
  direction,
  onCardExpand,
  expandedCard,
}: {
  direction: number;
  onCardExpand: (id: string | null) => void;
  expandedCard: string | null;
}) {
  return (
    <motion.div
      key="services"
      custom={direction}
      initial={{ opacity: 0, y: direction * 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: direction * -60 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        minHeight: "100vh",
        background: "#0a0a0a",
        paddingTop: 96,
        paddingBottom: 60,
        paddingLeft: 64,
        paddingRight: 64,
      }}
      dir="rtl"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ color: "#FF3C00", letterSpacing: "0.15em" }}
        className="text-xs font-semibold uppercase mb-3 block"
      >
        ما نقدمه
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl font-bold text-white mb-12"
      >
        خدماتنا
      </motion.h2>

      <div className="grid grid-cols-2 gap-5">
        {services.map((s, i) => (
          <motion.div
            key={s.id}
            layoutId={`service-card-${s.id}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            onClick={() => onCardExpand(s.id)}
            style={{
              background: "#141414",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20,
              cursor: "pointer",
              overflow: "hidden",
              position: "relative",
            }}
            className="p-7 group"
          >
            {/* Card color strip */}
            <motion.div
              layoutId={`service-color-${s.id}`}
              style={{
                background: s.color,
                width: 44,
                height: 44,
                borderRadius: 12,
                marginBottom: 20,
              }}
            />
            <motion.h3
              layoutId={`service-title-${s.id}`}
              className="text-white font-bold text-xl mb-3"
            >
              {s.title}
            </motion.h3>
            <p className="text-white/55 text-sm leading-relaxed">{s.desc}</p>

            {/* Arrow */}
            <div
              className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ color: s.color }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 3l7 7-7 7M3 10h14" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Hover overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(135deg, ${s.color}08, transparent)`,
                borderRadius: 20,
                pointerEvents: "none",
              }}
            />
          </motion.div>
        ))}
      </div>

      <p className="text-white/25 text-xs text-center mt-8">
        اضغط على أي خدمة لمعرفة المزيد
      </p>
    </motion.div>
  );
}

// ─── Portfolio Page ───────────────────────────────────────────────────────────
function PortfolioPage({
  direction,
  onCardExpand,
  expandedCard,
}: {
  direction: number;
  onCardExpand: (id: string | null) => void;
  expandedCard: string | null;
}) {
  const colors = [
    "linear-gradient(135deg, #FF3C00, #ff6b3d)",
    "linear-gradient(135deg, #1a1a2e, #16213e)",
    "linear-gradient(135deg, #0f3460, #533483)",
    "linear-gradient(135deg, #FF3C00cc, #000)",
    "linear-gradient(135deg, #1a1a1a, #333)",
    "linear-gradient(135deg, #FF3C0088, #1a1a1a)",
  ];

  return (
    <motion.div
      key="portfolio"
      custom={direction}
      initial={{ opacity: 0, y: direction * 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: direction * -60 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        minHeight: "100vh",
        background: "#0a0a0a",
        paddingTop: 96,
        paddingBottom: 60,
        paddingLeft: 64,
        paddingRight: 64,
      }}
      dir="rtl"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ color: "#FF3C00", letterSpacing: "0.15em" }}
        className="text-xs font-semibold uppercase mb-3 block"
      >
        أعمالنا
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="text-4xl font-bold text-white mb-10"
      >
        بروتفوليو
      </motion.h2>

      <div className="grid grid-cols-3 gap-4">
        {portfolio.map((item, i) => (
          <motion.div
            key={item.id}
            layoutId={`portfolio-card-${item.id}`}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            onClick={() => onCardExpand(item.id)}
            style={{
              background: colors[i],
              borderRadius: 18,
              height: 200,
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
            }}
            className="group"
          >
            {/* Grain texture overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
                backgroundSize: "200px 200px",
                opacity: 0.4,
                mixBlendMode: "overlay",
              }}
            />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <motion.p
                layoutId={`portfolio-cat-${item.id}`}
                style={{
                  color: item.accent,
                  opacity: 0.8,
                  letterSpacing: "0.1em",
                }}
                className="text-xs font-medium uppercase mb-1"
              >
                {item.category}
              </motion.p>
              <motion.h4
                layoutId={`portfolio-title-${item.id}`}
                className="text-white font-bold text-lg"
              >
                {item.title}
              </motion.h4>
            </div>

            {/* Year badge */}
            <div
              className="absolute top-4 left-4 text-xs font-semibold"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {item.year}
            </div>

            {/* Hover expand hint */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 10L10 2M10 2H4M10 2v6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <p className="text-white/25 text-xs text-center mt-8">
        اضغط على أي مشروع لعرضه
      </p>
    </motion.div>
  );
}

// ─── Contact Page ─────────────────────────────────────────────────────────────
function ContactPage({ direction }: { direction: number }) {
  return (
    <motion.div
      key="contact"
      custom={direction}
      initial={{ opacity: 0, y: direction * 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: direction * -60 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        minHeight: "100vh",
        background: "#0a0a0a",
        display: "flex",
        alignItems: "center",
      }}
      dir="rtl"
    >
      <div className="w-full px-16">
        <div className="grid grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{ color: "#FF3C00", letterSpacing: "0.15em" }}
              className="text-xs font-semibold uppercase mb-4 block"
            >
              تواصل معنا
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl font-bold text-white mb-6 leading-tight"
            >
              لنبدأ
              <br />
              <span style={{ color: "#FF3C00" }}>معًا</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="text-white/60 leading-relaxed mb-10 max-w-sm"
            >
              هل لديك فكرة تريد تحويلها إلى واقع؟
              <br />
              نحن هنا للاستماع وتقديم أفضل الحلول.
            </motion.p>
            {[
              { label: "البريد الإلكتروني", value: "hello@smartlines.studio" },
              { label: "الهاتف", value: "+966 50 000 0000" },
              { label: "العنوان", value: "الرياض، المملكة العربية السعودية" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.1, duration: 0.5 }}
                className="mb-5"
              >
                <p className="text-white/35 text-xs mb-1">{item.label}</p>
                <p className="text-white font-medium text-sm">{item.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: "#141414",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 24,
              padding: 36,
            }}
          >
            <h3 className="text-white font-semibold text-lg mb-6">أرسل رسالة</h3>
            <div className="flex flex-col gap-4">
              {[
                { label: "الاسم الكامل", placeholder: "اكتب اسمك هنا" },
                { label: "البريد الإلكتروني", placeholder: "your@email.com" },
                { label: "موضوع الرسالة", placeholder: "مشروع جديد، استفسار..." },
              ].map((field, i) => (
                <div key={i}>
                  <label
                    className="block text-white/50 text-xs mb-2"
                  >
                    {field.label}
                  </label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 10,
                      color: "white",
                      width: "100%",
                      padding: "10px 14px",
                      fontSize: 14,
                      fontFamily: "'Space Grotesk', sans-serif",
                      outline: "none",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#FF3C00";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    }}
                  />
                </div>
              ))}
              <div>
                <label className="block text-white/50 text-xs mb-2">رسالتك</label>
                <textarea
                  placeholder="اكتب رسالتك هنا..."
                  rows={4}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 10,
                    color: "white",
                    width: "100%",
                    padding: "10px 14px",
                    fontSize: 14,
                    fontFamily: "'Space Grotesk', sans-serif",
                    outline: "none",
                    resize: "none",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#FF3C00";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  }}
                />
              </div>
              <button
                style={{
                  background: "#FF3C00",
                  color: "white",
                  border: "none",
                  borderRadius: 10,
                  padding: "12px 0",
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "'Space Grotesk', sans-serif",
                  cursor: "pointer",
                  width: "100%",
                  transition: "opacity 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
              >
                إرسال الرسالة
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Expanded Card Overlay (Shared Element Transition) ────────────────────────
function ExpandedCardOverlay({
  cardId,
  onClose,
}: {
  cardId: string;
  onClose: () => void;
}) {
  const service = services.find((s) => s.id === cardId);
  const item = portfolio.find((p) => p.id === cardId);
  const isService = !!service;

  const colors = [
    "linear-gradient(135deg, #FF3C00, #ff6b3d)",
    "linear-gradient(135deg, #1a1a2e, #16213e)",
    "linear-gradient(135deg, #0f3460, #533483)",
    "linear-gradient(135deg, #FF3C00cc, #000)",
    "linear-gradient(135deg, #1a1a1a, #333)",
    "linear-gradient(135deg, #FF3C0088, #1a1a1a)",
  ];
  const portIdx = portfolio.findIndex((p) => p.id === cardId);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const layoutPrefix = isService ? "service-card" : "portfolio-card";
  const bg = isService ? service!.color : colors[portIdx] ?? "#FF3C00";
  const title = isService ? service!.title : item?.title ?? "";
  const titleLayoutId = isService ? `service-title-${cardId}` : `portfolio-title-${cardId}`;
  const catLayoutId = isService ? null : `portfolio-cat-${cardId}`;
  const cat = item?.category;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          zIndex: 1100,
          backdropFilter: "blur(6px)",
        }}
      />

      {/* Expanding card */}
      <motion.div
        layoutId={`${layoutPrefix}-${cardId}`}
        style={{
          position: "fixed",
          inset: "5%",
          background: isService ? `${service!.color}22` : bg,
          borderRadius: 28,
          zIndex: 1200,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 48,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        dir="rtl"
      >
        {/* BG tint for services */}
        {isService && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#0e0e0e",
              zIndex: 0,
            }}
          />
        )}

        {/* Color strip for services */}
        {isService && (
          <motion.div
            layoutId={`service-color-${cardId}`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 8,
              background: service!.color,
              zIndex: 2,
            }}
          />
        )}

        <div style={{ position: "relative", zIndex: 1 }}>
          {catLayoutId && (
            <motion.p
              layoutId={catLayoutId}
              style={{
                color: item?.accent,
                letterSpacing: "0.15em",
                marginBottom: 12,
                opacity: 0.8,
              }}
              className="text-sm font-semibold uppercase"
            >
              {cat}
            </motion.p>
          )}
          <motion.h2
            layoutId={titleLayoutId}
            className="text-4xl font-bold text-white mb-6"
          >
            {title}
          </motion.h2>

          {isService && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-white/70 text-lg leading-relaxed max-w-lg mb-8"
            >
              {service!.desc}
            </motion.p>
          )}

          {!isService && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-8"
            >
              <p className="text-white/70 text-lg leading-relaxed max-w-lg">
                مشروع متكامل يجسّد رؤية العميل ويعكس هويته البصرية بشكل
                احترافي وإبداعي يتجاوز التوقعات.
              </p>
            </motion.div>
          )}

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.12)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 12,
              padding: "10px 24px",
              fontSize: 14,
              fontFamily: "'Space Grotesk', sans-serif",
              cursor: "pointer",
              backdropFilter: "blur(8px)",
            }}
          >
            ← رجوع
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function SmartLines() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [prevPage, setPrevPage] = useState<Page | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cooldown = useRef(false);

  const currentIndex = PAGES.indexOf(currentPage);

  const navigateTo = useCallback(
    (page: Page) => {
      if (page === currentPage || transitioning) return;
      setPrevPage(currentPage);
      setTransitioning(true);
      setCurrentPage(page);
      // Reset scroll position
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
      setTimeout(() => setTransitioning(false), 1000);
    },
    [currentPage, transitioning]
  );

  // Wheel-based page navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (expandedCard) return;
      if (cooldown.current) return;

      const el = scrollRef.current;
      if (!el) return;

      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 4;
      const atTop = el.scrollTop <= 4;

      if (e.deltaY > 30 && atBottom) {
        const nextIdx = currentIndex + 1;
        if (nextIdx < PAGES.length) {
          cooldown.current = true;
          navigateTo(PAGES[nextIdx]);
          setTimeout(() => (cooldown.current = false), 1200);
        }
      } else if (e.deltaY < -30 && atTop) {
        const prevIdx = currentIndex - 1;
        if (prevIdx >= 0) {
          cooldown.current = true;
          navigateTo(PAGES[prevIdx]);
          setTimeout(() => (cooldown.current = false), 1200);
        }
      }
    };

    const el = scrollRef.current;
    el?.addEventListener("wheel", handleWheel, { passive: true });
    return () => el?.removeEventListener("wheel", handleWheel);
  }, [currentPage, currentIndex, expandedCard, navigateTo]);

  const direction = prevPage
    ? PAGES.indexOf(currentPage) > PAGES.indexOf(prevPage)
      ? 1
      : -1
    : 1;

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <LayoutGroup>
        <div style={{ background: "#0a0a0a", height: "100vh", overflow: "hidden", position: "relative" }}>
          {/* Fixed Navbar */}
          <Navbar currentPage={currentPage} onNavigate={navigateTo} />

          {/* Scrollable Page Container */}
          <div
            ref={scrollRef}
            style={{
              height: "100vh",
              overflowY: "auto",
              overflowX: "hidden",
              scrollbarWidth: "none",
            }}
          >
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>

            <AnimatePresence mode="wait">
              {currentPage === "home" && (
                <HomePage key="home" direction={direction} />
              )}
              {currentPage === "about" && (
                <AboutPage key="about" direction={direction} />
              )}
              {currentPage === "services" && (
                <ServicesPage
                  key="services"
                  direction={direction}
                  onCardExpand={setExpandedCard}
                  expandedCard={expandedCard}
                />
              )}
              {currentPage === "portfolio" && (
                <PortfolioPage
                  key="portfolio"
                  direction={direction}
                  onCardExpand={setExpandedCard}
                  expandedCard={expandedCard}
                />
              )}
              {currentPage === "contact" && (
                <ContactPage key="contact" direction={direction} />
              )}
            </AnimatePresence>
          </div>

          {/* Page indicator dots */}
          <div
            style={{
              position: "fixed",
              left: 28,
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              zIndex: 500,
            }}
          >
            {PAGES.map((page, i) => (
              <motion.button
                key={page}
                onClick={() => navigateTo(page)}
                animate={{
                  scale: currentPage === page ? 1 : 1,
                  opacity: currentPage === page ? 1 : 0.3,
                }}
                style={{
                  width: currentPage === page ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: currentPage === page ? "#FF3C00" : "white",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s ease",
                }}
                title={NAV_LABELS[page]}
              />
            ))}
          </div>

          {/* Expanded Card Overlay */}
          <AnimatePresence>
            {expandedCard && (
              <ExpandedCardOverlay
                key={expandedCard}
                cardId={expandedCard}
                onClose={() => setExpandedCard(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </>
  );
}
