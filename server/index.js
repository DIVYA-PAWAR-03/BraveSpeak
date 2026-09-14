import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import { initDatabase } from './db.js';
import storiesRoutes from './routes/stories.js';
import legalRoutes from './routes/legal.js';
import supportRoutes from './routes/support.js';
import contactRoutes from './routes/contact.js';
import emergencyRoutes from './routes/emergency.js';
import safetyRoutes from './routes/safety.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize DB schema & seeds
initDatabase();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// Static uploads serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'BraveSpeak Backend REST API'
  });
});

// API Routes
app.use('/api/stories', storiesRoutes);
app.use('/api/legal', legalRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/safety', safetyRoutes);

// Root fallback
app.get('/', (req, res) => {
  res.send('BraveSpeak Backend API is running safely.');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Unhandled Error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`========================================`);
  console.log(`🛡️  BraveSpeak API Server running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
  console.log(`========================================`);
});

export default app;
