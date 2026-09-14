import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure data directory exists
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'bravespeak.db');
const db = new Database(dbPath);

// Enable WAL mode for better concurrency
db.pragma('journal_mode = WAL');

export function initDatabase() {
  // 1. Stories Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS stories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      author TEXT NOT NULL,
      is_anonymous INTEGER DEFAULT 0,
      read_time TEXT DEFAULT '3 min read',
      likes INTEGER DEFAULT 0,
      image_url TEXT DEFAULT '/images/news_3.jpg',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. Comments Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      story_id INTEGER NOT NULL,
      author TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE
    );
  `);

  // 3. Support Centers Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS support_centers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      state TEXT NOT NULL,
      city TEXT NOT NULL,
      type TEXT NOT NULL,
      address TEXT NOT NULL,
      phone TEXT NOT NULL,
      alt_phone TEXT,
      timings TEXT DEFAULT '24 Hours',
      services TEXT NOT NULL,
      latitude REAL,
      longitude REAL
    );
  `);

  // 4. Legal Laws Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS legal_laws (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code_type TEXT NOT NULL,
      section TEXT NOT NULL,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      punishment TEXT NOT NULL,
      is_bailable INTEGER DEFAULT 0,
      is_cognizable INTEGER DEFAULT 1,
      remedy_steps TEXT NOT NULL
    );
  `);

  // 5. Contact Inquiries Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS contact_inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ref_id TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      category TEXT DEFAULT 'General Support',
      message TEXT NOT NULL,
      status TEXT DEFAULT 'Received',
      admin_note TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 6. Emergency SOS Logs Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS emergency_sos_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_alias TEXT DEFAULT 'Anonymous User',
      latitude REAL,
      longitude REAL,
      address TEXT,
      message TEXT,
      contacts_alerted INTEGER DEFAULT 1,
      battery_level TEXT,
      status TEXT DEFAULT 'Alert Dispatched',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 7. Community Safety Hotspots Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS safety_hotspots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      location_name TEXT NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      hazard_type TEXT NOT NULL,
      severity TEXT NOT NULL,
      description TEXT NOT NULL,
      reported_by TEXT DEFAULT 'Community Member',
      upvotes INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 8. Evidence Vault Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS evidence_vault (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      incident_date TEXT,
      notes TEXT,
      file_name TEXT,
      file_path TEXT,
      file_type TEXT,
      file_size INTEGER,
      hash_signature TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  seedData();
}

function seedData() {
  // Seed Stories if empty
  const storyCount = db.prepare('SELECT COUNT(*) as count FROM stories').get().count;
  if (storyCount === 0) {
    const insertStory = db.prepare(`
      INSERT INTO stories (id, title, category, description, author, is_anonymous, read_time, likes, image_url, created_at)
      VALUES (@id, @title, @category, @description, @author, @is_anonymous, @read_time, @likes, @image_url, @created_at)
    `);

    const initialStories = [
      {
        id: 1,
        image_url: '/images/news_6.png',
        title: 'Breaking the Workplace Silence',
        category: 'Workplace Courage',
        description: 'When discriminatory remarks and inappropriate advances started at my firm, I felt completely isolated. After learning about the POSH Internal Complaints Committee, I documented everything and filed a formal complaint. The process was hard, but it resulted in corrective action and created safer policies for every woman in our team.',
        author: 'Ananya S.',
        is_anonymous: 0,
        read_time: '3 min read',
        likes: 42,
        created_at: '2024-08-15 10:00:00'
      },
      {
        id: 2,
        image_url: '/images/news_7.png',
        title: 'Finding Strength in Community Counseling',
        category: 'Healing & Recovery',
        description: 'Healing from traumatic assault felt impossible until I joined a weekly survivor circle. Speaking my truth in a space with zero judgment gave me my dignity back. No one should carry this weight alone.',
        author: 'Pooja M.',
        is_anonymous: 0,
        read_time: '4 min read',
        likes: 68,
        created_at: '2024-07-20 14:30:00'
      },
      {
        id: 3,
        image_url: '/images/news_8.png',
        title: 'Taking on Cyber Blackmail & Winning',
        category: 'Cyber Safety',
        description: 'My private photos were leaked and used to blackmail me for money. Instead of giving in, I took screenshots and immediately contacted cybercrime.gov.in and the 1930 helpline. The cyber cell acted swiftly to take down the content and identify the perpetrator.',
        author: 'Anonymous',
        is_anonymous: 1,
        read_time: '3 min read',
        likes: 95,
        created_at: '2024-09-01 09:15:00'
      },
      {
        id: 4,
        image_url: '/images/news_9.png',
        title: 'A Fresh Start After Years of Domestic Abuse',
        category: 'Legal Victory',
        description: 'With the assistance of the District Legal Services Authority (DLSA) providing free legal counsel, I was able to secure a protection order and financial independence. Freedom is real, and help is out there.',
        author: 'Sunita R.',
        is_anonymous: 0,
        read_time: '5 min read',
        likes: 112,
        created_at: '2024-06-10 16:45:00'
      },
      {
        id: 5,
        image_url: '/images/news_11.webp',
        title: 'Voices United on Campus',
        category: 'Community Action',
        description: 'After persistent stalking incidents went unaddressed on our university campus, we mobilized a student awareness campaign demanding CCTV coverage, emergency call boxes, and mandatory gender sensitization workshops.',
        author: 'Student Collective',
        is_anonymous: 0,
        read_time: '3 min read',
        likes: 84,
        created_at: '2024-05-18 11:20:00'
      },
      {
        id: 6,
        image_url: '/images/news_3.jpg',
        title: 'Reclaiming My Voice After Modesty Assault',
        category: 'Workplace Courage',
        description: 'Overcoming fear of public scrutiny, I filed an FIR under Section 354 IPC. The support from my family and legal advocate helped me stand firm through trial proceedings.',
        author: 'Deepa V.',
        is_anonymous: 0,
        read_time: '4 min read',
        likes: 73,
        created_at: '2024-04-22 13:10:00'
      },
      {
        id: 7,
        image_url: '/images/news_10.webp',
        title: 'Therapy & Mindful Recovery Journey',
        category: 'Healing & Recovery',
        description: 'Trauma recovery is not linear. Regular counseling sessions, yoga, and journaling helped me rebuild my self-worth step by step.',
        author: 'Kavita T.',
        is_anonymous: 0,
        read_time: '2 min read',
        likes: 56,
        created_at: '2024-03-14 08:30:00'
      },
      {
        id: 8,
        image_url: '/images/news_4.jpeg',
        title: 'Becoming an Advocate for Others',
        category: 'Community Action',
        description: 'Having survived harassment early in my career, I now volunteer with women safety NGOs to mentor young professionals on assertiveness, reporting protocols, and emotional resilience.',
        author: 'Meera K.',
        is_anonymous: 0,
        read_time: '4 min read',
        likes: 129,
        created_at: '2024-02-28 17:00:00'
      }
    ];

    const insertMany = db.transaction((stories) => {
      for (const s of stories) insertStory.run(s);
    });
    insertMany(initialStories);

    // Initial seed comments
    const insertComment = db.prepare(`
      INSERT INTO comments (story_id, author, content, created_at)
      VALUES (?, ?, ?, datetime('now', '-2 days'))
    `);
    insertComment.run(1, 'Ritika P.', 'Your courage is inspiring. Documenting evidence is indeed the strongest shield!');
    insertComment.run(3, 'Swati D.', 'Thank you for reminding us to call 1930 without shame. More power to you.');
    insertComment.run(4, 'Adv. Neha', 'DLSA legal aid is a constitutional right for every woman. Proud of your courage.');
  }

  // Seed Support Centers if empty
  const centerCount = db.prepare('SELECT COUNT(*) as count FROM support_centers').get().count;
  if (centerCount === 0) {
    const insertCenter = db.prepare(`
      INSERT INTO support_centers (name, state, city, type, address, phone, alt_phone, timings, services, latitude, longitude)
      VALUES (@name, @state, @city, @type, @address, @phone, @alt_phone, @timings, @services, @latitude, @longitude)
    `);

    const centers = [
      // Delhi
      {
        name: 'Sakhi One Stop Centre - AIIMS New Delhi',
        state: 'Delhi',
        city: 'New Delhi',
        type: 'One Stop Centre (Sakhi)',
        address: 'Near Emergency Ward, AIIMS Campus, Sri Aurobindo Marg, Ansari Nagar East, New Delhi 110029',
        phone: '011-26588500',
        alt_phone: '181',
        timings: '24 Hours / 7 Days',
        services: JSON.stringify(['Emergency Medical Aid', 'Police Assistance', 'Psycho-social Counseling', 'Free Legal Counsel', 'Temporary Shelter (up to 5 days)']),
        latitude: 28.5672,
        longitude: 77.2100
      },
      {
        name: 'Delhi State Legal Services Authority (DSLSA)',
        state: 'Delhi',
        city: 'New Delhi',
        type: 'Free Legal Aid (DLSA)',
        address: 'Central Office, Pre-Fab Building, Patiala House Courts, New Delhi 110001',
        phone: '1516',
        alt_phone: '011-23384781',
        timings: '10:00 AM - 5:00 PM (Helpline 24/7)',
        services: JSON.stringify(['100% Free Court Advocates', 'Legal Counseling', 'Victim Compensation Schemes', 'Protection Order Petitions']),
        latitude: 28.6186,
        longitude: 77.2344
      },
      {
        name: 'Special Police Unit for Women & Children (SPUWAC)',
        state: 'Delhi',
        city: 'New Delhi',
        type: 'Women Police Station',
        address: 'Malviya Nagar, Nanakpura, New Delhi 110021',
        phone: '1091',
        alt_phone: '011-24673366',
        timings: '24 Hours',
        services: JSON.stringify(['Zero FIR Registration', 'Female Investigating Officers', 'Self-Defense Training', 'Family Counseling']),
        latitude: 28.5833,
        longitude: 77.1667
      },
      {
        name: 'Cyber Crime Cell - Delhi Police HQ',
        state: 'Delhi',
        city: 'New Delhi',
        type: 'Cyber Crime Cell',
        address: 'IFSO, Special Cell, Dwarka Sector 19, New Delhi',
        phone: '1930',
        alt_phone: '011-20892623',
        timings: '24 Hours',
        services: JSON.stringify(['Digital Forensics', 'Morphed Content Takedown', 'Online Blackmail Investigation']),
        latitude: 28.5823,
        longitude: 77.0500
      },
      // Maharashtra
      {
        name: 'Sakhi One Stop Centre - KEM Hospital Mumbai',
        state: 'Maharashtra',
        city: 'Mumbai',
        type: 'One Stop Centre (Sakhi)',
        address: 'KEM Hospital Complex, Acharya Donde Marg, Parel, Mumbai 400012',
        phone: '022-24107000',
        alt_phone: '181',
        timings: '24 Hours',
        services: JSON.stringify(['Medical Examination', 'Trauma Counseling', 'Shelter Referral', 'Legal Assistance']),
        latitude: 19.0028,
        longitude: 72.8427
      },
      {
        name: 'Maharashtra State Commission for Women (MSCW)',
        state: 'Maharashtra',
        city: 'Mumbai',
        type: 'Government Commission',
        address: 'Gruha Nirman Bhavan, Mezzanine Floor, Bandra East, Mumbai 400051',
        phone: '022-26592707',
        alt_phone: '7477722424',
        timings: '9:30 AM - 6:00 PM',
        services: JSON.stringify(['Grievance Redressal', 'Legal Aid Coordination', 'Suhita Helpline']),
        latitude: 19.0596,
        longitude: 72.8536
      },
      {
        name: 'Cyber Police Station - BKC Mumbai',
        state: 'Maharashtra',
        city: 'Mumbai',
        type: 'Cyber Crime Cell',
        address: 'Bandra Kurla Complex, Bandra East, Mumbai 400051',
        phone: '1930',
        alt_phone: '022-26504008',
        timings: '24 Hours',
        services: JSON.stringify(['Online Harassment FIR', 'Deepfake & Impersonation Investigation']),
        latitude: 19.0662,
        longitude: 72.8687
      },
      {
        name: 'SNEHA Crisis Support Centre',
        state: 'Maharashtra',
        city: 'Mumbai',
        type: 'NGO & Counseling Network',
        address: 'Urban Health Centre, 60 Feet Road, Dharavi, Mumbai 400017',
        phone: '9833052684',
        alt_phone: '9167535761',
        timings: '24 Hours Helpline',
        services: JSON.stringify(['Crisis Intervention', 'Mental Health Therapy', 'Community Outreach']),
        latitude: 19.0434,
        longitude: 72.8567
      },
      // Karnataka - Bengaluru
      {
        name: 'Sakhi One Stop Centre - Bowring Hospital Bengaluru',
        state: 'Karnataka',
        city: 'Bengaluru',
        type: 'One Stop Centre (Sakhi)',
        address: 'Bowring & Lady Curzon Hospital Campus, Shivajinagar, Bengaluru 560001',
        phone: '080-25591325',
        alt_phone: '181',
        timings: '24 Hours',
        services: JSON.stringify(['Immediate Medical Care', 'Police Assistance Desk', 'Shelter & Food', 'Legal Support']),
        latitude: 12.9822,
        longitude: 77.6033
      },
      {
        name: 'Parihar - Bangalore City Police Family Counseling',
        state: 'Karnataka',
        city: 'Bengaluru',
        type: 'Women Police Station',
        address: 'Office of Commissioner of Police, Infantry Road, Bengaluru 560001',
        phone: '080-22943225',
        alt_phone: '1091',
        timings: '10:00 AM - 6:00 PM',
        services: JSON.stringify(['Dispute Mediation', 'Domestic Violence Counseling', 'Legal Consultation']),
        latitude: 12.9790,
        longitude: 77.5990
      },
      {
        name: 'Cyber Crime Police Station - CID Karnataka',
        state: 'Karnataka',
        city: 'Bengaluru',
        type: 'Cyber Crime Cell',
        address: 'Carlton House, Palace Road, Bengaluru 560001',
        phone: '1930',
        alt_phone: '080-22094498',
        timings: '24 Hours',
        services: JSON.stringify(['Digital Evidence Capture', 'Cyber Stalking Cases', 'Data Recovery']),
        latitude: 12.9810,
        longitude: 77.5870
      },
      // Telangana - Hyderabad
      {
        name: 'Sakhi One Stop Centre - Osmania Hospital Hyderabad',
        state: 'Telangana',
        city: 'Hyderabad',
        type: 'One Stop Centre (Sakhi)',
        address: 'Osmania General Hospital, Afzal Gunj, Hyderabad 500012',
        phone: '040-24600121',
        alt_phone: '181',
        timings: '24 Hours',
        services: JSON.stringify(['24/7 Medical Care', 'Safe Accommodation', 'Counseling', 'Legal Aid']),
        latitude: 17.3753,
        longitude: 78.4744
      },
      {
        name: 'SHE Teams Hyderabad Police',
        state: 'Telangana',
        city: 'Hyderabad',
        type: 'Women Police Station',
        address: 'HACA Bhavan, Opposite Assembly, Saifabad, Hyderabad 500004',
        phone: '9490616555',
        alt_phone: '100',
        timings: '24 Hours',
        services: JSON.stringify(['Undercover Patrols', 'Eve-Teasing Interception', 'Zero FIR', 'WhatsApp Reporting']),
        latitude: 17.4000,
        longitude: 78.4680
      },
      // Tamil Nadu - Chennai
      {
        name: 'Sakhi One Stop Centre - Rajiv Gandhi Govt Hospital',
        state: 'Tamil Nadu',
        city: 'Chennai',
        type: 'One Stop Centre (Sakhi)',
        address: 'EVR Periyar Salai, Park Town, Chennai 600003',
        phone: '044-25305000',
        alt_phone: '181',
        timings: '24 Hours',
        services: JSON.stringify(['Emergency Care', 'Counseling', 'Shelter', 'Legal Support']),
        latitude: 13.0827,
        longitude: 80.2707
      },
      // West Bengal - Kolkata
      {
        name: 'Sakhi One Stop Centre - Medical College Kolkata',
        state: 'West Bengal',
        city: 'Kolkata',
        type: 'One Stop Centre (Sakhi)',
        address: '88 College Street, College Square, Kolkata 700073',
        phone: '033-22551621',
        alt_phone: '181',
        timings: '24 Hours',
        services: JSON.stringify(['Comprehensive Medical Aid', 'Trauma Counseling', 'Legal Consultation']),
        latitude: 22.5726,
        longitude: 88.3639
      }
    ];

    const insertCenters = db.transaction((items) => {
      for (const item of items) insertCenter.run(item);
    });
    insertCenters(centers);
  }

  // Seed Legal Laws if empty
  const lawCount = db.prepare('SELECT COUNT(*) as count FROM legal_laws').get().count;
  if (lawCount === 0) {
    const insertLaw = db.prepare(`
      INSERT INTO legal_laws (code_type, section, title, category, description, punishment, is_bailable, is_cognizable, remedy_steps)
      VALUES (@code_type, @section, @title, @category, @description, @punishment, @is_bailable, @is_cognizable, @remedy_steps)
    `);

    const laws = [
      {
        code_type: 'BNS 2023 / IPC',
        section: 'BNS Sec 74 / IPC Sec 354',
        title: 'Assault or Criminal Force with Intent to Outrage Modesty',
        category: 'Physical Assault',
        description: 'Assaults or uses criminal force on any woman, intending to outrage or knowing it to be likely that he will thereby outrage her modesty (e.g. groping, physical molestation, grabbing).',
        punishment: 'Rigorous imprisonment from 1 year up to 5 years, plus mandatory fine.',
        is_bailable: 0,
        is_cognizable: 1,
        remedy_steps: 'File Zero FIR at any police station immediately under Sec 154 CrPC / BNSS. Demand immediate medical examination (MLC). Statement must be recorded by a woman police officer.'
      },
      {
        code_type: 'BNS 2023 / IPC',
        section: 'BNS Sec 75 / IPC Sec 354A',
        title: 'Sexual Harassment & Unwelcome Advances',
        category: 'Workplace & Public Harassment',
        description: 'Unwelcome physical contact, demanding or requesting sexual favors, showing pornography against a woman\'s will, or making sexually colored remarks.',
        punishment: 'Rigorous imprisonment up to 3 years, or fine, or both.',
        is_bailable: 1,
        is_cognizable: 1,
        remedy_steps: 'File complaint with workplace Internal Complaints Committee (ICC) within 90 days under POSH Act, or file an FIR at local police station.'
      },
      {
        code_type: 'BNS 2023 / IPC',
        section: 'BNS Sec 76 / IPC Sec 354B',
        title: 'Assault with Intent to Disrobe',
        category: 'Physical Violence',
        description: 'Using criminal force or assaulting any woman with intent to disrobe or compel her to be naked in any setting.',
        punishment: 'Imprisonment not less than 3 years, extendable to 7 years, plus fine.',
        is_bailable: 0,
        is_cognizable: 1,
        remedy_steps: 'Non-bailable warrant offense. Immediate police intervention required. Preserve torn clothing as physical evidence.'
      },
      {
        code_type: 'BNS 2023 / IPC',
        section: 'BNS Sec 77 / IPC Sec 354C',
        title: 'Voyeurism & Hidden Cameras',
        category: 'Privacy Violation',
        description: 'Watching, capturing, or sharing images of a woman engaging in a private act where she has a reasonable expectation of privacy (restrooms, trial rooms, private rooms).',
        punishment: 'First conviction: 1 to 3 years imprisonment + fine; Subsequent conviction: 3 to 7 years imprisonment + fine.',
        is_bailable: 1,
        is_cognizable: 1,
        remedy_steps: 'Take photos/video of hidden camera device without touching it. Call 112 / 1091 and preserve device for forensic seizure.'
      },
      {
        code_type: 'BNS 2023 / IPC',
        section: 'BNS Sec 78 / IPC Sec 354D',
        title: 'Stalking & Cyber Stalking',
        category: 'Stalking & Cyber Crime',
        description: 'Following a woman, contacting or attempting to contact despite clear indication of disinterest, or monitoring internet/email/electronic communications.',
        punishment: 'First conviction: up to 3 years + fine; Subsequent: up to 5 years + fine.',
        is_bailable: 1,
        is_cognizable: 1,
        remedy_steps: 'Log all dates, times, messages and call logs. File an online report on cybercrime.gov.in or report to local Women Police Cell.'
      },
      {
        code_type: 'BNS 2023 / IPC',
        section: 'BNS Sec 79 / IPC Sec 509',
        title: 'Word, Gesture or Act Intended to Insult Modesty',
        category: 'Eve-Teasing & Verbal Abuse',
        description: 'Uttering any word, making any sound or gesture, or exhibiting any object intending that such word or sound shall be heard, or that such gesture or object shall be seen by a woman, or intruding upon privacy.',
        punishment: 'Simple imprisonment up to 3 years, with fine.',
        is_bailable: 1,
        is_cognizable: 1,
        remedy_steps: 'Gather audio recordings or witness statements. File an official complaint with Police or Women Safety Cell.'
      },
      {
        code_type: 'IT ACT 2000',
        section: 'Section 66E & 67A',
        title: 'Publishing / Transmitting Obscene Content & Privacy Violation',
        category: 'Digital & Online Crimes',
        description: 'Transmitting images of private areas of any person without consent, or publishing sexually explicit digital content.',
        punishment: 'Imprisonment up to 5 years (1st offense) / 7 years (2nd offense) and fine up to 10 Lakh Rupees.',
        is_bailable: 0,
        is_cognizable: 1,
        remedy_steps: 'Do NOT delete chats or images. Register hashes on StopNCII.org. Call national cyber helpline 1930 and lodge complaint at cybercrime.gov.in.'
      },
      {
        code_type: 'SPECIAL ACT',
        section: 'POSH Act 2013',
        title: 'Sexual Harassment of Women at Workplace (Prevention, Prohibition & Redressal)',
        category: 'Workplace Courage',
        description: 'Protects all women (permanent, temporary, contractual, intern, visitor) against hostile work environment, quid pro quo demands, or retaliation.',
        punishment: 'Disciplinary action, termination of accused, monetary compensation deducted from salary; Employer penalty up to Rs 50,000 for non-compliance.',
        is_bailable: 1,
        is_cognizable: 0,
        remedy_steps: 'Submit formal written complaint to ICC (companies >10 employees) or LCC (District Magistrate) within 90 days. Inquiry must finish in 90 days.'
      },
      {
        code_type: 'SPECIAL ACT',
        section: 'PWDVA 2005 & IPC 498A',
        title: 'Protection from Domestic Violence & Matrimonial Cruelty',
        category: 'Domestic & Family Rights',
        description: 'Physical, sexual, emotional, verbal or economic abuse in a domestic relationship by spouse or relatives.',
        punishment: 'Protection orders, residence orders, monetary maintenance, plus IPC 498A imprisonment up to 3 years.',
        is_bailable: 0,
        is_cognizable: 1,
        remedy_steps: 'Approach nearest Protection Officer, Judicial Magistrate, or DLSA for 100% free advocate representation and emergency residence orders.'
      }
    ];

    const insertLaws = db.transaction((items) => {
      for (const item of items) insertLaw.run(item);
    });
    insertLaws(laws);
  }

  // Seed Community Safety Hotspots if empty
  const hotspotCount = db.prepare('SELECT COUNT(*) as count FROM safety_hotspots').get().count;
  if (hotspotCount === 0) {
    const insertHotspot = db.prepare(`
      INSERT INTO safety_hotspots (location_name, city, state, latitude, longitude, hazard_type, severity, description, upvotes)
      VALUES (@location_name, @city, @state, @latitude, @longitude, @hazard_type, @severity, @description, @upvotes)
    `);

    const hotspots = [
      {
        location_name: 'Metro Pillar 140 to 160 underpass, Outer Ring Road',
        city: 'New Delhi',
        state: 'Delhi',
        latitude: 28.6448,
        longitude: 77.2167,
        hazard_type: 'Poor Lighting',
        severity: 'High',
        description: 'Streetlights out of order for 3 weeks; dark stretch with frequent speeding bikes and eve-teasing after 8 PM.',
        upvotes: 24
      },
      {
        location_name: 'Railway Foot-over Bridge West Exit',
        city: 'Mumbai',
        state: 'Maharashtra',
        latitude: 19.0178,
        longitude: 72.8478,
        hazard_type: 'Isolated Area',
        severity: 'Critical',
        description: 'Lack of police booth or CCTV cameras, unauthorized loitering observed near ticket counter alley.',
        upvotes: 38
      },
      {
        location_name: 'IT Corridor Outer Service Road near Bus Shelter',
        city: 'Bengaluru',
        state: 'Karnataka',
        latitude: 12.9279,
        longitude: 77.6271,
        hazard_type: 'Lack of Patrol',
        severity: 'Medium',
        description: 'Bus stop poorly illuminated; cab drivers & strangers loitering during late shift drops.',
        upvotes: 19
      },
      {
        location_name: 'HiTech City Bypass lane behind Tech Park',
        city: 'Hyderabad',
        state: 'Telangana',
        latitude: 17.4483,
        longitude: 78.3915,
        hazard_type: 'Eve-teasing',
        severity: 'High',
        description: 'Repeated catcalling incidents reported by women pedestrians returning from evening shifts.',
        upvotes: 31
      }
    ];

    const insertHotspots = db.transaction((items) => {
      for (const item of items) insertHotspot.run(item);
    });
    insertHotspots(hotspots);
  }
}

export default db;
