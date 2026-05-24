// routes/otherRoutes.js
// Read-only routes for all other tables

const express = require('express');
const router  = express.Router();
const db      = require('../config/db');

// Helper to send results
const sendResult = async (res, query, params = []) => {
  try {
    const [rows] = await db.query(query, params);
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/appointments — join with patient name
router.get('/appointments', (req, res) =>
  sendResult(res, `
    SELECT a.*, CONCAT(p.FirstName, ' ', p.LastName) AS PatientName
    FROM appointment a
    LEFT JOIN patient p ON a.PatientID = p.PatientID
    ORDER BY a.AppointmentDate ASC
  `)
);

// GET /api/visits
router.get('/visits', (req, res) =>
  sendResult(res, `
    SELECT v.*, CONCAT(p.FirstName, ' ', p.LastName) AS PatientName
    FROM visit v
    LEFT JOIN patient p ON v.PatientID = p.PatientID
    ORDER BY v.VisitDate DESC
  `)
);

// GET /api/history
router.get('/history', (req, res) =>
  sendResult(res, `
    SELECT ph.*, CONCAT(p.FirstName, ' ', p.LastName) AS PatientName
    FROM patient_history ph
    LEFT JOIN patient p ON ph.PatientID = p.PatientID
    ORDER BY ph.DateRecorded DESC
  `)
);

// GET /api/services
router.get('/services', (req, res) =>
  sendResult(res, 'SELECT * FROM services ORDER BY ServiceID ASC')
);

// GET /api/dental
router.get('/dental', (req, res) =>
  sendResult(res, 'SELECT * FROM dental ORDER BY ServiceID ASC')
);

// GET /api/medical
router.get('/medical', (req, res) =>
  sendResult(res, 'SELECT * FROM medical ORDER BY ServiceID ASC')
);

// GET /api/patient-services — join patient and service names
router.get('/patient-services', (req, res) =>
  sendResult(res, `
    SELECT ps.*,
      CONCAT(p.FirstName, ' ', p.LastName) AS PatientName,
      s.ServiceName
    FROM patient_services ps
    LEFT JOIN patient  p ON ps.PatientID  = p.PatientID
    LEFT JOIN services s ON ps.ServiceID  = s.ServiceID
    ORDER BY ps.DateAvailed DESC
  `)
);

module.exports = router;
