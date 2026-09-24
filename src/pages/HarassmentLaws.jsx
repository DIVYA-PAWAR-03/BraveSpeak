import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  Scale, Shield, Search, ChevronDown, ChevronUp, Copy, Check, 
  PhoneCall, ExternalLink, AlertCircle, FileText, BookmarkCheck, HeartHandshake, Sparkles, ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CrimeLawAwareness from "../components/CrimeLawAwareness";

const categories = [
  "All",
  "Workplace & POSH",
  "Cyber & Digital",
  "Physical & Assault",
  "Stalking & Modesty",
  "Domestic & Mental"
];

const lawsData = [
    {
      category: "Workplace & POSH",
      title: "Workplace Sexual Harassment (POSH Act)",
      description: "Unwelcome physical, verbal, or non-verbal conduct of sexual nature in workplace settings.",
      laws: [
        "Sexual Harassment of Women at Workplace Act, 2013 (POSH)",
        "IPC Section 354A (Sexual Harassment)"
      ],
      punishment: "Disciplinary action, termination, compensation, and up to 3 years imprisonment.",
      severity: "High",
      more: "Under the POSH Act, every employer with 10+ employees must constitute an Internal Complaints Committee (ICC). Complaints can be filed within 3 months of the incident. It also protects against retaliation and biased performance appraisals.",
      actionSteps: "Submit a written complaint to your organisation's ICC or the Local Complaints Committee (LCC) within 3 months."
    },
    {
      category: "Physical & Assault",
      title: "Assault & Use of Criminal Force",
      description: "Any unwelcome physical contact, physical force, pushing, grabbing, or assault intended to outrage modesty.",
      laws: [
        "IPC Section 354 (Assault to Outrage Modesty)",
        "IPC Section 354B (Assault with Intent to Disrobe)"
      ],
      punishment: "1 to 5 years imprisonment (Sec 354) / 3 to 7 years imprisonment (Sec 354B) plus fine.",
      severity: "Critical",
      more: "Section 354 is a non-bailable offense. It covers any assault where there is an intention to outrage modesty or knowledge that it will likely outrage modesty of a woman.",
      actionSteps: "Report immediately to the nearest police station or dial 112/1091 to register a Zero FIR."
    },
    {
      category: "Cyber & Digital",
      title: "Cyber Harassment, Stalking & Leaks",
      description: "Sending obscene digital messages, morphing photos, leaking private data, dox attacks, and continuous online trolling.",
      laws: [
        "IT Act Section 67 (Publishing Obscene Content)",
        "IT Act Section 66E (Violation of Privacy)",
        "IPC Section 354D (Cyber Stalking)"
      ],
      punishment: "Up to 3 to 5 years imprisonment and fine up to ₹10 Lakh.",
      severity: "High",
      more: "Cyber stalking includes monitoring email, social media, or internet use against the victim's consent. Section 66E specifically penalizes capturing, publishing, or transmitting images of private body parts without consent.",
      actionSteps: "Capture complete screenshots with URLs, usernames, timestamps. File a report on cybercrime.gov.in."
    },
    {
      category: "Stalking & Modesty",
      title: "Physical Stalking & Voyeurism",
      description: "Following someone repeatedly in person, monitoring daily routines, or watching/capturing women in private acts.",
      laws: [
        "IPC Section 354C (Voyeurism)",
        "IPC Section 354D (Physical Stalking)"
      ],
      punishment: "1 to 3 years for 1st conviction; up to 5 years for repeat conviction.",
      severity: "High",
      more: "Voyeurism punishes anyone who watches or captures the image of a woman engaging in a private act where she expects privacy (trial rooms, restrooms, bedrooms). Stalking applies to unwanted physical following and continuous monitoring.",
      actionSteps: "Maintain an incident log with dates, times, witnesses, and CCTV footage if available."
    },
    {
      category: "Stalking & Modesty",
      title: "Verbal Harassment, Gestures & Eve-Teasing",
      description: "Abusive words, sexually explicit remarks, whistles, vulgar songs, gestures, or exhibitionism.",
      laws: [
        "IPC Section 294 (Obscene Acts & Songs)",
        "IPC Section 509 (Word, Gesture or Act Intended to Insult Modesty)"
      ],
      punishment: "Up to 3 years simple imprisonment with fine.",
      severity: "Medium",
      more: "Section 509 protects privacy and modesty against any intrusive verbal or non-verbal gesture. It applies in public places, public transport, educational campuses, and residential areas.",
      actionSteps: "Call 1091 (Women Helpline) or approach nearby traffic/beat police officers immediately."
    },
    {
      category: "Domestic & Mental",
      title: "Domestic Violence & Emotional Abuse",
      description: "Physical, emotional, verbal, sexual, and economic abuse by domestic relations or marital partners.",
      laws: [
        "Protection of Women from Domestic Violence Act, 2005 (PWDVA)",
        "IPC Section 498A (Cruelty by Husband or Relatives)"
      ],
      punishment: "Imprisonment up to 3 years plus monetary relief, residence orders, and protection orders.",
      severity: "High",
      more: "The PWDVA provides civil remedies including instant protection orders, right to reside in shared household, interim maintenance, and child custody. Section 498A handles criminal cruelty.",
      actionSteps: "Contact a Protection Officer or Free Legal Aid Counsel via the District Legal Services Authority (DLSA)."
    },
    {
      category: "Domestic & Mental",
      title: "Caste & Identity-Based Harassment",
      description: "Targeting, humiliating, or denying access to a woman based on caste identity, tribe, or minority background.",
      laws: [
        "SC/ST (Prevention of Atrocities) Act, 1989",
        "Article 15 & 21 of Indian Constitution"
      ],
      punishment: "Stringent imprisonment ranging from 6 months up to life imprisonment depending on severity.",
      severity: "Critical",
      more: "Any insult, humiliation, or violence directed towards women from Scheduled Castes or Scheduled Tribes is non-bailable with designated special courts for expeditious trials.",
      actionSteps: "File an FIR under the PoA Act at any police station; legal aid is provided free of cost."
    }
  ];

const HarassmentLaws = () => {
  const [expanded, setExpanded] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);

  const filteredLaws = useMemo(() => {
    return lawsData.filter((item) => {
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.laws.some(law => law.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.more.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopy = (laws, index) => {
    const text = laws.join(", ");
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case "Critical":
        return "bg-rose-100 text-rose-800 border-rose-300";
      case "High":
        return "bg-amber-100 text-amber-800 border-amber-300";
      default:
        return "bg-purple-100 text-purple-800 border-purple-300";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0010] py-12 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Title Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-900 dark:bg-purple-900/40 dark:border-purple-700/60 dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
            <Scale size={15} /> Legal Empowerment Hub
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2E003E] dark:text-purple-100 tracking-tight">
            Indian Harassment Laws & Legal Protections
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Clear, actionable information on Indian Penal Code (IPC) sections, workplace safety acts, cyber safety laws, and victim rights.
          </p>

          <div className="pt-2">
            <Link
              to="/legal-assistant"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-500 text-white text-sm font-bold rounded-full shadow-lg shadow-purple-950/20 hover:scale-105 transition-all cursor-pointer"
            >
              <Sparkles size={16} className="text-amber-300" />
              <span>Open Interactive Legal Assistant & Complaint Drafter</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Crime-to-Law Awareness Section */}
        <div className="-mx-4 sm:-mx-6">
          <CrimeLawAwareness />
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-slate-800/80 p-6 rounded-3xl shadow-lg border border-purple-100 dark:border-purple-900/50 space-y-4 backdrop-blur-sm">
          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by law (e.g. IPC 354, POSH, Stalking, Cyber, Domestic)..."
              className="w-full pl-12 pr-4 py-3.5 bg-purple-50/50 border border-purple-200 rounded-2xl text-slate-800 placeholder-purple-400/80 dark:bg-slate-900 dark:border-purple-900/60 dark:text-purple-100 dark:placeholder-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white dark:focus:bg-slate-900 transition"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#2E003E] dark:bg-purple-600 text-white shadow-md shadow-purple-950/20"
                    : "bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200/60 dark:bg-slate-900 dark:text-purple-300 dark:hover:bg-slate-800 dark:border-purple-900/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Laws Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredLaws.length === 0 ? (
            <div className="col-span-2 text-center py-16 bg-white dark:bg-slate-800/80 rounded-3xl border border-purple-100 dark:border-purple-900/50 p-8">
              <AlertCircle size={40} className="mx-auto text-purple-400 mb-3" />
              <h3 className="text-xl font-bold text-[#2E003E] dark:text-purple-100">No laws matched your query</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Try clearing your search query or selecting "All" categories.</p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                className="mt-4 px-5 py-2 bg-purple-600 text-white rounded-full text-sm font-semibold hover:bg-purple-700 transition"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredLaws.map((item, index) => {
              const isExpanded = expanded === index;
              return (
                <motion.div
                  key={index}
                  layout
                  className="bg-white dark:bg-slate-800/80 rounded-3xl p-6 sm:p-7 shadow-md hover:shadow-xl border border-purple-100 dark:border-purple-900/50 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Category & Severity */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/50">
                        {item.category}
                      </span>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getSeverityBadge(item.severity)}`}>
                        {item.severity} Offense
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl sm:text-2xl font-bold text-[#2E003E] dark:text-purple-100 mb-2 leading-snug">
                      {item.title}
                    </h2>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Laws Badge Box */}
                    <div className="bg-purple-50/70 border border-purple-100 dark:bg-purple-950/40 dark:border-purple-800/50 rounded-2xl p-4 mb-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-purple-900 dark:text-purple-300 flex items-center gap-1.5">
                          <BookmarkCheck size={14} className="text-purple-600 dark:text-purple-400" /> Applicable Statutes
                        </span>
                        <button
                          onClick={() => handleCopy(item.laws, index)}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-700 hover:text-purple-900 bg-white border border-purple-200 dark:bg-slate-800 dark:text-purple-300 dark:hover:text-purple-100 dark:border-purple-700/60 px-2 py-0.5 rounded-md transition shadow-sm"
                          title="Copy legal citation"
                        >
                          {copiedIndex === index ? (
                            <>
                              <Check size={12} className="text-emerald-600 dark:text-emerald-400" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy size={12} /> Copy
                            </>
                          )}
                        </button>
                      </div>
                      <ul className="space-y-1 text-sm font-semibold text-purple-950 dark:text-purple-200">
                        {item.laws.map((law, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-purple-500 dark:text-purple-400 font-bold">•</span>
                            <span>{law}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Punishment Box */}
                    <div className="p-3 bg-amber-50/70 border border-amber-200/80 dark:bg-amber-950/40 dark:border-amber-800/50 rounded-xl text-xs text-amber-900 dark:text-amber-200 mb-4">
                      <span className="font-bold">Punishment / Penalty: </span>
                      <span>{item.punishment}</span>
                    </div>

                    {/* Expandable Provisions */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-3 pt-2 text-xs text-slate-700 dark:text-slate-300 overflow-hidden"
                        >
                          <div className="p-3.5 bg-slate-50 dark:bg-slate-900/70 rounded-xl border border-slate-200 dark:border-slate-700/60">
                            <p className="font-bold text-[#2E003E] dark:text-purple-200 mb-1">Key Legal Insight:</p>
                            <p className="leading-relaxed">{item.more}</p>
                          </div>
                          <div className="p-3.5 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-200">
                            <p className="font-bold mb-1 flex items-center gap-1">
                              <FileText size={13} /> Recommended Reporting Action:
                            </p>
                            <p className="leading-relaxed">{item.actionSteps}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Toggle Button */}
                  <button
                    onClick={() => setExpanded(isExpanded ? null : index)}
                    className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 w-full flex items-center justify-between text-xs font-bold text-purple-700 hover:text-purple-950 dark:text-purple-400 dark:hover:text-purple-200 transition cursor-pointer"
                  >
                    <span>{isExpanded ? "Hide Detailed Provisions" : "View Details & Reporting Steps"}</span>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Essential Survivor Rights Banner */}
        <div className="bg-[#2E003E] dark:bg-[#1a0029] text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-6 border border-purple-900/30 dark:border-purple-800/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-800/60 pb-4">
            <div>
              <span className="text-xs font-bold px-3 py-1 bg-purple-500/30 text-purple-200 rounded-full border border-purple-400/30 uppercase tracking-wider">
                Crucial Protections
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                4 Fundamental Rights of Every Survivor in India
              </h2>
            </div>
            <a 
              href="tel:181" 
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-full text-sm shadow-md transition self-start sm:self-auto"
            >
              <PhoneCall size={16} /> Helpline: 181
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div className="bg-purple-900/40 p-5 rounded-2xl border border-purple-700/40">
              <h3 className="font-bold text-purple-200 mb-1.5 text-base">1. Right to Zero FIR</h3>
              <p className="text-purple-200/80 text-xs leading-relaxed">
                An FIR can be lodged at ANY police station in India, irrespective of jurisdiction where the incident occurred.
              </p>
            </div>

            <div className="bg-purple-900/40 p-5 rounded-2xl border border-purple-700/40">
              <h3 className="font-bold text-purple-200 mb-1.5 text-base">2. Identity Protection</h3>
              <p className="text-purple-200/80 text-xs leading-relaxed">
                Under IPC 228A, revealing the identity, photo, or details of a sexual assault survivor in public is a punishable crime.
              </p>
            </div>

            <div className="bg-purple-900/40 p-5 rounded-2xl border border-purple-700/40">
              <h3 className="font-bold text-purple-200 mb-1.5 text-base">3. Woman Officer Statement</h3>
              <p className="text-purple-200/80 text-xs leading-relaxed">
                A woman victim has the right to have her statement recorded by a female police officer at her residence or safe location.
              </p>
            </div>

            <div className="bg-purple-900/40 p-5 rounded-2xl border border-purple-700/40">
              <h3 className="font-bold text-purple-200 mb-1.5 text-base">4. Free Legal Counsel (DLSA)</h3>
              <p className="text-purple-200/80 text-xs leading-relaxed">
                Every woman has the legal right to free representation provided by the District Legal Services Authority.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Resource & Reporting Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800/80 p-6 rounded-3xl shadow-md border border-purple-100 dark:border-purple-900/50 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 flex items-center justify-center mb-4">
                <PhoneCall size={20} />
              </div>
              <h3 className="text-lg font-bold text-[#2E003E] dark:text-purple-100 mb-1">National Helplines</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">24x7 toll-free emergency call assistance</p>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                <li className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-700/50">
                  <span>Women Helpline:</span>
                  <a href="tel:181" className="text-purple-700 dark:text-purple-400 font-bold hover:underline">181</a>
                </li>
                <li className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-700/50">
                  <span>Police SOS (All-in-one):</span>
                  <a href="tel:112" className="text-purple-700 dark:text-purple-400 font-bold hover:underline">112</a>
                </li>
                <li className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-700/50">
                  <span>Women Police Helpline:</span>
                  <a href="tel:1091" className="text-purple-700 dark:text-purple-400 font-bold hover:underline">1091</a>
                </li>
                <li className="flex justify-between items-center py-1">
                  <span>Cyber Crime Helpline:</span>
                  <a href="tel:1930" className="text-purple-700 dark:text-purple-400 font-bold hover:underline">1930</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/80 p-6 rounded-3xl shadow-md border border-purple-100 dark:border-purple-900/50 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400 flex items-center justify-center mb-4">
                <ExternalLink size={20} />
              </div>
              <h3 className="text-lg font-bold text-[#2E003E] dark:text-purple-100 mb-1">Online Reporting Portals</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Official government digital complaint desks</p>
              <ul className="space-y-2 text-xs">
                <li>
                  <a 
                    href="https://cybercrime.gov.in" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-between p-2 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 dark:bg-purple-950/40 dark:hover:bg-purple-900/60 dark:text-purple-200 font-medium transition"
                  >
                    <span>Cyber Crime Reporting Portal</span>
                    <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://ncw.nic.in" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-between p-2 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 dark:bg-purple-950/40 dark:hover:bg-purple-900/60 dark:text-purple-200 font-medium transition"
                  >
                    <span>NCW Online Complaint Cell</span>
                    <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://nalsa.gov.in" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-between p-2 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 dark:bg-purple-950/40 dark:hover:bg-purple-900/60 dark:text-purple-200 font-medium transition"
                  >
                    <span>NALSA Free Legal Aid Portal</span>
                    <ExternalLink size={14} />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/80 p-6 rounded-3xl shadow-md border border-purple-100 dark:border-purple-900/50 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 flex items-center justify-center mb-4">
                <HeartHandshake size={20} />
              </div>
              <h3 className="text-lg font-bold text-[#2E003E] dark:text-purple-100 mb-1">Support & Counseling NGOs</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Confidential survivor advocacy networks</p>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <li className="p-2 rounded-lg bg-slate-50 border border-slate-100 dark:bg-slate-900/60 dark:border-slate-700/50">
                  <span className="font-bold text-[#2E003E] dark:text-purple-200">SNEHA: </span>
                  <span className="text-slate-600 dark:text-slate-300">Crisis intervention & women safety (+91 98330 52684)</span>
                </li>
                <li className="p-2 rounded-lg bg-slate-50 border border-slate-100 dark:bg-slate-900/60 dark:border-slate-700/50">
                  <span className="font-bold text-[#2E003E] dark:text-purple-200">Vandrevala Foundation: </span>
                  <span className="text-slate-600 dark:text-slate-300">24/7 Mental health support (+91 9999 666 555)</span>
                </li>
                <li className="p-2 rounded-lg bg-slate-50 border border-slate-100 dark:bg-slate-900/60 dark:border-slate-700/50">
                  <span className="font-bold text-[#2E003E] dark:text-purple-200">iCall Helpline: </span>
                  <span className="text-slate-600 dark:text-slate-300">Psychosocial counseling (022-25521111)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HarassmentLaws;

