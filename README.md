# BraveSpeak 🗣️

**Breaking the Silence, Seeking Justice**

BraveSpeak is a comprehensive full-stack web application dedicated to supporting survivors of sexual violence and harassment. This platform serves as a safe space for awareness, education, and empowerment, providing essential information about legal rights, statistics, survivor stories, evidence vaulting, emergency tactical tools, and institutional support directories.

---

## 🌟 Features

- **Survivor Stories & Safe Space**: Read verified survivor accounts, share stories anonymously or with an alias, support stories with likes, and leave messages of solidarity.
- **AI Legal Assistant & FIR Drafter**: Diagnose statutory provisions under IPC, Bharatiya Nyaya Sanhita (BNS) 2023, POSH Act, and IT Act; generate and print formal legal complaint drafts.
- **Institutional Support Directory**: Search government-verified Sakhi One Stop Centres, DLSA Free Legal Aid cells, Cyber Crime Desks, and Women Police Stations with real-time GPS nearby geolocation.
- **Tactical Safety Suite**: 
  - Fake incoming call simulator with customizable caller & web audio ringtone synthesis.
  - Ear-piercing oscillating deterrence siren & strobe alarm.
  - 1-tap live GPS coordinates broadcast via WhatsApp & SMS to trusted emergency contacts.
  - Discreet voice recording & cloud evidence vaulting.
- **Community Safety Hotspots**: Crowd-sourced unsafe dark spots, missing streetlights, and hazard reporting heatmap.
- **Confidential Case Tracking**: Submit inquiries with anonymous tracking codes (`BS-XXXXXX`) to check updates without compromising identity.
- **Digital Privacy Health Meter**: Interactive checklist and guidance on StopNCII hash shielding and hidden camera detection.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, React Router DOM v7, Tailwind CSS, Lucide React, Framer Motion, Recharts
- **Backend**: Node.js, Express.js, SQLite (`better-sqlite3`), Multer, Morgan, CORS, Dotenv
- **Build Tool**: Vite

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DIVYA-PAWAR-03/BraveSpeak.git
   cd BraveSpeak
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start Full-Stack Development (Frontend + Backend Server)**
   ```bash
   npm run dev:all
   ```
   - **Frontend UI**: `http://localhost:5173`
   - **Backend REST API**: `http://localhost:5000/api`

### Available Scripts

- `npm run dev:all` - Concurrently run Express API server and Vite frontend
- `npm run server` - Run Express API server independently
- `npm run dev` - Run Vite frontend independently
- `npm run build` - Build production bundle with Vite
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint code checks

---

## 📁 Project Structure

```
BraveSpeak/
├── server/
│   ├── db.js                 # SQLite database & auto-seeding
│   ├── index.js              # Main Express API entrypoint
│   └── routes/
│       ├── stories.js        # Stories & Comments REST API
│       ├── legal.js          # Legal analysis & statutory lookup
│       ├── support.js        # Support centers & GPS nearby finder
│       ├── contact.js        # Inquiries & anonymous case tracking
│       ├── emergency.js      # SOS logs & Evidence Vault uploads
│       └── safety.js         # Hotspots heatmap & analytics
├── src/
│   ├── components/           # UI components (Header, Footer, etc.)
│   ├── pages/                # Main application views
│   │   ├── Homepage.jsx
│   │   ├── StoriesPage.jsx
│   │   ├── StoryDetail.jsx
│   │   ├── LegalAssistant.jsx
│   │   ├── HarassmentLaws.jsx
│   │   ├── SupportDirectory.jsx
│   │   ├── SafetyToolkit.jsx
│   │   ├── DigitalSafety.jsx
│   │   ├── StatisticsPage.jsx
│   │   └── ContactUs.jsx
│   ├── services/
│   │   └── api.js            # Centralized API service
│   ├── App.jsx               # Routes & layout
│   └── main.jsx
├── package.json
└── README.md
```

---

## 📞 24/7 National Emergency Helplines (India)

- **National Emergency**: 112
- **Women Helpline**: 181
- **Women Police Cell**: 1091
- **National Cybercrime Helpline**: 1930
- **Childline**: 1098

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

_Built with ❤️ for survivors, advocates, and safer public spaces._
