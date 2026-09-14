import express from 'express';
import db from '../db.js';

const router = express.Router();

// GET /api/legal/laws - Retrieve all statutory laws
router.get('/laws', (req, res) => {
  try {
    const { category, search } = req.query;
    let query = `SELECT * FROM legal_laws WHERE 1=1`;
    const params = [];

    if (category && category !== 'All') {
      query += ` AND category = ?`;
      params.push(category);
    }

    if (search && search.trim()) {
      query += ` AND (title LIKE ? OR section LIKE ? OR description LIKE ?)`;
      const term = `%${search.trim()}%`;
      params.push(term, term, term);
    }

    const laws = db.prepare(query).all(...params);
    res.json({ success: true, count: laws.length, data: laws });
  } catch (error) {
    console.error('Error fetching laws:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch legal statutes' });
  }
});

// POST /api/legal/analyze - Smart diagnostic tool mapping incident text to IPC / BNS / POSH provisions
router.post('/analyze', (req, res) => {
  try {
    const { incidentText, incidentType, location, authority } = req.body;

    if (!incidentText || !incidentText.trim()) {
      return res.status(400).json({ success: false, message: 'Incident description is required for legal analysis' });
    }

    const text = incidentText.toLowerCase();
    const matchedLaws = [];
    const recommendedActions = [];
    const evidenceRequired = [];

    // All laws from DB
    const allLaws = db.prepare(`SELECT * FROM legal_laws`).all();

    // 1. Workplace Harassment / POSH Checks
    if (
      text.includes('office') || text.includes('colleague') || text.includes('manager') ||
      text.includes('boss') || text.includes('workplace') || text.includes('salary') ||
      text.includes('appraisal') || text.includes('promotion') || incidentType === 'workplace'
    ) {
      const poshLaw = allLaws.find((l) => l.section.includes('POSH'));
      const sec354A = allLaws.find((l) => l.section.includes('354A'));
      if (poshLaw) matchedLaws.push(poshLaw);
      if (sec354A && !matchedLaws.includes(sec354A)) matchedLaws.push(sec354A);

      recommendedActions.push('File a formal written complaint to the Internal Complaints Committee (ICC) of the organisation within 90 days.');
      recommendedActions.push('The inquiry must be concluded within 90 days; interim relief like transfer or paid leave can be requested.');
      evidenceRequired.push('Workplace chat history (Slack/Teams/Email)', 'Performance appraisal records', 'Witness statements from coworkers');
    }

    // 2. Cyber Harassment / IT Act Checks
    if (
      text.includes('photo') || text.includes('image') || text.includes('leak') ||
      text.includes('blackmail') || text.includes('instagram') || text.includes('whatsapp') ||
      text.includes('video') || text.includes('morphed') || text.includes('online') ||
      incidentType === 'cyber'
    ) {
      const itLaw = allLaws.find((l) => l.code_type.includes('IT ACT'));
      const sec354D = allLaws.find((l) => l.section.includes('354D'));
      if (itLaw && !matchedLaws.includes(itLaw)) matchedLaws.push(itLaw);
      if (sec354D && !matchedLaws.includes(sec354D)) matchedLaws.push(sec354D);

      recommendedActions.push('Dial 1930 immediately to report cyber extortion or blackmail to the National Cybercrime Portal.');
      recommendedActions.push('Register hashes on StopNCII.org to prevent non-consensual viral dissemination across Meta/Tech platforms.');
      evidenceRequired.push('Uncropped screenshots showing exact URLs, usernames and timestamps', 'Call records and transaction demands', 'Original digital files');
    }

    // 3. Stalking & Voyeurism Checks
    if (
      text.includes('stalk') || text.includes('follow') || text.includes('camera') ||
      text.includes('restroom') || text.includes('trial room') || text.includes('recording') ||
      incidentType === 'stalking'
    ) {
      const sec354C = allLaws.find((l) => l.section.includes('354C'));
      const sec354D = allLaws.find((l) => l.section.includes('354D'));
      if (sec354C && !matchedLaws.includes(sec354C)) matchedLaws.push(sec354C);
      if (sec354D && !matchedLaws.includes(sec354D)) matchedLaws.push(sec354D);

      recommendedActions.push('Maintain an Incident Journal recording specific dates, times, vehicle registration numbers, or route patterns.');
      recommendedActions.push('Approach the local Women Police Station or Dial 1091 for immediate anti-stalking protection.');
      evidenceRequired.push('Date & time logbook', 'CCTV or device snapshots', 'Witness affirmations');
    }

    // 4. Physical Assault / Modesty Outrage Checks
    if (
      text.includes('touch') || text.includes('grop') || text.includes('force') ||
      text.includes('grab') || text.includes('disrobe') || text.includes('cloth') ||
      text.includes('attack') || text.includes('assault') || incidentType === 'physical'
    ) {
      const sec354 = allLaws.find((l) => l.section.includes('354') && !l.section.includes('354A') && !l.section.includes('354B') && !l.section.includes('354C') && !l.section.includes('354D'));
      const sec354B = allLaws.find((l) => l.section.includes('354B'));
      if (sec354 && !matchedLaws.includes(sec354)) matchedLaws.push(sec354);
      if (text.includes('disrobe') || text.includes('cloth') || text.includes('pull')) {
        if (sec354B && !matchedLaws.includes(sec354B)) matchedLaws.push(sec354B);
      }

      recommendedActions.push('You have the right to file a Zero FIR at ANY police station in India under Section 154 CrPC / BNSS.');
      recommendedActions.push('Demand immediate government Medical Examination (MLC) free of cost.');
      recommendedActions.push('Your statement must be recorded exclusively by a female police officer under Section 154(1) CrPC.');
      evidenceRequired.push('Medico-Legal Certificate (MLC)', 'Preserved physical clothing in paper bag', 'Request for nearby public/private CCTV footage');
    }

    // 5. Domestic Abuse & Marital Cruelty
    if (
      text.includes('husband') || text.includes('in-law') || text.includes('marital') ||
      text.includes('domestic') || text.includes('dowry') || text.includes('partner') ||
      incidentType === 'domestic'
    ) {
      const pwdvaLaw = allLaws.find((l) => l.code_type.includes('PWDVA'));
      if (pwdvaLaw && !matchedLaws.includes(pwdvaLaw)) matchedLaws.push(pwdvaLaw);

      recommendedActions.push('Approach District Legal Services Authority (DLSA) for 100% free advocate appointment.');
      recommendedActions.push('Apply for Residence and Protection orders under Section 18 & 19 of PWDVA to prevent eviction from shared household.');
      evidenceRequired.push('Medical treatment prescriptions', 'Stridhan / property list and bank statements', 'Call recordings / abusive message logs');
    }

    // Fallback if no specific trigger matched
    if (matchedLaws.length === 0) {
      matchedLaws.push(allLaws[0] || { section: 'BNS Sec 74 / IPC Sec 354', title: 'Assault to Outrage Modesty', punishment: '1-5 years rigorous imprisonment' });
      matchedLaws.push(allLaws[1] || { section: 'BNS Sec 75 / IPC Sec 354A', title: 'Sexual Harassment', punishment: 'Up to 3 years imprisonment' });
      recommendedActions.push('File a detailed formal complaint at your nearest Women Police Cell or Dial 181 / 112.');
      evidenceRequired.push('Timestamps, eyewitness statements, and correspondence history');
    }

    const hasNonBailableOffense = matchedLaws.some((l) => l.is_bailable === 0);

    res.json({
      success: true,
      data: {
        diagnosisSummary: `Identified ${matchedLaws.length} applicable statutory provisions under Indian Criminal & Special Acts.`,
        severityGrade: hasNonBailableOffense ? 'High / Non-Bailable Cognizable Offense' : 'Medium / Cognizable Offense',
        matchedLaws,
        recommendedActions: Array.from(new Set(recommendedActions)),
        evidenceRequired: Array.from(new Set(evidenceRequired)),
        emergencyAdvice: 'If in immediate danger, dial 112 (National Emergency) or 181 (Women Helpline) immediately.'
      }
    });
  } catch (error) {
    console.error('Error analyzing incident:', error);
    res.status(500).json({ success: false, message: 'Failed to analyze incident' });
  }
});

export default router;
