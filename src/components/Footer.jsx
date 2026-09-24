import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Heart, Shield, ArrowUpRight, Scale, Users, Sparkles } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0f0520] text-white pt-16 pb-8 px-6 relative overflow-hidden">
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

      {/* Ambient glows */}
      <div className="absolute top-10 left-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Column 1: Brand & Mission */}
          <div className="space-y-5">
            <Link to="/" onClick={scrollToTop} className="flex items-center gap-3 group">
              <img
                src="/images/BraveSpeakLogoo.png"
                alt="BraveSpeak Logo"
                className="w-11 h-11 object-contain group-hover:scale-105 transition-transform drop-shadow-[0_2px_12px_rgba(192,132,252,0.5)]"
              />
              <span className="text-2xl font-extrabold bg-gradient-to-r from-white via-purple-200 to-amber-300 bg-clip-text text-transparent">
                BraveSpeak
              </span>
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed">
              Empowering survivors of harassment and sexual violence with legal knowledge, safe community support, and confidential emergency resources.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-purple-600/30 border border-purple-500/50 rounded-full text-xs font-semibold text-purple-200">
                #BreakTheSilence
              </span>
              <span className="px-3 py-1 bg-purple-600/30 border border-purple-500/50 rounded-full text-xs font-semibold text-purple-200">
                #BraveSpeak
              </span>
              <span className="px-3 py-1 bg-purple-600/30 border border-purple-500/50 rounded-full text-xs font-semibold text-purple-200">
                #StandWithSurvivors
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-purple-400 mb-5 flex items-center gap-2 border-b border-purple-800/50 pb-3">
              <Scale size={15} /> Platform Navigation
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { to: "/", label: "Home & Overview" },
                { to: "/safety-toolkit", label: "Emergency Safety Toolkit" },
                { to: "/legal-assistant", label: "Legal Assistant & FIR Drafter" },
                { to: "/support-directory", label: "Safe Spaces & Crisis Directory" },
                { to: "/digital-safety", label: "Digital Privacy & StopNCII" },
                { to: "/statistics", label: "National Statistics & Trends" },
                { to: "/laws", label: "Harassment Laws & Legal Rights" },
                { to: "/survivorStories", label: "Survivor Stories & Community" },
                { to: "/contact", label: "Support Hub & Contact Us" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={scrollToTop}
                    className="flex items-center gap-2.5 text-slate-300 hover:text-white hover:translate-x-1 transition-all group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 group-hover:bg-purple-300 shrink-0 transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Emergency Hotlines */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-rose-400 mb-5 flex items-center gap-2 border-b border-rose-800/50 pb-3">
              <Shield size={15} /> Emergency Dials
            </h3>
            <div className="space-y-3">
              <a
                href="tel:181"
                className="flex items-center justify-between p-3.5 bg-rose-900/30 border border-rose-600/40 rounded-xl hover:bg-rose-800/50 hover:border-rose-500/60 transition-all group"
              >
                <div>
                  <p className="text-[11px] font-semibold text-rose-300 uppercase tracking-wide">National Women Helpline</p>
                  <p className="font-bold text-white text-sm mt-0.5">181 — Toll-Free 24×7</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-rose-600/30 border border-rose-500/40 flex items-center justify-center group-hover:bg-rose-600/50 transition-colors">
                  <Phone size={16} className="text-rose-300" />
                </div>
              </a>

              <a
                href="tel:112"
                className="flex items-center justify-between p-3.5 bg-purple-900/30 border border-purple-600/40 rounded-xl hover:bg-purple-800/50 hover:border-purple-500/60 transition-all group"
              >
                <div>
                  <p className="text-[11px] font-semibold text-purple-300 uppercase tracking-wide">All-in-One Emergency</p>
                  <p className="font-bold text-white text-sm mt-0.5">112 — Police · Medical · Fire</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-purple-600/30 border border-purple-500/40 flex items-center justify-center group-hover:bg-purple-600/50 transition-colors">
                  <Phone size={16} className="text-purple-300" />
                </div>
              </a>

              <a
                href="tel:1091"
                className="flex items-center justify-between p-3.5 bg-indigo-900/30 border border-indigo-600/40 rounded-xl hover:bg-indigo-800/50 hover:border-indigo-500/60 transition-all group"
              >
                <div>
                  <p className="text-[11px] font-semibold text-indigo-300 uppercase tracking-wide">Women Police Assistance</p>
                  <p className="font-bold text-white text-sm mt-0.5">1091 — Toll-Free</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center group-hover:bg-indigo-600/50 transition-colors">
                  <Phone size={16} className="text-indigo-300" />
                </div>
              </a>
            </div>
          </div>

          {/* Column 4: Official Portals */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-purple-400 mb-5 flex items-center gap-2 border-b border-purple-800/50 pb-3">
              <Users size={15} /> Official Portals
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://ncw.nic.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl text-slate-200 hover:text-white transition-all border border-white/10 hover:border-purple-500/40 group"
                >
                  <span>National Commission for Women</span>
                  <ArrowUpRight size={15} className="text-purple-400 group-hover:text-purple-300 shrink-0" />
                </a>
              </li>
              <li>
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl text-slate-200 hover:text-white transition-all border border-white/10 hover:border-purple-500/40 group"
                >
                  <span>National Cyber Crime Portal</span>
                  <ArrowUpRight size={15} className="text-purple-400 group-hover:text-purple-300 shrink-0" />
                </a>
              </li>
              <li>
                <a
                  href="https://stopncii.org"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl text-slate-200 hover:text-white transition-all border border-white/10 hover:border-purple-500/40 group"
                >
                  <span>StopNCII.org — Image Shield</span>
                  <ArrowUpRight size={15} className="text-purple-400 group-hover:text-purple-300 shrink-0" />
                </a>
              </li>
              <li className="pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-400 px-1">
                  <Mail size={13} className="text-purple-400 shrink-0" />
                  <a href="mailto:support@bravespeak.org" className="hover:text-white hover:underline transition-colors text-slate-300">
                    support@bravespeak.org
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="flex items-center gap-2 text-center md:text-left flex-wrap justify-center md:justify-start">
            <span className="text-slate-300">© {new Date().getFullYear()} BraveSpeak. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="inline-flex items-center gap-1 text-white font-semibold">
              Made with <Heart size={12} className="text-rose-400 fill-rose-400" /> for safety &amp; justice.
            </span>
          </p>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Sparkles size={13} /> 100% Confidential &amp; Secure
            </span>
            <button
              onClick={scrollToTop}
              className="text-purple-400 hover:text-white border border-purple-700/50 hover:border-purple-500 px-3 py-1 rounded-full transition-all text-[11px] font-bold tracking-wide"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
