import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Heart, Shield, ArrowUpRight, Scale, Users, Sparkles } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-b from-[#250033] via-[#1a0024] to-[#0f0015] text-white pt-16 pb-8 px-6 border-t border-purple-900/60 relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4">
            <Link to="/" onClick={scrollToTop} className="flex items-center gap-3 group inline-flex">
              <img 
                src="/images/BraveSpeakLogoo.png" 
                alt="BraveSpeak Logo" 
                className="w-11 h-11 object-contain group-hover:scale-105 transition-transform drop-shadow-[0_2px_10px_rgba(214,180,252,0.4)]" 
              />
              <span className="text-2xl font-extrabold bg-gradient-to-r from-white via-purple-100 to-amber-300 bg-clip-text text-transparent">
                BraveSpeak
              </span>
            </Link>
            <p className="text-purple-200/80 text-sm leading-relaxed">
              Empowering survivors of harassment and sexual violence with legal knowledge, safe community support, and confidential emergency resources.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2.5 py-1 bg-purple-900/60 border border-purple-700/50 rounded-full text-xs font-semibold text-purple-200">
                #BreakTheSilence
              </span>
              <span className="px-2.5 py-1 bg-purple-900/60 border border-purple-700/50 rounded-full text-xs font-semibold text-purple-200">
                #BraveSpeak
              </span>
              <span className="px-2.5 py-1 bg-purple-900/60 border border-purple-700/50 rounded-full text-xs font-semibold text-purple-200">
                #StandWithSurvivors
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-base font-bold uppercase tracking-wider text-purple-300 mb-4 flex items-center gap-2">
              <Scale size={16} className="text-purple-400" /> Platform Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" onClick={scrollToTop} className="text-purple-200 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:w-2.5 transition-all"></span>
                  Home & Overview
                </Link>
              </li>
              <li>
                <Link to="/safety-toolkit" onClick={scrollToTop} className="text-purple-200 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:w-2.5 transition-all"></span>
                  Emergency Safety Toolkit
                </Link>
              </li>
              <li>
                <Link to="/legal-assistant" onClick={scrollToTop} className="text-purple-200 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:w-2.5 transition-all"></span>
                  Legal Assistant & FIR Drafter
                </Link>
              </li>
              <li>
                <Link to="/support-directory" onClick={scrollToTop} className="text-purple-200 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:w-2.5 transition-all"></span>
                  Safe Spaces & Crisis Directory
                </Link>
              </li>
              <li>
                <Link to="/digital-safety" onClick={scrollToTop} className="text-purple-200 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:w-2.5 transition-all"></span>
                  Digital Privacy & StopNCII
                </Link>
              </li>
              <li>
                <Link to="/statistics" onClick={scrollToTop} className="text-purple-200 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:w-2.5 transition-all"></span>
                  National Statistics & Trends
                </Link>
              </li>
              <li>
                <Link to="/laws" onClick={scrollToTop} className="text-purple-200 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:w-2.5 transition-all"></span>
                  Harassment Laws & Legal Rights
                </Link>
              </li>
              <li>
                <Link to="/survivorStories" onClick={scrollToTop} className="text-purple-200 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:w-2.5 transition-all"></span>
                  Survivor Stories & Community
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={scrollToTop} className="text-purple-200 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:w-2.5 transition-all"></span>
                  Support Hub & Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Emergency Hotlines */}
          <div>
            <h3 className="text-base font-bold uppercase tracking-wider text-rose-300 mb-4 flex items-center gap-2">
              <Shield size={16} className="text-rose-400" /> Emergency Direct Dials
            </h3>
            <div className="space-y-3">
              <a 
                href="tel:181" 
                className="flex items-center justify-between p-3 bg-rose-950/40 border border-rose-800/50 rounded-xl hover:bg-rose-900/60 transition-all group"
              >
                <div>
                  <p className="text-xs text-rose-300 font-medium">National Women Helpline</p>
                  <p className="font-bold text-white text-base">Dial 181 (Toll-Free 24x7)</p>
                </div>
                <Phone size={18} className="text-rose-400 group-hover:scale-110 transition-transform" />
              </a>

              <a 
                href="tel:112" 
                className="flex items-center justify-between p-3 bg-purple-950/40 border border-purple-800/50 rounded-xl hover:bg-purple-900/60 transition-all group"
              >
                <div>
                  <p className="text-xs text-purple-300 font-medium">All-in-One Emergency</p>
                  <p className="font-bold text-white text-base">Dial 112 (Police, Medical, Fire)</p>
                </div>
                <Phone size={18} className="text-purple-400 group-hover:scale-110 transition-transform" />
              </a>

              <a 
                href="tel:1091" 
                className="flex items-center justify-between p-3 bg-purple-950/40 border border-purple-800/50 rounded-xl hover:bg-purple-900/60 transition-all group"
              >
                <div>
                  <p className="text-xs text-purple-300 font-medium">Women Police Assistance</p>
                  <p className="font-bold text-white text-base">Dial 1091</p>
                </div>
                <Phone size={18} className="text-purple-400 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Column 4: Official Portals & Contact */}
          <div>
            <h3 className="text-base font-bold uppercase tracking-wider text-purple-300 mb-4 flex items-center gap-2">
              <Users size={16} className="text-purple-400" /> Official Portals
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a 
                  href="https://ncw.nic.in" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 bg-purple-900/40 hover:bg-purple-800/60 rounded-lg text-purple-200 hover:text-white transition-colors border border-purple-800/40"
                >
                  <span>National Commission for Women</span>
                  <ArrowUpRight size={16} />
                </a>
              </li>
              <li>
                <a 
                  href="https://cybercrime.gov.in" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 bg-purple-900/40 hover:bg-purple-800/60 rounded-lg text-purple-200 hover:text-white transition-colors border border-purple-800/40"
                >
                  <span>National Cyber Crime Portal</span>
                  <ArrowUpRight size={16} />
                </a>
              </li>
              <li className="pt-2">
                <div className="flex items-center gap-2 text-xs text-purple-300">
                  <Mail size={14} className="text-purple-400" />
                  <span>Email: </span>
                  <a href="mailto:support@bravespeak.org" className="underline hover:text-white font-medium">
                    support@bravespeak.org
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Copyright and Safety Note */}
        <div className="pt-8 mt-8 border-t border-purple-800/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-purple-300/80">
          <p className="flex items-center gap-1.5 text-center md:text-left">
            <span>© {new Date().getFullYear()} BraveSpeak. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1 text-purple-200 font-medium">
              Made with <Heart size={12} className="text-rose-400 fill-rose-400" /> for safety & justice.
            </span>
          </p>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1 text-emerald-400">
              <Sparkles size={13} /> 100% Confidential & Secure
            </span>
            <button 
              onClick={scrollToTop} 
              className="text-purple-300 hover:text-white underline transition-colors"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
