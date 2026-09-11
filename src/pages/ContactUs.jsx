import React, { useState } from "react";
import { 
  Mail, MapPin, Phone as PhoneIcon, User, PhoneCall, 
  ShieldAlert, HelpCircle, ChevronDown, ChevronUp, CheckCircle2, Send, Sparkles 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactUs() {
  const [openFaq, setOpenFaq] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const faqs = [
    {
      q: "Is reaching out through BraveSpeak confidential?",
      a: "Yes. We strictly respect survivor anonymity and do not store or share personal details without your explicit consent."
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
                  Police Cell
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Women Police Helpline</h3>
              <p className="text-xs text-indigo-200/90 leading-relaxed mb-4">
                Dedicated women police officers for rapid local assistance.
              </p>
            </div>
            <div className="pt-3 border-t border-indigo-800/60 flex items-center justify-between">
              <span className="text-2xl font-black text-indigo-200">Dial 1091</span>
              <span className="text-xs font-semibold text-indigo-300 group-hover:translate-x-1 transition-transform">Call Now →</span>
            </div>
          </a>

          <a
            href="tel:1930"
            className="p-6 bg-gradient-to-br from-violet-900 to-slate-950 rounded-3xl text-white shadow-xl hover:scale-105 transition-all flex flex-col justify-between group border border-violet-700/50"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-violet-500/30 flex items-center justify-center text-violet-300">
                  <Mail size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-violet-500/20 text-violet-200 rounded-full border border-violet-400/30">
                  Cyber Fraud/Leak
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Cyber Crime Helpline</h3>
              <p className="text-xs text-violet-200/90 leading-relaxed mb-4">
                Report online harassment, photo morphing, leaks, and financial fraud.
              </p>
            </div>
            <div className="pt-3 border-t border-violet-800/60 flex items-center justify-between">
              <span className="text-2xl font-black text-violet-200">Dial 1930</span>
              <span className="text-xs font-semibold text-violet-300 group-hover:translate-x-1 transition-transform">Call Now →</span>
            </div>
          </a>
        </div>

        {/* Main Contact Section: Left Info + Right Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-purple-100 overflow-hidden flex flex-col lg:flex-row">
          {/* Left Info Panel */}
          <div className="lg:w-5/12 bg-gradient-to-br from-[#2E003E] via-[#4A0A65] to-[#1F002B] text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-8 relative z-10">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-300 bg-purple-500/30 px-3 py-1 rounded-full border border-purple-400/30 uppercase tracking-wider mb-3">
                  <Sparkles size={13} /> Reach Our Team
                </span>
                <h2 className="text-3xl font-extrabold text-white">Get in Touch</h2>
                <p className="text-purple-200/90 text-sm mt-2 leading-relaxed">
                  Have questions about our initiatives, want to partner with us, or share feedback? We respond within 24 hours.
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

          {/* Right Message Form */}
          <div className="lg:w-7/12 p-8 sm:p-12">
            <h3 className="text-2xl font-extrabold text-[#2E003E] mb-2">Send a Message</h3>
            <p className="text-xs text-slate-500 mb-6">
              Fill in the form below and we will get back to you promptly.
            </p>

            {formSubmitted ? (
              <div className="p-8 bg-purple-50 border border-purple-200 rounded-2xl text-center space-y-3 animate-fade-in">
                <CheckCircle2 size={40} className="mx-auto text-emerald-600" />
                <h4 className="text-xl font-bold text-[#2E003E]">Message Sent Successfully!</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you for reaching out to BraveSpeak. A member of our support team will respond to your query shortly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 px-6 py-2 bg-[#2E003E] text-white rounded-full text-xs font-semibold hover:bg-purple-950 transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form 
                action="https://api.web3forms.com/submit" 
                method="POST" 
                onSubmit={() => { setTimeout(() => setFormSubmitted(true), 800); }}
                className="space-y-5"
              >
                <input type="hidden" name="access_key" value="9620de68-693f-4589-b226-c7b3b900267d" />

                <div>
                  <label htmlFor="contact_name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" size={18} />
                    <input
                      type="text"
                      id="contact_name"
                      name="name"
                      required
                      placeholder="Enter your name or alias"
                      className="w-full pl-10 pr-4 py-3 bg-purple-50/40 border border-purple-200 rounded-xl text-sm text-slate-800 placeholder-purple-400/80 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact_email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" size={18} />
                    <input
                      type="email"
                      id="contact_email"
                      name="email"
                      required
                      placeholder="your.email@domain.com"
                      className="w-full pl-10 pr-4 py-3 bg-purple-50/40 border border-purple-200 rounded-xl text-sm text-slate-800 placeholder-purple-400/80 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact_message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    id="contact_message"
                    name="message"
                    rows={4}
                    required
                    placeholder="How can we assist you? Tell us about your query or requirement..."
                    className="w-full p-3.5 bg-purple-50/40 border border-purple-200 rounded-xl text-sm text-slate-800 placeholder-purple-400/80 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-[#6A0DAD] to-purple-600 hover:from-purple-600 hover:to-[#6A0DAD] text-white font-bold rounded-xl shadow-lg shadow-purple-900/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <Send size={16} />
                  <span>Send Message Securely</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Frequently Asked Questions (FAQ) Section */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-lg border border-purple-100 space-y-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold px-3 py-1 bg-purple-100 text-purple-900 rounded-full uppercase tracking-wider">
              Common Questions
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2E003E] mt-2">
              Frequently Asked Legal & Safety Questions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-purple-100 rounded-2xl p-5 bg-purple-50/30 hover:bg-purple-50 transition cursor-pointer"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-[#2E003E] text-sm flex items-start gap-2">
                      <HelpCircle size={16} className="text-purple-600 shrink-0 mt-0.5" />
                      <span>{faq.q}</span>
                    </h4>
                    {isOpen ? <ChevronUp size={16} className="text-purple-700" /> : <ChevronDown size={16} className="text-purple-700" />}
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-slate-600 mt-3 pt-3 border-t border-purple-100 leading-relaxed"
                      >
                        {faq.a}
                      </motion.p>
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
