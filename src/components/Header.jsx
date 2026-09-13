import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Menu, X, PhoneCall, ShieldAlert, ChevronDown, 
  ShieldCheck, Scale, Lock, Users, BarChart3, Heart, Building2, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [toolsDropdown, setToolsDropdown] = useState(false);
  const [resourcesDropdown, setResourcesDropdown] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => {
    setIsOpen(false);
    setToolsDropdown(false);
    setResourcesDropdown(false);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setToolsDropdown(false);
        setResourcesDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  const toolItems = [
    {
      name: "Emergency Safety Toolkit",
      path: "/safety-toolkit",
      desc: "Fake call simulator, siren alarm & 1-tap GPS SOS",
      icon: ShieldAlert,
      badge: "Urgent SOS",
      color: "text-rose-400 bg-rose-500/10"
    },
    {
      name: "Interactive Legal Drafter",
      path: "/legal-assistant",
      desc: "Diagnose rights & generate Zero FIR / POSH complaints",
      icon: Scale,
      badge: "AI Drafter",
      color: "text-purple-400 bg-purple-500/10"
    },
    {
      name: "Digital Privacy & StopNCII",
      path: "/digital-safety",
      desc: "Privacy score audit, anti-blackmail & spy cam detector",
      icon: Lock,
      badge: "Cyber Defense",
      color: "text-cyan-400 bg-cyan-500/10"
    }
  ];

  const resourceItems = [
    {
      name: "Laws & Statutory Rights",
      path: "/laws",
      desc: "IPC, BNS 2023, POSH Act & women's legal rights",
      icon: Scale,
      color: "text-purple-400 bg-purple-500/10"
    },
    {
      name: "Safe Spaces & Crisis Directory",
      path: "/support-directory",
      desc: "Sakhi One Stop Centres, DLSA Free Aid & Mahila Thana",
      icon: Building2,
      color: "text-emerald-400 bg-emerald-500/10"
    },
    {
      name: "National Crime Statistics",
      path: "/statistics",
      desc: "NCRB trends, reporting frequency & data analytics",
      icon: BarChart3,
      color: "text-amber-400 bg-amber-500/10"
    }
  ];

  const isToolActive = toolItems.some((item) => location.pathname === item.path);
  const isResourceActive = resourceItems.some((item) => location.pathname === item.path);

  return (
    <header className="sticky top-0 z-50 bg-[#240032]/95 backdrop-blur-md border-b border-purple-900/60 shadow-lg shadow-purple-950/30" ref={navRef}>
      {/* Top Emergency Micro-Bar */}
      <div className="bg-gradient-to-r from-rose-950 via-purple-950 to-rose-950 px-4 py-1 text-xs text-purple-100 border-b border-purple-800/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span className="hidden sm:inline">24x7 Verified Helplines:</span>
            <span className="sm:hidden">24x7 SOS:</span>
            <a href="tel:181" className="font-bold underline text-white hover:text-rose-200 transition-colors">181 (Women)</a>
            <span className="opacity-40">|</span>
            <a href="tel:112" className="font-bold underline text-white hover:text-rose-200 transition-colors">112 (National SOS)</a>
            <span className="opacity-40">|</span>
            <a href="tel:1091" className="hidden md:inline font-bold underline text-white hover:text-rose-200 transition-colors">1091 (Police)</a>
          </div>

          <div className="flex items-center gap-3">
            <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="hidden md:inline hover:text-white transition-colors text-[11px] text-purple-200/90">
              Cyber Crime Portal ↗
            </a>
            <Link 
              to="/safety-toolkit" 
              className="inline-flex items-center gap-1 text-white bg-gradient-to-r from-rose-700 to-pink-700 hover:from-rose-600 hover:to-pink-600 px-2.5 py-0.5 rounded-full font-bold text-[11px] shadow-sm transition-all"
            >
              <ShieldAlert size={11} />
              <span>Instant Panic SOS</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3">
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
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
              BraveSpeak
            </span>
            <span className="block text-[9px] sm:text-[10px] tracking-wider uppercase text-purple-300/80 font-semibold -mt-0.5">
              Justice • Safety • Support
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Menu */}
        <ul className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          <li>
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all ${
                location.pathname === "/"
                  ? "bg-purple-800/80 text-white shadow-inner shadow-purple-500/20 border border-purple-500/30"
                  : "text-purple-200 hover:text-white hover:bg-purple-900/40"
              }`}
            >
              Home
            </Link>
          </li>

          {/* Safety & Tools Dropdown */}
          <li className="relative">
            <button
              onClick={() => {
                setToolsDropdown(!toolsDropdown);
                setResourcesDropdown(false);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                isToolActive || toolsDropdown
                  ? "bg-purple-800/80 text-white shadow-inner shadow-purple-500/20 border border-purple-500/30"
                  : "text-purple-200 hover:text-white hover:bg-purple-900/40"
              }`}
            >
              <ShieldAlert size={15} className="text-rose-400" />
              <span>Safety & Tools</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${toolsDropdown ? "rotate-180" : ""}`} />
            </button>

            {/* Tools Dropdown Menu */}
            <AnimatePresence>
              {toolsDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 mt-2 w-80 bg-[#1e002a] border border-purple-800/80 rounded-2xl shadow-2xl p-2 z-50 overflow-hidden"
                >
                  <div className="space-y-1">
                    {toolItems.map((item) => {
                      const Icon = item.icon;
                      const active = location.pathname === item.path;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={closeMenu}
                          className={`flex items-start gap-3 p-3 rounded-xl transition-all ${
                            active
                              ? "bg-purple-800/70 text-white border border-purple-600/40"
                              : "text-purple-200 hover:bg-purple-900/60 hover:text-white"
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${item.color} shrink-0 mt-0.5`}>
                            <Icon size={18} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-bold text-white">{item.name}</p>
                              {item.badge && (
                                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-purple-900 text-purple-200 border border-purple-700">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-purple-300/70 mt-0.5 leading-snug">{item.desc}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* Resources & Legal Dropdown */}
          <li className="relative">
            <button
              onClick={() => {
                setResourcesDropdown(!resourcesDropdown);
                setToolsDropdown(false);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                isResourceActive || resourcesDropdown
                  ? "bg-purple-800/80 text-white shadow-inner shadow-purple-500/20 border border-purple-500/30"
                  : "text-purple-200 hover:text-white hover:bg-purple-900/40"
              }`}
            >
              <Scale size={15} className="text-purple-400" />
              <span>Legal & Resources</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${resourcesDropdown ? "rotate-180" : ""}`} />
            </button>

            {/* Resources Dropdown Menu */}
            <AnimatePresence>
              {resourcesDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 mt-2 w-80 bg-[#1e002a] border border-purple-800/80 rounded-2xl shadow-2xl p-2 z-50 overflow-hidden"
                >
                  <div className="space-y-1">
                    {resourceItems.map((item) => {
                      const Icon = item.icon;
                      const active = location.pathname === item.path;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={closeMenu}
                          className={`flex items-start gap-3 p-3 rounded-xl transition-all ${
                            active
                              ? "bg-purple-800/70 text-white border border-purple-600/40"
                              : "text-purple-200 hover:bg-purple-900/60 hover:text-white"
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${item.color} shrink-0 mt-0.5`}>
                            <Icon size={18} />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-bold text-white">{item.name}</p>
                            <p className="text-[11px] text-purple-300/70 mt-0.5 leading-snug">{item.desc}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* Survivor Stories */}
          <li>
            <Link
              to="/survivorStories"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-all ${
                location.pathname === "/survivorStories"
                  ? "bg-purple-800/80 text-white shadow-inner shadow-purple-500/20 border border-purple-500/30"
                  : "text-purple-200 hover:text-white hover:bg-purple-900/40"
              }`}
            >
              <Heart size={14} className="text-pink-400" />
              <span>Stories</span>
            </Link>
          </li>

          {/* Contact & Support */}
          <li>
            <Link
              to="/contact"
              className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all ${
                location.pathname === "/contact"
                  ? "bg-purple-800/80 text-white shadow-inner shadow-purple-500/20 border border-purple-500/30"
                  : "text-purple-200 hover:text-white hover:bg-purple-900/40"
              }`}
            >
              Helplines & Help
            </Link>
          </li>
        </ul>

        {/* Right CTA Button */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/safety-toolkit"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white rounded-full text-xs font-bold shadow-md shadow-purple-950/40 hover:scale-105 transition-all border border-rose-400/30"
          >
            <ShieldAlert size={14} />
            <span>Emergency SOS</span>
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

      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Drawer Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-84 max-w-[88vw] bg-gradient-to-b from-[#240032] via-[#1a0024] to-[#0f0015] text-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl border-l border-purple-800/50 flex flex-col justify-between overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        <div className="p-5 space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-purple-800/60">
            <div className="flex items-center gap-2.5">
              <img src="/images/BraveSpeakLogoo.png" alt="Logo" className="w-8 h-8 object-contain" />
              <span className="font-extrabold text-lg text-white">BraveSpeak</span>
            </div>
            <button 
              onClick={closeMenu}
              className="p-2 text-purple-300 hover:text-white hover:bg-purple-900/60 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          {/* Quick Home Link */}
          <Link 
            to="/" 
            onClick={closeMenu} 
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
              location.pathname === "/" ? "bg-purple-800 text-white border-l-4 border-purple-400" : "text-purple-200 hover:bg-purple-900/40"
            }`}
          >
            <span>Home</span>
          </Link>

          {/* Section: Tactical Safety & Tools */}
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-rose-300/80 px-2 flex items-center gap-1.5">
              <ShieldAlert size={12} className="text-rose-400" /> Tactical Safety & Tools
            </p>
            <div className="space-y-1">
              {toolItems.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                      active ? "bg-purple-800 text-white border-l-4 border-purple-400" : "text-purple-200 hover:bg-purple-900/40 hover:text-white"
                    }`}
                  >
                    <Icon size={16} className="text-purple-300 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Section: Legal & Resources */}
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-purple-300/80 px-2 flex items-center gap-1.5">
              <Scale size={12} className="text-purple-400" /> Legal Rights & Information
            </p>
            <div className="space-y-1">
              {resourceItems.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                      active ? "bg-purple-800 text-white border-l-4 border-purple-400" : "text-purple-200 hover:bg-purple-900/40 hover:text-white"
                    }`}
                  >
                    <Icon size={16} className="text-purple-300 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Section: Community & Support */}
          <div className="space-y-1 pt-2 border-t border-purple-800/50">
            <Link
              to="/survivorStories"
              onClick={closeMenu}
              className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                location.pathname === "/survivorStories" ? "bg-purple-800 text-white border-l-4 border-purple-400" : "text-purple-200 hover:bg-purple-900/40"
              }`}
            >
              <Heart size={16} className="text-pink-400 shrink-0" />
              <span>Survivor Stories & Community</span>
            </Link>

            <Link
              to="/contact"
              onClick={closeMenu}
              className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                location.pathname === "/contact" ? "bg-purple-800 text-white border-l-4 border-purple-400" : "text-purple-200 hover:bg-purple-900/40"
              }`}
            >
              <PhoneCall size={16} className="text-purple-300 shrink-0" />
              <span>Helplines & Support Desk</span>
            </Link>
          </div>
        </div>

        {/* Mobile Drawer Bottom SOS */}
        <div className="p-5 border-t border-purple-800/60 bg-purple-950/60 space-y-3">
          <p className="text-[10px] text-purple-300 font-bold uppercase tracking-wider">24x7 Direct Helplines</p>
          <div className="grid grid-cols-2 gap-2">
            <a href="tel:181" className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-rose-950/90 border border-rose-700/60 text-rose-200 rounded-xl text-xs font-bold hover:bg-rose-900 transition-colors">
              <PhoneCall size={13} /> 181 (Women)
            </a>
            <a href="tel:112" className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-purple-900 border border-purple-600/50 text-purple-100 rounded-xl text-xs font-bold hover:bg-purple-800 transition-colors">
              <PhoneCall size={13} /> 112 (SOS)
            </a>
          </div>
          <Link
            to="/safety-toolkit"
            onClick={closeMenu}
            className="w-full py-3 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-bold rounded-xl text-center flex items-center justify-center gap-2 shadow-lg text-xs transition-all"
          >
            <ShieldAlert size={16} />
            <span>Open Safety Toolkit & GPS</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
