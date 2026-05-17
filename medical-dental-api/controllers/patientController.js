// controllers/patientController.js
// Handles all logic for the patient table

const db = require("../config/db");

// ─────────────────────────────────────────
// GET /patients — Get all patients
// ─────────────────────────────────────────
const getAllPatients = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM patient ORDER BY PatientID ASC");
    res.status(200).json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// GET /patients/:id — Get single patient
// ─────────────────────────────────────────
const getPatientById = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM patient WHERE PatientID = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }

    res.status(200).json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// POST /patients — Create a new patient
// ─────────────────────────────────────────
const createPatient = async (req, res) => {
  const { FirstName, LastName, Gender, Address, ContactNumber } = req.body;

  // Validation
  if (!FirstName || !LastName) {
    return res.status(400).json({
      success: false,
      message: "FirstName and LastName are required",
    });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO patient (FirstName, LastName, Gender, Address, ContactNumber)
       VALUES (?, ?, ?, ?, ?)`,
      [FirstName, LastName, Gender, Address, ContactNumber]
    );

    res.status(201).json({
      success: true,
      message: "Patient created successfully",
      data: { PatientID: result.insertId, FirstName, LastName, Gender, Address, ContactNumber },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// PUT /patients/:id — Update a patient
// ─────────────────────────────────────────
const updatePatient = async (req, res) => {
  const { FirstName, LastName, Gender, Address, ContactNumber } = req.body;

  try {
    // Check if patient exists first
    const [existing] = await db.query(
      "SELECT * FROM patient WHERE PatientID = ?",
      [req.params.id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }

    await db.query(
      `UPDATE patient
       SET FirstName = ?, LastName = ?, Gender = ?, Address = ?, ContactNumber = ?
       WHERE PatientID = ?`,
      [FirstName, LastName, Gender, Address, ContactNumber, req.params.id]
    );

    res.status(200).json({
      success: true,
      message: "Patient updated successfully",
      data: { PatientID: parseInt(req.params.id), FirstName, LastName, Gender, Address, ContactNumber },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// DELETE /patients/:id — Delete a patient
// ─────────────────────────────────────────
const deletePatient = async (req, res) => {
  try {
    const [existing] = await db.query(
      "SELECT * FROM patient WHERE PatientID = ?",
      [req.params.id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }

    await db.query("DELETE FROM patient WHERE PatientID = ?", [req.params.id]);

    res.status(200).json({
      success: true,
      message: `Patient ID ${req.params.id} deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
};
