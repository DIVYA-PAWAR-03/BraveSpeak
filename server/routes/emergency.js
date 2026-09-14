import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import db from '../db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Ensure evidence uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads/evidence');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || (file.mimetype.includes('audio') ? '.webm' : '.png');
    cb(null, `evidence-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 } // 25MB max
});

// POST /api/emergency/sos - Log an SOS trigger
router.post('/sos', (req, res) => {
  try {
    const { user_alias, latitude, longitude, address, message, contacts_alerted, battery_level } = req.body;

    const stmt = db.prepare(`
      INSERT INTO emergency_sos_logs (user_alias, latitude, longitude, address, message, contacts_alerted, battery_level, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'Alert Dispatched', datetime('now'))
    `);

    const info = stmt.run(
      user_alias || 'Anonymous User',
      latitude || null,
      longitude || null,
      address || 'Live GPS Coordinates Broadcast',
      message || 'EMERGENCY! I need immediate help.',
      contacts_alerted || 1,
      battery_level || 'Unknown'
    );

    const log = db.prepare(`SELECT * FROM emergency_sos_logs WHERE id = ?`).get(info.lastInsertRowid);

    res.status(201).json({
      success: true,
      message: 'Emergency SOS Broadcast recorded successfully.',
      data: log,
      actions: {
        police: '112',
        womenHelpline: '181',
        cyberCrime: '1930'
      }
    });
  } catch (error) {
    console.error('Error logging SOS trigger:', error);
    res.status(500).json({ success: false, message: 'Failed to record SOS broadcast' });
  }
});

// GET /api/emergency/sos/logs - Get SOS history
router.get('/sos/logs', (req, res) => {
  try {
    const logs = db.prepare(`SELECT * FROM emergency_sos_logs ORDER BY created_at DESC LIMIT 20`).all();
    res.json({ success: true, data: logs });
  } catch (error) {
    console.error('Error fetching SOS logs:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch SOS logs' });
  }
});

// POST /api/emergency/evidence - Upload audio or screenshot evidence
router.post('/evidence', upload.single('file'), (req, res) => {
  try {
    const { title, category, incident_date, notes } = req.body;
    const file = req.file;

    const fileName = file ? file.filename : null;
    const filePath = file ? `/uploads/evidence/${file.filename}` : null;
    const fileType = file ? file.mimetype : 'text/log';
    const fileSize = file ? file.size : 0;

    const stmt = db.prepare(`
      INSERT INTO evidence_vault (title, category, incident_date, notes, file_name, file_path, file_type, file_size, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `);

    const info = stmt.run(
      title || 'Evidence Log Item',
      category || 'Digital Evidence',
      incident_date || new Date().toISOString().split('T')[0],
      notes || '',
      fileName,
      filePath,
      fileType,
      fileSize
    );

    const evidence = db.prepare(`SELECT * FROM evidence_vault WHERE id = ?`).get(info.lastInsertRowid);

    res.status(201).json({
      success: true,
      message: 'Evidence securely vaulted with timestamp signature',
      data: evidence
    });
  } catch (error) {
    console.error('Error vaulting evidence:', error);
    res.status(500).json({ success: false, message: 'Failed to upload and secure evidence' });
  }
});

// GET /api/emergency/evidence - Get all vaulted evidence items
router.get('/evidence', (req, res) => {
  try {
    const items = db.prepare(`SELECT * FROM evidence_vault ORDER BY created_at DESC`).all();
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    console.error('Error fetching evidence:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch evidence logs' });
  }
});

// DELETE /api/emergency/evidence/:id - Delete an evidence record
router.delete('/evidence/:id', (req, res) => {
  try {
    const id = Number(req.params.id);
    const item = db.prepare(`SELECT * FROM evidence_vault WHERE id = ?`).get(id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Evidence record not found' });
    }

    if (item.file_name) {
      const fullPath = path.join(uploadsDir, item.file_name);
      if (fs.existsSync(fullPath)) {
        try {
          fs.unlinkSync(fullPath);
        } catch (e) {
          console.warn('Failed to delete file on disk:', e.message);
        }
      }
    }

    db.prepare(`DELETE FROM evidence_vault WHERE id = ?`).run(id);

    res.json({ success: true, message: 'Evidence record deleted successfully' });
  } catch (error) {
    console.error('Error deleting evidence:', error);
    res.status(500).json({ success: false, message: 'Failed to delete evidence record' });
  }
});

export default router;
