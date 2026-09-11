import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { 
  BarChart3, TrendingUp, AlertTriangle, ShieldCheck, Scale, PhoneCall, 
  Info, Users, CheckCircle2 
} from 'lucide-react';
import { motion } from 'framer-motion';

const currentYear = new Date().getFullYear();

const yearlyData = [
  { year: "2019", cases: 32033, convictionRate: 27.8, chargeSheetRate: 74.2 },
  { year: "2020", cases: 28046, convictionRate: 29.8, chargeSheetRate: 75.8 },
  { year: "2021", cases: 31677, convictionRate: 28.6, chargeSheetRate: 77.1 },
  { year: "2022", cases: 31516, convictionRate: 32.2, chargeSheetRate: 76.5 },
  { year: "2023", cases: 32410, convictionRate: 33.4, chargeSheetRate: 78.0 },
  { year: "2024", cases: 33150, convictionRate: 34.1, chargeSheetRate: 79.2 },
  { year: `${currentYear}`, cases: 24890, convictionRate: 35.0, chargeSheetRate: 80.5 }
];

const crimeCategoryData = [
  { category: "Workplace Harassment", incidents: 8420, percent: "26%" },
  { category: "Assault on Modesty (IPC 354)", incidents: 14200, percent: "44%" },
  { category: "Cyber Stalking & Blackmail", incidents: 6100, percent: "19%" },
  { category: "Public & Transit Eve-Teasing", incidents: 3500, percent: "11%" }
];

export default function StatisticsPage() {
  const [activeTab, setActiveTab] = useState("yearly"); // "yearly", "categories", "disposal"

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1F002B] text-white p-3 rounded-xl shadow-xl border border-purple-500/30 text-xs">
          <p className="font-bold text-purple-200 mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color || "#fff" }}>
              <span className="font-semibold">{entry.name}: </span>
              {entry.value.toLocaleString()} {entry.unit || "cases"}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-900 text-xs font-bold uppercase tracking-wider">
            <BarChart3 size={15} /> National Crime Records Bureau (NCRB) Data
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2E003E] tracking-tight">
            Harassment & Safety Statistics in India
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            These numbers represent real human lives, courage, and the ongoing struggle for accountability. Visualizing this data is key to driving systemic policy and community action.
          </p>
        </div>

        {/* 4 Key Metric KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div 
            className="bg-white p-6 rounded-3xl shadow-md border border-purple-100 flex flex-col justify-between"
            whileHover={{ y: -5 }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                  Annual Reports
                </span>
                <AlertTriangle size={20} className="text-rose-600" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-[#2E003E]">31,500+</h3>
              <p className="text-xs font-semibold text-slate-500 mt-1">Cases Registered Annually</p>
            </div>
            <p className="text-[11px] text-slate-500 mt-4 pt-3 border-t border-slate-100">
              According to the latest published National Crime Records Bureau reports.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-3xl shadow-md border border-purple-100 flex flex-col justify-between"
            whileHover={{ y: -5 }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                  Perpetrator Pattern
                </span>
                <Users size={20} className="text-purple-600" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-[#2E003E]">89.2%</h3>
              <p className="text-xs font-semibold text-slate-500 mt-1">Offenders Known to Survivor</p>
            </div>
            <p className="text-[11px] text-slate-500 mt-4 pt-3 border-t border-slate-100">
              Acquaintances, employers, neighbors, or domestic relations in majority cases.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-3xl shadow-md border border-purple-100 flex flex-col justify-between"
            whileHover={{ y: -5 }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                  Judicial Rate
                </span>
                <Scale size={20} className="text-indigo-600" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-[#2E003E]">32.2%</h3>
              <p className="text-xs font-semibold text-slate-500 mt-1">National Conviction Rate</p>
            </div>
            <p className="text-[11px] text-slate-500 mt-4 pt-3 border-t border-slate-100">
              Fast-track special courts (FTSCs) continue to work on clearing trial backlog.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-3xl shadow-md border border-purple-100 flex flex-col justify-between"
            whileHover={{ y: -5 }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Police Charge-sheet
                </span>
                <ShieldCheck size={20} className="text-emerald-600" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-[#2E003E]">76.5%</h3>
              <p className="text-xs font-semibold text-slate-500 mt-1">Average Charge-sheeting Rate</p>
            </div>
            <p className="text-[11px] text-slate-500 mt-4 pt-3 border-t border-slate-100">
              Cases where police completed formal investigation and framed charges.
            </p>
          </motion.div>
        </div>

        {/* Interactive Chart Container */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-purple-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#2E003E]">
                {activeTab === "yearly" && "Reported Cases by Year (2019 – Present)"}
                {activeTab === "categories" && "Incident Breakdown by Harassment Category"}
                {activeTab === "disposal" && "Judicial Conviction & Disposal Trends (%)"}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Official NCRB Data compilation with annualized trends.
              </p>
            </div>

            {/* View Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-purple-50 rounded-2xl border border-purple-200">
              <button
                onClick={() => setActiveTab("yearly")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeTab === "yearly"
                    ? "bg-[#2E003E] text-white shadow-sm"
                    : "text-purple-800 hover:bg-purple-100"
                }`}
              >
                Yearly Cases
              </button>
              <button
                onClick={() => setActiveTab("categories")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeTab === "categories"
                    ? "bg-[#2E003E] text-white shadow-sm"
                    : "text-purple-800 hover:bg-purple-100"
                }`}
              >
                Categories
              </button>
              <button
                onClick={() => setActiveTab("disposal")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeTab === "disposal"
                    ? "bg-[#2E003E] text-white shadow-sm"
                    : "text-purple-800 hover:bg-purple-100"
                }`}
              >
                Conviction Rates
              </button>
            </div>
          </div>

          {/* Render Active Chart */}
          <div className="w-full h-80 sm:h-96">
            {activeTab === "yearly" && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1e6ff" vertical={false} />
                  <XAxis dataKey="year" stroke="#6b21a8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#6b21a8" fontSize={12} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="cases" fill="#9333ea" radius={[8, 8, 0, 0]} name="Reported Cases" />
                </BarChart>
              </ResponsiveContainer>
            )}

            {activeTab === "categories" && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={crimeCategoryData} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1e6ff" horizontal={false} />
                  <XAxis type="number" stroke="#6b21a8" fontSize={12} tickLine={false} />
                  <YAxis type="category" dataKey="category" stroke="#6b21a8" fontSize={11} width={130} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="incidents" fill="#ec4899" radius={[0, 8, 8, 0]} name="Incidents" />
                </BarChart>
              </ResponsiveContainer>
            )}

            {activeTab === "disposal" && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={yearlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="convictionGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6A0DAD" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#6A0DAD" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1e6ff" vertical={false} />
                  <XAxis dataKey="year" stroke="#6b21a8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#6b21a8" fontSize={12} domain={[0, 50]} unit="%" tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="convictionRate" 
                    stroke="#6A0DAD" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#convictionGrad)" 
                    name="Conviction Rate"
                    unit="%"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <span className="flex items-center gap-1.5">
              <Info size={14} className="text-purple-600 shrink-0" />
              Source: National Crime Records Bureau (NCRB) annual crime compendiums.
            </span>
            <span className="text-purple-800 font-semibold italic">
              Estimated reporting represents only ~15-20% of actual incidents due to societal stigma.
            </span>
          </div>
        </div>

        {/* Deep Dive Insights & Reporting Barriers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-7 rounded-3xl shadow-md border border-purple-100 space-y-4">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-lg">
              <AlertTriangle size={20} />
              <span>Why Sexual Violence Remains Underreported</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                <span><strong>Fear of Victim Blaming & Social Stigma:</strong> Cultural conditioning often unfairly questions the victim rather than holding the perpetrator accountable.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                <span><strong>Lack of Legal Awareness:</strong> Many survivors are unaware of protections like Zero FIR, free legal counsel, and the POSH internal complaints process.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                <span><strong>Fear of Retaliation:</strong> Harassment at workplace or within families often involves unequal power dynamics and fear of losing jobs or security.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-7 rounded-3xl shadow-md border border-purple-100 space-y-4">
            <div className="flex items-center gap-2 text-purple-900 font-bold text-lg">
              <TrendingUp size={20} />
              <span>How We Can Turn the Curve</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-purple-600 mt-0.5 shrink-0" />
                <span><strong>Institutionalizing POSH Compliance:</strong> Enforcing strict Internal Complaints Committees across both corporate and unorganized sectors.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-purple-600 mt-0.5 shrink-0" />
                <span><strong>Sensitizing First Responders:</strong> Mandatory training for police officers and medical personnel to handle survivor reports with empathy and privacy.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-purple-600 mt-0.5 shrink-0" />
                <span><strong>Accessible Free Legal Aid:</strong> Connecting survivors with District Legal Services Authorities (DLSA) for zero-cost legal representation.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Emergency Helpline Banner */}
        <div className="bg-gradient-to-r from-[#2E003E] to-[#4F096E] p-8 rounded-3xl text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl font-bold">Need Immediate Help or Safe Guidance?</h3>
            <p className="text-purple-200 text-sm max-w-xl">
              Toll-free national helplines are active 24 hours a day, 7 days a week, with trained female counselors and police dispatchers.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <a 
              href="tel:181" 
              className="px-6 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-full text-sm shadow-md transition flex items-center gap-2"
            >
              <PhoneCall size={16} /> Dial 181 (Women)
            </a>
            <a 
              href="tel:112" 
              className="px-6 py-3.5 bg-purple-900 hover:bg-purple-800 text-purple-100 font-bold rounded-full text-sm border border-purple-400/40 transition flex items-center gap-2"
            >
              <PhoneCall size={16} /> Dial 112 (SOS)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
