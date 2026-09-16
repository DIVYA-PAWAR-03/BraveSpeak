import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Scale, ShieldAlert, Search, Filter, AlertTriangle, BookOpen, 
  CheckCircle2, Copy, Check, ExternalLink, HelpCircle, PhoneCall, 
  Sparkles, Lock, Shield, Heart, FileText, ChevronRight, Gavel, UserCheck, AlertCircle, ShieldCheck
} from 'lucide-react';

const CRIME_LAW_DATA = [
  {
    id: 'cyber-stalking',
    category: 'Cyber & Digital',
    crimeTitle: 'Cyber Stalking & Online Harassment',
    scenario: 'Someone repeatedly messages, monitors your online activity, tracks your location via social media/WhatsApp against your consent, or sends persistent unwanted advances.',
    primaryLaw: 'IT Act Section 67 & IPC Section 354D',
    bnsLaw: 'BNS Section 78 (Bharatiya Nyaya Sanhita)',
    nature: 'Cognizable & Non-Bailable (for repeat offense)',
    punishment: '1 to 3 years imprisonment for 1st conviction; up to 5 years + ₹5 Lakh fine for repeat conviction.',
    severity: 'High',
    victimRights: [
      'Right to demand immediate content/account removal on social platforms.',
      'Right to file complaint anonymously or online via National Cyber Crime Portal.',
      'Right to police investigation without revealing identity to public.'
    ],
    actionSteps: 'Capture complete un-edited screenshots (with timestamp & handle/URL). Do not delete the messages. File complaint at cybercrime.gov.in or dial helpline 1930.',
    helpline: '1930 (Cyber Crime Helpline)',
    tags: ['social media', 'whatsapp', 'tracking', 'messages', 'cyber']
  },
  {
    id: 'non-consensual-images',
    category: 'Cyber & Digital',
    crimeTitle: 'Non-Consensual Image Sharing, Morphing & Blackmail',
    scenario: 'Capturing, altering (morphing/deepfake), or sharing private, nude, or intimate photos/videos without consent, or threatening to publish them (sextortion).',
    primaryLaw: 'IT Act Section 66E, Section 67A & IPC Section 354C (Voyeurism)',
    bnsLaw: 'BNS Section 77 & BNS Section 308 (Extortion)',
    nature: 'Cognizable & Non-Bailable',
    punishment: '3 to 7 years rigorous imprisonment + Fine up to ₹10 Lakhs.',
    severity: 'Critical',
    victimRights: [
      'Right to StopNCII hash creation to block images across Facebook, Instagram, OnlyFans, etc.',
      'Right to Zero FIR at any local police station.',
      'Right to identity protection in court proceedings under IPC 228A.'
    ],
    actionSteps: 'Do not pay money or delete evidence. Take screenshots of threats. Register emergency ticket on StopNCII.org and lodge FIR at local police or cyber cell.',
    helpline: '1930 / 112 Emergency',
    tags: ['photos', 'nudes', 'blackmail', 'morphing', 'deepfake', 'extortion']
  },
  {
    id: 'posh-quid-pro-quo',
    category: 'Workplace & POSH',
    crimeTitle: 'Workplace Sexual Harassment & Quid Pro Quo',
    scenario: 'Boss, manager, or colleague making unwelcome sexual advances, asking for sexual favors in exchange for promotion/salary, or creating a hostile work environment.',
    primaryLaw: 'POSH Act 2013 (Section 4 & 9) & IPC Section 354A',
    bnsLaw: 'BNS Section 75 (Sexual Harassment)',
    nature: 'Statutory ICC Inquiry + Cognizable Criminal Offense',
    punishment: 'Internal termination, monetary compensation deducted from salary + Up to 3 years imprisonment.',
    severity: 'High',
    victimRights: [
      'Right to file complaint to Internal Complaints Committee (ICC) within 3 months.',
      'Right to 3 months paid leave or job transfer during ongoing inquiry.',
      'Protection against adverse appraisals or retaliation by employer.'
    ],
    actionSteps: 'Submit written complaint to ICC Presiding Officer. If company has <10 employees, file with District Local Complaints Committee (LCC) or She-Box portal.',
    helpline: 'POSH She-Box Portal / 181',
    tags: ['workplace', 'office', 'boss', 'promotion', 'posh', 'job']
  },
  {
    id: 'posh-retaliation',
    category: 'Workplace & POSH',
    crimeTitle: 'Workplace Retaliation & Employer Inaction',
    scenario: 'Employer failing to constitute ICC, ignoring POSH complaint, or firing/demoting the victim for filing a sexual harassment report.',
    primaryLaw: 'POSH Act 2013 Section 12, 18 & Section 26',
    bnsLaw: 'Statutory Violations & POSH Rules 2013',
    nature: 'Statutory Offense & Fine on Employer',
    punishment: 'Fine up to ₹50,000 on employer; cancellation of business license for repeated non-compliance; reinstatement of employee.',
    severity: 'Medium',
    victimRights: [
      'Right to appeal to District Magistrate / Local Committee within 90 days.',
      'Right to legal remedy in Labour Court or High Court.'
    ],
    actionSteps: 'Send formal legal notice to company HR/Directors. Escalate to District Officer (LCC) appointed under POSH Act.',
    helpline: 'District Legal Services Authority (DLSA)',
    tags: ['retaliation', 'firing', 'hr', 'posh', 'employer penalty']
  },
  {
    id: 'physical-assault-modesty',
    category: 'Physical & Assault',
    crimeTitle: 'Assault to Outrage Modesty & Unwanted Physical Touch',
    scenario: 'Inappropriate touching, groping, grabbing, or physical assault intended to outrage a woman’s modesty in public, transport, or private space.',
    primaryLaw: 'IPC Section 354',
    bnsLaw: 'BNS Section 74',
    nature: 'Cognizable & Non-Bailable',
    punishment: 'Mandatory minimum 1 year, extendable up to 5 years imprisonment + Fine.',
    severity: 'Critical',
    victimRights: [
      'Mandatory Zero FIR: Any police station must register FIR regardless of jurisdiction.',
      'Right to have statement recorded by a female police officer.',
      'Right to free medical examination and immediate police protection.'
    ],
    actionSteps: 'Call 112 or 1091 immediately. Identify any CCTV cameras or witnesses nearby. Demanding a written copy of FIR free of charge is your right.',
    helpline: '112 / 1091 (Women Police)',
    tags: ['touching', 'groping', 'assault', 'bus', 'train', 'public']
  },
  {
    id: 'disrobing-assault',
    category: 'Physical & Assault',
    crimeTitle: 'Assault with Intent to Disrobe / Forceful Stripping',
    scenario: 'Using force or assault with intent to disrobe or compel a woman to be naked in any setting.',
    primaryLaw: 'IPC Section 354B',
    bnsLaw: 'BNS Section 76',
    nature: 'Cognizable & Non-Bailable',
    punishment: 'Mandatory 3 to 7 years imprisonment + Fine.',
    severity: 'Critical',
    victimRights: [
      'Statement must be recorded at victim’s residence or place of choice in presence of parents/lawyer.',
      'Magistrate recording under CrPC 164 / BNSS 183.'
    ],
    actionSteps: 'Dispatch emergency SOS on 112. Seek immediate police protection and medical care.',
    helpline: '112 SOS',
    tags: ['stripping', 'disrobing', 'force', 'assault']
  },
  {
    id: 'acid-attack',
    category: 'Physical & Assault',
    crimeTitle: 'Acid Attack or Attempted Acid Attack',
    scenario: 'Throwing acid or administering corrosive substances causing burn injuries, disfigurement, or attempt to throw acid.',
    primaryLaw: 'IPC Section 326A (Attack) & Section 326B (Attempt)',
    bnsLaw: 'BNS Section 124(1) & Section 124(2)',
    nature: 'Cognizable & Non-Bailable',
    punishment: 'Minimum 10 years to Life Imprisonment + Victim Compensation paid directly to victim.',
    severity: 'Critical',
    victimRights: [
      'Section 357C CrPC: Mandatory FREE first aid and treatment at ALL private & public hospitals.',
      'Hospitals CANNOT demand police FIR before starting medical treatment.',
      'Right to interim victim compensation scheme within 15 days.'
    ],
    actionSteps: 'Wash affected area with copious clean water immediately. Rush to closest hospital (treatment is legally mandated free). Police will record statement at hospital.',
    helpline: '108 Ambulance / 112 SOS',
    tags: ['acid', 'burns', 'hospital free treatment', 'attack']
  },
  {
    id: 'street-harassment-catcalling',
    category: 'Street & Stalking',
    crimeTitle: 'Catcalling, Whistling & Vulgar Public Gestures',
    scenario: 'Passing sexually explicit remarks, making vulgar gestures, singing offensive songs, or catcalling in public streets, markets, or buses.',
    primaryLaw: 'IPC Section 509 & IPC Section 294',
    bnsLaw: 'BNS Section 79 & BNS Section 296',
    nature: 'Cognizable & Bailable',
    punishment: 'Up to 3 years simple imprisonment + Fine.',
    severity: 'Medium',
    victimRights: [
      'Right to file complaint with local police patrol / Mahila beat police officer.',
      'Right to assistance from Pink Auto / Women Traffic PCR vans.'
    ],
    actionSteps: 'If safe, take photo/video of perpetrator or vehicle number plate. Call 1091 (Women Helpline) or inform nearest beat constable.',
    helpline: '1091 (Women Helpline)',
    tags: ['catcalling', 'whistling', 'street', 'bus', 'comments', 'gestures']
  },
  {
    id: 'physical-stalking',
    category: 'Street & Stalking',
    crimeTitle: 'Physical Stalking & Unwanted Persistence',
    scenario: 'Following a person repeatedly in public, waiting outside residence/college/office, or making repeated contact despite explicit disinterest.',
    primaryLaw: 'IPC Section 354D (Physical Stalking)',
    bnsLaw: 'BNS Section 78',
    nature: 'Cognizable (Bailable 1st offense, Non-Bailable repeat)',
    punishment: '1 to 3 years for 1st offense; up to 5 years + Fine for subsequent offense.',
    severity: 'High',
    victimRights: [
      'Right to police warning/restraining intervention against stalker.',
      'Right to keep residence/work location confidential during proceedings.'
    ],
    actionSteps: 'Maintain an incident log with dates, locations, and photo evidence. Report to nearest police station or file online complaint.',
    helpline: '1091 / 112',
    tags: ['stalking', 'following', 'street', 'college', 'persistence']
  },
  {
    id: 'domestic-violence-pwdva',
    category: 'Domestic & Marital',
    crimeTitle: 'Domestic Abuse (Physical, Verbal, Emotional, Economic)',
    scenario: 'Physical assault, verbal insults, controlling behavior, denying financial resources, or sexual abuse by husband, family members, or live-in partner.',
    primaryLaw: 'Protection of Women from Domestic Violence Act 2005 (PWDVA)',
    bnsLaw: 'Civil Remedies + Criminal Penalties under BNSS',
    nature: 'Civil Protection Orders + Non-Bailable Criminal Arrest for Order Breach',
    punishment: 'Protection orders, Right to shared household, Monthly maintenance + up to 1 year jail for order breach.',
    severity: 'High',
    victimRights: [
      'Right to reside in shared household regardless of ownership.',
      'Right to free service of Protection Officer and emergency shelter home.',
      'Right to free legal representation via DLSA (District Legal Services Authority).'
    ],
    actionSteps: 'File a Domestic Incident Report (DIR) through Protection Officer, Sakhi One Stop Center, or magistrate.',
    helpline: '181 (Women Helpline) / Sakhi Center',
    tags: ['domestic violence', 'husband', 'in-laws', 'beating', 'abuse', 'shelter']
  },
  {
    id: 'dowry-harassment',
    category: 'Domestic & Marital',
    crimeTitle: 'Dowry Demand, Cruelty & Extortion',
    scenario: 'Demanding cash, property, cars, or assets before/after marriage, subjecting woman to cruelty, starvation, or mental torture for dowry.',
    primaryLaw: 'IPC Section 498A & Dowry Prohibition Act 1961 (Sec 3 & 4)',
    bnsLaw: 'BNS Section 85 & BNS Section 86',
    nature: 'Cognizable & Non-Bailable',
    punishment: '3 to 5 years imprisonment + Heavy Fine + Return of Stridhan.',
    severity: 'Critical',
    victimRights: [
      'Right to immediate return of all Stridhan (gifts/jewelry given to woman).',
      'Right to file complaint at specialized Crime Against Women (CAW) Cell / Mahila Thana.'
    ],
    actionSteps: 'Preserve dowry list, bank statements, chat records. Contact Mahila Thana or file complaint via National Commission for Women (NCW).',
    helpline: '181 / Mahila Thana',
    tags: ['dowry', 'marriage', 'in-laws', 'stridhan', 'extortion']
  },
  {
    id: 'pocso-minor-harassment',
    category: 'Minor Protection (POCSO)',
    crimeTitle: 'Child Sexual Abuse & Minors Sexual Harassment',
    scenario: 'Any unwelcome sexual act, touch, gesture, or digital harassment directed towards a person under 18 years of age.',
    primaryLaw: 'POCSO Act 2012 (Protection of Children from Sexual Offences)',
    bnsLaw: 'POCSO Act Overrides General Criminal Laws',
    nature: 'Cognizable & Non-Bailable (Mandatory Duty to Report)',
    punishment: '3 years to Life Imprisonment / Death Penalty (for aggravated sexual assault).',
    severity: 'Critical',
    victimRights: [
      'Mandatory identity protection: Child’s name or school cannot be disclosed in media.',
      'Child-friendly recording: Statement recorded in presence of parents/guardians, no police uniform.',
      'In-camera trial with prompt 1-year timeline for court conclusion.'
    ],
    actionSteps: 'Mandatory reporting requirement. Contact Childline 1098 or nearest Special Juvenile Police Unit (SJPU).',
    helpline: '1098 (Childline 24x7)',
    tags: ['child', 'minor', 'school', 'pocso', 'under 18', 'abuse']
  }
];

const CATEGORIES = [
  'All',
  'Cyber & Digital',
  'Workplace & POSH',
  'Physical & Assault',
  'Street & Stalking',
  'Domestic & Marital',
  'Minor Protection (POCSO)'
];

const SCENARIOS_QUICK = [
  { label: 'Select your situation for instant legal matching...', id: '' },
  { label: 'Someone is sharing my private photos online without permission', id: 'non-consensual-images' },
  { label: 'My boss/colleague is asking for sexual favors at work', id: 'posh-quid-pro-quo' },
  { label: 'Someone is following me in public or tracking my location', id: 'physical-stalking' },
  { label: 'Inappropriate physical touch or groping in public/bus', id: 'physical-assault-modesty' },
  { label: 'Facing physical or emotional abuse by husband/in-laws', id: 'domestic-violence-pwdva' },
  { label: 'Getting abusive messages & online harassment on social media', id: 'cyber-stalking' },
  { label: 'Acid attack threat or physical injury attempt', id: 'acid-attack' },
  { label: 'Catcalling, whistling, or vulgar remarks on street', id: 'street-harassment-catcalling' }
];

export default function CrimeLawAwareness() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedScenarioId, setSelectedScenarioId] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [expandedId, setExpandedId] = useState('non-consensual-images');

  // Filter logic
  const filteredData = useMemo(() => {
    return CRIME_LAW_DATA.filter((item) => {
      // Scenario dropdown match
      if (selectedScenarioId && item.id !== selectedScenarioId) {
        return false;
      }
      // Category match
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.crimeTitle.toLowerCase().includes(q);
        const matchesScenario = item.scenario.toLowerCase().includes(q);
        const matchesLaw = item.primaryLaw.toLowerCase().includes(q) || item.bnsLaw.toLowerCase().includes(q);
        const matchesTags = item.tags.some(t => t.toLowerCase().includes(q));
        return matchesTitle || matchesScenario || matchesLaw || matchesTags;
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedScenarioId]);

  const handleCopy = (item) => {
    const textToCopy = `[CRIME TO LAW AWARENESS]\nCrime: ${item.crimeTitle}\nScenario: ${item.scenario}\nLaw (IPC): ${item.primaryLaw}\nNew Law (BNS 2023): ${item.bnsLaw}\nPunishment: ${item.punishment}\nAction Steps: ${item.actionSteps}\nHelpline: ${item.helpline}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getSeverityBadge = (severity) => {
    switch(severity) {
      case 'Critical':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200"><AlertTriangle className="w-3 h-3 text-rose-600" /> Critical Offense</span>;
      case 'High':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200"><ShieldAlert className="w-3 h-3 text-purple-600" /> High Severity</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200"><AlertCircle className="w-3 h-3 text-amber-600" /> Statutory Offense</span>;
    }
  };

  return (
    <section id="crime-law-awareness" className="py-12 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/40 via-slate-900 to-indigo-950/40 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Interactive Crime-to-Law Awareness Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Which <span className="bg-gradient-to-r from-rose-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">Crime</span> Has Which <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">Law</span>?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every form of harassment or assault has a specific legal remedy under Indian Penal Code (IPC) and Bharatiya Nyaya Sanhita (BNS 2023). Match real-world crimes to your exact statutory rights.
          </p>
        </div>

        {/* Instant Scenario Matcher Dropdown */}
        <div className="max-w-3xl mx-auto mb-8 bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-sm">
          <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider mb-2 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-purple-400" />
            Quick Scenario Matcher ("What Happened?")
          </label>
          <select
            value={selectedScenarioId}
            onChange={(e) => {
              setSelectedScenarioId(e.target.value);
              if (e.target.value) setExpandedId(e.target.value);
            }}
            className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-medium"
          >
            {SCENARIOS_QUICK.map((sc) => (
              <option key={sc.id} value={sc.id}>
                {sc.label}
              </option>
            ))}
          </select>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="space-y-4 mb-10">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by crime keyword, photo morphing, boss harassment, IPC section, stalking..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 bg-slate-800/80 border border-slate-700 text-white placeholder-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white text-xs bg-slate-700 px-2 py-0.5 rounded-full"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedScenarioId('');
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between max-w-5xl mx-auto mb-4 text-xs text-slate-400">
          <span>Showing <strong className="text-purple-300 font-semibold">{filteredData.length}</strong> Crime-to-Law protections</span>
          {(searchQuery || selectedCategory !== 'All' || selectedScenarioId) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedScenarioId('');
              }}
              className="text-purple-400 hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Crime vs Law Cards */}
        {filteredData.length === 0 ? (
          <div className="text-center py-12 bg-slate-800/40 rounded-2xl border border-slate-800 max-w-2xl mx-auto">
            <ShieldAlert className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-200 mb-1">No crime matching your search query</h3>
            <p className="text-slate-400 text-xs max-w-md mx-auto mb-4">
              Try searching for general keywords like "stalking", "photos", "boss", "touching", "dowry", or select a category above.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedScenarioId(''); }}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Show All Crimes
            </button>
          </div>
        ) : (
          <div className="space-y-4 max-w-5xl mx-auto">
            {filteredData.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`bg-slate-800/90 border rounded-2xl overflow-hidden transition-all duration-200 ${
                    isExpanded 
                      ? 'border-purple-500/80 ring-1 ring-purple-500/30 bg-slate-800 shadow-2xl' 
                      : 'border-slate-700/70 hover:border-slate-600 hover:bg-slate-800/80'
                  }`}
                >
                  {/* Card Header (Clickable to Expand) */}
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 bg-slate-700 text-slate-300 rounded-md text-[11px] font-medium uppercase tracking-wider">
                          {item.category}
                        </span>
                        {getSeverityBadge(item.severity)}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-300 transition-colors flex items-center gap-2">
                        <span>{item.crimeTitle}</span>
                      </h3>
                      <p className="text-slate-300 text-xs sm:text-sm line-clamp-2 italic">
                        "{item.scenario}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-700/50">
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] text-slate-400 block font-mono uppercase tracking-wider">Statutory Protection</span>
                        <span className="text-xs sm:text-sm font-bold text-purple-300 block">
                          {item.primaryLaw}
                        </span>
                      </div>
                      <div className={`p-2 rounded-xl bg-slate-700/60 text-slate-300 transition-transform ${isExpanded ? 'rotate-180 bg-purple-600/30 text-purple-200' : ''}`}>
                        <ChevronRight className="w-5 h-5 rotate-90" />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Card Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-slate-700/80 bg-slate-900/60 p-5 sm:p-6 space-y-6"
                      >
                        {/* 2-Column Grid: Laws & Punishment */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          
                          {/* Column 1: Statutory Sections */}
                          <div className="bg-purple-950/30 border border-purple-800/40 rounded-xl p-4 space-y-2">
                            <div className="flex items-center gap-2 text-purple-300 font-semibold text-xs uppercase tracking-wider">
                              <Gavel className="w-4 h-4 text-purple-400" />
                              <span>Statutory Sections & Acts</span>
                            </div>
                            <div>
                              <span className="text-[11px] text-slate-400 block">Indian Penal Code / Special Act:</span>
                              <p className="text-sm font-bold text-white">{item.primaryLaw}</p>
                            </div>
                            <div className="pt-1">
                              <span className="text-[11px] text-slate-400 block">Bharatiya Nyaya Sanhita (BNS 2023):</span>
                              <p className="text-sm font-bold text-indigo-300">{item.bnsLaw}</p>
                            </div>
                            <div className="pt-1 text-xs text-slate-300">
                              <span className="font-semibold text-slate-200">Offense Classification:</span> {item.nature}
                            </div>
                          </div>

                          {/* Column 2: Punishment & Severity */}
                          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 space-y-2">
                            <div className="flex items-center gap-2 text-rose-300 font-semibold text-xs uppercase tracking-wider">
                              <Scale className="w-4 h-4 text-rose-400" />
                              <span>Maximum Penalty & Punishment</span>
                            </div>
                            <p className="text-sm font-medium text-slate-100 leading-relaxed">
                              {item.punishment}
                            </p>
                            <div className="pt-2 flex items-center gap-2 text-xs text-slate-300">
                              <ShieldCheck className="w-4 h-4 text-emerald-400" />
                              <span>Legal Protection Level: <strong>{item.severity} Priority Enforcement</strong></span>
                            </div>
                          </div>
                        </div>

                        {/* Guaranteed Victim Rights */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                            <UserCheck className="w-4 h-4 text-emerald-400" />
                            Guaranteed Victim Legal Rights
                          </h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {item.victimRights.map((right, idx) => (
                              <li key={idx} className="bg-slate-800/70 border border-slate-700/60 rounded-xl p-3 text-xs text-slate-200 flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <span>{right}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Action Steps & Emergency Contacts */}
                        <div className="bg-gradient-to-r from-purple-900/40 to-slate-800 border border-purple-500/30 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider block">Immediate Recommended Legal Action</span>
                            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{item.actionSteps}</p>
                          </div>
                          
                          <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
                            <a
                              href={`tel:${item.helpline.split(' ')[0]}`}
                              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition-colors shadow-md"
                            >
                              <PhoneCall className="w-3.5 h-3.5" />
                              <span>Call {item.helpline}</span>
                            </a>

                            <button
                              onClick={() => handleCopy(item)}
                              className="inline-flex items-center justify-center p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 text-xs font-medium transition-colors"
                              title="Copy Crime & Law Legal Details"
                            >
                              {copiedId === item.id ? (
                                <Check className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Copy className="w-4 h-4 text-slate-300" />
                              )}
                            </button>
                          </div>
                        </div>

                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-12 text-center text-xs text-slate-400 max-w-2xl mx-auto border-t border-slate-800 pt-6">
          <p>
            <Shield className="w-4 h-4 inline-block text-purple-400 mr-1" />
            Statutory laws detailed according to Indian Penal Code (IPC), Bharatiya Nyaya Sanhita (BNS 2023), POSH Act 2013, IT Act 2000, and POCSO Act 2012. For official legal representation, contact your District Legal Services Authority (DLSA).
          </p>
        </div>

      </div>
    </section>
  );
}
