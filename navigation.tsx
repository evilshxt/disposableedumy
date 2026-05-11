'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import {
  LayoutGrid,
  BookOpen,
  Users,
  DollarSign,
  ArrowRight,
  Globe,
  GraduationCap,
  Building2,
  Award,
  Activity,
  ChevronRight,
  X,
  Menu,
} from 'lucide-react';
import { Logo } from '@/app/components/icons/Logo';

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavLink {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface UtilStat {
  icon: React.ElementType;
  label: string;
  value: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS: NavLink[] = [
  { label: 'Features',  href: '/#features',  icon: LayoutGrid },
  { label: 'Academics', href: '/#academics', icon: BookOpen   },
  { label: 'People',    href: '/#people',    icon: Users      },
  { label: 'Pricing',   href: '/pricing',    icon: DollarSign },
];

const UTIL_STATS: UtilStat[] = [
  { icon: GraduationCap, value: '12,400', label: 'students enrolled' },
  { icon: Building2,     value: '48',     label: 'institutions'      },
  { icon: Award,         value: 'GES',    label: 'certified'         },
  { icon: Activity,      value: '98%',    label: 'uptime'            },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Edumy SVG logomark — inline so it adapts to any parent colour context */
function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ height: size, width: 'auto', flexShrink: 0 }}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="4" height="18" rx="1.5" fill="#1D9E75" />
      <rect x="9" y="3" width="12" height="4" rx="1.5" fill="white" />
      <rect x="9" y="10" width="8" height="4" rx="1.5" fill="#1D9E75" />
      <rect x="9" y="17" width="12" height="4" rx="1.5" fill="white" />
    </svg>
  );
}

/** Wordmark — "edu" bold + "my" muted */
function Wordmark({ size = 20 }: { size?: number }) {
  return (
    <span
      style={{
        fontSize: size,
        fontFamily: "'Telma', 'Georgia', serif",
        letterSpacing: '-0.02em',
        lineHeight: 1,
        userSelect: 'none',
      }}
    >
      <span style={{ fontWeight: 700, color: '#fff' }}>edu</span>
      <span style={{ fontWeight: 400, color: 'rgba(255,255,255,0.45)' }}>my</span>
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Navigation({ showCTA = true }: { showCTA?: boolean }) {
  const { scrollY } = useScroll();
  const [isScrolled,     setIsScrolled]     = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 40);
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      {/* ── DESKTOP UTILITY BAR ─────────────────────────────────────────────── */}
      {/*  Hidden on mobile (lg:flex). Fades out on scroll. */}
      <motion.div
        animate={{ opacity: isScrolled ? 0 : 1, y: isScrolled ? -40 : 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        style={{ pointerEvents: isScrolled ? 'none' : 'auto' }}
        className="
          fixed top-0 left-0 right-0 z-[70]
          hidden lg:block
          bg-[#071f18]
        "
      >
        <div className="max-w-7xl mx-auto px-6 xl:px-8 h-9 flex items-center justify-between">
          {/* Left — stats */}
          <div className="flex items-center gap-6">
            {UTIL_STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <Icon size={12} className="text-[#1D9E75]" strokeWidth={2} />
                <span className="text-[11px] font-semibold text-white/80 tabular-nums">{value}</span>
                <span className="text-[11px] text-white/40">{label}</span>
              </div>
            ))}
          </div>

          {/* Right — badges + lang */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#1D9E75]/20 text-[#1D9E75] tracking-wide uppercase">
              12.4k students
            </span>
            <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-400/15 text-amber-400 tracking-wide uppercase">
              98% uptime
            </span>
            <div className="flex items-center gap-1 text-white/40">
              <Globe size={11} strokeWidth={2} />
              <span className="text-[11px] font-medium">EN</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── TABLET UTILITY BAR ──────────────────────────────────────────────── */}
      {/*  Visible on md only (tablet). Always shows, no scroll fade. */}
      <div
        className="
          fixed top-0 left-0 right-0 z-[70]
          hidden md:block lg:hidden
          bg-[#071f18]
        "
      >
        <div className="max-w-7xl mx-auto px-4 h-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {UTIL_STATS.slice(0, 2).map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <Icon size={11} className="text-[#1D9E75]" strokeWidth={2} />
                <span className="text-[11px] font-semibold text-white/80 tabular-nums">{value}</span>
                <span className="text-[11px] text-white/40">{label}</span>
              </div>
            ))}
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#1D9E75]/20 text-[#1D9E75] tracking-wide uppercase">
            GES Certified
          </span>
        </div>
      </div>

      {/* ── MAIN NAV ────────────────────────────────────────────────────────── */}
      <motion.header
        className="
          fixed left-0 right-0 z-[60]
          flex justify-center px-4
          /* Sits below utility bar on desktop/tablet, at top on mobile */
          top-0 md:top-8 lg:top-9
          /* On desktop we float the pill; on mobile/tablet we go full-width */
          pointer-events-none
        "
        style={{ paddingTop: isScrolled ? 12 : 0 }}
        animate={{ paddingTop: isScrolled ? 12 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 35 }}
      >
        <motion.nav
          role="navigation"
          aria-label="Main navigation"
          animate={{
            backgroundColor: isScrolled
              ? 'rgba(10, 92, 71, 0.97)'
              : 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(20px)',
            borderRadius: isScrolled ? '999px' : '0px',
            padding: isScrolled ? '10px 20px' : '14px 24px',
            boxShadow: isScrolled
              ? '0 8px 32px -4px rgba(0,0,0,0.35)'
              : 'none',
            borderColor: isScrolled
              ? 'rgba(255,255,255,0.1)'
              : 'rgba(255,255,255,0.12)',
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          className="
            flex items-center justify-between
            w-full max-w-7xl
            border pointer-events-auto
          "
        >
          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-2.5 flex-shrink-0 group"
            aria-label="Edumy home"
          >
            <LogoMark size={isScrolled ? 24 : 28} />
            <Wordmark size={isScrolled ? 17 : 20} />
          </Link>

          {/* ── DESKTOP LINKS (lg+) ── */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {NAV_LINKS.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="
                  flex items-center gap-1.5
                  px-3.5 py-1.5 rounded-full
                  text-[13px] font-medium text-white/65
                  hover:text-white hover:bg-white/10
                  transition-all duration-200
                  whitespace-nowrap
                "
              >
                <Icon size={13} strokeWidth={2} className="opacity-75" />
                {label}
              </Link>
            ))}
          </div>

          {/* ── TABLET LINKS (md only — icon + label, fewer items) ── */}
          <div className="hidden md:flex lg:hidden items-center gap-0.5 flex-1 justify-center">
            {NAV_LINKS.slice(0, 3).map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="
                  flex items-center gap-1.5
                  px-3 py-1.5 rounded-full
                  text-[12px] font-medium text-white/65
                  hover:text-white hover:bg-white/10
                  transition-all duration-200
                  whitespace-nowrap
                "
              >
                <Icon size={12} strokeWidth={2} className="opacity-75" />
                {label}
              </Link>
            ))}
          </div>

          {/* ── CTA BUTTONS ── */}
          {showCTA && (
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Sign in — hidden on mobile */}
              <Link
                href="/auth/login"
                className="
                  hidden md:block
                  text-[12.5px] font-medium text-white/75
                  px-3.5 py-1.5 rounded-full
                  border border-white/25
                  hover:border-white/50 hover:text-white
                  transition-all duration-200
                  whitespace-nowrap
                "
              >
                Sign in
              </Link>

              {/* Get Started */}
              <Link
                href="/auth/register"
                className="
                  group flex items-center gap-1.5
                  text-[12.5px] font-semibold text-white
                  px-4 py-1.5 rounded-full
                  bg-[#1D9E75]
                  hover:bg-[#199068]
                  active:scale-95
                  transition-all duration-200
                  whitespace-nowrap
                "
              >
                Get Started
                <ArrowRight
                  size={13}
                  strokeWidth={2.5}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>

              {/* Hamburger — tablet + mobile */}
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                className="
                  lg:hidden
                  ml-1 p-2 rounded-full
                  text-white/70 hover:text-white
                  hover:bg-white/10
                  transition-all duration-200
                "
              >
                <Menu size={20} strokeWidth={2} />
              </button>
            </div>
          )}
        </motion.nav>
      </motion.header>

      {/* ── MOBILE DRAWER ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.aside
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="
                fixed top-0 right-0 bottom-0 z-[90]
                w-full max-w-[320px]
                bg-[#0a5c47]
                flex flex-col
                lg:hidden
                overflow-y-auto
              "
              aria-label="Mobile navigation drawer"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/10 flex-shrink-0">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5"
                  aria-label="Edumy home"
                >
                  <LogoMark size={26} />
                  <Wordmark size={18} />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="
                    p-2 rounded-full
                    text-white/60 hover:text-white
                    hover:bg-white/10
                    transition-all duration-200
                  "
                >
                  <X size={18} strokeWidth={2} />
                </button>
              </div>

              {/* Drawer links */}
              <nav className="flex-1 px-4 py-5" aria-label="Mobile links">
                <div className="flex flex-col gap-1">
                  {NAV_LINKS.map(({ label, href, icon: Icon }, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.05, type: 'spring', stiffness: 300, damping: 25 }}
                    >
                      <Link
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className="
                          flex items-center justify-between
                          px-4 py-3.5 rounded-xl
                          text-[14px] font-medium text-white/70
                          hover:text-white hover:bg-white/10
                          active:bg-white/15
                          transition-all duration-200
                          group
                        "
                      >
                        <span className="flex items-center gap-3">
                          <Icon
                            size={16}
                            strokeWidth={2}
                            className="text-[#1D9E75] group-hover:text-[#1D9E75]"
                          />
                          {label}
                        </span>
                        <ChevronRight
                          size={15}
                          strokeWidth={2}
                          className="text-white/25 group-hover:text-white/50 transition-colors"
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Divider */}
                <div className="mt-4 mb-4 border-t border-white/10" />

                {/* Extra links */}
                <div className="flex flex-col gap-1">
                  {[
                    { label: 'Contact',      href: '/contact'      },
                    { label: 'Help Centre',  href: '/help'         },
                    { label: 'Blog',         href: '/blog'         },
                  ].map(({ label, href }) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className="
                        px-4 py-2.5 rounded-xl
                        text-[13px] font-medium text-white/45
                        hover:text-white/70 hover:bg-white/5
                        transition-all duration-200
                      "
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Drawer CTAs */}
              <div className="px-4 pb-8 pt-4 border-t border-white/10 flex flex-col gap-3 flex-shrink-0">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="
                    flex items-center justify-center
                    w-full py-3 rounded-xl
                    text-[14px] font-medium text-white/80
                    border border-white/20
                    hover:border-white/40 hover:text-white
                    active:scale-[0.98]
                    transition-all duration-200
                  "
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMobileOpen(false)}
                  className="
                    group flex items-center justify-center gap-2
                    w-full py-3 rounded-xl
                    text-[14px] font-semibold text-white
                    bg-[#1D9E75] hover:bg-[#199068]
                    active:scale-[0.98]
                    transition-all duration-200
                  "
                >
                  Get Started
                  <ArrowRight
                    size={15}
                    strokeWidth={2.5}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
