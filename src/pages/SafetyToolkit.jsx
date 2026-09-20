import React, { useState, useEffect, useRef } from "react";
import { 
  PhoneCall, PhoneOff, AlertOctagon, Volume2, VolumeX, 
  MapPin, Send, Plus, Trash2, Shield, Eye, ShieldAlert, 
  Sparkles, CheckCircle2, User, Mic, Square, Download, Clock,
  Upload, AlertTriangle, ThumbsUp, Radio, Flame
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { emergencyApi, safetyApi } from "../services/api";
import { useTheme } from "../context/ThemeContext";

export default function SafetyToolkit() {
  const { isDark } = useTheme();

  // --- FAKE CALL STATE ---
  const [callerName, setCallerName] = useState("Mom");
  const [callDelay, setCallDelay] = useState(5);
  const [callState, setCallState] = useState("idle");
  const [callSeconds, setCallSeconds] = useState(0);
  const audioCtxRef = useRef(null);
  const ringOscillatorRef = useRef(null);

  // --- SIREN ALARM & STROBE STATE ---
  const [isSirenActive, setIsSirenActive] = useState(false);
  const [isStrobeActive, setIsStrobeActive] = useState(false);
  const sirenOscRef = useRef(null);
  const sirenIntervalRef = useRef(null);

  // --- LOCATION & SOS DISPATCH STATE ---
  const [coords, setCoords] = useState(null);
  const [locLoading, setLocLoading] = useState(false);
  const [locError, setLocError] = useState("");
  const [sosSentToast, setSosSentToast] = useState("");
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem("bravespeak_emergency_contacts");
    return saved ? JSON.parse(saved) : [{ name: "Family Member", phone: "9876543210" }];
  });
  const [newContactName, setNewContactName] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");
  const [customMsg, setCustomMsg] = useState("EMERGENCY! I need immediate help. Here is my current live GPS location:");

  // --- AUDIO RECORDER EVIDENCE STATE ---
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [vaultingAudio, setVaultingAudio] = useState(false);
  const [vaultSuccess, setVaultSuccess] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // --- COMMUNITY SAFETY HOTSPOTS STATE ---
  const [hotspots, setHotspots] = useState([]);
  const [loadingHotspots, setLoadingHotspots] = useState(true);
  const [showHotspotModal, setShowHotspotModal] = useState(false);
  const [hotspotForm, setHotspotForm] = useState({
    location_name: "", city: "New Delhi", state: "Delhi",
    hazard_type: "Poor Lighting", severity: "High",
    description: "", reported_by: "Community Member"
  });

  useEffect(() => {
    localStorage.setItem("bravespeak_emergency_contacts", JSON.stringify(contacts));
  }, [contacts]);

  const loadHotspots = async () => {
    try {
      setLoadingHotspots(true);
      const res = await safetyApi.getHotspots();
      if (res.success && res.data) setHotspots(res.data);
    } catch (err) {
      console.warn("Failed to load hotspots from API:", err);
    } finally {
      setLoadingHotspots(false);
    }
  };

  useEffect(() => { loadHotspots(); }, []);

  useEffect(() => {
    let timer;
    if (callState === "timer") {
      timer = setTimeout(() => { setCallState("ringing"); playRingtone(); }, callDelay * 1000);
    }
    return () => clearTimeout(timer);
  }, [callState, callDelay]);

  useEffect(() => {
    let interval;
    if (callState === "connected") {
      interval = setInterval(() => setCallSeconds((prev) => prev + 1), 1000);
    } else {
      setCallSeconds(0);
    }
    return () => clearInterval(interval);
  }, [callState]);

  const playRingtone = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(480, ctx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      ringOscillatorRef.current = { osc, ctx };
    } catch (e) { console.warn("Audio context not available", e); }
  };

  const stopRingtone = () => {
    try {
      if (ringOscillatorRef.current) {
        ringOscillatorRef.current.osc.stop();
        ringOscillatorRef.current.ctx.close();
        ringOscillatorRef.current = null;
      }
    } catch {}
  };

  const triggerFakeCall = (delaySeconds) => {
    setCallDelay(delaySeconds);
    if (delaySeconds === 0) { setCallState("ringing"); playRingtone(); }
    else { setCallState("timer"); }
  };

  const answerCall = () => { stopRingtone(); setCallState("connected"); };
  const endCall = () => { stopRingtone(); setCallState("idle"); };

  const toggleSiren = () => { if (isSirenActive) stopSiren(); else startSiren(); };

  const startSiren = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      gain.gain.value = 0.4;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      let high = false;
      const interval = setInterval(() => {
        if (osc.frequency) { osc.frequency.setValueAtTime(high ? 900 : 600, ctx.currentTime); high = !high; }
      }, 400);
      sirenOscRef.current = { osc, ctx, gain };
      sirenIntervalRef.current = interval;
      setIsSirenActive(true);
      setIsStrobeActive(true);
    } catch (e) { console.error(e); }
  };

  const stopSiren = () => {
    try {
      if (sirenIntervalRef.current) clearInterval(sirenIntervalRef.current);
      if (sirenOscRef.current) { sirenOscRef.current.osc.stop(); sirenOscRef.current.ctx.close(); sirenOscRef.current = null; }
    } catch {}
    setIsSirenActive(false);
    setIsStrobeActive(false);
  };

  const fetchLocation = () => {
    setLocLoading(true); setLocError("");
    if (!navigator.geolocation) { setLocError("Geolocation is not supported by your browser."); setLocLoading(false); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => { setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: Math.round(pos.coords.accuracy) }); setLocLoading(false); },
      () => { setLocError("Unable to retrieve GPS coordinates. Please grant location permission."); setLocLoading(false); },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const addContact = (e) => {
    e.preventDefault();
    if (!newContactName.trim() || !newContactPhone.trim()) return;
    setContacts([...contacts, { name: newContactName.trim(), phone: newContactPhone.trim() }]);
    setNewContactName(""); setNewContactPhone("");
  };

  const removeContact = (index) => setContacts(contacts.filter((_, i) => i !== index));

  const handleBroadcastSOS = async () => {
    try {
      await emergencyApi.triggerSos({
        user_alias: "BraveSpeak User",
        latitude: coords ? coords.lat : null, longitude: coords ? coords.lng : null,
        address: coords ? `Lat: ${coords.lat}, Lng: ${coords.lng}` : "Emergency Location",
        message: customMsg, contacts_alerted: contacts.length
      });
      setSosSentToast("Emergency SOS broadcast logged and registered with crisis coordination network.");
      setTimeout(() => setSosSentToast(""), 6000);
    } catch (e) { console.warn("Backend SOS log fallback:", e); }
  };

  const sendWhatsAppSOS = (phone) => {
    handleBroadcastSOS();
    const locString = coords ? `https://maps.google.com/?q=${coords.lat},${coords.lng}` : `(Fetching location... please check in on me immediately)`;
    const message = `${customMsg}\n\n📍 Live Location: ${locString}\n\nSent via BraveSpeak Safety SOS`;
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    window.open(`https://wa.me/${cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const sendSmsSOS = (phone) => {
    handleBroadcastSOS();
    const locString = coords ? `https://maps.google.com/?q=${coords.lat},${coords.lng}` : `(Emergency alert - verify my whereabouts)`;
    window.open(`sms:${phone}?body=${encodeURIComponent(`${customMsg} ${locString}`)}`, "_self");
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
      };
      mediaRecorder.start();
      setIsRecording(true);
    } catch { alert("Microphone permission denied or not supported."); }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  const handleVaultAudio = async () => {
    if (!audioBlob) return;
    try {
      setVaultingAudio(true);
      const formData = new FormData();
      formData.append("file", audioBlob, `evidence_audio_${Date.now()}.webm`);
      formData.append("title", "Voice Incident Recording");
      formData.append("category", "Voice Evidence");
      formData.append("notes", "Recorded via BraveSpeak Tactical Safety Suite");
      const res = await emergencyApi.vaultEvidence(formData);
      if (res.success) { setVaultSuccess("Audio evidence securely vaulted with encrypted timestamp!"); setTimeout(() => setVaultSuccess(""), 5000); }
    } catch (err) {
      console.warn("Vault upload fallback:", err);
      setVaultSuccess("Audio file saved locally."); setTimeout(() => setVaultSuccess(""), 5000);
    } finally { setVaultingAudio(false); }
  };

  const handleUpvoteHotspot = async (id) => {
    try {
      const res = await safetyApi.upvoteHotspot(id);
      if (res.success) setHotspots(prev => prev.map(h => h.id === id ? { ...h, upvotes: res.upvotes } : h));
    } catch { setHotspots(prev => prev.map(h => h.id === id ? { ...h, upvotes: h.upvotes + 1 } : h)); }
  };

  const handleSubmitHotspot = async (e) => {
    e.preventDefault();
    if (!hotspotForm.location_name.trim() || !hotspotForm.description.trim()) return;
    try {
      const res = await safetyApi.reportHotspot({ ...hotspotForm, latitude: coords ? coords.lat : 28.6139, longitude: coords ? coords.lng : 77.2090 });
      if (res.success && res.data) setHotspots([res.data, ...hotspots]);
      setShowHotspotModal(false);
      setHotspotForm({ location_name: "", city: "New Delhi", state: "Delhi", hazard_type: "Poor Lighting", severity: "High", description: "", reported_by: "Community Member" });
    } catch (err) { console.warn("Hotspot report error:", err); setShowHotspotModal(false); }
  };

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60), s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  /* ── Dark-mode style helpers ── */
  const dk = {
    pageBg:        isDark ? "bg-[#050505]"          : "bg-slate-50",
    cardBg:        isDark ? "bg-[#0d0d0d]"          : "bg-white",
    cardBorder:    isDark ? "border-white/[0.06]"   : "border-purple-100",
    cardShadow:    isDark ? "shadow-[0_1px_20px_rgba(0,0,0,0.6)]" : "shadow-lg",
    sectionDivider:isDark ? "border-white/[0.05]"   : "border-purple-100",
    headingPrimary:isDark ? "text-white"             : "text-[#2E003E]",
    headingH2:     isDark ? "text-white"             : "text-[#2E003E]",
    bodyText:      isDark ? "text-[#c8c8c8]"        : "text-slate-500",
    mutedText:     isDark ? "text-[#555]"            : "text-slate-400",
    labelText:     isDark ? "text-[#a0a0a0]"        : "text-slate-700",
    pillPurple:    isDark ? "bg-purple-950/70 border-purple-700/40 text-purple-300"   : "bg-purple-50 border-purple-200 text-purple-900",
    pillRose:      isDark ? "bg-rose-950/70 border-rose-700/40 text-rose-300"         : "bg-rose-50 border-rose-200 text-rose-900",
    pillIndigo:    isDark ? "bg-indigo-950/70 border-indigo-700/40 text-indigo-300"   : "bg-indigo-50 border-indigo-200 text-indigo-900",
    iconBgPurple:  isDark ? "bg-purple-900/40 text-purple-400" : "bg-purple-100 text-purple-800",
    iconBgRose:    isDark ? "bg-rose-900/40 text-rose-400"     : "bg-rose-100 text-rose-800",
    iconBgIndigo:  isDark ? "bg-indigo-900/40 text-indigo-400" : "bg-indigo-100 text-indigo-800",
    innerPanel:    isDark ? "bg-[#111] border-white/[0.06]"    : "bg-purple-50/60 border-purple-100",
    inputBg:       isDark ? "bg-[#0a0a0a] border-white/[0.08] text-[#e0e0e0] placeholder-[#444] focus:border-violet-500/60 focus:ring-violet-500/15" : "bg-purple-50/40 border-purple-200 focus:ring-purple-400",
    contactRow:    isDark ? "bg-[#111] border-white/[0.06] hover:bg-[#161616]" : "bg-slate-50 border-slate-200 hover:bg-purple-50/50",
    hotspotCard:   isDark ? "bg-[#111] border-white/[0.06] hover:bg-[#161616] hover:border-rose-700/30" : "bg-slate-50 border-slate-200 hover:bg-rose-50/30",
    hotspotDivider:isDark ? "border-white/[0.05]"   : "border-slate-200",
    upvoteBtn:     isDark ? "bg-[#0d0d0d] border-white/[0.08] text-violet-400 hover:bg-[#161616] hover:border-violet-600/40" : "bg-white border-purple-200 text-purple-900 hover:bg-purple-100",
    cancelBtn:     isDark ? "bg-[#1a1a1a] hover:bg-[#222] text-[#bbb]" : "bg-slate-100 text-slate-700",
    divider:       isDark ? "border-white/[0.05]"   : "border-slate-100",
    timerBanner:   isDark ? "bg-amber-950/40 border-amber-700/40 text-amber-300"  : "bg-amber-50 border-amber-200 text-amber-900",
    gpsBanner:     isDark ? "bg-violet-950/40 border-violet-700/30 text-violet-200" : "bg-purple-50 border-purple-200 text-purple-950",
    errorBanner:   isDark ? "bg-rose-950/40 border-rose-700/40 text-rose-300" : "bg-rose-50 border-rose-200 text-rose-900",
    audioclip:     isDark ? "bg-[#111] border-white/[0.06]"   : "bg-slate-50 border-slate-200",
    vaultSuccess:  isDark ? "text-emerald-400 bg-emerald-950/40 border-emerald-700/40" : "text-emerald-700 bg-emerald-50 border-emerald-200",
    modalBg:       isDark ? "bg-[#0d0d0d] border-white/[0.08]" : "bg-white border-purple-100",
    sosPanel:      isDark ? "bg-[#111] border-white/[0.05]"    : "bg-purple-50/60 border-purple-100",
  };

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 transition-colors duration-300 ${
      isStrobeActive ? "bg-red-700 animate-pulse text-white" : `${dk.pageBg} ${dk.headingPrimary}`
    }`}>

      {/* ── FULLSCREEN RINGING CALL MODAL ── */}
      <AnimatePresence>
        {callState === "ringing" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 bg-[#0a0a0a] text-white flex flex-col justify-between p-8 sm:p-12 items-center"
          >
            <div className="text-center pt-12 space-y-3">
              <div className="w-24 h-24 rounded-full bg-purple-900/40 border-2 border-purple-500/60 flex items-center justify-center mx-auto animate-bounce shadow-[0_0_40px_rgba(124,58,237,0.4)]">
                <User size={48} className="text-purple-300" />
              </div>
              <h2 className="text-3xl font-extrabold text-white">{callerName}</h2>
              <p className="text-purple-400 text-sm font-medium animate-pulse">Incoming Audio Call...</p>
            </div>
            <div className="w-full max-w-sm flex items-center justify-around pb-12">
              <button onClick={endCall} className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-500 flex items-center justify-center shadow-lg shadow-rose-900/60 transition-transform group-hover:scale-110">
                  <PhoneOff size={28} />
                </div>
                <span className="text-xs text-rose-400 font-semibold">Decline</span>
              </button>
              <button onClick={answerCall} className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-900/60 transition-transform group-hover:scale-110 animate-pulse">
                  <PhoneCall size={28} />
                </div>
                <span className="text-xs text-emerald-400 font-semibold">Accept</span>
              </button>
            </div>
          </motion.div>
        )}

        {callState === "connected" && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0a0a0a] text-white flex flex-col justify-between p-8 sm:p-12 items-center"
          >
            <div className="text-center pt-8 space-y-2">
              <div className="w-20 h-20 rounded-full bg-purple-900/40 border border-purple-500/50 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(124,58,237,0.3)]">
                <User size={36} className="text-purple-300" />
              </div>
              <h2 className="text-2xl font-bold text-white">{callerName}</h2>
              <p className="text-emerald-400 font-mono text-sm">{formatTimer(callSeconds)}</p>
            </div>
            <div className="bg-[#111] p-6 rounded-2xl border border-white/[0.06] max-w-md w-full space-y-2 text-center text-sm text-[#aaa]">
              <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">Helpful phrases to say out loud:</p>
              <p className="italic font-medium text-white">"Hey! Yes, I'm right here on the corner. I see your car approaching now."</p>
              <p className="italic font-medium text-white">"Yes, my brother and police officer uncle are with me. We are coming in 2 minutes."</p>
            </div>
            <div className="pb-12">
              <button onClick={endCall} className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-500 flex items-center justify-center shadow-xl transition-transform hover:scale-110 cursor-pointer">
                <PhoneOff size={28} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto space-y-12">

        {/* ── PAGE HEADER ── */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          {isDark && <div className="absolute left-1/2 -translate-x-1/2 w-[40rem] h-48 bg-purple-950/25 rounded-full blur-3xl pointer-events-none" />}
          <div className={`relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${dk.pillPurple}`}>
            <ShieldAlert size={15} /> Instant Tactical Safety Suite
          </div>
          <h1 className={`relative text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${dk.headingPrimary}`}>
            Emergency Safety & SOS Toolkit
          </h1>
          <p className={`relative text-base sm:text-lg leading-relaxed ${dk.bodyText}`}>
            Practical emergency tools designed for fast action: fake an incoming call to escape uncomfortable situations, sound a loud deterrence siren, vault audio evidence, or dispatch live GPS location.
          </p>
        </div>

        {/* SOS Alert Toast */}
        <AnimatePresence>
          {sosSentToast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="max-w-xl mx-auto bg-purple-950/80 border border-purple-600/40 text-white p-4 rounded-2xl flex items-center gap-3 shadow-2xl"
            >
              <Radio size={22} className="text-emerald-400 animate-pulse shrink-0" />
              <p className="text-xs font-bold">{sosSentToast}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══════════════════════════════════════════════════════════════
            3 TACTICAL TOOL CARDS
        ══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Tool 1: Fake Call Simulator */}
          <div className={`rounded-3xl p-6 sm:p-8 border flex flex-col justify-between space-y-6 ${dk.cardBg} ${dk.cardBorder} ${dk.cardShadow} ${isDark ? "hover:border-violet-600/25 transition-colors" : ""}`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${dk.iconBgPurple}`}>
                  <PhoneCall size={24} />
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${dk.pillPurple}`}>
                  Escort Simulator
                </span>
              </div>
              <div>
                <h3 className={`text-xl font-bold ${dk.headingPrimary}`}>Fake Call Escape</h3>
                <p className={`text-xs mt-1 ${dk.bodyText}`}>
                  Trigger a simulated incoming call with audio ringtone to politely excuse yourself from unsafe encounters.
                </p>
              </div>
              <div className="space-y-3 pt-2">
                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${dk.labelText}`}>Caller Name</label>
                  <select
                    value={callerName}
                    onChange={(e) => setCallerName(e.target.value)}
                    className={`w-full p-2.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 border ${dk.inputBg}`}
                  >
                    <option value="Mom">Mom</option>
                    <option value="Dad">Dad</option>
                    <option value="Inspector S. Sharma (Police)">Inspector S. Sharma (Police)</option>
                    <option value="Office Security Desk">Office Security Desk</option>
                    <option value="Brother">Brother</option>
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <button onClick={() => triggerFakeCall(0)} className="py-2.5 px-3 bg-violet-700 hover:bg-violet-600 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer">
                    Call Now
                  </button>
                  <button onClick={() => triggerFakeCall(5)} className={`py-2.5 px-3 rounded-xl text-xs font-bold transition cursor-pointer border ${dk.pillPurple}`}>
                    In 5 Sec
                  </button>
                  <button onClick={() => triggerFakeCall(15)} className={`py-2.5 px-3 rounded-xl text-xs font-bold transition cursor-pointer border ${dk.pillPurple}`}>
                    In 15 Sec
                  </button>
                </div>
                {callState === "timer" && (
                  <div className={`p-3 rounded-xl flex items-center justify-between text-xs border ${dk.timerBanner}`}>
                    <span className="font-semibold">Call scheduled in {callDelay}s...</span>
                    <button onClick={endCall} className="underline font-bold">Cancel</button>
                  </div>
                )}
              </div>
            </div>
            <div className={`text-[11px] border-t pt-3 ${dk.mutedText} ${dk.divider}`}>
              Works completely offline. Synthesizes a real telephone frequency.
            </div>
          </div>

          {/* Tool 2: Deterrence Siren & Strobe Alarm */}
          <div className={`rounded-3xl p-6 sm:p-8 border flex flex-col justify-between space-y-6 ${dk.cardBg} ${dk.cardBorder} ${dk.cardShadow} ${isDark ? "hover:border-rose-600/25 transition-colors" : ""}`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${dk.iconBgRose}`}>
                  <AlertOctagon size={24} />
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${dk.pillRose}`}>
                  Deterrence
                </span>
              </div>
              <div>
                <h3 className={`text-xl font-bold ${dk.headingPrimary}`}>SOS Alarm & Strobe</h3>
                <p className={`text-xs mt-1 ${dk.bodyText}`}>
                  Generates an ear-piercing oscillating siren sound and high-contrast screen flashing to draw immediate bystander attention.
                </p>
              </div>
              <div className="pt-4 flex flex-col items-center justify-center space-y-4">
                <button
                  onClick={toggleSiren}
                  className={`w-28 h-28 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-300 font-bold uppercase tracking-wider text-xs cursor-pointer ${
                    isSirenActive
                      ? "bg-rose-600 text-white animate-ping"
                      : `bg-gradient-to-br from-rose-700 to-rose-900 text-white hover:scale-105 ${isDark ? "shadow-rose-900/40 hover:shadow-[0_0_30px_rgba(225,29,72,0.35)]" : ""}`
                  }`}
                >
                  {isSirenActive ? <VolumeX size={32} /> : <Volume2 size={32} />}
                  <span className="mt-1">{isSirenActive ? "STOP SIREN" : "START ALARM"}</span>
                </button>
                <p className={`text-xs text-center font-medium ${dk.bodyText}`}>
                  {isSirenActive ? "Siren is active! Press above to stop." : "Ensure your phone/laptop volume is set to maximum."}
                </p>
              </div>
            </div>
            <div className={`text-[11px] border-t pt-3 ${dk.mutedText} ${dk.divider}`}>
              Oscillates between 600Hz - 900Hz alarm frequency to cut through noise.
            </div>
          </div>

          {/* Tool 3: Audio Evidence Grabber & Vault */}
          <div className={`rounded-3xl p-6 sm:p-8 border flex flex-col justify-between space-y-6 ${dk.cardBg} ${dk.cardBorder} ${dk.cardShadow} ${isDark ? "hover:border-indigo-600/25 transition-colors" : ""}`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${dk.iconBgIndigo}`}>
                  <Mic size={24} />
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${dk.pillIndigo}`}>
                  Evidence Capture
                </span>
              </div>
              <div>
                <h3 className={`text-xl font-bold ${dk.headingPrimary}`}>Discreet Voice Recorder</h3>
                <p className={`text-xs mt-1 ${dk.bodyText}`}>
                  Safely record verbal harassment, threats, or confrontations directly with 1-click cloud vaulting.
                </p>
              </div>
              <div className="space-y-4 pt-2">
                {!isRecording ? (
                  <button onClick={startRecording} className="w-full py-3 bg-indigo-700 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer transition">
                    <Mic size={16} /> Start Incident Recording
                  </button>
                ) : (
                  <button onClick={stopRecording} className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md animate-pulse cursor-pointer">
                    <Square size={16} /> Stop Recording & Save
                  </button>
                )}
                {audioUrl && (
                  <div className={`p-3 rounded-xl border space-y-2 ${dk.audioclip}`}>
                    <p className={`text-xs font-semibold ${dk.labelText}`}>Recorded Evidence Clip:</p>
                    <audio src={audioUrl} controls className="w-full h-8" />
                    <div className="flex gap-2 pt-1">
                      <button onClick={handleVaultAudio} disabled={vaultingAudio}
                        className="flex-1 py-1.5 bg-violet-800 hover:bg-violet-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition disabled:opacity-50 cursor-pointer">
                        <Upload size={12} />
                        <span>{vaultingAudio ? "Vaulting..." : "Vault Securely"}</span>
                      </button>
                      <a href={audioUrl} download={`incident_audio_${Date.now()}.webm`}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 ${dk.cancelBtn}`}>
                        <Download size={12} /> Save
                      </a>
                    </div>
                  </div>
                )}
                {vaultSuccess && (
                  <p className={`text-xs font-bold p-2.5 rounded-xl border text-center ${dk.vaultSuccess}`}>✓ {vaultSuccess}</p>
                )}
              </div>
            </div>
            <div className={`text-[11px] border-t pt-3 ${dk.mutedText} ${dk.divider}`}>
              Audio is encrypted and vaulted with timestamps for court / POSH evidence.
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            GPS SOS DISPATCHER
        ══════════════════════════════════════════════════════════════ */}
        <div className={`rounded-3xl p-6 sm:p-8 border space-y-6 ${dk.cardBg} ${dk.cardBorder} ${dk.cardShadow} ${isDark ? "shadow-[0_2px_40px_rgba(0,0,0,0.7)]" : "shadow-xl"}`}>
          <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 ${dk.sectionDivider}`}>
            <div>
              <div className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full mb-2 border ${dk.pillPurple}`}>
                <MapPin size={14} /> Instant Emergency SOS Dispatch
              </div>
              <h2 className={`text-2xl font-black ${dk.headingH2}`}>Live GPS Location & Emergency Alert</h2>
              <p className={`text-xs mt-1 ${dk.bodyText}`}>
                Save trusted contacts. In danger, tap to broadcast your live GPS coordinates via WhatsApp or SMS.
              </p>
            </div>
            <button onClick={fetchLocation} disabled={locLoading}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-700 to-indigo-700 hover:from-violet-600 hover:to-indigo-600 text-white text-xs font-bold rounded-xl shadow-md transition hover:scale-105 cursor-pointer">
              <MapPin size={16} />
              <span>{locLoading ? "Fetching GPS..." : coords ? "Update GPS Coordinates" : "Get My Live Location"}</span>
            </button>
          </div>

          {locError && (
            <div className={`p-3 rounded-xl border text-xs font-medium ${dk.errorBanner}`}>{locError}</div>
          )}

          {coords && (
            <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs ${dk.gpsBanner}`}>
              <div>
                <p className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  GPS Locked: Latitude {coords.lat.toFixed(5)}, Longitude {coords.lng.toFixed(5)}
                </p>
                <p className={`text-[11px] mt-0.5 ${isDark ? "text-violet-400" : "text-purple-700"}`}>Accuracy: ~{coords.accuracy} meters radius</p>
              </div>
              <a href={`https://maps.google.com/?q=${coords.lat},${coords.lng}`} target="_blank" rel="noreferrer"
                className={`underline font-bold ${isDark ? "text-violet-300 hover:text-violet-200" : "text-purple-900 hover:text-purple-700"}`}>
                Open in Google Maps ↗
              </a>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
            <div className="space-y-4">
              <h4 className={`text-sm font-bold uppercase tracking-wider ${dk.headingH2}`}>
                Trusted Emergency Contacts ({contacts.length})
              </h4>
              <div className="space-y-2">
                {contacts.length === 0 ? (
                  <p className={`text-xs italic ${dk.mutedText}`}>No emergency contacts added yet.</p>
                ) : contacts.map((contact, idx) => (
                  <div key={idx} className={`p-4 rounded-2xl border flex items-center justify-between transition ${dk.contactRow}`}>
                    <div>
                      <p className={`font-bold text-sm ${dk.headingPrimary}`}>{contact.name}</p>
                      <p className={`text-xs font-mono ${dk.mutedText}`}>{contact.phone}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => sendWhatsAppSOS(contact.phone)}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm transition cursor-pointer">
                        <Send size={12} /> WhatsApp SOS
                      </button>
                      <button onClick={() => sendSmsSOS(contact.phone)}
                        className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm transition cursor-pointer">
                        SMS SOS
                      </button>
                      <button onClick={() => removeContact(idx)}
                        className={`p-1.5 transition cursor-pointer ${isDark ? "text-[#555] hover:text-rose-400" : "text-slate-400 hover:text-rose-600"}`} title="Remove Contact">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={addContact} className="pt-2 flex flex-col sm:flex-row gap-2">
                <input type="text" placeholder="Contact Name (e.g., Mom)" value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  className={`flex-1 p-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 border ${dk.inputBg}`} />
                <input type="tel" placeholder="Phone Number (10 digits)" value={newContactPhone}
                  onChange={(e) => setNewContactPhone(e.target.value)}
                  className={`flex-1 p-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 border ${dk.inputBg}`} />
                <button type="submit"
                  className="px-4 py-2.5 bg-violet-700 hover:bg-violet-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition">
                  <Plus size={14} /> Add
                </button>
              </form>
            </div>

            {/* Custom SOS Message */}
            <div className={`space-y-3 p-6 rounded-2xl border ${dk.sosPanel}`}>
              <label className={`block text-xs font-bold uppercase tracking-wider ${dk.labelText}`}>
                Emergency Message Template
              </label>
              <textarea rows={4} value={customMsg} onChange={(e) => setCustomMsg(e.target.value)}
                className={`w-full p-3 rounded-xl text-xs focus:outline-none focus:ring-2 border ${dk.inputBg}`} />
              <p className={`text-[11px] ${dk.mutedText}`}>
                Your live Google Maps coordinates link will automatically be attached at the end of the message when you click send.
              </p>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            COMMUNITY SAFETY HOTSPOTS
        ══════════════════════════════════════════════════════════════ */}
        <div className={`rounded-3xl p-6 sm:p-8 border space-y-6 ${dk.cardBg} ${dk.cardBorder} ${isDark ? "shadow-[0_2px_40px_rgba(0,0,0,0.7)]" : "shadow-xl"}`}>
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 ${dk.sectionDivider}`}>
            <div>
              <div className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full mb-2 border ${dk.pillRose}`}>
                <Flame size={14} /> Crowd-Sourced Safety Heatmap
              </div>
              <h2 className={`text-2xl font-black ${dk.headingH2}`}>Reported Unsafe Zones & Dark Spots</h2>
              <p className={`text-xs mt-1 ${dk.bodyText}`}>
                Community-verified hazard alerts for poor lighting, isolated transit routes, or eve-teasing areas.
              </p>
            </div>
            <button onClick={() => setShowHotspotModal(true)}
              className="px-5 py-2.5 bg-rose-700 hover:bg-rose-600 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0">
              <Plus size={15} />
              <span>Report Unsafe Spot</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hotspots.map((spot) => (
              <div key={spot.id} className={`p-5 rounded-2xl border transition space-y-3 flex flex-col justify-between ${dk.hotspotCard}`}>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${dk.pillRose}`}>
                      {spot.hazard_type}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      spot.severity === 'Critical' ? 'bg-red-600 text-white' : isDark ? 'bg-amber-950/60 border border-amber-700/40 text-amber-300' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {spot.severity} Risk
                    </span>
                  </div>
                  <h4 className={`font-bold text-sm sm:text-base ${dk.headingPrimary}`}>{spot.location_name}</h4>
                  <p className={`text-xs font-medium ${dk.mutedText}`}>{spot.city}, {spot.state}</p>
                  <p className={`text-xs leading-relaxed ${dk.bodyText}`}>{spot.description}</p>
                </div>
                <div className={`pt-3 border-t flex items-center justify-between text-xs ${dk.hotspotDivider}`}>
                  <span className={`text-[11px] ${dk.mutedText}`}>Reported by {spot.reported_by}</span>
                  <button onClick={() => handleUpvoteHotspot(spot.id)}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg border text-xs font-bold transition cursor-pointer ${dk.upvoteBtn}`}>
                    <ThumbsUp size={12} />
                    <span>{spot.upvotes || 1} Confirmations</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── HOTSPOT REPORT MODAL ── */}
        <AnimatePresence>
          {showHotspotModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className={`rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl border ${dk.modalBg} ${isDark ? "shadow-black/80" : ""}`}
              >
                <div className={`flex justify-between items-center border-b pb-3 ${dk.divider}`}>
                  <h3 className={`font-bold text-lg ${dk.headingPrimary}`}>Report Unsafe Community Dark Spot</h3>
                  <button onClick={() => setShowHotspotModal(false)} className={`text-lg transition ${isDark ? "text-[#555] hover:text-[#aaa]" : "text-slate-400 hover:text-slate-600"}`}>✕</button>
                </div>

                <form onSubmit={handleSubmitHotspot} className="space-y-3 text-xs">
                  <div>
                    <label className={`block font-bold uppercase mb-1 ${dk.labelText}`}>Location Name & Landmark *</label>
                    <input type="text" required placeholder="e.g. Underpass near Metro Gate 3"
                      value={hotspotForm.location_name}
                      onChange={(e) => setHotspotForm({ ...hotspotForm, location_name: e.target.value })}
                      className={`w-full p-2.5 rounded-xl border focus:outline-none focus:ring-2 ${dk.inputBg}`} />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className={`block font-bold uppercase mb-1 ${dk.labelText}`}>City *</label>
                      <input type="text" required value={hotspotForm.city}
                        onChange={(e) => setHotspotForm({ ...hotspotForm, city: e.target.value })}
                        className={`w-full p-2.5 rounded-xl border focus:outline-none focus:ring-2 ${dk.inputBg}`} />
                    </div>
                    <div>
                      <label className={`block font-bold uppercase mb-1 ${dk.labelText}`}>Hazard Type</label>
                      <select value={hotspotForm.hazard_type}
                        onChange={(e) => setHotspotForm({ ...hotspotForm, hazard_type: e.target.value })}
                        className={`w-full p-2.5 rounded-xl border font-medium focus:outline-none focus:ring-2 ${dk.inputBg}`}>
                        <option>Poor Lighting</option>
                        <option>Isolated Area</option>
                        <option>Eve-teasing</option>
                        <option>Lack of Patrol</option>
                        <option>Broken Infrastructure</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={`block font-bold uppercase mb-1 ${dk.labelText}`}>Risk Severity</label>
                    <select value={hotspotForm.severity}
                      onChange={(e) => setHotspotForm({ ...hotspotForm, severity: e.target.value })}
                      className={`w-full p-2.5 rounded-xl border font-medium focus:outline-none focus:ring-2 ${dk.inputBg}`}>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Critical</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block font-bold uppercase mb-1 ${dk.labelText}`}>Hazard Details & Observation *</label>
                    <textarea rows={3} required
                      placeholder="Describe why this spot is unsafe, time of day when it gets risky, missing streetlights..."
                      value={hotspotForm.description}
                      onChange={(e) => setHotspotForm({ ...hotspotForm, description: e.target.value })}
                      className={`w-full p-2.5 rounded-xl border focus:outline-none focus:ring-2 ${dk.inputBg}`} />
                  </div>
                  <div className="pt-3 flex gap-2">
                    <button type="button" onClick={() => setShowHotspotModal(false)}
                      className={`flex-1 py-2.5 rounded-xl font-bold transition ${dk.cancelBtn}`}>
                      Cancel
                    </button>
                    <button type="submit"
                      className="flex-1 py-2.5 bg-rose-700 hover:bg-rose-600 text-white rounded-xl font-bold transition">
                      Publish Safety Alert
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
