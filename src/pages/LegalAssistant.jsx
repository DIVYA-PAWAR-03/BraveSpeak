import React, { useState } from "react";
import { 
  Scale, FileText, CheckCircle2, Copy, Download, Sparkles, 
  HelpCircle, ShieldCheck, AlertCircle, ArrowRight, Printer, RefreshCw, Bookmark
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const incidentScenarios = [
  {
    id: "workplace",
    title: "Workplace Harassment & POSH Act",
    badge: "Corporate & Workplace",
    description: "Inappropriate remarks, unwelcome physical contact, quid-pro-quo threats, or biased appraisals at work.",
    laws: [
      "POSH Act 2013 (Prevention, Prohibition & Redressal)",
      "IPC Section 354A / BNS Section 75 (Sexual Harassment)",
      "IPC Section 509 / BNS Section 79 (Insult to Modesty)"
    ],
    procedure: "File a formal written complaint with your company's Internal Complaints Committee (ICC) or Local Complaints Committee (LCC) within 90 days. The employer must conclude inquiry within 90 days.",
    evidenceNeeded: ["Email/chat screenshots", "Performance appraisals", "Witness statements", "Meeting invites/logs"]
  },
  {
    id: "cyber",
    title: "Cyber Harassment, Morphed Photos & Blackmail",
    badge: "Digital & Online Crimes",
    description: "Leaked private images, extortion/blackmail, persistent social media trolling, fake profiles, or DOX attacks.",
    laws: [
      "IT Act Section 67 & 67A (Publishing Obscene Content)",
      "IT Act Section 66E (Privacy Violation)",
      "IPC Section 354D / BNS Section 78 (Cyber Stalking)",
      "IPC Section 503 / 506 (Criminal Intimidation)"
    ],
    procedure: "Capture uncropped screenshots with URL, timestamps, and usernames. Do not delete chats. File on cybercrime.gov.in or dial 1930.",
    evidenceNeeded: ["Full URL links", "Uncropped chat screenshots", "Call history logs", "Payment demands/receipts"]
  },
  {
    id: "physical",
    title: "Physical Assault & Modesty Outrage",
    badge: "Criminal Physical Assault",
    description: "Any unwelcome physical force, assault, grabbing, groping, or attempt to disrobe in public or private spaces.",
    laws: [
      "IPC Section 354 / BNS Section 74 (Assault to Outrage Modesty - Non-Bailable)",
      "IPC Section 354B / BNS Section 76 (Assault with Intent to Disrobe - Non-Bailable)",
      "IPC Section 323 / 352 (Voluntarily Causing Hurt)"
    ],
    procedure: "File an immediate Zero FIR at any police station in India under Section 154 CrPC. Request immediate government medical examination without delay.",
    evidenceNeeded: ["Medical examination report (MLC)", "CCTV footage requests", "Torn/damaged clothing preserved", "Eyewitness contacts"]
  },
  {
    id: "domestic",
    title: "Domestic Violence & Marital Cruelty",
    badge: "Domestic & Family Rights",
    description: "Physical, emotional, verbal, sexual, or economic abuse by husband, in-laws, or live-in partners.",
    laws: [
      "Protection of Women from Domestic Violence Act, 2005 (PWDVA)",
      "IPC Section 498A / BNS Section 85 (Husband/Relative Cruelty)",
      "IPC Section 406 (Criminal Breach of Trust - Stridhan recovery)"
    ],
    procedure: "Approach the Protection Officer, Judicial Magistrate, or District Legal Services Authority (DLSA) for free protection and residence orders.",
    evidenceNeeded: ["Medical records", "Stridhan/jewellery inventory", "Bank statements / financial records", "Audio/video recordings"]
  },
  {
    id: "stalking",
    title: "Stalking & Voyeurism (Hidden Cameras)",
    badge: "Public & Private Surveillance",
    description: "Repeated following, watching, monitoring routines, or recording private acts in restrooms/trial rooms.",
    laws: [
      "IPC Section 354C / BNS Section 77 (Voyeurism)",
      "IPC Section 354D / BNS Section 78 (Stalking)"
    ],
    procedure: "Keep an incident log with dates, times, and routes. File an FIR with the local women's police cell or call 1091.",
    evidenceNeeded: ["Date & time incident log", "Device photographs", "Location details", "Witness confirmations"]
  }
];

export default function LegalAssistant() {
  const [selectedScenario, setSelectedScenario] = useState(incidentScenarios[0]);
  const [copied, setCopied] = useState(false);

  // Complaint Drafter Form State
  const [form, setForm] = useState({
    complainantName: "",
    authorityType: "Station House Officer (Police Station)",
    stationOrOrg: "",
    cityState: "",
    incidentDate: new Date().toISOString().split("T")[0],
    incidentTime: "Approx. 18:30 hrs",
    incidentLocation: "",
    accusedName: "",
    incidentSummary: "",
    evidenceDescription: "",
    reliefDemanded: "Registration of Zero FIR, immediate legal action against accused, and protection."
  });

  const generateComplaintText = () => {
    return `To,
The ${form.authorityType || "Station House Officer"}
${form.stationOrOrg ? form.stationOrOrg + "," : ""}
${form.cityState || "Jurisdiction Area"}

SUBJECT: FORMAL WRITTEN COMPLAINT / FIR REQUEST REGARDING ${selectedScenario.title.toUpperCase()}

Respected Sir/Madam,

I, ${form.complainantName.trim() || "[Name Withheld / Confidential Complainant]"}, residing in ${form.cityState || "[City/State]"}, am writing to formally report an incident of harassment/criminal misconduct.

1. INCIDENT DETAILS:
- Date of Incident: ${form.incidentDate}
- Time of Incident: ${form.incidentTime}
- Location of Occurrence: ${form.incidentLocation || "[Specified Location]"}
- Details / Identity of Accused: ${form.accusedName || "Unknown / Described Below"}

2. BRIEF SUMMARY OF FACTS & STATEMENT:
${form.incidentSummary.trim() || "[Detailed narrative of events as experienced by the complainant]"}

3. RELEVANT STATUTORY PROVISIONS & LAWS APPLICABLE:
The aforementioned acts constitute punishable offenses under:
${selectedScenario.laws.map((l) => `- ${l}`).join("\n")}

4. EVIDENCE PRESERVED & ATTACHED:
${form.evidenceDescription.trim() || "- Supporting evidence including digital screenshots, timestamps, or witness accounts are preserved and available for inspection."}

5. STATUTORY RIGHTS & REQUESTED RELIEF:
In light of the above facts, I humbly request:
- ${form.reliefDemanded}
- Strict confidentiality of my personal identity in accordance with Section 228A IPC.
- Recording of my statement by a female police officer as provided under Section 154/161 CrPC.
- Provision of a free certified copy of the registered FIR / Complaint acknowledgment.

Thanking you,

Yours sincerely,
${form.complainantName.trim() || "[Complainant Signature/Name]"}
Date: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
Contact: [Complainant Phone / Email]
`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateComplaintText());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([generateComplaintText()], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = `BraveSpeak_Legal_Complaint_${selectedScenario.id}_${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-900 text-xs font-bold uppercase tracking-wider">
            <Scale size={15} /> Legal Empowerment & FIR Generator
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2E003E] tracking-tight">
            Interactive Legal Assistant & Complaint Drafter
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Diagnose your legal rights under Indian criminal & civil laws, understand applicable IPC/BNS/POSH sections, and generate a customized formal complaint letter in seconds.
          </p>
        </div>

        {/* Step 1: Select Incident Scenario */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#2E003E] flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-purple-900 text-white text-xs flex items-center justify-center font-bold">1</span>
            Select Your Situation or Incident Type
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {incidentScenarios.map((scenario) => {
              const isSelected = selectedScenario.id === scenario.id;
              return (
                <div
                  key={scenario.id}
                  onClick={() => setSelectedScenario(scenario)}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-purple-900 text-white shadow-xl shadow-purple-950/20 border-purple-800 scale-[1.02]"
                      : "bg-white text-slate-800 hover:border-purple-300 shadow-md border-slate-200"
                  }`}
                >
                  <div className="space-y-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      isSelected ? "bg-purple-800 text-purple-200 border border-purple-600" : "bg-purple-50 text-purple-900 border border-purple-200"
                    }`}>
                      {scenario.badge}
                    </span>
                    <h3 className={`text-base font-bold ${isSelected ? "text-white" : "text-[#2E003E]"}`}>
                      {scenario.title}
                    </h3>
                    <p className={`text-xs leading-relaxed ${isSelected ? "text-purple-200" : "text-slate-600"}`}>
                      {scenario.description}
                    </p>
                  </div>

                  <div className={`mt-4 pt-3 border-t text-xs font-semibold flex items-center justify-between ${
                    isSelected ? "border-purple-800 text-purple-200" : "border-slate-100 text-purple-900"
                  }`}>
                    <span>View Legal Statutes & Draft</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Legal Rights & Evidence Guide Breakdown */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-purple-100 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-purple-100 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
                Statutory Legal Diagnosis
              </span>
              <h3 className="text-2xl font-black text-[#2E003E] mt-2">
                Applicable Laws for: {selectedScenario.title}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 p-5 bg-purple-50/60 rounded-2xl border border-purple-100">
              <h4 className="text-xs font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                <Scale size={15} /> Applicable IPC / BNS Sections
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700 pt-1">
                {selectedScenario.laws.map((law, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 font-medium">
                    <span className="text-purple-700 font-bold">•</span>
                    <span>{law}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 p-5 bg-indigo-50/60 rounded-2xl border border-indigo-100">
              <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck size={15} /> Recommended Legal Procedure
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed pt-1">
                {selectedScenario.procedure}
              </p>
            </div>

            <div className="space-y-2 p-5 bg-rose-50/60 rounded-2xl border border-rose-100">
              <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                <Bookmark size={15} /> Critical Evidence Checklist
              </h4>
              <ul className="space-y-1 text-xs text-slate-700 pt-1">
                {selectedScenario.evidenceNeeded.map((ev, idx) => (
                  <li key={idx} className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 size={13} className="text-rose-600 shrink-0" />
                    <span>{ev}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Step 3: Interactive Complaint & FIR Generator */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#2E003E] flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-purple-900 text-white text-xs flex items-center justify-center font-bold">2</span>
            Customize & Generate Official Complaint Letter
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Form Column */}
            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-purple-100 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Name (or Alias)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Priya Sharma / Withheld"
                    value={form.complainantName}
                    onChange={(e) => setForm({ ...form, complainantName: e.target.value })}
                    className="w-full p-2.5 bg-purple-50/40 border border-purple-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Recipient Authority
                  </label>
                  <select
                    value={form.authorityType}
                    onChange={(e) => setForm({ ...form, authorityType: e.target.value })}
                    className="w-full p-2.5 bg-purple-50/40 border border-purple-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    <option value="Station House Officer (Police Station)">Station House Officer (Police Station)</option>
                    <option value="Presiding Officer, Internal Complaints Committee (ICC)">Presiding Officer, ICC (POSH)</option>
                    <option value="Superintendent of Police (Cyber Crime Cell)">Cyber Crime Cell</option>
                    <option value="Protection Officer / Judicial Magistrate">Protection Officer (PWDVA)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Police Station / Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Connaught Place Police Station"
                    value={form.stationOrOrg}
                    onChange={(e) => setForm({ ...form, stationOrOrg: e.target.value })}
                    className="w-full p-2.5 bg-purple-50/40 border border-purple-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    City & State
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., New Delhi, Delhi"
                    value={form.cityState}
                    onChange={(e) => setForm({ ...form, cityState: e.target.value })}
                    className="w-full p-2.5 bg-purple-50/40 border border-purple-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Incident Date
                  </label>
                  <input
                    type="date"
                    value={form.incidentDate}
                    onChange={(e) => setForm({ ...form, incidentDate: e.target.value })}
                    className="w-full p-2.5 bg-purple-50/40 border border-purple-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Approx. Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 19:30 hrs"
                    value={form.incidentTime}
                    onChange={(e) => setForm({ ...form, incidentTime: e.target.value })}
                    className="w-full p-2.5 bg-purple-50/40 border border-purple-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Accused Name / Info
                  </label>
                  <input
                    type="text"
                    placeholder="Name / Unknown"
                    value={form.accusedName}
                    onChange={(e) => setForm({ ...form, accusedName: e.target.value })}
                    className="w-full p-2.5 bg-purple-50/40 border border-purple-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Incident Location
                </label>
                <input
                  type="text"
                  placeholder="e.g., Near Metro Station Gate 3 / Office 4th Floor"
                  value={form.incidentLocation}
                  onChange={(e) => setForm({ ...form, incidentLocation: e.target.value })}
                  className="w-full p-2.5 bg-purple-50/40 border border-purple-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Detailed Statement / What Happened
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe sequentially what occurred, what was said or done, and how you responded..."
                  value={form.incidentSummary}
                  onChange={(e) => setForm({ ...form, incidentSummary: e.target.value })}
                  className="w-full p-2.5 bg-purple-50/40 border border-purple-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Evidence Description (Screenshots, CCTV, Witnesses)
                </label>
                <input
                  type="text"
                  placeholder="e.g., 4 uncropped WhatsApp screenshots, CCTV footage at metro exit"
                  value={form.evidenceDescription}
                  onChange={(e) => setForm({ ...form, evidenceDescription: e.target.value })}
                  className="w-full p-2.5 bg-purple-50/40 border border-purple-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
            </div>

            {/* Generated Complaint Document Preview */}
            <div className="lg:col-span-6 bg-slate-900 text-slate-200 p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                  <div className="flex items-center gap-2">
                    <FileText size={18} className="text-purple-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-200">
                      Draft Legal Document Preview
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="px-3 py-1.5 bg-purple-800 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      {copied ? <CheckCircle2 size={13} className="text-emerald-400" /> : <Copy size={13} />}
                      <span>{copied ? "Copied!" : "Copy"}</span>
                    </button>
                    <button
                      onClick={handleDownload}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border border-slate-700"
                    >
                      <Download size={13} />
                      <span>Download .txt</span>
                    </button>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl font-mono text-[11px] leading-relaxed max-h-[480px] overflow-y-auto whitespace-pre-wrap border border-slate-800 text-slate-300">
                  {generateComplaintText()}
                </div>
              </div>

              <div className="p-3 bg-purple-950/60 rounded-xl border border-purple-800/40 text-[11px] text-purple-200 space-y-1">
                <p className="font-bold flex items-center gap-1">
                  <ShieldCheck size={14} className="text-emerald-400" /> 100% Free Legal Representation Guarantee:
                </p>
                <p>
                  You are entitled to a free court advocate provided by the District Legal Services Authority (DLSA).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
