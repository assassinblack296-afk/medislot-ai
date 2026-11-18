const fs = require('fs');
const express = require('express');
const cors = require('cors');
const path = require('path');

// Simple .env reader
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.substring(0, idx).trim();
      const val = trimmed.substring(idx + 1).trim();
      if (!process.env[key] && val) process.env[key] = val;
    }
  });
}

const apiRoutes = require('./routes');
const { initDatabase } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Config route for frontend to read public keys
app.get('/api/config', (req, res) => {
  res.json({
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || '',
    mode: (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) ? 'supabase' : 'local'
  });
});

// Serve static assets
app.use(express.static(path.join(__dirname, '..', 'public')));

// Serve prototype directory images as static fallback if referenced
app.use('/stitch-assets', express.static(path.join(__dirname, '..', 'stitch_medislot_ai_healthcare_scheduler')));

// API routes
app.use('/api', apiRoutes);

// Fallback to index.html for Single Page Application navigation
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ success: false, error: 'Internal Server Error' });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` MediSlot AI Server is running!`);
  console.log(` URL: http://localhost:${PORT}`);
  console.log(` Database: SQLite Native WAL Mode`);
  console.log(` Healthcheck: http://localhost:${PORT}/api/doctors`);
  console.log(`====================================================`);
});

module.exports = { app, server };
