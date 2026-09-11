import React, { useState, useEffect } from "react";
import { 
  AlertTriangle, Clock, BarChart3, ArrowRight, Shield, Heart, Users, Scale, 
  BookOpen, PhoneCall, ShieldAlert, CheckCircle2, ChevronRight, Sparkles 
} from "lucide-react";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

export default function BraveSpeakDemo() {
  const [caseCount, setCaseCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCaseCount((prev) => prev + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const emergencyActions = [
    {
      title: "24/7 Emergency Helplines",
      desc: "Immediate connection with national police (112) and women helplines (181).",
      icon: PhoneCall,
      action: "Call 181",
      link: "tel:181",
      badge: "Emergency",
      color: "from-rose-500 to-red-600",
      isExternal: true
    },
    {
      title: "Know Indian Laws",
      desc: "Comprehensive legal guide covering POSH, IPC 354A-D, POCSO, and IT Act.",
      icon: Scale,
      action: "Explore Laws",
      link: "/laws",
      badge: "Legal Guide",
      color: "from-purple-600 to-indigo-600",
      isExternal: false
    },
    {
      title: "Survivor Stories",
      desc: "Read uplifting stories of resilience, recovery, and speaking out against injustice.",
      icon: Heart,
      action: "Read Stories",
      link: "/survivorStories",
      badge: "Community",
      color: "from-pink-600 to-purple-600",
      isExternal: false
    },
    {
      title: "Support & Reporting",
      desc: "Find verified NGO contacts, free legal aid (DLSA), and safe reporting steps.",
      icon: Shield,
      action: "Get Support",
      link: "/contact",
      badge: "Confidential",
      color: "from-violet-600 to-purple-700",
      isExternal: false
    }
  ];

  const emergencySteps = [
    {
      step: "01",
      title: "Get to a Safe Location",
      desc: "Move immediately to a well-lit, public space, police station, or trusted friend/relative's house.",
      tip: "Prioritize physical safety before taking legal actions."
    },
    {
      step: "02",
      title: "Call Emergency Services",
      desc: "Dial 112 or 181 immediately. Inform someone you trust about your current whereabouts.",
      tip: "Helpline calls are recorded and prioritized 24/7."
    },
    {
      step: "03",
      title: "Preserve Digital & Physical Evidence",
      desc: "Keep screenshots, call logs, messages, CCTV requests, and clothes unwashed if medical exam is needed.",
      tip: "Evidence strengthens any future FIR or complaint."
    },
    {
      step: "04",
      title: "File an FIR & Seek Legal Aid",
      desc: "File a Zero FIR at any police station regardless of jurisdiction. Free legal counsel is available via DLSA.",
      tip: "Zero FIR cannot be denied under Indian criminal law."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-purple-200 selection:text-purple-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2E003E] via-[#43095E] to-[#1F002B] text-white py-20 lg:py-28 px-4 sm:px-6 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 right-0 w-[32rem] h-[32rem] bg-rose-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 left-1/3 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Hero Left Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Safe badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs sm:text-sm font-medium backdrop-blur-md">
              <Sparkles size={14} className="text-purple-300" />
              <span>A Safe, Confidential Platform for Survivors & Allies</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
              Breaking the Silence, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-white bg-clip-text text-transparent">
                Demanding Justice.
              </span>
            </h1>

            <p className="text-purple-200/90 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Every voice matters. Every story deserves dignity. BraveSpeak provides comprehensive Indian legal rights, 24/7 verified emergency contacts, and an empowering space to heal.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start">
              <Link to="/laws">
                <motion.button 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-[#6A0DAD] hover:from-purple-600 hover:to-[#5c0b96] text-white rounded-full font-semibold shadow-lg shadow-purple-900/50 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border border-purple-400/40"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>Know Your Legal Rights</span>
                  <ArrowRight size={18} />
                </motion.button>
              </Link>
              
              <a href="tel:181">
                <motion.button 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-rose-600/90 hover:bg-rose-600 text-white rounded-full font-semibold shadow-lg shadow-rose-950/40 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border border-rose-400/40"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <PhoneCall size={18} />
                  <span>Call Emergency 181</span>
                </motion.button>
              </a>
            </div>

            {/* Quick Micro-stats in Hero */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-purple-800/50 max-w-md mx-auto lg:mx-0 text-center lg:text-left">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">24/7</div>
                <div className="text-xs text-purple-300">Helpline Access</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">100%</div>
                <div className="text-xs text-purple-300">Confidential</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">Free</div>
                <div className="text-xs text-purple-300">Legal Guidance</div>
              </div>
            </div>
          </motion.div>

          {/* Hero Right Graphic */}
          <motion.div 
            className="flex-1 flex justify-center relative w-full max-w-md lg:max-w-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative w-full max-w-md p-6 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl shadow-purple-950/60">
              <motion.img
                src="/images/BraveSpeak111.png"
                alt="BraveSpeak Emblem"
                className="w-full h-auto object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)] rounded-2xl"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
              />

              {/* Floating micro notification card */}
              <div className="absolute -bottom-5 -left-4 bg-[#1F002B]/90 backdrop-blur-md border border-purple-500/40 p-3.5 rounded-2xl shadow-xl flex items-center gap-3 text-left max-w-xs">
                <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-300 shrink-0">
                  <ShieldAlert size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Zero FIR Guaranteed</p>
                  <p className="text-[11px] text-purple-200">File an FIR at any police station in India.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4 Interactive Emergency & Support Pillars */}
      <section className="py-16 px-4 sm:px-6 -mt-10 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {emergencyActions.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-xl border border-purple-100 hover:border-purple-300 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
                whileHover={{ y: -6 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <IconComponent size={22} />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-purple-50 text-purple-800 rounded-full border border-purple-100">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#2E003E] mb-2 group-hover:text-purple-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                {item.isExternal ? (
                  <a
                    href={item.link}
                    className="inline-flex items-center justify-between text-sm font-semibold text-purple-700 group-hover:text-purple-900 pt-3 border-t border-slate-100"
                  >
                    <span>{item.action}</span>
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <Link
                    to={item.link}
                    className="inline-flex items-center justify-between text-sm font-semibold text-purple-700 group-hover:text-purple-900 pt-3 border-t border-slate-100"
                  >
                    <span>{item.action}</span>
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Alarming Statistics Section */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-purple-50/50 via-white to-purple-50/30">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-1.5 bg-purple-100/80 rounded-full text-xs font-bold uppercase tracking-wider text-purple-900 mb-3 border border-purple-200">
              National Crime Records Bureau (NCRB) Insights
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2E003E] tracking-tight">
              The Reality We Must Face Together
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mt-3">
              Data is more than numbers — it represents lived trauma, systemic gaps, and an urgent call for accountability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {/* Stat Card 1 */}
            <motion.div 
              className="bg-white rounded-3xl p-8 shadow-lg border border-purple-100 hover:shadow-2xl hover:border-purple-300 transition-all relative overflow-hidden"
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3.5 bg-rose-100 rounded-2xl text-rose-700">
                  <AlertTriangle size={28} />
                </div>
                <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                  Daily Average
                </span>
              </div>
              <h3 className="text-5xl font-extrabold bg-gradient-to-r from-rose-600 to-purple-700 bg-clip-text text-transparent mb-2">
                87+
              </h3>
              <p className="text-base font-bold text-[#2E003E]">Reported Cases Daily</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Over 31,000 cases registered yearly across India in official NCRB documentation.
              </p>
            </motion.div>

            {/* Stat Card 2 */}
            <motion.div 
              className="bg-white rounded-3xl p-8 shadow-lg border border-purple-100 hover:shadow-2xl hover:border-purple-300 transition-all relative overflow-hidden"
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3.5 bg-purple-100 rounded-2xl text-purple-700">
                  <Clock size={28} />
                </div>
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                  Frequency
                </span>
              </div>
              <h3 className="text-5xl font-extrabold bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent mb-2">
                1 / 16
              </h3>
              <p className="text-base font-bold text-[#2E003E]">Minutes per Reported Incident</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                One sexual offense case is registered on average every 16 minutes in India.
              </p>
            </motion.div>

            {/* Stat Card 3 */}
            <motion.div 
              className="bg-white rounded-3xl p-8 shadow-lg border border-purple-100 hover:shadow-2xl hover:border-purple-300 transition-all relative overflow-hidden"
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3.5 bg-indigo-100 rounded-2xl text-indigo-700">
                  <BarChart3 size={28} />
                </div>
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                  Live Session
                </span>
              </div>
              <h3 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-800 bg-clip-text text-transparent mb-2">
                +{caseCount}
              </h3>
              <p className="text-base font-bold text-[#2E003E]">Estimated Since You Opened This Page</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Real-time estimated counter illustrating the continuous urgency for systemic change.
              </p>
            </motion.div>
          </div>

          {/* Quick link to detailed statistics page */}
          <div className="text-center">
            <Link 
              to="/statistics"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-100 hover:bg-purple-200 text-[#2E003E] rounded-full font-semibold text-sm transition-colors"
            >
              <span>Explore Detailed Charts & Yearly Trends</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Emergency Action Guide: 4 Steps to Safety */}
      <section className="py-20 px-4 sm:px-6 bg-white border-y border-purple-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold px-3 py-1 bg-purple-100 text-purple-900 rounded-full uppercase tracking-wider">
              Survivor Guide
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2E003E] mt-3">
              What to Do in an Emergency: 4 Steps
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto mt-2 text-sm sm:text-base">
              Immediate practical actions to secure your physical safety, protect evidence, and initiate legal proceedings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emergencySteps.map((step, idx) => (
              <div 
                key={idx}
                className="bg-gradient-to-b from-purple-50/60 to-white p-6 rounded-2xl border border-purple-100 shadow-md hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl font-black text-purple-300 mb-3">{step.step}</div>
                  <h3 className="text-lg font-bold text-[#2E003E] mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{step.desc}</p>
                </div>
                <div className="pt-3 border-t border-purple-100/80 flex items-start gap-1.5 text-xs text-purple-900 font-medium">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>{step.tip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awareness & Community Action */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-slate-50 to-purple-50/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold px-3 py-1 bg-purple-100 text-purple-900 rounded-full uppercase tracking-wider">
              Collective Responsibility
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2E003E] mt-3">
              How Allies & Communities Can Help
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-7 rounded-2xl shadow-md border border-purple-100 hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-[#6A0DAD] flex items-center justify-center mb-5">
                <Heart size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#2E003E] mb-3">Listen & Validate</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Offer unconditional belief, avoid victim-blaming questions, and respect the survivor's autonomy on how they wish to proceed.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl shadow-md border border-purple-100 hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-[#6A0DAD] flex items-center justify-center mb-5">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#2E003E] mb-3">Educate & Intervene</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Learn active bystander intervention techniques. Call out sexist jokes, harassment, and harassment culture in workplaces and campuses.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl shadow-md border border-purple-100 hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-[#6A0DAD] flex items-center justify-center mb-5">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#2E003E] mb-3">Support Grassroots NGOs</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Support shelters, crisis response teams, and organizations providing free psychological counseling and legal representation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Call to Action */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-r from-[#2E003E] via-[#4F096E] to-[#2E003E] text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-xs font-semibold text-purple-200 border border-white/20">
            Join the Movement • #BreakTheSilence
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            You Are Not Alone. Your Voice Matters.
          </h2>
          <p className="text-purple-200 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you need confidential advice, want to read stories of courage, or want to understand your legal rights — we stand by you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link
              to="/survivorStories"
              className="px-8 py-4 bg-white text-[#2E003E] hover:bg-purple-50 rounded-full font-bold shadow-lg transition-all hover:scale-105"
            >
              Read Survivor Stories
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-purple-700 hover:bg-purple-600 text-white rounded-full font-bold shadow-lg border border-purple-400/40 transition-all hover:scale-105"
            >
              Get Confidential Help
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}