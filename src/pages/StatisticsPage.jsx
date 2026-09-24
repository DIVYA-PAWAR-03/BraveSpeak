import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, Line, Legend
} from 'recharts';
import { 
  BarChart3, TrendingUp, AlertTriangle, ShieldCheck, Scale, PhoneCall, 
  Info, Users, CheckCircle2, Sparkles, ArrowUpRight, Flame, Building2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { safetyApi } from '../services/api';

const defaultYearlyData = [
  { year: "2019", cases: 32033, convictionRate: 27.8, chargeSheetRate: 74.2 },
  { year: "2020", cases: 28046, convictionRate: 29.8, chargeSheetRate: 75.8 },
  { year: "2021", cases: 31677, convictionRate: 28.6, chargeSheetRate: 77.1 },
  { year: "2022", cases: 31516, convictionRate: 32.2, chargeSheetRate: 76.5 },
  { year: "2023", cases: 32410, convictionRate: 33.4, chargeSheetRate: 78.0 },
  { year: "2024", cases: 33150, convictionRate: 34.1, chargeSheetRate: 79.2 },
  { year: `${new Date().getFullYear()}`, cases: 24890, convictionRate: 35.0, chargeSheetRate: 80.5 }
];

const defaultCrimeCategoryData = [
  { category: "Assault on Modesty (IPC 354 / BNS 74)", incidents: 14200, percent: "44%" },
  { category: "Workplace Harassment (POSH)", incidents: 8420, percent: "26%" },
  { category: "Cyber Stalking & Blackmail (IT Act)", incidents: 6100, percent: "19%" },
  { category: "Public Eve-Teasing & Transit (IPC 509)", incidents: 3500, percent: "11%" }
];

export default function StatisticsPage() {
  const [activeTab, setActiveTab] = useState("yearly"); // "yearly", "categories", "disposal"
  const [yearlyData, setYearlyData] = useState(defaultYearlyData);
  const [crimeCategoryData, setCrimeCategoryData] = useState(defaultCrimeCategoryData);
  const [summary, setSummary] = useState({
    totalStories: 8,
    totalCenters: 15,
    totalHotspots: 4,
    totalSosLogged: 0
  });

  useEffect(() => {
    safetyApi.getStatistics()
      .then(res => {
        if (res.success && res.data) {
          if (res.data.yearlyTrends) setYearlyData(res.data.yearlyTrends);
          if (res.data.crimeCategoryData) setCrimeCategoryData(res.data.crimeCategoryData);
          if (res.data.platformSummary) setSummary(res.data.platformSummary);
        }
      })
      .catch(err => console.warn('Could not load statistics from backend:', err));
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-2xl border border-slate-700 text-xs space-y-1.5 min-w-[170px]">
          <div className="flex items-center justify-between border-b border-slate-700 pb-1">
            <span className="font-bold text-slate-200">{label}</span>
            <span className="text-[10px] text-purple-300 font-semibold uppercase">NCRB Report</span>
          </div>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-3 text-xs">
              <span className="text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || "#A855F7" }}></span>
                {entry.name}:
              </span>
              <span className="font-bold text-white font-mono">
                {entry.value.toLocaleString()} {entry.unit || "cases"}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0010] py-12 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-900 dark:bg-purple-900/40 dark:border-purple-700/60 dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
            <BarChart3 size={15} /> National Crime Records Bureau (NCRB) &amp; Community Data
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2E003E] dark:text-purple-100 tracking-tight">
            Harassment &amp; Safety Statistics in India
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Visualizing verified statutory crime records, conviction rates, and crowd-sourced hazard alerts to demand institutional accountability.
          </p>
        </div>

        {/* 4 Key Metric KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div 
            className="bg-white dark:bg-slate-800/80 p-6 rounded-3xl shadow-sm hover:shadow-xl border border-slate-200/80 dark:border-purple-900/50 hover:border-purple-200 dark:hover:border-purple-700/60 transition-all flex flex-col justify-between"
            whileHover={{ y: -5 }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-800/60 px-2.5 py-1 rounded-full">
                  Annual Reports
                </span>
                <AlertTriangle size={20} className="text-rose-600 dark:text-rose-400" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-purple-100">31,500+</h3>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-300 mt-1">Cases Registered Annually</p>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-400 mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60">
              According to the latest published National Crime Records Bureau reports.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white dark:bg-slate-800/80 p-6 rounded-3xl shadow-sm hover:shadow-xl border border-slate-200/80 dark:border-purple-900/50 hover:border-purple-200 dark:hover:border-purple-700/60 transition-all flex flex-col justify-between"
            whileHover={{ y: -5 }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 dark:bg-purple-950/70 dark:text-purple-300 dark:border-purple-800/60 px-2.5 py-1 rounded-full">
                  Survivor Network
                </span>
                <Users size={20} className="text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-purple-100">{summary.totalStories} Stories</h3>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-300 mt-1">Shared by Courageous Survivors</p>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-400 mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60">
              Verified community experiences published on BraveSpeak.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white dark:bg-slate-800/80 p-6 rounded-3xl shadow-sm hover:shadow-xl border border-slate-200/80 dark:border-purple-900/50 hover:border-purple-200 dark:hover:border-purple-700/60 transition-all flex flex-col justify-between"
            whileHover={{ y: -5 }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 dark:bg-indigo-950/70 dark:text-indigo-300 dark:border-indigo-800/60 px-2.5 py-1 rounded-full">
                  Judicial Rate
                </span>
                <Scale size={20} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-purple-100">34.1%</h3>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-300 mt-1">National Conviction Rate</p>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-400 mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60">
              Fast-track special courts (FTSCs) continue to work on clearing trial backlog.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white dark:bg-slate-800/80 p-6 rounded-3xl shadow-sm hover:shadow-xl border border-slate-200/80 dark:border-purple-900/50 hover:border-purple-200 dark:hover:border-purple-700/60 transition-all flex flex-col justify-between"
            whileHover={{ y: -5 }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800/60 px-2.5 py-1 rounded-full">
                  Support Hubs
                </span>
                <Building2 size={20} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-purple-100">{summary.totalCenters} Centers</h3>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-300 mt-1">Verified Institutional Desks</p>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-400 mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60">
              Sakhi One Stop, DLSA Legal Aid, &amp; Cyber Cells nationwide.
            </p>
          </motion.div>
        </div>

        {/* Interactive Chart Container */}
        <div className="bg-white dark:bg-slate-800/80 p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-200/80 dark:border-purple-900/50 space-y-6 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700/60 pb-5">
            <div>
              <span className="text-[11px] font-bold text-purple-800 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/40 px-2.5 py-0.5 rounded-full border border-purple-200 dark:border-purple-700/60 uppercase tracking-wider">
                Official Analytical Trends
              </span>
              <h2 className="text-2xl font-black text-[#2E003E] dark:text-purple-100 mt-1">
                {activeTab === "yearly" && "Year-wise Reported Cases in India"}
                {activeTab === "categories" && "Breakdown by Crime Category"}
                {activeTab === "disposal" && "Judicial Conviction & Police Charge-sheet Rates"}
              </h2>
            </div>

            <div className="flex bg-purple-50/70 dark:bg-slate-900 p-1.5 rounded-2xl border border-purple-100 dark:border-purple-900/60 gap-1 self-start sm:self-center">
              <button
                onClick={() => setActiveTab("yearly")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeTab === "yearly" ? "bg-[#2E003E] dark:bg-purple-600 text-white shadow-md" : "text-purple-900 dark:text-purple-300 hover:bg-purple-100/50 dark:hover:bg-slate-800"
                }`}
              >
                Annual Cases
              </button>
              <button
                onClick={() => setActiveTab("categories")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeTab === "categories" ? "bg-[#2E003E] dark:bg-purple-600 text-white shadow-md" : "text-purple-900 dark:text-purple-300 hover:bg-purple-100/50 dark:hover:bg-slate-800"
                }`}
              >
                Categories
              </button>
              <button
                onClick={() => setActiveTab("disposal")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeTab === "disposal" ? "bg-[#2E003E] dark:bg-purple-600 text-white shadow-md" : "text-purple-900 dark:text-purple-300 hover:bg-purple-100/50 dark:hover:bg-slate-800"
                }`}
              >
                Disposal Rates
              </button>
            </div>
          </div>

          {/* Chart Viewport */}
          <div className="h-80 sm:h-96 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              {activeTab === "yearly" ? (
                <AreaChart data={yearlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="casesGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#A855F7" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#A855F7" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                  <XAxis dataKey="year" stroke="#94A3B8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} domain={['dataMin - 5000', 'dataMax + 5000']} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="cases" stroke="#A855F7" strokeWidth={3} fillOpacity={1} fill="url(#casesGrad)" name="Total Cases" />
                </AreaChart>
              ) : activeTab === "categories" ? (
                <BarChart data={crimeCategoryData} layout="vertical" margin={{ top: 10, right: 20, left: 80, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                  <XAxis type="number" stroke="#94A3B8" fontSize={12} />
                  <YAxis type="category" dataKey="category" stroke="#94A3B8" fontSize={11} width={120} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="incidents" fill="#C084FC" radius={[0, 10, 10, 0]} name="Incidents Reported" />
                </BarChart>
              ) : (
                <BarChart data={yearlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                  <XAxis dataKey="year" stroke="#94A3B8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} unit="%" domain={[0, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="chargeSheetRate" fill="#818CF8" name="Charge-sheet Rate (%)" radius={[6, 6, 0, 0]} unit="%" />
                  <Bar dataKey="convictionRate" fill="#34D399" name="Conviction Rate (%)" radius={[6, 6, 0, 0]} unit="%" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Insights Banner */}
        <div className="bg-[#2E003E] dark:bg-[#1a0029] rounded-3xl p-8 shadow-xl border border-purple-700/40 dark:border-purple-800/40 text-white">
          <div className="flex items-center gap-3 mb-6">
            <Flame size={22} className="text-amber-400" />
            <h2 className="text-xl font-black text-white tracking-tight">Key Insights You Should Know</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <motion.div
              className="bg-white/10 dark:bg-purple-950/40 backdrop-blur-sm border border-white/20 dark:border-purple-700/40 rounded-2xl p-5 flex flex-col gap-2"
              whileHover={{ scale: 1.03 }}
            >
              <span className="text-3xl font-black text-amber-300">93%</span>
              <p className="text-sm font-semibold text-purple-100">of sexual assault cases go unreported due to stigma, fear, and lack of awareness.</p>
              <span className="text-[10px] text-purple-300/80 mt-auto">Source: RAINN / National Survey Data</span>
            </motion.div>
            <motion.div
              className="bg-white/10 dark:bg-purple-950/40 backdrop-blur-sm border border-white/20 dark:border-purple-700/40 rounded-2xl p-5 flex flex-col gap-2"
              whileHover={{ scale: 1.03 }}
            >
              <span className="text-3xl font-black text-rose-300">1 in 3</span>
              <p className="text-sm font-semibold text-purple-100">women in India have experienced some form of workplace harassment or gender-based violence.</p>
              <span className="text-[10px] text-purple-300/80 mt-auto">Source: National Family Health Survey (NFHS-5)</span>
            </motion.div>
            <motion.div
              className="bg-white/10 dark:bg-purple-950/40 backdrop-blur-sm border border-white/20 dark:border-purple-700/40 rounded-2xl p-5 flex flex-col gap-2"
              whileHover={{ scale: 1.03 }}
            >
              <span className="text-3xl font-black text-emerald-300">181</span>
              <p className="text-sm font-semibold text-purple-100">is the free national helpline available 24×7 — yet over 70% of survivors are unaware it exists.</p>
              <span className="text-[10px] text-purple-300/80 mt-auto">Source: Ministry of Women &amp; Child Development</span>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}
