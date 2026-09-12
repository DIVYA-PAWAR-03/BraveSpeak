import React, { useState, useEffect } from "react";
import { EyeOff, BookOpen, Search, ArrowLeft } from "lucide-react";

export default function QuickCamouflage() {
  const [isCamouflaged, setIsCamouflaged] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isCamouflaged) {
        setIsCamouflaged(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCamouflaged]);

  if (!isCamouflaged) {
    return (
      <button
        onClick={() => setIsCamouflaged(true)}
        title="Discreet Safe Exit: Instantly disguises this page as study notes"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-3.5 py-2.5 bg-slate-900/90 hover:bg-slate-900 text-slate-200 hover:text-white rounded-full text-xs font-semibold shadow-xl border border-slate-700 backdrop-blur-md transition-all hover:scale-105 cursor-pointer group"
      >
        <EyeOff size={15} className="text-amber-400 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline">Quick Disguise / Panic Exit</span>
        <span className="sm:hidden">Disguise</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-white text-slate-800 overflow-y-auto font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <BookOpen size={28} className="text-slate-700" />
            <div>
              <h1 className="text-xl font-serif font-bold text-slate-900">Academic Notes Archive & Research</h1>
              <p className="text-xs text-slate-500">Subject: Environmental Geography & Climatology (Module 4)</p>
            </div>
          </div>
          <button
            onClick={() => setIsCamouflaged(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition cursor-pointer"
          >
            <ArrowLeft size={14} /> Return (or Esc)
          </button>
        </div>

        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            readOnly
            value="Atmospheric Circulation, Jet Streams, and Monsoon Indices in South Asia"
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 focus:outline-none"
          />
        </div>

        <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-4 text-slate-700 font-serif">
          <h2 className="text-lg font-bold text-slate-900 font-sans border-b border-slate-100 pb-2">
            Section 4.2: Factors Influencing Tropical Precipitation Patterns
          </h2>
          <p>
            The southwest monsoon system is predominantly driven by the thermal contrast between the Indian Ocean basin and the Eurasian landmass during the boreal summer. As solar insolation increases over the Tropic of Cancer, a low-pressure trough develops across the Gangetic plains.
          </p>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs font-mono text-slate-600 space-y-1">
            <p className="font-bold">Summary Table: Key Meteorological Variables</p>
            <p>• Sea Surface Temperature Anomaly (SSTA): ±0.4°C baseline</p>
            <p>• Southern Oscillation Index (SOI): +2.1 (Neutral/Positive)</p>
            <p>• Intertropical Convergence Zone (ITCZ) Latitudinal Shift: 15°N–25°N</p>
          </div>
          <p>
            Differential heating across the Tibetan Plateau generates an upper-tropospheric anticyclone, known as the Tibetan High, giving rise to the Tropical Easterly Jet (TEJ) stream located at approximately 150 hPa.
          </p>
          <p>
            Observations recorded across multiple field stations indicate that microclimate variance remains within normal boundaries across the sub-continental study quadrant.
          </p>
        </div>

        <div className="pt-6 border-t border-slate-200 flex justify-between items-center text-xs text-slate-400 font-sans">
          <span>University Library Reference ID: #GEO-2024-8849</span>
          <button
            onClick={() => setIsCamouflaged(false)}
            className="text-slate-500 hover:text-slate-800 underline cursor-pointer"
          >
            Click to return to application
          </button>
        </div>
      </div>
    </div>
  );
}
