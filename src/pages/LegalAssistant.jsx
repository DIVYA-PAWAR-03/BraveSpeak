import React, { useState, useEffect } from "react";
import { 
  Scale, FileText, CheckCircle2, Copy, Download, Sparkles, 
  HelpCircle, ShieldCheck, AlertCircle, ArrowRight, Printer, RefreshCw, Bookmark,
  Cpu, AlertTriangle, ShieldAlert
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { legalApi } from "../services/api";

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
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [customIncidentNarrative, setCustomIncidentNarrative] = useState("");

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

  // Smart Legal Diagnosis function calling backend
  const handleSmartDiagnosis = async () => {
    const textToAnalyze = customIncidentNarrative.trim() || form.incidentSummary.trim() || selectedScenario.description;
    try {
      setAnalyzing(true);
      const res = await legalApi.analyzeIncident({
        incidentText: textToAnalyze,
        incidentType: selectedScenario.id,
        location: form.incidentLocation,
        authority: form.authorityType
      });

      if (res.success && res.data) {
        setAnalysisResult(res.data);
        // Automatically populate evidence or summary if empty
        if (!form.incidentSummary.trim() && customIncidentNarrative.trim()) {
          setForm(prev => ({ ...prev, incidentSummary: customIncidentNarrative.trim() }));
        }
        if (res.data.evidenceRequired?.length > 0 && !form.evidenceDescription.trim()) {
          setForm(prev => ({ ...prev, evidenceDescription: res.data.evidenceRequired.map(e => `- ${e}`).join('\n') }));
        }
      }
    } catch (err) {
      console.warn("Backend legal diagnosis fallback:", err);
      setAnalysisResult({
        diagnosisSummary: `Identified applicable statutory sections for ${selectedScenario.title}`,
        severityGrade: selectedScenario.id === 'physical' ? 'High / Non-Bailable Offense' : 'Cognizable Offense',
        matchedLaws: selectedScenario.laws.map(l => ({ section: l, title: 'Indian Statutory Provision', punishment: 'Rigorous penal punishment' })),
        recommendedActions: [selectedScenario.procedure],
        evidenceRequired: selectedScenario.evidenceNeeded,
        emergencyAdvice: 'If in immediate danger, dial 112 (National Emergency) or 181 (Women Helpline).'
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const getApplicableLawsText = () => {
    if (analysisResult?.matchedLaws?.length > 0) {
      return analysisResult.matchedLaws.map(l => `- ${l.section ? l.section + ': ' : ''}${l.title}`).join('\n');
    }
    return selectedScenario.laws.map((l) => `- ${l}`).join("\n");
  };

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
${form.incidentSummary.trim() || customIncidentNarrative.trim() || "[Detailed narrative of events as experienced by the complainant]"}

3. RELEVANT STATUTORY PROVISIONS & LAWS APPLICABLE:
The aforementioned acts constitute punishable offenses under:
${getApplicableLawsText()}

4. EVIDENCE PRESERVED & ATTACHED:
${form.evidenceDescription.trim() || "- Supporting evidence including digital screenshots, timestamps, or witness accounts are preserved and available for inspection."}

5. STATUTORY RIGHTS & REQUESTED RELIEF:
In light of the above facts, I humbly request:
- ${form.reliefDemanded}
- Strict confidentiality of my personal identity in accordance with Section 228A IPC / Section 73 BNS.
- Recording of my statement by a female police officer as provided under Section 154/161 CrPC / Section 173 BNSS.
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

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>BraveSpeak Formal Legal Complaint</title>
          <style>
            body { font-family: 'Times New Roman', Times, serif; padding: 40px; line-height: 1.6; font-size: 13pt; color: #111; }
            pre { white-space: pre-wrap; font-family: inherit; font-size: inherit; }
            @media print { body { padding: 20px; } }
          </style>
        </head>
        <body>
          <pre>${generateComplaintText()}</pre>
          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-900 text-xs font-bold uppercase tracking-wider">
            <Scale size={15} /> Legal Empowerment & AI Complaint Drafter
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2E003E] tracking-tight">
            Interactive Legal Assistant & Complaint Drafter
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Diagnose your legal rights under Indian criminal & civil laws (IPC, BNS 2023, POSH, IT Act), understand non-bailable provisions, and generate a certified formal complaint letter in seconds.
          </p>
        </div>

        {/* Step 1: Select Incident Scenario */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#2E003E] flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-purple-900 text-white text-xs flex items-center justify-center font-bold">1</span>
            Select Incident Type or Situation
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {incidentScenarios.map((scenario) => {
              const isSelected = selectedScenario.id === scenario.id;
              return (
                <div
                  key={scenario.id}
                  onClick={() => {
                    setSelectedScenario(scenario);
                    setAnalysisResult(null);
                  }}
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
                  <div className="pt-4 mt-3 border-t border-purple-100/20 flex items-center justify-between text-xs font-semibold">
                    <span className={isSelected ? "text-purple-200" : "text-purple-700"}>
                      {scenario.laws.length} Applicable Statutes
                    </span>
                    <ArrowRight size={14} className={isSelected ? "text-purple-300" : "text-purple-600"} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: AI / Intelligent Statutory Diagnostic Engine */}
        <div className="bg-gradient-to-br from-purple-950 to-[#23002E] rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-purple-800/60 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-300 bg-purple-900/60 px-3 py-1 rounded-full border border-purple-700/50">
                <Cpu size={14} className="text-purple-400" /> Statutory Diagnostic Engine
              </span>
              <h2 className="text-2xl font-black text-white">
                Analyze What Happened & Check Legal Rights
              </h2>
              <p className="text-xs sm:text-sm text-purple-200/90 max-w-2xl">
                Describe the situation in your own words. Our diagnostic engine evaluates applicable sections under BNS 2023, IPC, IT Act & POSH, identifies non-bailable offense severity, and recommends legal remedies.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSmartDiagnosis}
              disabled={analyzing}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-lg transition flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-50"
            >
              {analyzing ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Analyzing Law...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Diagnose Legal Provisions</span>
                </>
              )}
            </button>
          </div>

          <div>
            <textarea
              rows={3}
              value={customIncidentNarrative}
              onChange={(e) => setCustomIncidentNarrative(e.target.value)}
              placeholder="e.g. My team lead kept sending unsolicited explicit messages on WhatsApp and threatened bad performance ratings when I told him to stop..."
              className="w-full p-4 bg-purple-900/40 border border-purple-700/60 rounded-2xl text-sm text-white placeholder-purple-300/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-purple-900/60 transition"
            />
          </div>

          {/* Analysis Results Display */}
          <AnimatePresence>
            {analysisResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="p-6 bg-purple-900/70 border border-purple-600/60 rounded-2xl space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-700/60 pb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={20} className="text-emerald-400" />
                    <h3 className="font-bold text-white text-sm sm:text-base">{analysisResult.diagnosisSummary}</h3>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    analysisResult.severityGrade.includes('High') || analysisResult.severityGrade.includes('Non-Bailable')
                      ? 'bg-rose-500/30 text-rose-200 border border-rose-400/40'
                      : 'bg-amber-500/30 text-amber-200 border border-amber-400/40'
                  }`}>
                    {analysisResult.severityGrade}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="space-y-2 bg-purple-950/60 p-4 rounded-xl border border-purple-800/40">
                    <p className="font-bold text-purple-300 uppercase tracking-wider">Applicable Sections</p>
                    <ul className="space-y-1 text-purple-100">
                      {analysisResult.matchedLaws.map((law, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-purple-400 font-bold">•</span>
                          <span><strong>{law.section || law.code_type}</strong>: {law.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 bg-purple-950/60 p-4 rounded-xl border border-purple-800/40">
                    <p className="font-bold text-purple-300 uppercase tracking-wider">Recommended Next Steps</p>
                    <ul className="space-y-1 text-purple-100">
                      {analysisResult.recommendedActions.map((act, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 bg-purple-950/60 p-4 rounded-xl border border-purple-800/40">
                    <p className="font-bold text-purple-300 uppercase tracking-wider">Crucial Evidence to Preserve</p>
                    <ul className="space-y-1 text-purple-100">
                      {analysisResult.evidenceRequired.map((ev, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-400 font-bold">!</span>
                          <span>{ev}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Step 3: Interactive Complaint Letter Drafter */}
        <div className="bg-white rounded-3xl shadow-xl border border-purple-100 p-6 sm:p-10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                Step 3 of 3
              </span>
              <h2 className="text-2xl font-extrabold text-[#2E003E] mt-2">
                Generate Certified Written Complaint / FIR Application
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Customize details below. The legal draft updates dynamically in real-time.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-purple-50 text-purple-900 hover:bg-purple-100 border border-purple-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <CheckCircle2 size={15} className="text-emerald-600" /> : <Copy size={15} />}
                <span>{copied ? "Copied to Clipboard!" : "Copy Complaint"}</span>
              </button>

              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-purple-50 text-purple-900 hover:bg-purple-100 border border-purple-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Download size={15} />
                <span>Save (.TXT)</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-[#2E003E] text-white hover:bg-purple-950 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Printer size={15} />
                <span>Print Formal Draft</span>
              </button>
            </div>
          </div>

          {/* Form & Live Preview Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Fields */}
            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <FileText size={16} className="text-purple-700" />
                Fill Incident Particulars
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Complainant Name / Alias
                  </label>
                  <input
                    type="text"
                    value={form.complainantName}
                    onChange={(e) => setForm({ ...form, complainantName: e.target.value })}
                    placeholder="Leave blank to remain confidential"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-400 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Addressed Authority
                  </label>
                  <select
                    value={form.authorityType}
                    onChange={(e) => setForm({ ...form, authorityType: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-400 focus:bg-white"
                  >
                    <option>Station House Officer (Police Station)</option>
                    <option>Internal Complaints Committee (ICC Chairperson)</option>
                    <option>Superintendent of Police (Women Cell)</option>
                    <option>National Commission for Women (NCW)</option>
                    <option>Cyber Crime Investigation Cell</option>
                    <option>Protection Officer (Domestic Violence)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Police Station / Company Name
                  </label>
                  <input
                    type="text"
                    value={form.stationOrOrg}
                    onChange={(e) => setForm({ ...form, stationOrOrg: e.target.value })}
                    placeholder="e.g., Connaught Place Police Station"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-400 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    City & State
                  </label>
                  <input
                    type="text"
                    value={form.cityState}
                    onChange={(e) => setForm({ ...form, cityState: e.target.value })}
                    placeholder="e.g., New Delhi, Delhi"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-400 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Incident Date
                  </label>
                  <input
                    type="date"
                    value={form.incidentDate}
                    onChange={(e) => setForm({ ...form, incidentDate: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-400 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Approx. Time
                  </label>
                  <input
                    type="text"
                    value={form.incidentTime}
                    onChange={(e) => setForm({ ...form, incidentTime: e.target.value })}
                    placeholder="e.g., 18:30 hrs"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-400 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Accused Name / Info
                  </label>
                  <input
                    type="text"
                    value={form.accusedName}
                    onChange={(e) => setForm({ ...form, accusedName: e.target.value })}
                    placeholder="e.g., Unknown / Colleague name"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-400 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Location of Occurrence
                </label>
                <input
                  type="text"
                  value={form.incidentLocation}
                  onChange={(e) => setForm({ ...form, incidentLocation: e.target.value })}
                  placeholder="e.g. 4th floor conference room / Metro Station Gate 2"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Statement of Facts & Narrative
                </label>
                <textarea
                  rows={4}
                  value={form.incidentSummary}
                  onChange={(e) => setForm({ ...form, incidentSummary: e.target.value })}
                  placeholder="Provide chronological facts of the incident as it occurred..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Evidence Description & Attachments
                </label>
                <textarea
                  rows={2}
                  value={form.evidenceDescription}
                  onChange={(e) => setForm({ ...form, evidenceDescription: e.target.value })}
                  placeholder="e.g. Chat logs dated 12th Aug, CCTV footage requisition, audio recording"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-400 focus:bg-white"
                />
              </div>
            </div>

            {/* Live Legal Document Preview */}
            <div className="lg:col-span-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Live Certified Document Output
                </span>
                <span className="text-[10px] text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                  Ready for Submission
                </span>
              </div>

              <div className="p-6 bg-slate-900 text-slate-100 rounded-2xl font-mono text-[11px] leading-relaxed max-h-[560px] overflow-y-auto border border-slate-800 shadow-inner whitespace-pre-wrap select-all">
                {generateComplaintText()}
              </div>

              <p className="text-[11px] text-slate-400 italic">
                * Tip: Under Section 154 CrPC, you can print this document and take it directly to the police station. Refusal to register an FIR on cognizable offenses is punishable under Section 166A IPC.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
