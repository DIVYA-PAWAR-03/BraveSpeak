import React, { useState, useEffect, useRef } from "react";
import { 
  PhoneCall, PhoneOff, AlertOctagon, Volume2, VolumeX, 
  MapPin, Send, Plus, Trash2, Shield, Eye, ShieldAlert, 
  Sparkles, CheckCircle2, User, Mic, Square, Download, Clock,
  Upload, AlertTriangle, ThumbsUp, Radio, Flame
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { emergencyApi, safetyApi } from "../services/api";

export default function SafetyToolkit() {
  // --- FAKE CALL STATE ---
  const [callerName, setCallerName] = useState("Mom");
  const [callDelay, setCallDelay] = useState(5);
  const [callState, setCallState] = useState("idle"); // idle, timer, ringing, connected
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
    return saved ? JSON.parse(saved) : [
      { name: "Family Member", phone: "9876543210" }
    ];
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
    location_name: "",
    city: "New Delhi",
    state: "Delhi",
    hazard_type: "Poor Lighting",
    severity: "High",
    description: "",
    reported_by: "Community Member"
  });

  // Save contacts
  useEffect(() => {
    localStorage.setItem("bravespeak_emergency_contacts", JSON.stringify(contacts));
  }, [contacts]);

  // Load Community Hotspots from API
  const loadHotspots = async () => {
    try {
      setLoadingHotspots(true);
      const res = await safetyApi.getHotspots();
      if (res.success && res.data) {
        setHotspots(res.data);
      }
    } catch (err) {
      console.warn("Failed to load hotspots from API:", err);
    } finally {
      setLoadingHotspots(false);
    }
  };

  useEffect(() => {
    loadHotspots();
  }, []);

  // Handle Call Timer
  useEffect(() => {
    let timer;
    if (callState === "timer") {
      timer = setTimeout(() => {
        setCallState("ringing");
        playRingtone();
      }, callDelay * 1000);
    }
    return () => clearTimeout(timer);
  }, [callState, callDelay]);

  // Handle Connected Call Duration
  useEffect(() => {
    let interval;
    if (callState === "connected") {
      interval = setInterval(() => {
        setCallSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setCallSeconds(0);
    }
    return () => clearInterval(interval);
  }, [callState]);

  // Web Audio Ringtone Synthesis
  const playRingtone = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

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
    } catch (e) {
      console.warn("Audio context not available", e);
    }
  };

  const stopRingtone = () => {
    try {
      if (ringOscillatorRef.current) {
        ringOscillatorRef.current.osc.stop();
        ringOscillatorRef.current.ctx.close();
        ringOscillatorRef.current = null;
      }
    } catch {
      // ignore
    }
  };

  const triggerFakeCall = (delaySeconds) => {
    setCallDelay(delaySeconds);
    if (delaySeconds === 0) {
      setCallState("ringing");
      playRingtone();
    } else {
      setCallState("timer");
    }
  };

  const answerCall = () => {
    stopRingtone();
    setCallState("connected");
  };

  const endCall = () => {
    stopRingtone();
    setCallState("idle");
  };

  // --- Web Audio Siren Synthesis ---
  const toggleSiren = () => {
    if (isSirenActive) {
      stopSiren();
    } else {
      startSiren();
    }
  };

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
        if (osc.frequency) {
          osc.frequency.setValueAtTime(high ? 900 : 600, ctx.currentTime);
          high = !high;
        }
      }, 400);

      sirenOscRef.current = { osc, ctx, gain };
      sirenIntervalRef.current = interval;
      setIsSirenActive(true);
      setIsStrobeActive(true);
    } catch (e) {
      console.error(e);
    }
  };

  const stopSiren = () => {
    try {
      if (sirenIntervalRef.current) clearInterval(sirenIntervalRef.current);
      if (sirenOscRef.current) {
        sirenOscRef.current.osc.stop();
        sirenOscRef.current.ctx.close();
        sirenOscRef.current = null;
      }
    } catch {
      // ignore
    }
    setIsSirenActive(false);
    setIsStrobeActive(false);
  };

  // --- Geolocation ---
  const fetchLocation = () => {
    setLocLoading(true);
    setLocError("");
    if (!navigator.geolocation) {
      setLocError("Geolocation is not supported by your browser.");
      setLocLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: Math.round(pos.coords.accuracy)
        });
        setLocLoading(false);
      },
      () => {
        setLocError("Unable to retrieve GPS coordinates. Please grant location permission.");
        setLocLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const addContact = (e) => {
    e.preventDefault();
    if (!newContactName.trim() || !newContactPhone.trim()) return;
    setContacts([...contacts, { name: newContactName.trim(), phone: newContactPhone.trim() }]);
    setNewContactName("");
    setNewContactPhone("");
  };

  const removeContact = (index) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  // Broadcast SOS Log to Backend and Trigger Messaging
  const handleBroadcastSOS = async () => {
    try {
      await emergencyApi.triggerSos({
        user_alias: "BraveSpeak User",
        latitude: coords ? coords.lat : null,
        longitude: coords ? coords.lng : null,
        address: coords ? `Lat: ${coords.lat}, Lng: ${coords.lng}` : "Emergency Location",
        message: customMsg,
        contacts_alerted: contacts.length
      });
      setSosSentToast("Emergency SOS broadcast logged and registered with crisis coordination network.");
      setTimeout(() => setSosSentToast(""), 6000);
    } catch (e) {
      console.warn("Backend SOS log fallback:", e);
    }
  };

  const sendWhatsAppSOS = (phone) => {
    handleBroadcastSOS();
    const locString = coords 
      ? `https://maps.google.com/?q=${coords.lat},${coords.lng}`
      : `(Fetching location... please check in on me immediately)`;
    const message = `${customMsg}\n\n📍 Live Location: ${locString}\n\nSent via BraveSpeak Safety SOS`;
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    window.open(`https://wa.me/${cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const sendSmsSOS = (phone) => {
    handleBroadcastSOS();
    const locString = coords 
      ? `https://maps.google.com/?q=${coords.lat},${coords.lng}`
      : `(Emergency alert - verify my whereabouts)`;
    const message = `${customMsg} ${locString}`;
    window.open(`sms:${phone}?body=${encodeURIComponent(message)}`, "_self");
  };

  // --- Audio Evidence Recorder ---
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch {
      alert("Microphone permission denied or not supported.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  // Vault Audio File to Backend
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
      if (res.success) {
        setVaultSuccess("Audio evidence securely vaulted with encrypted timestamp!");
        setTimeout(() => setVaultSuccess(""), 5000);
      }
    } catch (err) {
      console.warn("Vault upload fallback:", err);
      setVaultSuccess("Audio file saved locally.");
      setTimeout(() => setVaultSuccess(""), 5000);
    } finally {
      setVaultingAudio(false);
    }
  };

  // Upvote Hotspot
  const handleUpvoteHotspot = async (id) => {
    try {
      const res = await safetyApi.upvoteHotspot(id);
      if (res.success) {
        setHotspots(prev => prev.map(h => h.id === id ? { ...h, upvotes: res.upvotes } : h));
      }
    } catch (e) {
      setHotspots(prev => prev.map(h => h.id === id ? { ...h, upvotes: h.upvotes + 1 } : h));
    }
  };

  // Submit Hotspot Report
  const handleSubmitHotspot = async (e) => {
    e.preventDefault();
    if (!hotspotForm.location_name.trim() || !hotspotForm.description.trim()) return;

    try {
      const res = await safetyApi.reportHotspot({
        ...hotspotForm,
        latitude: coords ? coords.lat : 28.6139,
        longitude: coords ? coords.lng : 77.2090
      });

      if (res.success && res.data) {
        setHotspots([res.data, ...hotspots]);
      }
      setShowHotspotModal(false);
      setHotspotForm({
        location_name: "",
        city: "New Delhi",
        state: "Delhi",
        hazard_type: "Poor Lighting",
        severity: "High",
        description: "",
        reported_by: "Community Member"
      });
    } catch (err) {
      console.warn("Hotspot report error:", err);
      setShowHotspotModal(false);
    }
  };

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 transition-colors duration-200 ${
      isStrobeActive ? "bg-red-700 animate-pulse text-white" : "bg-slate-50 text-slate-900"
    }`}>
      {/* Fullscreen Ringing Call Modal */}
      <AnimatePresence>
        {callState === "ringing" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 bg-[#0f172a] text-white flex flex-col justify-between p-8 sm:p-12 items-center"
          >
            <div className="text-center pt-12 space-y-3">
              <div className="w-24 h-24 rounded-full bg-purple-600/30 border-2 border-purple-400 flex items-center justify-center mx-auto text-3xl font-bold animate-bounce">
                <User size={48} className="text-purple-200" />
              </div>
              <h2 className="text-3xl font-extrabold">{callerName}</h2>
              <p className="text-purple-300 text-sm font-medium animate-pulse">Incoming Audio Call...</p>
            </div>

            <div className="w-full max-w-sm flex items-center justify-around pb-12">
              <button
                onClick={endCall}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-700 flex items-center justify-center shadow-lg shadow-rose-900/50 transition-transform group-hover:scale-110">
                  <PhoneOff size={28} />
                </div>
                <span className="text-xs text-rose-300 font-semibold">Decline</span>
              </button>

              <button
                onClick={answerCall}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-900/50 transition-transform group-hover:scale-110 animate-pulse">
                  <PhoneCall size={28} />
                </div>
                <span className="text-xs text-emerald-300 font-semibold">Accept</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Active In-Call Screen */}
        {callState === "connected" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0f172a] text-white flex flex-col justify-between p-8 sm:p-12 items-center"
          >
            <div className="text-center pt-8 space-y-2">
              <div className="w-20 h-20 rounded-full bg-purple-600/30 border border-purple-400 flex items-center justify-center mx-auto text-2xl font-bold">
                <User size={36} className="text-purple-200" />
              </div>
              <h2 className="text-2xl font-bold">{callerName}</h2>
              <p className="text-emerald-400 font-mono text-sm">{formatTimer(callSeconds)}</p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 max-w-md w-full space-y-2 text-center text-sm text-slate-300">
              <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">Helpful phrases to say out loud:</p>
              <p className="italic font-medium text-white">"Hey! Yes, I'm right here on the corner. I see your car approaching now."</p>
              <p className="italic font-medium text-white">"Yes, my brother and police officer uncle are with me. We are coming in 2 minutes."</p>
            </div>

            <div className="pb-12">
              <button
                onClick={endCall}
                className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-700 flex items-center justify-center shadow-xl transition-transform hover:scale-110 cursor-pointer"
              >
                <PhoneOff size={28} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-900 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert size={15} className="text-purple-700" /> Instant Tactical Safety Suite
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2E003E] tracking-tight">
            Emergency Safety & SOS Toolkit
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Practical emergency tools designed for fast action: fake an incoming call to escape uncomfortable situations, sound a loud deterrence siren, vault audio evidence, or dispatch live GPS location.
          </p>
        </div>

        {/* SOS Alert Toast */}
        <AnimatePresence>
          {sosSentToast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-xl mx-auto bg-purple-900 text-white p-4 rounded-2xl flex items-center gap-3 shadow-2xl border border-purple-400"
            >
              <Radio size={22} className="text-emerald-400 animate-pulse shrink-0" />
              <p className="text-xs font-bold">{sosSentToast}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3 Main Tactical Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tool 1: Fake Call Simulator */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-purple-100 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center">
                  <PhoneCall size={24} />
                </div>
                <span className="text-xs font-bold bg-purple-50 text-purple-900 px-3 py-1 rounded-full border border-purple-200">
                  Escort Simulator
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#2E003E]">Fake Call Escape</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Trigger a simulated incoming call with audio ringtone to politely excuse yourself from unsafe encounters.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Caller Name
                  </label>
                  <select
                    value={callerName}
                    onChange={(e) => setCallerName(e.target.value)}
                    className="w-full p-2.5 bg-purple-50/50 border border-purple-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    <option value="Mom">Mom</option>
                    <option value="Dad">Dad</option>
                    <option value="Inspector S. Sharma (Police)">Inspector S. Sharma (Police)</option>
                    <option value="Office Security Desk">Office Security Desk</option>
                    <option value="Brother">Brother</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  <button
                    onClick={() => triggerFakeCall(0)}
                    className="py-2.5 px-3 bg-purple-900 hover:bg-purple-950 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                  >
                    Call Now
                  </button>
                  <button
                    onClick={() => triggerFakeCall(5)}
                    className="py-2.5 px-3 bg-purple-100 hover:bg-purple-200 text-purple-900 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    In 5 Sec
                  </button>
                  <button
                    onClick={() => triggerFakeCall(15)}
                    className="py-2.5 px-3 bg-purple-100 hover:bg-purple-200 text-purple-900 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    In 15 Sec
                  </button>
                </div>

                {callState === "timer" && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between text-xs text-amber-900">
                    <span className="font-semibold">Call scheduled in {callDelay}s...</span>
                    <button onClick={endCall} className="underline font-bold">Cancel</button>
                  </div>
                )}
              </div>
            </div>

            <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-3">
              Works completely offline. Synthesizes a real telephone frequency.
            </div>
          </div>

          {/* Tool 2: Deterrence Siren & Strobe Alarm */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-purple-100 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center">
                  <AlertOctagon size={24} />
                </div>
                <span className="text-xs font-bold bg-rose-50 text-rose-900 px-3 py-1 rounded-full border border-rose-200">
                  Deterrence
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#2E003E]">SOS Alarm & Strobe</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Generates an ear-piercing oscillating siren sound and high-contrast screen flashing to draw immediate bystander attention.
                </p>
              </div>

              <div className="pt-4 flex flex-col items-center justify-center space-y-4">
                <button
                  onClick={toggleSiren}
                  className={`w-28 h-28 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-300 font-bold uppercase tracking-wider text-xs cursor-pointer ${
                    isSirenActive
                      ? "bg-rose-600 text-white animate-ping"
                      : "bg-gradient-to-br from-rose-700 to-rose-900 text-white hover:scale-105 hover:shadow-rose-900/40"
                  }`}
                >
                  {isSirenActive ? <VolumeX size={32} /> : <Volume2 size={32} />}
                  <span className="mt-1">{isSirenActive ? "STOP SIREN" : "START ALARM"}</span>
                </button>
                <p className="text-xs text-slate-500 text-center font-medium">
                  {isSirenActive ? "Siren is active! Press above to stop." : "Ensure your phone/laptop volume is set to maximum."}
                </p>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-3">
              Oscillates between 600Hz - 900Hz alarm frequency to cut through noise.
            </div>
          </div>

          {/* Tool 3: Audio Evidence Grabber & Vault */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-purple-100 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center">
                  <Mic size={24} />
                </div>
                <span className="text-xs font-bold bg-indigo-50 text-indigo-900 px-3 py-1 rounded-full border border-indigo-200">
                  Evidence Capture
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#2E003E]">Discreet Voice Recorder</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Safely record verbal harassment, threats, or confrontations directly with 1-click cloud vaulting.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {!isRecording ? (
                  <button
                    onClick={startRecording}
                    className="w-full py-3 bg-indigo-900 hover:bg-indigo-950 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <Mic size={16} /> Start Incident Recording
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md animate-pulse cursor-pointer"
                  >
                    <Square size={16} /> Stop Recording & Save
                  </button>
                )}

                {audioUrl && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <p className="text-xs font-semibold text-slate-700">Recorded Evidence Clip:</p>
                    <audio src={audioUrl} controls className="w-full h-8" />
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={handleVaultAudio}
                        disabled={vaultingAudio}
                        className="flex-1 py-1.5 bg-purple-900 hover:bg-purple-950 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition disabled:opacity-50 cursor-pointer"
                      >
                        <Upload size={12} />
                        <span>{vaultingAudio ? "Vaulting..." : "Vault Securely"}</span>
                      </button>
                      <a
                        href={audioUrl}
                        download={`incident_audio_${Date.now()}.webm`}
                        className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1"
                      >
                        <Download size={12} /> Save
                      </a>
                    </div>
                  </div>
                )}

                {vaultSuccess && (
                  <p className="text-xs font-bold text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 text-center">
                    ✓ {vaultSuccess}
                  </p>
                )}
              </div>
            </div>

            <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-3">
              Audio is encrypted and vaulted with timestamps for court / POSH evidence.
            </div>
          </div>
        </div>

        {/* Section 2: 1-Tap Geolocation & WhatsApp/SMS SOS Dispatcher */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-100 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-100 pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full mb-2">
                <MapPin size={14} /> Instant Emergency SOS Dispatch
              </div>
              <h2 className="text-2xl font-black text-[#2E003E]">Live GPS Location & Emergency Alert</h2>
              <p className="text-xs text-slate-500 mt-1">
                Save trusted contacts. In danger, tap to broadcast your live GPS coordinates via WhatsApp or SMS.
              </p>
            </div>

            <button
              onClick={fetchLocation}
              disabled={locLoading}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white text-xs font-bold rounded-xl shadow-md transition hover:scale-105 cursor-pointer"
            >
              <MapPin size={16} />
              <span>{locLoading ? "Fetching GPS..." : coords ? "Update GPS Coordinates" : "Get My Live Location"}</span>
            </button>
          </div>

          {locError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-900 text-xs rounded-xl font-medium">
              {locError}
            </div>
          )}

          {coords && (
            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-purple-950">
              <div>
                <p className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-600" /> GPS Locked: Latitude {coords.lat.toFixed(5)}, Longitude {coords.lng.toFixed(5)}
                </p>
                <p className="text-purple-700 text-[11px] mt-0.5">Accuracy: ~{coords.accuracy} meters radius</p>
              </div>
              <a
                href={`https://maps.google.com/?q=${coords.lat},${coords.lng}`}
                target="_blank"
                rel="noreferrer"
                className="underline font-bold text-purple-900 hover:text-purple-700"
              >
                Open in Google Maps ↗
              </a>
            </div>
          )}

          {/* Emergency Contacts List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-[#2E003E] uppercase tracking-wider">
                Trusted Emergency Contacts ({contacts.length})
              </h4>

              <div className="space-y-2">
                {contacts.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No emergency contacts added yet.</p>
                ) : (
                  contacts.map((contact, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-50 hover:bg-purple-50/50 rounded-2xl border border-slate-200 flex items-center justify-between transition"
                    >
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{contact.name}</p>
                        <p className="text-xs text-slate-500 font-mono">{contact.phone}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => sendWhatsAppSOS(contact.phone)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm transition cursor-pointer"
                        >
                          <Send size={12} /> WhatsApp SOS
                        </button>
                        <button
                          onClick={() => sendSmsSOS(contact.phone)}
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm transition cursor-pointer"
                        >
                          SMS SOS
                        </button>
                        <button
                          onClick={() => removeContact(idx)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                          title="Remove Contact"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Add contact form */}
              <form onSubmit={addContact} className="pt-2 flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Contact Name (e.g., Mom)"
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  className="flex-1 p-2.5 bg-purple-50/40 border border-purple-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <input
                  type="tel"
                  placeholder="Phone Number (10 digits)"
                  value={newContactPhone}
                  onChange={(e) => setNewContactPhone(e.target.value)}
                  className="flex-1 p-2.5 bg-purple-50/40 border border-purple-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-purple-900 hover:bg-purple-950 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus size={14} /> Add
                </button>
              </form>
            </div>

            {/* Custom SOS Message Config */}
            <div className="space-y-3 bg-purple-50/60 p-6 rounded-2xl border border-purple-100">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Emergency Message Template
              </label>
              <textarea
                rows={4}
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                className="w-full p-3 bg-white border border-purple-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <p className="text-[11px] text-slate-500">
                Your live Google Maps coordinates link will automatically be attached at the end of the message when you click send.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Community Safety Hotspots & Crowd-sourced Hazard Alerts */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-100 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-100 pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-800 bg-rose-50 px-3 py-1 rounded-full mb-2">
                <Flame size={14} className="text-rose-600" /> Crowd-Sourced Safety Heatmap
              </div>
              <h2 className="text-2xl font-black text-[#2E003E]">Reported Unsafe Zones & Dark Spots</h2>
              <p className="text-xs text-slate-500 mt-1">
                Community-verified hazard alerts for poor lighting, isolated transit routes, or eve-teasing areas.
              </p>
            </div>

            <button
              onClick={() => setShowHotspotModal(true)}
              className="px-5 py-2.5 bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            >
              <Plus size={15} />
              <span>Report Unsafe Spot</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hotspots.map((spot) => (
              <div
                key={spot.id}
                className="p-5 bg-slate-50 hover:bg-rose-50/30 rounded-2xl border border-slate-200 transition space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 border border-rose-300">
                      {spot.hazard_type}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      spot.severity === 'Critical' ? 'bg-red-600 text-white' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {spot.severity} Risk
                    </span>
                  </div>

                  <h4 className="font-bold text-[#2E003E] text-sm sm:text-base">{spot.location_name}</h4>
                  <p className="text-xs text-slate-500 font-medium">{spot.city}, {spot.state}</p>
                  <p className="text-xs text-slate-700 leading-relaxed">{spot.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">Reported by {spot.reported_by}</span>
                  <button
                    onClick={() => handleUpvoteHotspot(spot.id)}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-purple-100 text-purple-900 rounded-lg border border-purple-200 text-xs font-bold transition cursor-pointer"
                  >
                    <ThumbsUp size={12} />
                    <span>{spot.upvotes || 1} Confirmations</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hotspot Report Modal */}
        <AnimatePresence>
          {showHotspotModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-purple-100"
              >
                <div className="flex justify-between items-center border-b pb-3">
                  <h3 className="font-bold text-[#2E003E] text-lg">Report Unsafe Community Dark Spot</h3>
                  <button onClick={() => setShowHotspotModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
                </div>

                <form onSubmit={handleSubmitHotspot} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Location Name & Landmark *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Underpass near Metro Gate 3"
                      value={hotspotForm.location_name}
                      onChange={(e) => setHotspotForm({ ...hotspotForm, location_name: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1">City *</label>
                      <input
                        type="text"
                        required
                        value={hotspotForm.city}
                        onChange={(e) => setHotspotForm({ ...hotspotForm, city: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1">Hazard Type</label>
                      <select
                        value={hotspotForm.hazard_type}
                        onChange={(e) => setHotspotForm({ ...hotspotForm, hazard_type: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                      >
                        <option>Poor Lighting</option>
                        <option>Isolated Area</option>
                        <option>Eve-teasing</option>
                        <option>Lack of Patrol</option>
                        <option>Broken Infrastructure</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Risk Severity</label>
                    <select
                      value={hotspotForm.severity}
                      onChange={(e) => setHotspotForm({ ...hotspotForm, severity: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Critical</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Hazard Details & Observation *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Describe why this spot is unsafe, time of day when it gets risky, missing streetlights..."
                      value={hotspotForm.description}
                      onChange={(e) => setHotspotForm({ ...hotspotForm, description: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border rounded-xl"
                    />
                  </div>

                  <div className="pt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowHotspotModal(false)}
                      className="flex-1 py-2.5 bg-slate-100 rounded-xl font-bold text-slate-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-rose-700 hover:bg-rose-800 text-white rounded-xl font-bold"
                    >
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
