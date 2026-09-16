import React, { useState, useEffect } from "react";
import { 
  AlertTriangle, Clock, BarChart3, ArrowRight, Shield, Heart, Users, Scale, 
  BookOpen, PhoneCall, ShieldAlert, ShieldCheck, CheckCircle2, ChevronRight, Sparkles,
  Phone, Eye, Lock, Award, FileText, ExternalLink, HelpCircle, X, Check
} from "lucide-react";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import CrimeLawAwareness from "../components/CrimeLawAwareness";

export default function Homepage() {
  const [caseCount, setCaseCount] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [pledgeTaken, setPledgeTaken] = useState(false);
  const [selectedStoryModal, setSelectedStoryModal] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCaseCount((prev) => prev + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const emergencyHelplines = [
    {
      number: "181",
      name: "Women Helpline",
      subtitle: "24x7 Toll-Free Emergency",
      desc: "Instant connection for rescue, counseling, and crisis response.",
      icon: PhoneCall,
      color: "from-rose-600 via-rose-700 to-pink-800",
      textColor: "text-rose-100",
      badgeColor: "bg-white/20 text-white border-white/30"
    },
    {
      number: "112",
      name: "National SOS",
      subtitle: "All-in-One Emergency",
      desc: "Police, medical ambulance, and fire dispatch across all Indian states.",
      icon: ShieldAlert,
      color: "from-purple-800 via-indigo-900 to-[#2A0840]",
      textColor: "text-purple-100",
      badgeColor: "bg-purple-400/20 text-purple-200 border-purple-300/30"
    },
    {
      number: "1091",
      name: "Women Police Assistance",
      subtitle: "Dedicated Police Cell",
      desc: "Trained female police personnel for on-ground urgent intervention.",
      icon: Shield,
      color: "from-indigo-700 via-indigo-800 to-slate-900",
      textColor: "text-indigo-100",
      badgeColor: "bg-indigo-400/20 text-indigo-200 border-indigo-300/30"
    },
    {
      number: "1930",
      name: "Cyber Crime Cell",
      subtitle: "Online Abuse & Blackmail",
      desc: "Emergency takedown of morphed photos, leaks, and cyber harassment.",
      icon: Lock,
      color: "from-violet-800 via-purple-900 to-slate-900",
      textColor: "text-violet-100",
      badgeColor: "bg-violet-400/20 text-violet-200 border-violet-300/30"
    }
  ];

  const corePillars = [
    {
      title: "Interactive Legal Drafter",
      subtitle: "FIR & Complaint Generator",
      desc: "Instant customized formal complaint and Zero FIR petitions formatted to Indian criminal and workplace POSH standards.",
      icon: FileText,
      link: "/legal-assistant",
      linkText: "Draft Legal Complaint",
      tag: "AI Legal Drafter",
      accent: "from-purple-600 to-indigo-600"
    },
    {
      title: "Tactical Safety & SOS Suite",
      subtitle: "Offline Emergency Toolkit",
      desc: "Simulate incoming calls to safely exit uncomfortable situations, trigger loud deterrence sirens, and dispatch GPS coordinates.",
      icon: ShieldAlert,
      link: "/safety-toolkit",
      linkText: "Open Safety Toolkit",
      tag: "1-Tap GPS & Alarm",
      accent: "from-rose-600 to-red-700"
    },
    {
      title: "Safe Spaces & Crisis Directory",
      subtitle: "Verified Support Centers",
      desc: "Instant search for 24/7 Sakhi One Stop Centres, DLSA Free Legal Aid desks, and All-Women Police Stations across India.",
      icon: Users,
      link: "/support-directory",
      linkText: "Find Nearest Crisis Center",
      tag: "Verified Desks",
      accent: "from-emerald-600 to-teal-700"
    },
    {
      title: "Digital Privacy & Cyber Shield",
      subtitle: "Anti-Blackmail & StopNCII",
      desc: "Interactive privacy health audit, non-consensual image removal guide via StopNCII hashes, and spy camera detection tips.",
      icon: Lock,
      link: "/digital-safety",
      linkText: "Audit Privacy Score",
      tag: "StopNCII & Cyber",
      accent: "from-indigo-600 to-cyan-700"
    },
    {
      title: "Statutory Laws & Rights",
      subtitle: "Plain-English IPC & BNS",
      desc: "Demystifying Indian criminal and civil laws including POSH Act 2013, IPC 354A-D, POCSO, and IT Act sections.",
      icon: Scale,
      link: "/laws",
      linkText: "Explore Indian Laws",
      tag: "Statutory Rights",
      accent: "from-violet-600 to-purple-800"
    },
    {
      title: "Survivor Voice Hub",
      subtitle: "Community Courage & Healing",
      desc: "Read real stories of resilience from survivors who stood up against injustice, or share your story safely and anonymously.",
      icon: Heart,
      link: "/survivorStories",
      linkText: "Read Survivor Stories",
      tag: "Empowerment",
      accent: "from-pink-600 to-rose-600"
    }
  ];

  const emergencySteps = [
    {
      num: "01",
      title: "Ensure Immediate Physical Safety",
      summary: "Move to a well-lit public area, nearest police station, or trusted place.",
      details: "Your physical security is the first priority. If pursued, enter any open commercial establishment, metro station, or crowded shop and alert staff.",
      actionTip: "Share your live WhatsApp/Google Maps location with at least two trusted emergency contacts."
    },
    {
      num: "02",
      title: "Call National Emergency Numbers",
      summary: "Dial 112 (National SOS) or 181 (Women Helpline) immediately.",
      details: "Helpline calls are recorded, geo-tagged, and dispatched with high priority. Clearly state your exact location, landmarks, and current situation.",
      actionTip: "If speaking is unsafe, send an SOS through the 112 India app or state emergency women safety apps."
    },
    {
      num: "03",
      title: "Preserve Critical Digital & Physical Evidence",
      summary: "Capture screenshots, keep messages, call logs, and do not wash evidence.",
      details: "For cyber harassment, capture full screenshots showing URLs, timestamps, sender handles. For physical assault, seek immediate medical examination at a hospital.",
      actionTip: "Request surrounding CCTV footage preservation from shopkeepers or building security as soon as possible."
    },
    {
      num: "04",
      title: "File a Zero FIR & Request Free Legal Counsel",
      summary: "File an FIR at any police station in India without jurisdiction barrier.",
      details: "A Zero FIR cannot be denied under Indian criminal law. Request free legal representation from the District Legal Services Authority (DLSA).",
      actionTip: "You have the statutory right to have your statement recorded privately by a female police officer."
    }
  ];

  const fundamentalRights = [
    {
      title: "1. Right to Zero FIR",
      section: "Section 154 CrPC",
      desc: "A victim of sexual harassment or violence can file an FIR at ANY police station in India, regardless of where the crime took place. The police must register it and transfer it to the jurisdiction station.",
      highlight: "Police cannot refuse to register your complaint."
    },
    {
      title: "2. Absolute Privacy of Identity",
      section: "Section 228A IPC",
      desc: "Disclosing the name, photo, workplace, or any information that exposes the identity of a sexual offense survivor is a non-bailable criminal offense punishable by up to 2 years in prison.",
      highlight: "Your identity remains confidential throughout the trial."
    },
    {
      title: "3. Statement Before Female Officer",
      section: "Section 164 CrPC",
      desc: "A woman survivor has the legal right to have her statement recorded by a woman police officer at the survivor's residence or a location of her choice, in the presence of legal counsel or family.",
      highlight: "You cannot be forced into intimidating police station interrogations."
    },
    {
      title: "4. 100% Free Legal Representation",
      section: "Legal Services Authorities Act, 1987",
      desc: "All women in India, regardless of income, caste, or background, are legally entitled to free legal counsel and court representation provided by the District Legal Services Authority (DLSA).",
      highlight: "Free legal advocacy is your constitutional guarantee."
    }
  ];

  const featuredStories = [
    {
      title: "Breaking the Workplace Silence",
      category: "Workplace Courage",
      author: "Ananya S.",
      readTime: "3 min read",
      preview: "When discriminatory remarks and advances started at my firm, I felt isolated. After learning about the POSH Act, I documented everything and filed a complaint with the ICC...",
      fullStory: "When discriminatory remarks and inappropriate advances started at my firm, I felt completely isolated. After learning about the POSH Internal Complaints Committee, I documented everything and filed a formal complaint. The process was hard, but it resulted in corrective action and created safer policies for every woman in our team.",
      img: "/images/news_6.png"
    },
    {
      title: "Taking on Cyber Blackmail & Winning",
      category: "Cyber Safety",
      author: "Anonymous",
      readTime: "3 min read",
      preview: "My private photos were leaked and used to blackmail me. Instead of giving in, I preserved all screenshots and called the 1930 helpline...",
      fullStory: "My private photos were leaked and used to blackmail me for money. Instead of giving in, I took screenshots and immediately contacted cybercrime.gov.in and the 1930 helpline. The cyber cell acted swiftly to take down the content and identify the perpetrator.",
      img: "/images/news_8.png"
    },
    {
      title: "A Fresh Start After Years of Abuse",
      category: "Legal Victory",
      author: "Sunita R.",
      readTime: "5 min read",
      preview: "With the assistance of the District Legal Services Authority (DLSA) providing free legal counsel, I secured a protection order and financial freedom...",
      fullStory: "With the assistance of the District Legal Services Authority (DLSA) providing free legal counsel, I was able to secure a protection order and financial independence. Freedom is real, and help is out there.",
      img: "/images/news_9.png"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-purple-200 selection:text-purple-900">
      {/* 1. CLEAN, MODERN & BRIGHT HERO SECTION */}
      <section className="relative bg-gradient-to-b from-purple-50/80 via-slate-50 to-white text-slate-900 pt-16 pb-20 lg:pt-20 lg:pb-28 px-4 sm:px-6 border-b border-slate-200/80 overflow-hidden">
        {/* Subtle Decorative Ambient Glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[48rem] h-80 bg-purple-200/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Column: Heading & Value Proposition */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            {/* Trust & Confidentiality Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-900 text-xs font-bold uppercase tracking-wider shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span>100% Confidential • Free Legal Aid • 24/7 Crisis Dispatch</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-slate-950">
              Break The Silence. <br />
              <span className="bg-gradient-to-r from-purple-800 via-purple-700 to-indigo-700 bg-clip-text text-transparent">
                Demand Your Justice.
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              BraveSpeak provides women across India with plain-English statutory rights, official Zero FIR drafters, emergency tactical safety tools, and verified institutional support.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                to="/laws"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white rounded-full text-sm font-bold shadow-lg shadow-purple-900/20 hover:scale-105 transition-all cursor-pointer"
              >
                <Scale size={18} />
                <span>Know Your Legal Rights</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/safety-toolkit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-full text-sm font-bold shadow-sm border border-rose-200 hover:scale-105 transition-all cursor-pointer"
              >
                <ShieldAlert size={18} className="text-rose-600" />
                <span>Emergency Safety Toolkit</span>
              </Link>

              <Link
                to="/legal-assistant"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 rounded-full text-sm font-bold border border-slate-300 shadow-sm hover:scale-105 transition-all cursor-pointer"
              >
                <FileText size={18} className="text-purple-700" />
                <span>Draft Zero FIR / Complaint</span>
              </Link>
            </div>

            {/* Micro Highlights Banner */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-600" /> Free DLSA Court Advocates
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-600" /> Universal Zero FIR
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-600" /> Identity Protected under 228A IPC
              </span>
            </div>
          </div>

          {/* Right Column: Clean Institutional Guarantees Card */}
          <div className="w-full max-w-md lg:max-w-lg bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-xl shadow-purple-950/5 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <img 
                  src="/images/BraveSpeakLogoo.png" 
                  alt="Logo" 
                  className="w-8 h-8 object-contain" 
                />
                <span className="font-bold text-sm tracking-wide text-[#2E003E] uppercase">
                  Statutory Protections
                </span>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Verified Indian Law
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 bg-purple-50/60 rounded-2xl border border-purple-100 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-purple-100 text-purple-800 shrink-0 mt-0.5">
                  <Scale size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Right to Zero FIR (Sec 154 CrPC)</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    File at any police station across India without jurisdiction barrier; police cannot refuse.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-indigo-50/60 rounded-2xl border border-indigo-100 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-indigo-100 text-indigo-800 shrink-0 mt-0.5">
                  <Lock size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Absolute Privacy (Sec 228A IPC)</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    Revealing a survivor's name or identity is a non-bailable offense with up to 2 years imprisonment.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-rose-50/60 rounded-2xl border border-rose-100 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-rose-100 text-rose-800 shrink-0 mt-0.5">
                  <PhoneCall size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">24x7 Emergency Helplines</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    Dial <strong>181</strong> (Women Helpline) or <strong>112</strong> (National SOS) for immediate rescue dispatch.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs font-semibold">
              <Link to="/laws" className="text-purple-700 hover:text-purple-900 underline flex items-center gap-1">
                <span>View all 12+ harassment statutes</span>
                <ChevronRight size={13} />
              </Link>
              <Link to="/contact" className="text-rose-600 hover:text-rose-800">
                Get Helpline Support →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 24/7 VERIFIED EMERGENCY DIRECT-DIAL RIBBON */}
      <section className="pt-8 pb-12 sm:pt-12 sm:pb-16 px-4 sm:px-6 mt-6 sm:mt-10 relative z-30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {emergencyHelplines.map((helpline, idx) => {
              const IconComp = helpline.icon;
              return (
                <motion.a
                  key={idx}
                  href={`tel:${helpline.number}`}
                  className={`p-6 rounded-3xl bg-gradient-to-br ${helpline.color} text-white shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group border border-white/15`}
                  whileHover={{ y: -6, scale: 1.02 }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                        <IconComp size={24} className="text-white" />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${helpline.badgeColor}`}>
                        {helpline.subtitle}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1">
                      {helpline.name}
                    </h3>
                    <p className={`text-xs ${helpline.textColor} opacity-90 leading-relaxed mb-4`}>
                      {helpline.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/20 flex items-center justify-between">
                    <span className="text-2xl font-black text-white">
                      Dial {helpline.number}
                    </span>
                    <span className="text-xs font-bold text-white group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Call <ChevronRight size={14} />
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. FOUR CORE SUPPORT PILLARS */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-slate-100/60 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold px-3 py-1 bg-purple-100 text-purple-900 rounded-full border border-purple-200 uppercase tracking-wider">
              Comprehensive Ecosystem
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Everything You Need to Stand Strong
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Navigating harassment and trauma requires knowledge, community, and fast action. BraveSpeak provides every critical pillar in one secure place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {corePillars.map((pillar, idx) => {
              const IconComponent = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-7 shadow-sm hover:shadow-xl border border-slate-200/80 hover:border-purple-300 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.accent} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                        <IconComponent size={26} />
                      </div>
                      <span className="text-[11px] font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                        {pillar.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors mb-1">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-semibold text-purple-700 mb-3">
                      {pillar.subtitle}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {pillar.desc}
                    </p>
                  </div>

                  <Link
                    to={pillar.link}
                    className="inline-flex items-center justify-between text-sm font-bold text-purple-700 group-hover:text-purple-950 pt-4 border-t border-slate-100 transition"
                  >
                    <span>{pillar.linkText}</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. ALARMING CRIME REALITY DASHBOARD */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-white via-purple-50/30 to-slate-50 border-b border-slate-200/70">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold px-3 py-1 bg-rose-100 text-rose-800 rounded-full border border-rose-200 uppercase tracking-wider">
              National Crime Records Bureau (NCRB)
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              The Reality We Cannot Ignore
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Behind every statistic is a human life, a story of struggle, and an urgent necessity for legal accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stat Card 1 */}
            <motion.div 
              className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl border border-slate-200/80 hover:border-rose-200 transition-all relative overflow-hidden"
              whileHover={{ y: -6 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3.5 bg-rose-100 rounded-2xl text-rose-700">
                  <AlertTriangle size={28} />
                </div>
                <span className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                  Daily Registered
                </span>
              </div>
              <h3 className="text-5xl font-black bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
                87+
              </h3>
              <p className="text-base font-bold text-slate-900">Cases Reported Daily in India</p>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Over 31,500 sexual violence cases are officially recorded every year in NCRB annual data compendiums.
              </p>
            </motion.div>

            {/* Stat Card 2 */}
            <motion.div 
              className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl border border-slate-200/80 hover:border-purple-200 transition-all relative overflow-hidden"
              whileHover={{ y: -6 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3.5 bg-purple-100 rounded-2xl text-purple-700">
                  <Clock size={28} />
                </div>
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                  National Frequency
                </span>
              </div>
              <h3 className="text-5xl font-black bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent mb-2">
                1 / 16
              </h3>
              <p className="text-base font-bold text-slate-900">Minutes per Reported Offense</p>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                On average, one sexual offense or modesty assault is registered every 16 minutes in India.
              </p>
            </motion.div>

            {/* Stat Card 3 */}
            <motion.div 
              className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl border border-slate-200/80 hover:border-indigo-200 transition-all relative overflow-hidden"
              whileHover={{ y: -6 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3.5 bg-indigo-100 rounded-2xl text-indigo-700">
                  <BarChart3 size={28} />
                </div>
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                  Live Session
                </span>
              </div>
              <h3 className="text-5xl font-black bg-gradient-to-r from-indigo-600 to-purple-800 bg-clip-text text-transparent mb-2">
                +{caseCount}
              </h3>
              <p className="text-base font-bold text-slate-900">Estimated Since You Opened This Page</p>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                A real-time awareness counter emphasizing the constant urgency of speaking up and seeking justice.
              </p>
            </motion.div>
          </div>

          <div className="text-center pt-4">
            <Link
              to="/statistics"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#290B3D] to-purple-900 hover:from-purple-950 hover:to-[#290B3D] text-white rounded-full font-bold text-sm shadow-xl transition hover:scale-105"
            >
              <span>Explore Full Statistics & Yearly Charts</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE 4-STEP EMERGENCY SAFETY GUIDE */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold px-3 py-1 bg-purple-100 text-purple-900 rounded-full border border-purple-200 uppercase tracking-wider">
              Emergency Action Plan
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              What to Do in an Emergency: 4 Steps
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Click on each step below to view crucial safety actions, legal rights, and practical evidence tips.
            </p>
          </div>

          {/* Interactive Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {emergencySteps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-7 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-gradient-to-b from-[#290B3D] to-purple-950 text-white shadow-xl scale-[1.03] border-purple-400/40"
                      : "bg-slate-50 hover:bg-purple-50/50 text-slate-800 border-slate-200/80 hover:border-purple-200"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-4xl font-black ${isSelected ? "text-purple-300" : "text-purple-400/70"}`}>
                        {step.num}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-white/20 text-purple-200 rounded-full border border-white/20 uppercase">
                          Active Step
                        </span>
                      )}
                    </div>

                    <h3 className={`text-xl font-bold mb-2 ${isSelected ? "text-white" : "text-slate-900"}`}>
                      {step.title}
                    </h3>
                    <p className={`text-xs leading-relaxed mb-4 ${isSelected ? "text-purple-200" : "text-slate-600"}`}>
                      {step.summary}
                    </p>
                  </div>

                  <div className={`pt-3 border-t text-[11px] font-medium flex items-start gap-1.5 ${
                    isSelected ? "border-purple-800/80 text-purple-200" : "border-slate-200 text-purple-900"
                  }`}>
                    <CheckCircle2 size={15} className={`shrink-0 mt-0.5 ${isSelected ? "text-emerald-400" : "text-purple-600"}`} />
                    <span>{step.actionTip}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Display Box for the Active Step */}
          <div className="bg-gradient-to-r from-purple-50/80 via-white to-purple-50/60 p-8 rounded-3xl border border-purple-200/80 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                  Detailed Guidance for Step {emergencySteps[activeStep].num}
                </span>
                <h3 className="text-2xl font-bold text-slate-900">
                  {emergencySteps[activeStep].title}
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed max-w-2xl">
                  {emergencySteps[activeStep].details}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="tel:181"
                  className="px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white rounded-full font-bold text-xs shadow-md transition flex items-center gap-2"
                >
                  <PhoneCall size={14} /> Call 181 Now
                </a>
                <Link
                  to="/laws"
                  className="px-6 py-3 bg-gradient-to-r from-[#290B3D] to-purple-900 hover:from-purple-900 hover:to-[#290B3D] text-white rounded-full font-bold text-xs shadow-md transition flex items-center gap-2"
                >
                  <Scale size={14} /> View All Laws
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CRIME TO LAW AWARENESS SECTION */}
      <CrimeLawAwareness />

      {/* 6. FUNDAMENTAL SURVIVOR RIGHTS (INTERACTIVE EXPLORER) */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-[#290B3D] via-[#3E0E59] to-[#180424] text-white">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold px-3 py-1 bg-white/10 text-purple-200 rounded-full border border-white/20 uppercase tracking-wider">
              Constitutional & Legal Rights
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              4 Non-Negotiable Rights of Every Survivor
            </h2>
            <p className="text-purple-100/90 text-base sm:text-lg">
              Knowledge is your greatest shield. Under Indian law, these 4 protections are guaranteed by statute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fundamentalRights.map((right, idx) => (
              <div 
                key={idx}
                className="p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/15 shadow-xl hover:bg-white/15 transition-all duration-300 space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                      {right.section}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center text-purple-200 font-bold text-xs">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {right.title}
                  </h3>
                  <p className="text-purple-100/90 text-sm leading-relaxed">
                    {right.desc}
                  </p>
                </div>

                <div className="p-3 bg-white/10 rounded-2xl border border-white/10 text-xs font-semibold text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
                  <span>{right.highlight}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              to="/laws"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-950 hover:bg-purple-50 rounded-full font-bold text-sm shadow-2xl transition hover:scale-105"
            >
              <Scale size={18} />
              <span>Explore Complete Indian Laws & Penalties Guide</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FEATURED SURVIVOR STORIES SPOTLIGHT */}
      <section className="py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold px-3 py-1 bg-purple-100 text-purple-900 rounded-full border border-purple-200 uppercase tracking-wider">
                Real Journeys of Resilience
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Voices of Courage & Healing
              </h2>
              <p className="text-slate-600 text-base">
                Read how courageous women navigated harassment, exercised their legal rights, and rebuilt their strength.
              </p>
            </div>

            <Link
              to="/survivorStories"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-100 hover:bg-purple-200 text-purple-950 rounded-full font-bold text-xs transition self-start md:self-auto"
            >
              <span>View All Community Stories</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredStories.map((story, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedStoryModal(story)}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/80 hover:border-purple-300 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-purple-950">
                    <img
                      src={story.img}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = '/images/news_3.jpg'; }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/20">
                        {story.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                      "{story.preview}"
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-purple-900">By {story.author}</span>
                  <span className="text-purple-700 font-bold group-hover:underline">Read Full Story →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. COMMUNITY PLEDGE & INSPIRING CALL TO ACTION BANNER */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-r from-[#290B3D] via-[#4F136E] to-[#290B3D] text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-7">
          <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-xs font-bold text-purple-200 border border-white/20 uppercase tracking-wider">
            Join the Movement • #BreakTheSilence
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            You Are Not Alone. We Stand With You.
          </h2>
          <p className="text-purple-100/90 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you need confidential guidance, wish to report an incident, or want to support someone in distress, BraveSpeak is always here for you.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <button
              onClick={() => setPledgeTaken(true)}
              className="px-8 py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white rounded-full font-bold shadow-2xl transition hover:scale-105 flex items-center gap-2 cursor-pointer text-sm"
            >
              {pledgeTaken ? (
                <>
                  <Check size={18} />
                  <span>Pledge Taken! Thank You for Standing Strong</span>
                </>
              ) : (
                <>
                  <Heart size={18} className="fill-white" />
                  <span>Take the #BreakTheSilence Pledge</span>
                </>
              )}
            </button>

            <Link
              to="/contact"
              className="px-8 py-4 bg-white text-purple-950 hover:bg-purple-50 rounded-full font-bold shadow-2xl transition hover:scale-105 text-sm"
            >
              Get Confidential Help & Support
            </Link>
          </div>
        </div>
      </section>

      {/* Story Quick-Read Modal */}
      <AnimatePresence>
        {selectedStoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl border border-purple-100 space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedStoryModal(null)}
                className="absolute top-5 right-5 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <span className="text-xs font-bold px-3 py-1 bg-purple-100 text-purple-900 rounded-full">
                {selectedStoryModal.category}
              </span>

              <h2 className="text-2xl font-bold text-[#2E003E]">
                {selectedStoryModal.title}
              </h2>

              <p className="text-xs text-slate-500 font-semibold">
                By {selectedStoryModal.author} • {selectedStoryModal.readTime}
              </p>

              <div className="h-56 rounded-2xl overflow-hidden shadow">
                <img
                  src={selectedStoryModal.img}
                  alt={selectedStoryModal.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                {selectedStoryModal.fullStory}
              </p>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedStoryModal(null)}
                  className="px-6 py-2 bg-[#2E003E] text-white rounded-full font-semibold text-xs hover:bg-purple-900 transition"
                >
                  Close Story
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}