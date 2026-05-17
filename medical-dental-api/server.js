// server.js — Main entry point

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ─── Middleware ───────────────────────────
app.use(cors());                        // Allow frontend to call this API
app.use(express.json());                // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));

// ─── Routes ──────────────────────────────
const patientRoutes = require("./routes/patientRoutes");
app.use("/api/patients", patientRoutes);

// ─── Root health check ────────────────────
app.get("/", (req, res) => {
  res.json({
    message: "🏥 Medical & Dental Information System API",
    status: "Running",
    endpoints: {
      "GET    /api/patients":       "Get all patients",
      "GET    /api/patients/:id":   "Get a single patient",
      "POST   /api/patients":       "Create a new patient",
      "PUT    /api/patients/:id":   "Update a patient",
      "DELETE /api/patients/:id":   "Delete a patient",
    },
  });
});

// ─── 404 Handler ─────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ─── Start Server ─────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
