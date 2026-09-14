import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, Lock, Eye, AlertTriangle, CheckCircle2, 
  Smartphone, Wifi, Camera, Download, Plus, Trash2, ExternalLink, Sparkles,
  Upload, FileText, Clock, Shield
} from "lucide-react";
import { motion } from "framer-motion";
import { emergencyApi } from "../services/api";

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

  const [evidenceLog, setEvidenceLog] = useState([]);
  const [loadingEvidence, setLoadingEvidence] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [newLog, setNewLog] = useState({
    date: new Date().toISOString().split("T")[0],
    platform: "WhatsApp",
    handle: "",
    description: "",
    file: null
  });

  useEffect(() => {
    localStorage.setItem("bravespeak_privacy_audit", JSON.stringify(checkedItems));
  }, [checkedItems]);

  const loadEvidence = async () => {
    try {
      setLoadingEvidence(true);
      const res = await emergencyApi.getEvidence();
      if (res.success && res.data) {
        setEvidenceLog(res.data);
      }
    } catch (err) {
      console.warn("Could not load vaulted evidence from backend:", err);
    } finally {
      setLoadingEvidence(false);
    }
  };

  useEffect(() => {
    loadEvidence();
  }, []);

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

  const handleAddLog = async (e) => {
    e.preventDefault();
    if (!newLog.description.trim()) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("title", `${newLog.platform} Incident: ${newLog.handle || 'Unknown handle'}`);
      formData.append("category", "Digital Harassment");
      formData.append("incident_date", newLog.date);
      formData.append("notes", newLog.description);
      if (newLog.file) {
        formData.append("file", newLog.file);
      }

      const res = await emergencyApi.vaultEvidence(formData);
      if (res.success && res.data) {
        setEvidenceLog([res.data, ...evidenceLog]);
      }
      setNewLog({
        date: new Date().toISOString().split("T")[0],
        platform: "WhatsApp",
        handle: "",
        description: "",
        file: null
      });
    } catch (err) {
      console.warn("Evidence log error:", err);
      // Fallback
      setEvidenceLog([
        {
          id: Date.now(),
          title: `${newLog.platform} Incident`,
          category: "Digital Harassment",
          incident_date: newLog.date,
          notes: newLog.description,
          created_at: new Date().toISOString()
        },
        ...evidenceLog
      ]);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteLog = async (id) => {
    try {
      await emergencyApi.deleteEvidence(id);
      setEvidenceLog(evidenceLog.filter((log) => log.id !== id));
    } catch (err) {
      setEvidenceLog(evidenceLog.filter((log) => log.id !== id));
    }
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
            Audit your smartphone security score, learn how to proactively block non-consensual image leaks with StopNCII, detect hidden cameras, and secure cyber evidence.
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
                    {item.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: StopNCII & Revenge Porn Prevention */}
        <div className="bg-gradient-to-br from-[#2E003E] via-purple-950 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-8 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-300 bg-purple-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
              <Sparkles size={13} /> Proactive Image Shielding
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              StopNCII.org - Prevent Non-Consensual Image Sharing
            </h2>
            <p className="text-purple-200 text-sm sm:text-base leading-relaxed">
              StopNCII (Stop Non-Consensual Intimate Image Abuse) generates an encrypted cryptographic hash of sensitive images directly inside your browser. The actual photo NEVER leaves your phone, but participating platforms (Instagram, Facebook, TikTok, Reddit) block anyone from ever uploading it.
            </p>

            <div className="pt-2">
              <a
                href="https://stopncii.org"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#2E003E] hover:bg-purple-50 font-bold rounded-full text-xs shadow-lg transition"
              >
                <span>Visit StopNCII.org Official Tool</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Section 3: Hidden Camera Detector Walkthrough */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-100 space-y-6">
          <div className="border-b border-purple-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
              Field Guide
            </span>
            <h2 className="text-2xl font-black text-[#2E003E] mt-2">How to Spot Hidden Cameras in Trial Rooms & Hotels</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-700 leading-relaxed">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <p className="font-bold text-slate-900 text-sm">1. Flashlight Glint Test</p>
              <p>Turn off room lights, shine your smartphone flashlight across smoke detectors, power sockets, digital clocks, and air vents. Camera lenses reflect a distinct bluish/purple glint.</p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <p className="font-bold text-slate-900 text-sm">2. Two-Way Mirror Test</p>
              <p>Place your fingernail against the glass. If there is a visible gap between your nail and reflection, it's genuine. If your nail directly touches its reflection with no gap, it is a two-way observation mirror.</p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <p className="font-bold text-slate-900 text-sm">3. Infrared Front Camera</p>
              <p>Night-vision spy cameras emit IR diodes. Open your phone's front selfie camera in complete darkness to spot glowing purple or red lights invisible to naked eyes.</p>
            </div>
          </div>
        </div>

        {/* Section 4: Secure Digital Evidence Vault */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-100 space-y-6">
          <div className="border-b border-purple-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
              Cloud Evidence Vault
            </span>
            <h2 className="text-2xl font-black text-[#2E003E] mt-2">Secure Cyber Incident & Evidence Vault</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Securely preserve timestamps, chat logs, and screenshots for cyber police (1930 / cybercrime.gov.in) or POSH inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form */}
            <form onSubmit={handleAddLog} className="lg:col-span-5 space-y-3 bg-purple-50/50 p-5 rounded-2xl border border-purple-200">
              <h4 className="text-xs font-bold text-purple-900 uppercase tracking-wider">Vault New Incident Record</h4>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Incident Date</label>
                  <input
                    type="date"
                    value={newLog.date}
                    onChange={(e) => setNewLog({ ...newLog, date: e.target.value })}
                    className="w-full p-2 bg-white border border-purple-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Platform</label>
                  <select
                    value={newLog.platform}
                    onChange={(e) => setNewLog({ ...newLog, platform: e.target.value })}
                    className="w-full p-2 bg-white border border-purple-200 rounded-lg text-xs font-medium"
                  >
                    <option>WhatsApp</option>
                    <option>Instagram</option>
                    <option>Telegram</option>
                    <option>Email / Slack</option>
                    <option>Call / SMS</option>
                    <option>In-Person Incident</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Perpetrator Handle / Phone</label>
                <input
                  type="text"
                  placeholder="@username, phone or email"
                  value={newLog.handle}
                  onChange={(e) => setNewLog({ ...newLog, handle: e.target.value })}
                  className="w-full p-2 bg-white border border-purple-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Incident Summary & Specific Threats</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Record sequence of events, extortion demands, abusive words..."
                  value={newLog.description}
                  onChange={(e) => setNewLog({ ...newLog, description: e.target.value })}
                  className="w-full p-2 bg-white border border-purple-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Attach Screenshot / File (Optional)</label>
                <input
                  type="file"
                  onChange={(e) => setNewLog({ ...newLog, file: e.target.files[0] })}
                  className="w-full p-1.5 bg-white border border-purple-200 rounded-lg text-xs text-slate-600"
                />
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full py-2.5 bg-purple-900 hover:bg-purple-950 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer disabled:opacity-50"
              >
                <Upload size={14} />
                <span>{uploading ? "Vaulting Securely..." : "Save to Evidence Vault"}</span>
              </button>
            </form>

            {/* Log Entries List */}
            <div className="lg:col-span-7 space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Vaulted Evidence Records ({evidenceLog.length})
              </h4>

              {evidenceLog.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-400">
                  No evidence records vaulted yet. Use the form on the left to record digital harassment.
                </div>
              ) : (
                <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                  {evidenceLog.map((log) => (
                    <div
                      key={log.id}
                      className="p-4 bg-white rounded-2xl border border-purple-100 shadow-sm flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1.5 text-xs flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-purple-900">{log.title || log.category}</span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-500 font-mono text-[11px]">{log.incident_date || new Date(log.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed">{log.notes}</p>
                        {log.file_name && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-purple-800 bg-purple-50 px-2 py-0.5 rounded-md font-medium">
                            <FileText size={11} /> {log.file_name}
                          </span>
                        )}
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
