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
  const rawUrl = process.env.SUPABASE_URL || '';
  const rawKey = process.env.SUPABASE_ANON_KEY || '';
  const cleanUrl = rawUrl.split('\n')[0].trim();
  const cleanKey = rawKey.split('\n')[0].trim();

  res.json({
    supabaseUrl: cleanUrl,
    supabaseAnonKey: cleanKey,
    mode: (cleanUrl && cleanKey) ? 'supabase' : 'local'
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
    // Any unmatched /api/* route → return JSON 404, never HTML
    return res.status(404).json({ success: false, error: `API route not found: ${req.method} ${req.path}` });
  }
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Global error handler (also ensures JSON for /api errors)
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
