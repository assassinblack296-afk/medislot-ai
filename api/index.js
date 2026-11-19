const path = require('path');
const express = require('express');
const cors = require('cors');

// Ensure database handles serverless /tmp path
process.env.VERCEL = '1';

const apiRoutes = require('../server/routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Config endpoint returning Supabase credentials
app.get('/api/config', (req, res) => {
  const rawKey = process.env.SUPABASE_ANON_KEY || 'sb_publishable_p4sz-WuWH9kqHYaKT-03gw_1CnDmtYJ';
  const cleanKey = rawKey.split('\n')[0].trim();
  const rawUrl = process.env.SUPABASE_URL || 'https://ktijkefbnjbhphfelwvd.supabase.co';
  const cleanUrl = rawUrl.split('\n')[0].trim();

  res.json({
    supabaseUrl: cleanUrl,
    supabaseAnonKey: cleanKey,
    mode: 'supabase'
  });
});

// Mount REST API routes at root for /api rewrite compatibility
app.use('/api', apiRoutes);
app.use('/', apiRoutes);

module.exports = app;
