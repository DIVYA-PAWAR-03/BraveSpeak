import React, { useState, useMemo } from "react";
import { 
  Building2, Phone, MapPin, Search, Shield, Filter, 
  ExternalLink, Clock, CheckCircle2, HeartHandshake, PhoneCall, Scale, Lock
} from "lucide-react";
import { motion } from "framer-motion";

const supportCenters = [
  // Delhi
  {
    id: 1,
    name: "Sakhi One Stop Centre - AIIMS New Delhi",
    state: "Delhi",
    city: "New Delhi",
    type: "One Stop Centre (Sakhi)",
    address: "Near Emergency Ward, AIIMS Campus, Sri Aurobindo Marg, Ansari Nagar East, New Delhi 110029",
    phone: "011-26588500",
    altPhone: "181",
    timings: "24 Hours / 7 Days",
    services: ["Emergency Medical Aid", "Police Assistance", "Psycho-social Counseling", "Free Legal Counsel", "Temporary Shelter (up to 5 days)"]
  },
  {
    id: 2,
    name: "Delhi State Legal Services Authority (DSLSA)",
    state: "Delhi",
    city: "New Delhi",
    type: "Free Legal Aid (DLSA)",
    address: "Central Office, Pre-Fab Building, Patiala House Courts, New Delhi 110001",
    phone: "1516",
    altPhone: "011-23384781",
    timings: "10:00 AM - 5:00 PM (Helpline 24/7)",
    services: ["100% Free Court Advocates", "Legal Counseling", "Victim Compensation Schemes", "Protection Order Petitions"]
  },
  {
    id: 3,
    name: "Special Police Unit for Women & Children (SPUWAC)",
    state: "Delhi",
    city: "New Delhi",
    type: "Women Police Station",
    address: "Malviya Nagar, Nanakpura, New Delhi 110021",
    phone: "1091",
    altPhone: "011-24673366",
    timings: "24 Hours",
    services: ["Zero FIR Registration", "Female Investigating Officers", "Self-Defense Training", "Family Counseling"]
  },
  {
    id: 4,
    name: "Cyber Crime Cell - Delhi Police HQ",
    state: "Delhi",
    city: "New Delhi",
    type: "Cyber Crime Cell",
    address: "IFSO, Special Cell, Dwarka Sector 19, New Delhi",
    phone: "1930",
    altPhone: "011-20892623",
    timings: "24 Hours",
    services: ["Digital Forensics", "Morphed Content Takedown", "Online Blackmail Investigation"]
  },

  // Maharashtra - Mumbai & Pune
  {
    id: 5,
    name: "Sakhi One Stop Centre - KEM Hospital Mumbai",
    state: "Maharashtra",
    city: "Mumbai",
    type: "One Stop Centre (Sakhi)",
    address: "KEM Hospital Compound, Parel, Mumbai 400012",
    phone: "022-24107000",
    altPhone: "181",
    timings: "24 Hours",
    services: ["Integrated Medical Examination", "Trauma Counseling", "Police Liaison", "Safe Shelter"]
  },
  {
    id: 6,
    name: "Mumbai District Legal Services Authority",
    state: "Maharashtra",
    city: "Mumbai",
    type: "Free Legal Aid (DLSA)",
    address: "City Civil & Sessions Court, Old Secretariat Building, Fort, Mumbai 400032",
    phone: "022-22676644",
    altPhone: "1516",
    timings: "10:30 AM - 5:30 PM",
    services: ["Free Legal Defense", "PWDVA Applications", "Maintenance Claims"]
  },
  {
    id: 7,
    name: "Pune Police Mahila Sahayata Kaksh (Women Cell)",
    state: "Maharashtra",
    city: "Pune",
    type: "Women Police Station",
    address: "Pune Police Commissionerate, Sadhu Vaswani Road, Camp, Pune 411001",
    phone: "1091",
    altPhone: "020-26126296",
    timings: "24 Hours",
    services: ["Zero FIR Filing", "Dedicated Women Help Desk", "Quick Response Patrol"]
  },

  // Karnataka - Bengaluru
  {
    id: 8,
    name: "Sakhi One Stop Centre - Bowring & Lady Curzon Hospital",
    state: "Karnataka",
    city: "Bengaluru",
    type: "One Stop Centre (Sakhi)",
    address: "Hospital Road, Shivaji Nagar, Bengaluru 560001",
    phone: "080-25591325",
    altPhone: "181",
    timings: "24 Hours",
    services: ["Medical Care", "Forensic MLC", "Legal Representation", "Emergency Stay"]
  },
  {
    id: 9,
    name: "Vanitha Sahayavani (Bengaluru City Police Women Helpline)",
    state: "Karnataka",
    city: "Bengaluru",
    type: "Women Police Station",
    address: "Office of the Commissioner of Police, Infantry Road, Bengaluru 560001",
    phone: "1091",
    altPhone: "080-22943225",
    timings: "24 Hours",
    services: ["Crisis Intervention", "Female Officer Support", "Mediation & Legal Referrals"]
  },
  {
    id: 10,
    name: "Bengaluru Urban District Legal Services Authority",
    state: "Karnataka",
    city: "Bengaluru",
    type: "Free Legal Aid (DLSA)",
    address: "City Civil Court Complex, KG Road, Bengaluru 560009",
    phone: "080-22111746",
    altPhone: "1516",
    timings: "10:00 AM - 5:00 PM",
    services: ["Free Legal Counsel", "POSH Grievances", "Criminal Trial Assistance"]
  },

  // Tamil Nadu - Chennai
  {
    id: 11,
    name: "Sakhi One Stop Centre - Kilpauk Medical College Hospital",
    state: "Tamil Nadu",
    city: "Chennai",
    type: "One Stop Centre (Sakhi)",
    address: "822 EVR Periyar Salai, Kilpauk, Chennai 600010",
    phone: "044-28364951",
    altPhone: "181",
    timings: "24 Hours",
    services: ["Emergency Medical Response", "Psychological First Aid", "Police & Legal Coordination"]
  },
  {
    id: 12,
    name: "All Women Police Station (AWPS) - Egmore",
    state: "Tamil Nadu",
    city: "Chennai",
    type: "Women Police Station",
    address: "Egmore High Road, Chennai 600008",
    phone: "1091",
    altPhone: "044-23452655",
    timings: "24 Hours",
    services: ["Immediate Protection", "CrPC Statement Recording", "Anti-Eve Teasing Squad"]
  },

  // Telangana - Hyderabad
  {
    id: 13,
    name: "Sakhi One Stop Centre - Osmania General Hospital",
    state: "Telangana",
    city: "Hyderabad",
    type: "One Stop Centre (Sakhi)",
    address: "Afzal Gunj, High Court Road, Hyderabad 500012",
    phone: "040-24600146",
    altPhone: "181",
    timings: "24 Hours",
    services: ["One-Roof Medical/Legal Support", "Confidential Counseling", "Rescue Dispatch"]
  },
  {
    id: 14,
    name: "SHE Teams - Telangana Police",
    state: "Telangana",
    city: "Hyderabad",
    type: "Women Police Station",
    address: "Cyberabad & Hyderabad Police Commissionerates",
    phone: "100",
    altPhone: "9490616555",
    timings: "24 Hours",
    services: ["Undercover Anti-Stalking Patrol", "CCTV Evidence Tracking", "Instant WhatsApp Reporting"]
  },

  // West Bengal - Kolkata
  {
    id: 15,
    name: "Sakhi One Stop Centre - Medical College Kolkata",
    state: "West Bengal",
    city: "Kolkata",
    type: "One Stop Centre (Sakhi)",
    address: "88 College Street, Kolkata 700073",
    phone: "033-22551600",
    altPhone: "181",
    timings: "24 Hours",
    services: ["Emergency Trauma Treatment", "Legal Aid", "Temporary Stay"]
  },
  {
    id: 16,
    name: "Women Grievance Cell - Lalbazar Kolkata Police HQ",
    state: "West Bengal",
    city: "Kolkata",
    type: "Women Police Station",
    address: "18 Lalbazar Street, Bowbazar, Kolkata 700001",
    phone: "1091",
    altPhone: "033-22145000",
    timings: "24 Hours",
    services: ["Women Safety Patrol", "Zero FIR Facilitation", "Counseling"]
  },

  // Uttar Pradesh - Lucknow & Noida
  {
    id: 17,
    name: "Sakhi One Stop Centre - Dr. Ram Manohar Lohia Hospital",
    state: "Uttar Pradesh",
    city: "Lucknow",
    type: "One Stop Centre (Sakhi)",
    address: "Vibhuti Khand, Gomti Nagar, Lucknow 226010",
    phone: "0522-6692000",
    altPhone: "181",
    timings: "24 Hours",
    services: ["Integrated Crisis Care", "Free Legal Services", "Safe Shelter"]
  },
  {
    id: 18,
    name: "Women Power Line 1090 Headquarters",
    state: "Uttar Pradesh",
    city: "Lucknow",
    type: "Women Police Station",
    address: "Gomti Nagar, Lucknow 226010",
    phone: "1090",
    altPhone: "112",
    timings: "24 Hours",
    services: ["Phone Harassment Resolution", "Stalking Prevention", "Female Call Handlers"]
  }
];

const availableStates = ["All States", "Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Telangana", "West Bengal", "Uttar Pradesh"];
const serviceTypes = ["All Services", "One Stop Centre (Sakhi)", "Free Legal Aid (DLSA)", "Women Police Station", "Cyber Crime Cell"];

export default function SupportDirectory() {
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedType, setSelectedType] = useState("All Services");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCenters = useMemo(() => {
    return supportCenters.filter((item) => {
      const matchState = selectedState === "All States" || item.state === selectedState;
      const matchType = selectedType === "All Services" || item.type === selectedType;
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchState && matchType && matchSearch;
    });
  }, [selectedState, selectedType, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-900 text-xs font-bold uppercase tracking-wider">
            <Building2 size={15} /> Verified Institutional Support
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2E003E] tracking-tight">
            Verified Support Centers & Safe Spaces Directory
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Locate 24/7 One Stop Crisis Centres (Sakhi), District Legal Services Authorities (DLSA Free Advocates), All-Women Police Stations, and specialized cyber units across India.
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-purple-100 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
            <input
              type="text"
              placeholder="Search by hospital, city, landmark, or specific assistance type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-purple-50/50 border border-purple-200 rounded-2xl text-slate-800 placeholder-purple-400/80 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Filter by State
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full p-3 bg-purple-50/40 border border-purple-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                {availableStates.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Filter by Service Category
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-3 bg-purple-50/40 border border-purple-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                {serviceTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Directory Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCenters.length === 0 ? (
            <div className="col-span-2 text-center py-16 bg-white rounded-3xl border border-purple-100 p-8">
              <p className="text-slate-500 text-sm">No centers match your current filter criteria. Try selecting "All States" or clearing your search term.</p>
            </div>
          ) : (
            filteredCenters.map((center) => (
              <div
                key={center.id}
                className="bg-white rounded-3xl p-6 sm:p-7 shadow-md hover:shadow-xl border border-purple-100 hover:border-purple-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 bg-purple-100 text-purple-900 rounded-full">
                      {center.type}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <Clock size={13} className="text-purple-600" /> {center.timings}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#2E003E]">
                    {center.name}
                  </h3>

                  <p className="text-xs text-slate-600 flex items-start gap-1.5 leading-relaxed">
                    <MapPin size={16} className="text-rose-500 shrink-0 mt-0.5" />
                    <span>{center.address}</span>
                  </p>

                  {/* Services List */}
                  <div className="pt-2">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Available On-Site Services:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {center.services.map((srv, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-lg"
                        >
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={`tel:${center.phone}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-800 to-indigo-800 hover:from-purple-900 hover:to-indigo-900 text-white rounded-xl text-xs font-bold shadow-md transition hover:scale-105"
                  >
                    <PhoneCall size={14} /> Call: {center.phone}
                  </a>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(center.name + " " + center.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-purple-900 hover:underline"
                  >
                    <span>Get Directions</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
