import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, PhoneCall, ShieldAlert } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Safety Toolkit", path: "/safety-toolkit" },
    { name: "Legal Drafter", path: "/legal-assistant" },
    { name: "Safe Spaces Directory", path: "/support-directory" },
    { name: "Digital Privacy", path: "/digital-safety" },
    { name: "Laws & Rights", path: "/laws" },
    { name: "Statistics", path: "/statistics" },
    { name: "Survivor Stories", path: "/survivorStories" },
    { name: "Helplines", path: "/contact" },
  ];

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#2E003E]/95 backdrop-blur-md border-b border-purple-900/50 shadow-lg shadow-purple-950/20">
      {/* Top emergency micro-bar */}
      <div className="bg-gradient-to-r from-rose-900/90 via-purple-900/80 to-rose-900/90 px-4 py-1.5 text-xs text-purple-100 flex justify-between items-center border-b border-purple-800/40">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span className="hidden sm:inline">24/7 Women Helpline & Emergency:</span>
            <span className="sm:hidden">Emergency:</span>
            <a href="tel:181" className="font-bold underline text-white hover:text-rose-200 transition-colors">181 (Women)</a>
            <span className="opacity-50">|</span>
            <a href="tel:112" className="font-bold underline text-white hover:text-rose-200 transition-colors">112 (All SOS)</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="hidden md:inline hover:text-white transition-colors">
              Cyber Crime Portal ↗
            </a>
            <a href="tel:1091" className="inline-flex items-center gap-1 text-white bg-rose-700 hover:bg-rose-600 px-2.5 py-0.5 rounded-full font-semibold transition-colors">
              <PhoneCall size={12} /> Police: 1091
            </a>
          </div>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3.5">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group" onClick={closeMenu}>
          <div className="relative">
            <img 
              src="/images/BraveSpeakLogoo.png" 
              alt="BraveSpeak Logo" 
              className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_2px_8px_rgba(214,180,252,0.4)]" 
            />
          </div>
          <div>
            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
              BraveSpeak
            </span>
            <span className="block text-[10px] tracking-wider uppercase text-purple-300/80 font-medium -mt-1">
              Voices of Justice & Hope
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center space-x-2">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-purple-700/60 text-white shadow-inner shadow-purple-500/30 border border-purple-500/40"
                      : "text-purple-200 hover:text-white hover:bg-purple-900/50"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right CTA / SOS Button */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/contact"
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#6A0DAD] to-purple-600 hover:from-purple-600 hover:to-[#6A0DAD] text-white rounded-full text-sm font-semibold shadow-md shadow-purple-900/40 hover:shadow-lg hover:scale-105 transition-all duration-300 border border-purple-400/30"
          >
            <ShieldAlert size={16} />
            <span>Get Immediate Help</span>
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          onClick={toggleMenu}
          className="lg:hidden p-2 text-purple-200 hover:text-white hover:bg-purple-900/60 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-[#2E003E] to-[#1a0024] text-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl border-l border-purple-800/50 flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        <div>
          <div className="flex justify-between items-center p-5 border-b border-purple-800/60">
            <div className="flex items-center gap-2">
              <img src="/images/BraveSpeakLogoo.png" alt="Logo" className="w-8 h-8" />
              <span className="font-bold text-lg text-white">BraveSpeak</span>
            </div>
            <button 
              onClick={closeMenu}
              className="p-2 text-purple-300 hover:text-white hover:bg-purple-900/60 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="flex flex-col p-4 space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link 
                  key={link.path}
                  to={link.path} 
                  onClick={closeMenu} 
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center justify-between ${
                    active
                      ? "bg-purple-700/60 text-white font-semibold border-l-4 border-purple-400"
                      : "text-purple-200 hover:bg-purple-900/50 hover:text-white"
                  }`}
                >
                  <span>{link.name}</span>
                  {active && <span className="w-2 h-2 rounded-full bg-purple-400"></span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Mobile Drawer Bottom SOS */}
        <div className="p-5 border-t border-purple-800/60 bg-purple-950/40 space-y-3">
          <p className="text-xs text-purple-300 font-semibold uppercase tracking-wider">Emergency Helplines</p>
          <div className="grid grid-cols-2 gap-2">
            <a href="tel:181" className="flex items-center justify-center gap-1.5 py-2 px-3 bg-rose-950/80 border border-rose-700/50 text-rose-200 rounded-lg text-xs font-bold hover:bg-rose-900 transition-colors">
              <PhoneCall size={14} /> 181 (Women)
            </a>
            <a href="tel:112" className="flex items-center justify-center gap-1.5 py-2 px-3 bg-purple-900 border border-purple-600/50 text-purple-100 rounded-lg text-xs font-bold hover:bg-purple-800 transition-colors">
              <PhoneCall size={14} /> 112 (SOS)
            </a>
          </div>
          <Link
            to="/contact"
            onClick={closeMenu}
            className="w-full py-3 bg-gradient-to-r from-[#6A0DAD] to-purple-600 hover:from-purple-600 hover:to-[#6A0DAD] text-white font-semibold rounded-xl text-center flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <ShieldAlert size={18} />
            <span>Get Support Now</span>
          </Link>
        </div>
      </div>
    </header>
  );
}