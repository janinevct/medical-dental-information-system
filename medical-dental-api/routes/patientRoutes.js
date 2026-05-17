// routes/patientRoutes.js

const express = require("express");
const router = express.Router();
const {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
} = require("../controllers/patientController");

// GET    /api/patients         → get all patients
// POST   /api/patients         → create a patient
router.route("/").get(getAllPatients).post(createPatient);

// GET    /api/patients/:id     → get one patient
// PUT    /api/patients/:id     → update a patient
// DELETE /api/patients/:id     → delete a patient
router.route("/:id").get(getPatientById).put(updatePatient).delete(deletePatient);

module.exports = router;
