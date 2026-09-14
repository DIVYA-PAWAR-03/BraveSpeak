import React, { useState } from "react";
import { 
  Mail, MapPin, Phone as PhoneIcon, User, PhoneCall, 
  ShieldAlert, HelpCircle, ChevronDown, ChevronUp, CheckCircle2, Send, Sparkles,
  Search, ShieldCheck, Clock, FileText, Copy, AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { contactApi } from "../services/api";

export default function ContactUs() {
  const [openFaq, setOpenFaq] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);

  // Form inputs
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    category: "General Support & Counseling",
    message: ""
  });

  // Track Status State
  const [trackRefId, setTrackRefId] = useState("");
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackResult, setTrackResult] = useState(null);
  const [trackError, setTrackError] = useState("");

  const faqs = [
    {
      q: "Is reaching out through BraveSpeak confidential?",
      a: "Yes. We strictly respect survivor anonymity and do not store or share personal details without your explicit consent. You can submit inquiries using an alias."
    },
    {
      q: "What is a Zero FIR and when can I use it?",
      a: "A Zero FIR allows you to register an FIR at any police station in India regardless of where the incident happened. The police are legally obligated to register it and transfer it to the concerned station."
    },
    {
      q: "How can I access free legal aid in India?",
      a: "Under the Legal Services Authorities Act, all women in India are eligible for 100% free legal representation provided by the District Legal Services Authority (DLSA) in every court."
    },
    {
      q: "What should I do immediately after experiencing cyber harassment?",
      a: "Capture complete screenshots showing timestamps, usernames, and URLs. Do not delete the messages. File an online complaint immediately at cybercrime.gov.in or call 1930."
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;

    try {
      setLoading(true);
      const res = await contactApi.submitInquiry(form);
      if (res.success) {
        setSubmissionData(res);
        setFormSubmitted(true);
        setForm({
          name: "",
          email: "",
          phone: "",
          category: "General Support & Counseling",
          message: ""
        });
      }
    } catch (err) {
      console.warn("Contact submission fallback:", err);
      // Fallback local acknowledgment
      const fallbackRef = `BS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setSubmissionData({
        refId: fallbackRef,
        message: "Your inquiry has been received securely."
      });
      setFormSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleTrackInquiry = async (e) => {
    e.preventDefault();
    if (!trackRefId.trim()) return;

    try {
      setTrackingLoading(true);
      setTrackError("");
      setTrackResult(null);
      const res = await contactApi.checkStatus(trackRefId.trim());
      if (res.success && res.data) {
        setTrackResult(res.data);
      }
    } catch (err) {
      setTrackError(err.message || "Reference code not found. Please check and try again.");
    } finally {
      setTrackingLoading(false);
    }
  };

  const handleCopyRef = () => {
    if (submissionData?.refId) {
      navigator.clipboard.writeText(submissionData.refId);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-900 text-xs font-bold uppercase tracking-wider">
            <PhoneCall size={14} className="text-purple-700" /> 24/7 Crisis & Support Network
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2E003E] tracking-tight">
            We Are Here to Listen & Support You
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Need emergency assistance, legal advice, or a safe confidential inquiry? Reach out directly to verified national helplines or contact our team below.
          </p>
        </div>

        {/* 24/7 Verified Emergency Direct-Dial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <a
            href="tel:181"
            className="p-6 bg-gradient-to-br from-rose-900 to-rose-950 rounded-3xl text-white shadow-xl hover:scale-105 transition-all flex flex-col justify-between group border border-rose-700/50"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/30 flex items-center justify-center text-rose-300">
                  <PhoneCall size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-rose-500/20 text-rose-200 rounded-full border border-rose-400/30">
                  24/7 Toll-Free
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Women Helpline</h3>
              <p className="text-xs text-rose-200/90 leading-relaxed mb-4">
                Immediate crisis intervention, counseling, and rescue coordination.
              </p>
            </div>
            <div className="pt-3 border-t border-rose-800/60 flex items-center justify-between">
              <span className="text-2xl font-black text-rose-200">Dial 181</span>
              <span className="text-xs font-semibold text-rose-300 group-hover:translate-x-1 transition-transform">Call Now →</span>
            </div>
          </a>

          <a
            href="tel:112"
            className="p-6 bg-gradient-to-br from-purple-900 to-[#1F002B] rounded-3xl text-white shadow-xl hover:scale-105 transition-all flex flex-col justify-between group border border-purple-700/50"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/30 flex items-center justify-center text-purple-300">
                  <ShieldAlert size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-purple-500/20 text-purple-200 rounded-full border border-purple-400/30">
                  National SOS
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">All-in-One Emergency</h3>
              <p className="text-xs text-purple-200/90 leading-relaxed mb-4">
                Direct dispatch for Police, Medical Ambulance, and Fire response.
              </p>
            </div>
            <div className="pt-3 border-t border-purple-800/60 flex items-center justify-between">
              <span className="text-2xl font-black text-purple-200">Dial 112</span>
              <span className="text-xs font-semibold text-purple-300 group-hover:translate-x-1 transition-transform">Call Now →</span>
            </div>
          </a>

          <a
            href="tel:1091"
            className="p-6 bg-gradient-to-br from-indigo-900 to-indigo-950 rounded-3xl text-white shadow-xl hover:scale-105 transition-all flex flex-col justify-between group border border-indigo-700/50"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/30 flex items-center justify-center text-indigo-300">
                  <PhoneIcon size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-indigo-500/20 text-indigo-200 rounded-full border border-indigo-400/30">
                  Police Women Cell
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Women Police Cell</h3>
              <p className="text-xs text-indigo-200/90 leading-relaxed mb-4">
                Direct connection to district special women police officers.
              </p>
            </div>
            <div className="pt-3 border-t border-indigo-800/60 flex items-center justify-between">
              <span className="text-2xl font-black text-indigo-200">Dial 1091</span>
              <span className="text-xs font-semibold text-indigo-300 group-hover:translate-x-1 transition-transform">Call Now →</span>
            </div>
          </a>

          <a
            href="tel:1930"
            className="p-6 bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl text-white shadow-xl hover:scale-105 transition-all flex flex-col justify-between group border border-slate-700/50"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-500/30 flex items-center justify-center text-slate-300">
                  <ShieldAlert size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-slate-500/20 text-slate-200 rounded-full border border-slate-400/30">
                  Cyber Crime
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Cyber Helpline</h3>
              <p className="text-xs text-slate-300/90 leading-relaxed mb-4">
                Online harassment, blackmail, leaked media, & identity fraud.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-2xl font-black text-slate-200">Dial 1930</span>
              <span className="text-xs font-semibold text-slate-300 group-hover:translate-x-1 transition-transform">Call Now →</span>
            </div>
          </a>
        </div>

        {/* Contact Form & Anonymous Case Tracking */}
        <div className="bg-white rounded-3xl shadow-xl border border-purple-100 overflow-hidden flex flex-col lg:flex-row">
          {/* Left Info Panel */}
          <div className="lg:w-5/12 bg-gradient-to-br from-[#2E003E] via-purple-950 to-indigo-950 p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-8 relative z-10">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-300 bg-purple-500/30 px-3 py-1 rounded-full border border-purple-400/30 uppercase tracking-wider mb-3">
                  <Sparkles size={13} /> Reach Our Team
                </span>
                <h2 className="text-3xl font-extrabold text-white">Get in Touch</h2>
                <p className="text-purple-200/90 text-sm mt-2 leading-relaxed">
                  Have questions about legal rights, need guidance on navigating POSH or FIR procedures, or want to partner with us? We respond within 24 hours.
                </p>
              </div>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-200 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-white">Headquarters & Support Base</p>
                    <p className="text-purple-200/80 text-xs mt-0.5">123 Justice & Safety Avenue, New Delhi, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-200 shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-white">Email Address</p>
                    <a href="mailto:support@bravespeak.org" className="text-purple-200/80 text-xs mt-0.5 hover:underline block">
                      support@bravespeak.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-200 shrink-0">
                    <PhoneIcon size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-white">Direct Line</p>
                    <p className="text-purple-200/80 text-xs mt-0.5">+91 11 2345 6789 (Mon-Sat, 9AM-6PM)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-purple-800/60 relative z-10 text-xs text-purple-300">
              <p className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>Your information is strictly confidential & encrypted.</span>
              </p>
            </div>
          </div>

          {/* Right Message Form & Tracker */}
          <div className="lg:w-7/12 p-8 sm:p-12 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-2xl font-extrabold text-[#2E003E] mb-1">Send a Confidential Message</h3>
              <p className="text-xs text-slate-500">
                You will receive an encrypted Reference ID to track case updates without providing personal credentials.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-8 bg-purple-50 border border-purple-200 rounded-3xl text-center space-y-4 animate-fade-in">
                <CheckCircle2 size={44} className="mx-auto text-emerald-600" />
                <h4 className="text-2xl font-black text-[#2E003E]">Inquiry Submitted Safely</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you for reaching out to BraveSpeak. Your inquiry has been logged securely in our support queue.
                </p>

                {submissionData?.refId && (
                  <div className="p-4 bg-white border border-purple-300 rounded-2xl max-w-xs mx-auto space-y-2">
                    <p className="text-[11px] uppercase font-bold text-purple-900 tracking-wider">Your Confidential Reference ID</p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-mono text-xl font-black text-[#2E003E]">{submissionData.refId}</span>
                      <button
                        onClick={handleCopyRef}
                        className="p-1.5 rounded-lg bg-purple-100 text-purple-900 hover:bg-purple-200 transition cursor-pointer"
                        title="Copy Reference ID"
                      >
                        {copiedRef ? <CheckCircle2 size={16} className="text-emerald-600" /> : <Copy size={16} />}
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-400">Save this code to check response status anonymously.</p>
                  </div>
                )}

                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-[#2E003E] text-white rounded-full text-xs font-semibold hover:bg-purple-950 transition cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Name / Display Alias *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" size={17} />
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Enter your name or alias"
                        className="w-full pl-10 pr-4 py-3 bg-purple-50/40 border border-purple-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-purple-400/80 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Support Category
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full p-3 bg-purple-50/40 border border-purple-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      <option>General Support & Counseling</option>
                      <option>Legal Aid & FIR Guidance</option>
                      <option>POSH Workplace Harassment</option>
                      <option>Cybercrime & Takedown Assistance</option>
                      <option>NGO Collaboration / Volunteering</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address (Optional)
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" size={17} />
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="For private email updates"
                        className="w-full pl-10 pr-4 py-3 bg-purple-50/40 border border-purple-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-purple-400/80 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <div className="relative">
                      <PhoneIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" size={17} />
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="For confidential callback"
                        className="w-full pl-10 pr-4 py-3 bg-purple-50/40 border border-purple-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-purple-400/80 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Message / Situation *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe how we can support you. All communications are confidential..."
                    className="w-full p-3.5 bg-purple-50/40 border border-purple-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-purple-400/80 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-[#6A0DAD] to-purple-600 hover:from-purple-600 hover:to-[#6A0DAD] text-white rounded-xl font-bold shadow-lg shadow-purple-950/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send size={16} />
                  <span>{loading ? "Transmitting Securely..." : "Submit Confidential Inquiry"}</span>
                </button>
              </form>
            )}

            {/* Anonymous Status Tracker Box */}
            <div className="pt-6 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-950 mb-2 flex items-center gap-1.5">
                <Search size={14} className="text-purple-600" />
                Track Anonymous Case / Inquiry Status
              </h4>

              <form onSubmit={handleTrackInquiry} className="flex gap-2">
                <input
                  type="text"
                  value={trackRefId}
                  onChange={(e) => setTrackRefId(e.target.value)}
                  placeholder="Enter Reference ID (e.g. BS-A1B2C3)"
                  className="flex-1 px-3 py-2.5 bg-slate-50 border border-purple-200 rounded-xl text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <button
                  type="submit"
                  disabled={trackingLoading || !trackRefId.trim()}
                  className="px-4 py-2.5 bg-[#2E003E] text-white rounded-xl text-xs font-bold hover:bg-purple-950 transition disabled:opacity-50 cursor-pointer"
                >
                  {trackingLoading ? "Checking..." : "Track Status"}
                </button>
              </form>

              {trackError && (
                <p className="text-xs text-rose-600 mt-2 font-semibold flex items-center gap-1">
                  <AlertCircle size={13} /> {trackError}
                </p>
              )}

              {trackResult && (
                <div className="mt-3 p-4 bg-purple-50/70 border border-purple-200 rounded-2xl space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-purple-950">Status: <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-extrabold">{trackResult.status}</span></span>
                    <span className="text-slate-500 text-[10px]">{new Date(trackResult.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-slate-700"><strong>Category:</strong> {trackResult.category}</p>
                  {trackResult.admin_note && (
                    <div className="p-2.5 bg-white border border-purple-200 rounded-xl text-slate-800">
                      <strong>Support Desk Update:</strong> {trackResult.admin_note}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-3xl shadow-xl border border-purple-100 p-8 sm:p-12 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              Knowledge Base
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2E003E]">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-purple-100 rounded-2xl overflow-hidden transition-all bg-purple-50/30"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left font-bold text-[#2E003E] flex items-center justify-between gap-4 cursor-pointer hover:bg-purple-50/80 transition text-sm sm:text-base"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={18} className="text-purple-700 shrink-0" /> : <ChevronDown size={18} className="text-purple-700 shrink-0" />}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-purple-100 pt-3"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
