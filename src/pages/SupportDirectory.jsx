import React, { useState, useEffect, useMemo } from "react";
import { 
  Building2, Phone, MapPin, Search, Shield, Filter, 
  ExternalLink, Clock, CheckCircle2, HeartHandshake, PhoneCall, Scale, Lock,
  Navigation, Crosshair, Sparkles, AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supportApi } from "../services/api";

const stateOptions = ["All", "Delhi", "Maharashtra", "Karnataka", "Telangana", "Tamil Nadu", "West Bengal"];
const typeOptions = [
  "All",
  "One Stop Centre (Sakhi)",
  "Free Legal Aid (DLSA)",
  "Women Police Station",
  "Cyber Crime Cell",
  "Government Commission",
  "NGO & Counseling Network"
];

export default function SupportDirectory() {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedState, setSelectedState] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [nearbyActive, setNearbyActive] = useState(false);
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState("");

  const loadCenters = async () => {
    try {
      setLoading(true);
      const res = await supportApi.getCenters({
        state: selectedState !== "All" ? selectedState : "",
        type: selectedType !== "All" ? selectedType : "",
        search: searchQuery
      });
      if (res.success && res.data) {
        setCenters(res.data);
      }
    } catch (err) {
      console.warn("Failed to fetch centers from API:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!nearbyActive) {
      loadCenters();
    }
  }, [selectedState, selectedType, nearbyActive]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Find Nearest Centers via Browser Geolocation
  const handleFindNearby = () => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your current browser.");
      return;
    }

    setLocating(true);
    setGeoError("");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const res = await supportApi.getNearby(lat, lng);
          if (res.success && res.data) {
            setCenters(res.data);
            setNearbyActive(true);
          }
        } catch (err) {
          console.warn("Error fetching nearby support centers:", err);
          setGeoError("Failed to calculate nearest centers. Showing all centers instead.");
        } finally {
          setLocating(false);
        }
      },
      (err) => {
        console.warn("GPS permission error:", err);
        setLocating(false);
        setGeoError("Unable to retrieve GPS coordinates. Please allow location permissions in your browser.");
      },
      { timeout: 10000 }
    );
  };

  const handleResetFilters = () => {
    setSelectedState("All");
    setSelectedType("All");
    setSearchQuery("");
    setNearbyActive(false);
    setGeoError("");
    loadCenters();
  };

  const filteredCenters = useMemo(() => {
    if (!searchQuery.trim()) return centers;
    const q = searchQuery.toLowerCase();
    return centers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q)
    );
  }, [centers, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0010] py-12 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-900 dark:bg-purple-900/40 dark:border-purple-700/60 dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
            <Building2 size={15} /> Verified Institutional Directory
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2E003E] dark:text-purple-100 tracking-tight">
            Verified Support Centers & Emergency Desks
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Direct access to government-recognized Sakhi One Stop Centres, District Legal Services Authorities (DLSA), Women Police Cells, and 24/7 Cyber Crime Desks across India.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={handleFindNearby}
              disabled={locating}
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-500 text-white rounded-full font-bold shadow-lg shadow-purple-950/20 hover:scale-105 transition cursor-pointer disabled:opacity-60"
            >
              <Navigation size={16} className={locating ? "animate-spin" : ""} />
              <span>{locating ? "Locating Nearest Centers..." : "Find Support Centers Near Me (GPS)"}</span>
            </button>

            {nearbyActive && (
              <button
                onClick={handleResetFilters}
                className="px-5 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border dark:border-slate-700/60 rounded-full font-semibold text-xs transition cursor-pointer"
              >
                Clear Nearby / Show All
              </button>
            )}
          </div>

          {geoError && (
            <p className="text-xs text-rose-600 dark:text-rose-300 font-semibold bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/60 py-2 px-4 rounded-full max-w-md mx-auto">
              {geoError}
            </p>
          )}
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white dark:bg-slate-800/80 p-6 sm:p-8 rounded-3xl shadow-xl border border-purple-100 dark:border-purple-900/50 space-y-5 backdrop-blur-sm">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by city, center name, landmark, or district..."
              className="w-full pl-12 pr-4 py-3.5 bg-purple-50/50 border border-purple-200 rounded-2xl text-slate-800 placeholder-purple-400/80 dark:bg-slate-900 dark:border-purple-900/60 dark:text-purple-100 dark:placeholder-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white dark:focus:bg-slate-900 transition text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MapPin size={14} className="text-purple-600 dark:text-purple-400" /> Filter By State / Region
              </label>
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setNearbyActive(false);
                }}
                className="w-full p-3 bg-purple-50/40 border border-purple-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 dark:bg-slate-900 dark:border-purple-900/60 dark:text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                {stateOptions.map((st) => (
                  <option key={st} value={st} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">{st === "All" ? "All States / Nationwide" : st}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Filter size={14} className="text-purple-600 dark:text-purple-400" /> Organization / Facility Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  setNearbyActive(false);
                }}
                className="w-full p-3 bg-purple-50/40 border border-purple-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 dark:bg-slate-900 dark:border-purple-900/60 dark:text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                {typeOptions.map((tp) => (
                  <option key={tp} value={tp} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">{tp === "All" ? "All Facility Types" : tp}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center py-12">
            <div className="w-10 h-10 border-4 border-purple-200 dark:border-purple-900 border-t-purple-800 dark:border-t-purple-400 rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs font-semibold text-purple-900 dark:text-purple-300">Loading verified support facilities...</p>
          </div>
        )}

        {/* Directory Centers Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCenters.length === 0 ? (
              <div className="col-span-full text-center py-16 bg-white dark:bg-slate-800/80 rounded-3xl border border-purple-100 dark:border-purple-900/50 p-8 space-y-3">
                <AlertCircle size={40} className="mx-auto text-purple-400" />
                <h3 className="text-xl font-bold text-[#2E003E] dark:text-purple-100">No centers found for this filter</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs">Try selecting 'All States' or clearing your search keywords.</p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2 bg-purple-900 dark:bg-purple-700 text-white rounded-full text-xs font-bold hover:bg-purple-950 dark:hover:bg-purple-600 transition cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredCenters.map((center) => (
                <motion.div
                  key={center.id}
                  layout
                  className="bg-white dark:bg-slate-800/80 rounded-3xl p-6 shadow-md hover:shadow-xl border border-purple-100 dark:border-purple-900/50 hover:border-purple-300 dark:hover:border-purple-700/60 transition-all flex flex-col justify-between group space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-900 border border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/50">
                        {center.type}
                      </span>
                      {center.distanceKm !== undefined && (
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800/60 flex items-center gap-1">
                          <Crosshair size={11} /> {center.distanceKm} km away
                        </span>
                      )}
                      {!center.distanceKm && (
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400">
                          {center.city}, {center.state}
                        </span>
                      )}
                    </div>

                    <h2 className="text-lg font-bold text-[#2E003E] dark:text-purple-100 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition">
                      {center.name}
                    </h2>

                    <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                      <div className="flex items-start gap-2">
                        <MapPin size={15} className="text-purple-500 dark:text-purple-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{center.address}</span>
                      </div>

                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <Clock size={14} className="text-purple-500 dark:text-purple-400 shrink-0" />
                        <span>Timings: {center.timings || "24 Hours"}</span>
                      </div>
                    </div>

                    {/* Services Tags */}
                    {center.services && Array.isArray(center.services) && (
                      <div className="pt-2">
                        <p className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-400 mb-1.5">Offered Services</p>
                        <div className="flex flex-wrap gap-1.5">
                          {center.services.map((srv, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-semibold bg-slate-100 text-slate-700 dark:bg-slate-900/80 dark:text-slate-300 dark:border dark:border-slate-700/60 px-2 py-0.5 rounded-md"
                            >
                              ✓ {srv}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Direct Contact Buttons */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
                    <a
                      href={`tel:${center.phone.replace(/[^0-9]/g, '')}`}
                      className="flex-1 py-2.5 bg-[#2E003E] hover:bg-purple-950 dark:bg-purple-700 dark:hover:bg-purple-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
                    >
                      <PhoneCall size={13} />
                      <span>Call {center.phone}</span>
                    </a>

                    {center.altPhone && (
                      <a
                        href={`tel:${center.altPhone.replace(/[^0-9]/g, '')}`}
                        className="px-3 py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 dark:bg-purple-950/60 dark:hover:bg-purple-900/60 dark:text-purple-200 dark:border-purple-800/50 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition"
                        title="Alternate direct line"
                      >
                        <Phone size={13} />
                        <span>{center.altPhone}</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

