import React, { useState, useEffect } from "react";
import { 
  AlertTriangle, Clock, BarChart3, ArrowRight, Shield, Heart, Users, Scale, 
  BookOpen, PhoneCall, ShieldAlert, CheckCircle2, ChevronRight, Sparkles,
  Phone, Eye, Lock, Award, FileText, ExternalLink, HelpCircle, X, Check
} from "lucide-react";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

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
      color: "from-rose-600 to-rose-700",
      textColor: "text-rose-100",
      badgeColor: "bg-rose-500/20 text-rose-200 border-rose-400/30"
    },
    {
      number: "112",
      name: "National SOS",
      subtitle: "All-in-One Emergency",
      desc: "Police, medical ambulance, and fire dispatch across all Indian states.",
      icon: ShieldAlert,
      color: "from-purple-700 to-[#2E003E]",
      textColor: "text-purple-100",
      badgeColor: "bg-purple-500/20 text-purple-200 border-purple-400/30"
    },
    {
      number: "1091",
      name: "Women Police Assistance",
      subtitle: "Dedicated Police Cell",
      desc: "Trained female police personnel for on-ground urgent intervention.",
      icon: Shield,
      color: "from-indigo-700 to-indigo-900",
      textColor: "text-indigo-100",
      badgeColor: "bg-indigo-500/20 text-indigo-200 border-indigo-400/30"
    },
    {
      number: "1930",
      name: "Cyber Crime Cell",
      subtitle: "Online Abuse & Blackmail",
      desc: "Emergency takedown of morphed photos, leaks, and cyber harassment.",
      icon: Lock,
      color: "from-violet-700 to-slate-900",
      textColor: "text-violet-100",
      badgeColor: "bg-violet-500/20 text-violet-200 border-violet-400/30"
    }
  ];

  const corePillars = [
    {
      title: "Know Your Legal Shield",
      subtitle: "Plain-English Legal Statutes",
      desc: "Demystifying Indian criminal and civil laws including POSH Act 2013, IPC 354A-D, POCSO, and IT Act sections.",
      icon: Scale,
      link: "/laws",
      linkText: "Explore Indian Laws",
      tag: "Statutory Rights",
      accent: "from-purple-600 to-indigo-600"
    },
    {
      title: "Survivor Voice Hub",
      subtitle: "Community Courage & Healing",
      desc: "Read real stories of resilience from survivors who stood up against injustice, or share your story anonymously.",
      icon: Heart,
      link: "/survivorStories",
      linkText: "Read Survivor Stories",
      tag: "Empowerment",
      accent: "from-pink-600 to-purple-600"
    },
    {
      title: "National Crime Analytics",
      subtitle: "Data Transparency",
      desc: "Interactive visual charts and official NCRB metrics tracking reporting frequencies, disposal rates, and gaps.",
      icon: BarChart3,
      link: "/statistics",
      linkText: "View Statistics Dashboard",
      tag: "NCRB Data",
      accent: "from-indigo-600 to-purple-800"
    },
    {
      title: "Free Legal Aid & Support",
      subtitle: "24/7 Verified Resources",
      desc: "Direct access to District Legal Services Authority (DLSA) free legal advocates, trauma therapists, and crisis centers.",
      icon: Users,
      link: "/contact",
      linkText: "Get Support & FAQs",
      tag: "Free Legal Counsel",
      accent: "from-rose-600 to-purple-700"
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
      {/* 1. ULTRA-MODERN HERO SECTION */}
      <section className="relative bg-gradient-to-br from-[#240032] via-[#38044f] to-[#160020] text-white pt-16 pb-24 lg:pt-24 lg:pb-32 px-4 sm:px-6 overflow-hidden">
        {/* Background Gradients & Ambient Glow */}
        <div className="absolute -top-32 -left-32 w-[34rem] h-[34rem] bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 -right-32 w-[38rem] h-[38rem] bg-rose-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 left-1/4 w-[30rem] h-[30rem] bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Hero Column */}
          <motion.div 
            className="flex-1 text-center lg:text-left space-y-7"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Safe platform badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-purple-200 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-lg shadow-black/20">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>100% Confidential • Free Legal Aid • Verified Emergency Helplines</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
              Break The Silence. <br />
              <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-rose-200 bg-clip-text text-transparent">
                Demand Your Justice.
              </span>
            </h1>

            <p className="text-purple-200/90 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              BraveSpeak empowers women across India with comprehensive legal rights, plain-English statutory guides, 24/7 emergency dispatch, and a safe survivor community.
            </p>

            {/* Hero Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start">
              <Link to="/laws">
                <motion.button 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#6A0DAD] via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-[#6A0DAD] text-white rounded-full font-bold shadow-xl shadow-purple-950/60 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border border-purple-400/40 text-base"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Scale size={20} />
                  <span>Know Your Legal Rights</span>
                  <ArrowRight size={18} />
                </motion.button>
              </Link>
              
              <a href="tel:181">
                <motion.button 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-full font-bold shadow-xl shadow-rose-950/60 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border border-rose-400/40 text-base"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <PhoneCall size={20} />
                  <span>24/7 Helpline: 181</span>
                </motion.button>
              </a>
            </div>

            {/* Quick Micro Value Chips */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="text-lg font-bold text-white">Zero FIR</div>
                <div className="text-[11px] text-purple-300">Any Police Station</div>
              </div>
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="text-lg font-bold text-white">Free Aid</div>
                <div className="text-[11px] text-purple-300">DLSA Court Lawyers</div>
              </div>
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="text-lg font-bold text-white">24x7 SOS</div>
                <div className="text-[11px] text-purple-300">Toll-Free Direct Dial</div>
              </div>
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="text-lg font-bold text-white">Anonymous</div>
                <div className="text-[11px] text-purple-300">Privacy Protected</div>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Visual Showcase */}
          <motion.div 
            className="flex-1 flex justify-center relative w-full max-w-md lg:max-w-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative w-full max-w-lg p-6 sm:p-8 bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl shadow-purple-950/80">
              <motion.img
                src="/images/BraveSpeak111.png"
                alt="BraveSpeak Emblem"
                className="w-full h-auto object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)] rounded-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
              />

              {/* Top Right Floating Badge */}
              <div className="absolute -top-4 -right-3 sm:-right-4 bg-[#1F002B]/95 backdrop-blur-md border border-purple-400/40 px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2.5">
                <ShieldCheck size={20} className="text-emerald-400" />
                <div>
                  <p className="text-xs font-bold text-white">Section 228A IPC</p>
                  <p className="text-[10px] text-purple-200">100% Identity Protection</p>
                </div>
              </div>

              {/* Bottom Left Floating Badge */}
              <div className="absolute -bottom-5 -left-3 sm:-left-5 bg-[#1F002B]/95 backdrop-blur-md border border-rose-500/40 p-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-left max-w-[260px]">
                <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-300 shrink-0">
                  <PhoneCall size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">National Women Helpline</p>
                  <p className="text-[11px] text-rose-200 font-bold">Dial 181 (Free 24x7)</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. 24/7 VERIFIED EMERGENCY DIRECT-DIAL RIBBON */}
      <section className="py-12 px-4 sm:px-6 -mt-12 relative z-30">
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
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold px-3 py-1 bg-purple-100 text-purple-900 rounded-full uppercase tracking-wider">
              Comprehensive Ecosystem
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2E003E] tracking-tight">
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
                  className="bg-white rounded-3xl p-7 shadow-md hover:shadow-2xl border border-purple-100 hover:border-purple-300 transition-all duration-300 flex flex-col justify-between group"
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

                    <h3 className="text-xl font-bold text-[#2E003E] group-hover:text-purple-700 transition-colors mb-1">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-semibold text-purple-600 mb-3">
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
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-purple-50/70 via-white to-purple-50/50 border-y border-purple-100">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold px-3 py-1 bg-rose-100 text-rose-800 rounded-full uppercase tracking-wider">
              National Crime Records Bureau (NCRB)
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2E003E] tracking-tight">
              The Reality We Cannot Ignore
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Behind every statistic is a human life, a story of struggle, and an urgent necessity for legal accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stat Card 1 */}
            <motion.div 
              className="bg-white rounded-3xl p-8 shadow-xl border border-purple-100 relative overflow-hidden"
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
              <h3 className="text-5xl font-black bg-gradient-to-r from-rose-600 to-purple-800 bg-clip-text text-transparent mb-2">
                87+
              </h3>
              <p className="text-base font-bold text-[#2E003E]">Cases Reported Daily in India</p>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Over 31,500 sexual violence cases are officially recorded every year in NCRB annual data compendiums.
              </p>
            </motion.div>

            {/* Stat Card 2 */}
            <motion.div 
              className="bg-white rounded-3xl p-8 shadow-xl border border-purple-100 relative overflow-hidden"
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
              <p className="text-base font-bold text-[#2E003E]">Minutes per Reported Offense</p>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                On average, one sexual offense or modesty assault is registered every 16 minutes in India.
              </p>
            </motion.div>

            {/* Stat Card 3 */}
            <motion.div 
              className="bg-white rounded-3xl p-8 shadow-xl border border-purple-100 relative overflow-hidden"
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
              <p className="text-base font-bold text-[#2E003E]">Estimated Since You Opened This Page</p>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                A real-time awareness counter emphasizing the constant urgency of speaking up and seeking justice.
              </p>
            </motion.div>
          </div>

          <div className="text-center pt-4">
            <Link
              to="/statistics"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#2E003E] hover:bg-purple-950 text-white rounded-full font-bold text-sm shadow-xl transition hover:scale-105"
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
            <span className="text-xs font-bold px-3 py-1 bg-purple-100 text-purple-900 rounded-full uppercase tracking-wider">
              Emergency Action Plan
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2E003E] tracking-tight">
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
                      ? "bg-gradient-to-b from-purple-900 to-[#2E003E] text-white shadow-2xl scale-[1.03] border-purple-500/50"
                      : "bg-purple-50/50 hover:bg-purple-50 text-slate-800 border-purple-100"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-4xl font-black ${isSelected ? "text-purple-300" : "text-purple-300/80"}`}>
                        {step.num}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-purple-400/20 text-purple-200 rounded-full border border-purple-400/30 uppercase">
                          Active Step
                        </span>
                      )}
                    </div>

                    <h3 className={`text-xl font-bold mb-2 ${isSelected ? "text-white" : "text-[#2E003E]"}`}>
                      {step.title}
                    </h3>
                    <p className={`text-xs leading-relaxed mb-4 ${isSelected ? "text-purple-200" : "text-slate-600"}`}>
                      {step.summary}
                    </p>
                  </div>

                  <div className={`pt-3 border-t text-[11px] font-medium flex items-start gap-1.5 ${
                    isSelected ? "border-purple-800 text-purple-200" : "border-purple-200/60 text-purple-900"
                  }`}>
                    <CheckCircle2 size={15} className={`shrink-0 mt-0.5 ${isSelected ? "text-emerald-400" : "text-purple-600"}`} />
                    <span>{step.actionTip}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Display Box for the Active Step */}
          <div className="bg-gradient-to-r from-purple-50 via-white to-purple-50 p-8 rounded-3xl border border-purple-200 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                  Detailed Guidance for Step {emergencySteps[activeStep].num}
                </span>
                <h3 className="text-2xl font-bold text-[#2E003E]">
                  {emergencySteps[activeStep].title}
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed max-w-2xl">
                  {emergencySteps[activeStep].details}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="tel:181"
                  className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-full font-bold text-xs shadow-md transition flex items-center gap-2"
                >
                  <PhoneCall size={14} /> Call 181 Now
                </a>
                <Link
                  to="/laws"
                  className="px-6 py-3 bg-[#2E003E] hover:bg-purple-900 text-white rounded-full font-bold text-xs shadow-md transition flex items-center gap-2"
                >
                  <Scale size={14} /> View All Laws
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FUNDAMENTAL SURVIVOR RIGHTS (INTERACTIVE EXPLORER) */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-[#2E003E] via-[#3F0558] to-[#1F002B] text-white">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold px-3 py-1 bg-purple-500/20 text-purple-200 rounded-full border border-purple-400/30 uppercase tracking-wider">
              Constitutional & Legal Rights
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              4 Non-Negotiable Rights of Every Survivor
            </h2>
            <p className="text-purple-200/90 text-base sm:text-lg">
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
                  <p className="text-purple-200/90 text-sm leading-relaxed">
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
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#2E003E] hover:bg-purple-50 rounded-full font-bold text-sm shadow-2xl transition hover:scale-105"
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
              <span className="text-xs font-bold px-3 py-1 bg-purple-100 text-purple-900 rounded-full uppercase tracking-wider">
                Real Journeys of Resilience
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2E003E] tracking-tight">
                Voices of Courage & Healing
              </h2>
              <p className="text-slate-600 text-base">
                Read how courageous women navigated harassment, exercised their legal rights, and rebuilt their strength.
              </p>
            </div>

            <Link
              to="/survivorStories"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-100 hover:bg-purple-200 text-[#2E003E] rounded-full font-bold text-xs transition self-start md:self-auto"
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
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-purple-100 hover:border-purple-300 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
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
                      <span className="px-3 py-1 bg-[#2E003E]/80 backdrop-blur-md text-white text-xs font-bold rounded-full border border-purple-400/30">
                        {story.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-[#2E003E] group-hover:text-purple-700 transition-colors">
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
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-r from-[#240032] via-[#480562] to-[#240032] text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-7">
          <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-xs font-bold text-purple-200 border border-white/20 uppercase tracking-wider">
            Join the Movement • #BreakTheSilence
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            You Are Not Alone. We Stand With You.
          </h2>
          <p className="text-purple-200 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you need confidential guidance, wish to report an incident, or want to support someone in distress, BraveSpeak is always here for you.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <button
              onClick={() => setPledgeTaken(true)}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-500 text-white rounded-full font-bold shadow-2xl transition hover:scale-105 flex items-center gap-2 cursor-pointer text-sm"
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
              className="px-8 py-4 bg-white text-[#2E003E] hover:bg-purple-50 rounded-full font-bold shadow-2xl transition hover:scale-105 text-sm"
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