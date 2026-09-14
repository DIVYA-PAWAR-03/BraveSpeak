import express from 'express';
import db from '../db.js';

const router = express.Router();

// Helper: Haversine distance in kilometers
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10; // km rounded to 1 decimal
}

// GET /api/support/centers - Filter support centers by state, city, type, or search query
router.get('/centers', (req, res) => {
  try {
    const { state, city, type, search } = req.query;
    let query = `SELECT * FROM support_centers WHERE 1=1`;
    const params = [];

    if (state && state !== 'All') {
      query += ` AND state = ?`;
      params.push(state);
    }

    if (city && city !== 'All') {
      query += ` AND city = ?`;
      params.push(city);
    }

    if (type && type !== 'All') {
      query += ` AND type = ?`;
      params.push(type);
    }

    if (search && search.trim()) {
      query += ` AND (name LIKE ? OR address LIKE ? OR city LIKE ? OR state LIKE ?)`;
      const term = `%${search.trim()}%`;
      params.push(term, term, term, term);
    }

    query += ` ORDER BY state ASC, city ASC, name ASC`;

    const centers = db.prepare(query).all(...params);
    const parsedCenters = centers.map((c) => ({
      ...c,
      services: typeof c.services === 'string' ? JSON.parse(c.services) : c.services
    }));

    res.json({ success: true, count: parsedCenters.length, data: parsedCenters });
  } catch (error) {
    console.error('Error fetching support centers:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch support centers' });
  }
});

// GET /api/support/nearby - Find nearest support centers by GPS coordinates
router.get('/nearby', (req, res) => {
  try {
    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);
    const radius = parseFloat(req.query.radius) || 50; // default 50km radius

    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({ success: false, message: 'Valid latitude and longitude are required' });
    }

    const centers = db.prepare(`SELECT * FROM support_centers WHERE latitude IS NOT NULL AND longitude IS NOT NULL`).all();

    const centersWithDistance = centers
      .map((c) => {
        const distance = calculateDistance(lat, lng, c.latitude, c.longitude);
        return {
          ...c,
          services: typeof c.services === 'string' ? JSON.parse(c.services) : c.services,
          distanceKm: distance
        };
      })
      .sort((a, b) => a.distanceKm - b.distanceKm);

    // Filter within radius if requested, or top 5 nearest
    const nearest = centersWithDistance.slice(0, 8);

    res.json({
      success: true,
      userLocation: { latitude: lat, longitude: lng },
      count: nearest.length,
      data: nearest
    });
  } catch (error) {
    console.error('Error finding nearby centers:', error);
    res.status(500).json({ success: false, message: 'Failed to calculate nearby centers' });
  }
});

export default router;
