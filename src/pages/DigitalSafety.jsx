import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, Lock, Eye, AlertTriangle, CheckCircle2, 
  Smartphone, Wifi, Camera, Download, Plus, Trash2, ExternalLink, Sparkles 
} from "lucide-react";
import { motion } from "framer-motion";

const defaultAuditItems = [
  { id: 1, text: "WhatsApp Two-Step Verification (PIN) enabled to prevent SIM swap hijacking.", weight: 10 },
  { id: 2, text: "Instagram/Facebook profile locked and friend list visibility set to 'Only Me'.", weight: 10 },
  { id: 3, text: "Google/Apple location sharing audited (no unknown accounts have live GPS access).", weight: 15 },
  { id: 4, text: "StopNCII.org cryptographic hash created for any sensitive images to block leaks.", weight: 15 },
  { id: 5, text: "App permissions checked: Microphone, Camera & Location restricted to 'Only while using'.", weight: 10 },
  { id: 6, text: "Google Drive/iCloud shared albums reviewed for unintended public view links.", weight: 10 },
  { id: 7, text: "Unknown Bluetooth / AirTag Tracker detection alerts enabled on phone.", weight: 10 },
  { id: 8, text: "Biometric app-lock (Fingerprint/FaceID) enabled for Gallery, WhatsApp and Notes.", weight: 10 },
  { id: 9, text: "Caller ID & spam blocker (or Truecaller profile visibility) set to private.", weight: 5 },
  { id: 10, text: "Emergency SOS shortcut (5 rapid power clicks on iOS/Android) tested and configured.", weight: 5 }
];

export default function DigitalSafety() {
  const [checkedItems, setCheckedItems] = useState(() => {
    const saved = localStorage.getItem("bravespeak_privacy_audit");
    return saved ? JSON.parse(saved) : [1, 2, 8];
  });

  const [evidenceLog, setEvidenceLog] = useState(() => {
    const saved = localStorage.getItem("bravespeak_evidence_log");
    return saved ? JSON.parse(saved) : [];
  });

  const [newLog, setNewLog] = useState({
    date: new Date().toISOString().split("T")[0],
    platform: "WhatsApp / Instagram",
    handle: "",
    description: "",
    hasScreenshot: true
  });

  useEffect(() => {
    localStorage.setItem("bravespeak_privacy_audit", JSON.stringify(checkedItems));
  }, [checkedItems]);

  useEffect(() => {
    localStorage.setItem("bravespeak_evidence_log", JSON.stringify(evidenceLog));
  }, [evidenceLog]);

  const toggleItem = (id) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((i) => i !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  const totalScore = defaultAuditItems.reduce((acc, item) => {
    return acc + (checkedItems.includes(item.id) ? item.weight : 0);
  }, 0);

  const getScoreColor = () => {
    if (totalScore >= 80) return "text-emerald-600 bg-emerald-50 border-emerald-300";
    if (totalScore >= 50) return "text-amber-600 bg-amber-50 border-amber-300";
    return "text-rose-600 bg-rose-50 border-rose-300";
  };

  const handleAddLog = (e) => {
    e.preventDefault();
    if (!newLog.handle.trim() || !newLog.description.trim()) return;
    setEvidenceLog([{ id: Date.now(), ...newLog }, ...evidenceLog]);
    setNewLog({
      date: new Date().toISOString().split("T")[0],
      platform: "WhatsApp / Instagram",
      handle: "",
      description: "",
      hasScreenshot: true
    });
  };

  const handleDeleteLog = (id) => {
    setEvidenceLog(evidenceLog.filter((log) => log.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-900 text-xs font-bold uppercase tracking-wider">
            <Lock size={15} /> Cyber Defense & Privacy Shield
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2E003E] tracking-tight">
            Digital Safety & Privacy Protection Guide
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Audit your smartphone security score, learn how to proactively block non-consensual image leaks with StopNCII, and detect hidden cameras in trial rooms.
          </p>
        </div>

        {/* Section 1: Privacy Audit Scorecard */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-purple-100 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-100 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
                Interactive Security Audit
              </span>
              <h2 className="text-2xl font-black text-[#2E003E] mt-2">Personal Privacy Health Meter</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Check all safety measures currently active on your phone and accounts.
              </p>
            </div>

            <div className={`px-6 py-3 rounded-2xl border flex items-center gap-3 ${getScoreColor()}`}>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider">Your Privacy Score</p>
                <p className="text-3xl font-black">{totalScore}%</p>
              </div>
              <ShieldCheck size={36} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {defaultAuditItems.map((item) => {
              const isDone = checkedItems.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isDone
                      ? "bg-purple-50/70 border-purple-300 text-purple-950"
                      : "bg-white border-slate-200 text-slate-700 hover:border-purple-200"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => {}}
                    className="w-5 h-5 mt-0.5 text-purple-600 rounded focus:ring-purple-400 cursor-pointer shrink-0"
                  />
                  <div className="text-xs leading-relaxed font-medium">
                    <p>{item.text}</p>
                    <span className="text-[10px] text-slate-400 font-semibold">+{item.weight} pts</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: StopNCII & Anti-Blackmail Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-purple-100 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="p-2.5 bg-rose-100 text-rose-800 rounded-xl">
                  <ShieldCheck size={24} />
                </span>
                <div>
                  <h3 className="text-xl font-bold text-[#2E003E]">StopNCII.org Technology</h3>
                  <p className="text-xs text-slate-500">Stop Non-Consensual Intimate Image Abuse</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                <p>
                  <strong>How it protects you without uploading images:</strong> StopNCII generates a unique mathematical fingerprint (hash) directly on your device browser. Your raw photos never leave your device.
                </p>
                <p>
                  The hash is shared with participating platforms (Meta, Instagram, TikTok, Reddit, OnlyFans, Threads) so that any attempt to upload matching images is automatically blocked before it appears online.
                </p>
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-purple-900 font-medium">
                  💡 If you are facing extortion or blackmail threats, generate a hash immediately to preempt distribution.
                </div>
              </div>
            </div>

            <a
              href="https://stopncii.org"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 bg-gradient-to-r from-purple-800 to-indigo-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:scale-105 transition"
            >
              <span>Visit Official StopNCII.org Portal</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Section 3: Hidden Spy Camera Detection Guide */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-purple-100 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="p-2.5 bg-indigo-100 text-indigo-800 rounded-xl">
                  <Eye size={24} />
                </span>
                <div>
                  <h3 className="text-xl font-bold text-[#2E003E]">Detect Hidden Spy Cameras</h3>
                  <p className="text-xs text-slate-500">For changing rooms, hotel rooms, and rented spaces</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-900 mb-0.5">1. The Flashlight Glint Test</p>
                  <p>Turn off room lights, shine your phone torch across smoke detectors, power sockets, digital clocks, and picture frames. Camera lenses reflect a distinct bluish/purple glint.</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-900 mb-0.5">2. Two-Way Mirror Fingernail Test</p>
                  <p>Place the tip of your fingernail against the mirror surface. If there is a visible gap between your finger and reflection, it is a real mirror. If the reflection directly touches your finger with no gap, it may be a two-way mirror.</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-900 mb-0.5">3. Infrared Smartphone Camera</p>
                  <p>Night vision spy cams emit IR LEDs invisible to human eyes. Open your smartphone's front selfie camera in complete darkness to spot glowing purplish dots.</p>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-rose-700 font-semibold">
              ⚠️ Voyeurism is a non-bailable offense under Section 354C IPC punishable by up to 5 years imprisonment.
            </div>
          </div>
        </div>

        {/* Section 4: Secure Digital Evidence Log */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-100 space-y-6">
          <div className="border-b border-purple-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
              Discreet In-Browser Tool
            </span>
            <h2 className="text-2xl font-black text-[#2E003E] mt-2">Cyber Incident & Harassment Log</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Organize timestamps, sender handles, and incident details for cyber police or POSH investigations. Stored only in your private browser cache.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form */}
            <form onSubmit={handleAddLog} className="lg:col-span-5 space-y-3 bg-purple-50/50 p-5 rounded-2xl border border-purple-200">
              <h4 className="text-xs font-bold text-purple-900 uppercase tracking-wider">Log New Incident</h4>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={newLog.date}
                    onChange={(e) => setNewLog({ ...newLog, date: e.target.value })}
                    className="w-full p-2 bg-white border border-purple-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Platform</label>
                  <input
                    type="text"
                    placeholder="e.g. WhatsApp"
                    value={newLog.platform}
                    onChange={(e) => setNewLog({ ...newLog, platform: e.target.value })}
                    className="w-full p-2 bg-white border border-purple-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Perpetrator Handle / Number</label>
                <input
                  type="text"
                  placeholder="@username or phone number"
                  value={newLog.handle}
                  onChange={(e) => setNewLog({ ...newLog, handle: e.target.value })}
                  className="w-full p-2 bg-white border border-purple-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Incident Summary & Actions Taken</label>
                <textarea
                  rows={3}
                  placeholder="Notes, threats made, screenshot file names..."
                  value={newLog.description}
                  onChange={(e) => setNewLog({ ...newLog, description: e.target.value })}
                  className="w-full p-2 bg-white border border-purple-200 rounded-lg text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-purple-900 hover:bg-purple-950 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Plus size={14} /> Add Incident Entry
              </button>
            </form>

            {/* Log Entries List */}
            <div className="lg:col-span-7 space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Logged Records ({evidenceLog.length})
              </h4>

              {evidenceLog.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-400">
                  No incident records logged yet. Use the form on the left to track evidence.
                </div>
              ) : (
                <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                  {evidenceLog.map((log) => (
                    <div
                      key={log.id}
                      className="p-4 bg-white rounded-2xl border border-purple-100 shadow-sm flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-purple-900">{log.platform}</span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-500 font-mono text-[11px]">{log.date}</span>
                          <span className="px-2 py-0.5 bg-purple-50 text-purple-800 rounded-full font-bold text-[10px]">
                            {log.handle}
                          </span>
                        </div>
                        <p className="text-slate-700 leading-relaxed">{log.description}</p>
                      </div>

                      <button
                        onClick={() => handleDeleteLog(log.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition cursor-pointer"
                        title="Delete entry"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
