import express from 'express';
import crypto from 'crypto';
import db from '../db.js';

const router = express.Router();

// POST /api/contact - Submit confidential contact or case inquiry
router.post('/', (req, res) => {
  try {
    const { name, email, phone, category, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({ success: false, message: 'Name/Alias and Message are required' });
    }

    const refId = `BS-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;

    const stmt = db.prepare(`
      INSERT INTO contact_inquiries (ref_id, name, email, phone, category, message, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, 'Received', datetime('now'))
    `);

    stmt.run(
      refId,
      name.trim(),
      email ? email.trim() : null,
      phone ? phone.trim() : null,
      category || 'General Support',
      message.trim()
    );

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been submitted securely and confidentially.',
      refId,
      status: 'Received',
      advice: 'Please save your Case Reference ID. You can check your inquiry status at any time without disclosing your identity.'
    });
  } catch (error) {
    console.error('Error saving contact inquiry:', error);
    res.status(500).json({ success: false, message: 'Failed to process inquiry' });
  }
});

// GET /api/contact/status/:refId - Check confidential status of inquiry
router.get('/status/:refId', (req, res) => {
  try {
    const refId = req.params.refId.trim().toUpperCase();
    const inquiry = db.prepare(`
      SELECT ref_id, category, status, admin_note, created_at 
      FROM contact_inquiries 
      WHERE ref_id = ?
    `).get(refId);

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Reference ID not found. Please check and try again.' });
    }

    res.json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    console.error('Error fetching inquiry status:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve inquiry status' });
  }
});

export default router;
