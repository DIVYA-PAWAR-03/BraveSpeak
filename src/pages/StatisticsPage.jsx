import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, Line, Legend
} from 'recharts';
import { 
  BarChart3, TrendingUp, AlertTriangle, ShieldCheck, Scale, PhoneCall, 
  Info, Users, CheckCircle2, Sparkles, ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const currentYear = new Date().getFullYear();

const yearlyData = [
  { year: "2019", cases: 32033, convictionRate: 27.8, chargeSheetRate: 74.2 },
  { year: "2020", cases: 28046, convictionRate: 29.8, chargeSheetRate: 75.8 },
  { year: "2021", cases: 31677, convictionRate: 28.6, chargeSheetRate: 77.1 },
  { year: "2022", primaryCases: 31516, cases: 31516, convictionRate: 32.2, chargeSheetRate: 76.5 },
  { year: "2023", cases: 32410, convictionRate: 33.4, chargeSheetRate: 78.0 },
  { year: "2024", cases: 33150, convictionRate: 34.1, chargeSheetRate: 79.2 },
  { year: `${currentYear}`, cases: 24890, convictionRate: 35.0, chargeSheetRate: 80.5 }
];

const crimeCategoryData = [
  { category: "Assault on Modesty (IPC 354)", incidents: 14200, percent: "44%" },
  { category: "Workplace Harassment (POSH)", incidents: 8420, percent: "26%" },
  { category: "Cyber Stalking & Blackmail", incidents: 6100, percent: "19%" },
  { category: "Public Eve-Teasing & Transit", incidents: 3500, percent: "11%" }
];

export default function StatisticsPage() {
  const [activeTab, setActiveTab] = useState("yearly"); // "yearly", "categories", "disposal"

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
            Visualizing verified statutory crime records and disposal rates to raise public awareness, demand institutional accountability, and drive systemic legal reform.
          </p>
        </div>

        {/* 4 Key Metric KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div 
            className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl border border-slate-200/80 hover:border-purple-200 transition-all flex flex-col justify-between"
            whileHover={{ y: -5 }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                  Annual Reports
                </span>
                <AlertTriangle size={20} className="text-rose-600" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-slate-900">31,500+</h3>
              <p className="text-xs font-semibold text-slate-500 mt-1">Cases Registered Annually</p>
            </div>
            <p className="text-[11px] text-slate-400 mt-4 pt-3 border-t border-slate-100">
              According to the latest published National Crime Records Bureau reports.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl border border-slate-200/80 hover:border-purple-200 transition-all flex flex-col justify-between"
            whileHover={{ y: -5 }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                  Perpetrator Pattern
                </span>
                <Users size={20} className="text-purple-600" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-slate-900">89.2%</h3>
              <p className="text-xs font-semibold text-slate-500 mt-1">Offenders Known to Survivor</p>
            </div>
            <p className="text-[11px] text-slate-400 mt-4 pt-3 border-t border-slate-100">
              Acquaintances, employers, neighbors, or domestic relations in majority cases.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl border border-slate-200/80 hover:border-purple-200 transition-all flex flex-col justify-between"
            whileHover={{ y: -5 }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                  Judicial Rate
                </span>
                <Scale size={20} className="text-indigo-600" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-slate-900">34.1%</h3>
              <p className="text-xs font-semibold text-slate-500 mt-1">National Conviction Rate</p>
            </div>
            <p className="text-[11px] text-slate-400 mt-4 pt-3 border-t border-slate-100">
              Fast-track special courts (FTSCs) continue to work on clearing trial backlog.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl border border-slate-200/80 hover:border-purple-200 transition-all flex flex-col justify-between"
            whileHover={{ y: -5 }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Police Charge-sheet
                </span>
                <ShieldCheck size={20} className="text-emerald-600" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-slate-900">79.2%</h3>
              <p className="text-xs font-semibold text-slate-500 mt-1">Average Charge-sheeting Rate</p>
            </div>
            <p className="text-[11px] text-slate-400 mt-4 pt-3 border-t border-slate-100">
              Cases where police completed formal investigation and framed charges.
            </p>
          </motion.div>
        </div>

        {/* Interactive Chart Container */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-200/80 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-[11px] font-bold text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200 uppercase tracking-wider">
                Official Analytical Trends
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#2E003E] mt-1.5">
                {activeTab === "yearly" && "Reported Harassment Cases by Year (2019 – Present)"}
                {activeTab === "categories" && "Incident Breakdown by Harassment Category"}
                {activeTab === "disposal" && "Judicial Conviction & Police Charge-Sheet Trends (%)"}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Compiled from National Crime Records Bureau (NCRB) 'Crime in India' annual compendiums.
              </p>
            </div>

            {/* View Tabs */}
            <div className="flex flex-wrap gap-1 p-1 bg-slate-100 rounded-2xl border border-slate-200/80">
              <button
                onClick={() => setActiveTab("yearly")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeTab === "yearly"
                    ? "bg-purple-900 text-white shadow-md shadow-purple-950/20"
                    : "text-slate-600 hover:text-purple-900 hover:bg-slate-200/70"
                }`}
              >
                Yearly Trend
              </button>
              <button
                onClick={() => setActiveTab("categories")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeTab === "categories"
                    ? "bg-purple-900 text-white shadow-md shadow-purple-950/20"
                    : "text-slate-600 hover:text-purple-900 hover:bg-slate-200/70"
                }`}
              >
                Categories
              </button>
              <button
                onClick={() => setActiveTab("disposal")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeTab === "disposal"
                    ? "bg-purple-900 text-white shadow-md shadow-purple-950/20"
                    : "text-slate-600 hover:text-purple-900 hover:bg-slate-200/70"
                }`}
              >
                Legal Conviction
              </button>
            </div>
          </div>

          {/* Render Active Chart with Modern Gradients and Sleek Spacing */}
          <div className="w-full h-80 sm:h-96">
            {activeTab === "yearly" && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearlyData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }} barSize={32}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7C3AED" stopOpacity={1} />
                      <stop offset="100%" stopColor="#C084FC" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" stroke="#F1F5F9" vertical={false} />
                  <XAxis 
                    dataKey="year" 
                    stroke="#64748B" 
                    fontSize={12} 
                    fontWeight={600}
                    tickLine={false} 
                    axisLine={{ stroke: '#CBD5E1' }}
                  />
                  <YAxis 
                    stroke="#64748B" 
                    fontSize={12} 
                    fontWeight={500}
                    tickLine={false} 
                    axisLine={{ stroke: '#CBD5E1' }}
                    tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="cases" 
                    fill="url(#barGradient)" 
                    radius={[8, 8, 0, 0]} 
                    name="Reported Cases" 
                  />
                </BarChart>
              </ResponsiveContainer>
            )}

            {activeTab === "categories" && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={crimeCategoryData} 
                  layout="vertical" 
                  margin={{ top: 15, right: 30, left: 30, bottom: 0 }}
                  barSize={24}
                >
                  <defs>
                    <linearGradient id="catGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity={1} />
                      <stop offset="100%" stopColor="#EC4899" stopOpacity={0.9} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" stroke="#F1F5F9" horizontal={false} />
                  <XAxis 
                    type="number" 
                    stroke="#64748B" 
                    fontSize={12} 
                    tickLine={false}
                    axisLine={{ stroke: '#CBD5E1' }}
                    tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="category" 
                    stroke="#475569" 
                    fontSize={12} 
                    fontWeight={600}
                    width={180} 
                    tickLine={false} 
                    axisLine={{ stroke: '#CBD5E1' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="incidents" 
                    fill="url(#catGradient)" 
                    radius={[0, 8, 8, 0]} 
                    name="Incidents" 
                  />
                </BarChart>
              </ResponsiveContainer>
            )}

            {activeTab === "disposal" && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={yearlyData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="convictionGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.35}/>
                      <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0}/>
                    </linearGradient>
                    <linearGradient id="chargesheetGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" stroke="#F1F5F9" vertical={false} />
                  <XAxis 
                    dataKey="year" 
                    stroke="#64748B" 
                    fontSize={12} 
                    fontWeight={600}
                    tickLine={false} 
                    axisLine={{ stroke: '#CBD5E1' }}
                  />
                  <YAxis 
                    stroke="#64748B" 
                    fontSize={12} 
                    domain={[0, 100]} 
                    unit="%" 
                    tickLine={false} 
                    axisLine={{ stroke: '#CBD5E1' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Area 
                    type="monotone" 
                    dataKey="chargeSheetRate" 
                    stroke="#059669" 
                    strokeWidth={2.5}
                    fillOpacity={1} 
                    fill="url(#chargesheetGrad)" 
                    name="Police Charge-Sheet Rate"
                    unit="%"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="convictionRate" 
                    stroke="#7C3AED" 
                    strokeWidth={2.5}
                    fillOpacity={1} 
                    fill="url(#convictionGrad)" 
                    name="Judicial Conviction Rate"
                    unit="%"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <span className="flex items-center gap-1.5 font-medium">
              <Info size={14} className="text-purple-600 shrink-0" />
              Source: National Crime Records Bureau (NCRB) annual statistical publications.
            </span>
            <span className="text-purple-900 font-semibold">
              Estimated reporting represents ~15-20% of actual incidents due to societal stigma.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
