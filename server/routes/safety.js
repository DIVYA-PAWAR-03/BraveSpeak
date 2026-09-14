import express from 'express';
import db from '../db.js';

const router = express.Router();

// GET /api/safety/hotspots - List all reported community safety hotspots
router.get('/hotspots', (req, res) => {
  try {
    const { city, severity, hazard_type } = req.query;
    let query = `SELECT * FROM safety_hotspots WHERE 1=1`;
    const params = [];

    if (city && city !== 'All') {
      query += ` AND city = ?`;
      params.push(city);
    }

    if (severity && severity !== 'All') {
      query += ` AND severity = ?`;
      params.push(severity);
    }

    if (hazard_type && hazard_type !== 'All') {
      query += ` AND hazard_type = ?`;
      params.push(hazard_type);
    }

    query += ` ORDER BY upvotes DESC, created_at DESC`;

    const hotspots = db.prepare(query).all(...params);
    res.json({ success: true, count: hotspots.length, data: hotspots });
  } catch (error) {
    console.error('Error fetching safety hotspots:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch safety hotspots' });
  }
});

// POST /api/safety/report-hotspot - Report a new unsafe location or hazard
router.post('/report-hotspot', (req, res) => {
  try {
    const { location_name, city, state, latitude, longitude, hazard_type, severity, description, reported_by } = req.body;

    if (!location_name || !city || !description) {
      return res.status(400).json({ success: false, message: 'Location name, city, and description are required' });
    }

    const stmt = db.prepare(`
      INSERT INTO safety_hotspots (location_name, city, state, latitude, longitude, hazard_type, severity, description, reported_by, upvotes, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, datetime('now'))
    `);

    const info = stmt.run(
      location_name.trim(),
      city.trim(),
      state ? state.trim() : 'India',
      latitude || 28.6139,
      longitude || 77.2090,
      hazard_type || 'Poor Lighting',
      severity || 'Medium',
      description.trim(),
      reported_by?.trim() || 'Anonymous Vigilant'
    );

    const hotspot = db.prepare(`SELECT * FROM safety_hotspots WHERE id = ?`).get(info.lastInsertRowid);

    res.status(201).json({
      success: true,
      message: 'Community safety hazard logged. Thank you for making public spaces safer!',
      data: hotspot
    });
  } catch (error) {
    console.error('Error reporting hotspot:', error);
    res.status(500).json({ success: false, message: 'Failed to report safety hotspot' });
  }
});

// POST /api/safety/hotspots/:id/upvote - Upvote/confirm a hotspot report
router.post('/hotspots/:id/upvote', (req, res) => {
  try {
    const id = Number(req.params.id);
    const update = db.prepare(`UPDATE safety_hotspots SET upvotes = upvotes + 1 WHERE id = ?`).run(id);

    if (update.changes === 0) {
      return res.status(404).json({ success: false, message: 'Hotspot not found' });
    }

    const hotspot = db.prepare(`SELECT id, upvotes FROM safety_hotspots WHERE id = ?`).get(id);
    res.json({ success: true, upvotes: hotspot.upvotes });
  } catch (error) {
    console.error('Error upvoting hotspot:', error);
    res.status(500).json({ success: false, message: 'Failed to upvote hotspot' });
  }
});

// GET /api/safety/statistics - Comprehensive analytics
router.get('/statistics', (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    const yearlyTrends = [
      { year: "2019", cases: 32033, convictionRate: 27.8, chargeSheetRate: 74.2 },
      { year: "2020", cases: 28046, convictionRate: 29.8, chargeSheetRate: 75.8 },
      { year: "2021", cases: 31677, convictionRate: 28.6, chargeSheetRate: 77.1 },
      { year: "2022", cases: 31516, convictionRate: 32.2, chargeSheetRate: 76.5 },
      { year: "2023", cases: 32410, convictionRate: 33.4, chargeSheetRate: 78.0 },
      { year: "2024", cases: 33150, convictionRate: 34.1, chargeSheetRate: 79.2 },
      { year: `${currentYear}`, cases: 24890, convictionRate: 35.0, chargeSheetRate: 80.5 }
    ];

    const crimeCategoryData = [
      { category: "Assault on Modesty (IPC 354 / BNS 74)", incidents: 14200, percent: "44%" },
      { category: "Workplace Harassment (POSH)", incidents: 8420, percent: "26%" },
      { category: "Cyber Stalking & Blackmail (IT Act)", incidents: 6100, percent: "19%" },
      { category: "Public Eve-Teasing & Transit (IPC 509)", incidents: 3500, percent: "11%" }
    ];

    const totalStories = db.prepare(`SELECT COUNT(*) as count FROM stories`).get().count;
    const totalCenters = db.prepare(`SELECT COUNT(*) as count FROM support_centers`).get().count;
    const totalHotspots = db.prepare(`SELECT COUNT(*) as count FROM safety_hotspots`).get().count;
    const totalSosLogged = db.prepare(`SELECT COUNT(*) as count FROM emergency_sos_logs`).get().count;

    res.json({
      success: true,
      data: {
        yearlyTrends,
        crimeCategoryData,
        platformSummary: {
          totalStories,
          totalCenters,
          totalHotspots,
          totalSosLogged
        }
      }
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch statistics' });
  }
});

export default router;
