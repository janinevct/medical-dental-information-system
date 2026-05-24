// server.js — Main entry point

const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Routes ──────────────────────────────
const patientRoutes = require('./routes/patientRoutes');
const otherRoutes   = require('./routes/otherRoutes');

app.use('/api/patients', patientRoutes);
app.use('/api',          otherRoutes);

// ─── Root health check ────────────────────
app.get('/', (req, res) => {
  res.json({
    message: '🏥 Medical & Dental Information System API',
    status: 'Running',
    endpoints: {
      'GET    /api/patients':          'Get all patients',
      'POST   /api/patients':          'Create a patient',
      'PUT    /api/patients/:id':      'Update a patient',
      'DELETE /api/patients/:id':      'Delete a patient',
      'GET    /api/appointments':      'Get all appointments',
      'GET    /api/visits':            'Get all visits',
      'GET    /api/history':           'Get patient history',
      'GET    /api/services':          'Get all services',
      'GET    /api/dental':            'Get dental records',
      'GET    /api/medical':           'Get medical records',
      'GET    /api/patient-services':  'Get patient services',
    },
  });
});

// ─── 404 Handler ─────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Start Server ─────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
