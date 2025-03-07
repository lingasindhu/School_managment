const express = require('express');
const router = express.Router();
const db = require('../db'); // Import database connection

// ✅ GET API - Get list of schools sorted by distance
router.get("/listSchools", (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: "Latitude and Longitude are required" });
    }

    const query = `
        SELECT id, name, address, latitude, longitude,
        (6371 * acos(cos(radians(?)) * cos(radians(latitude)) 
        * cos(radians(longitude) - radians(?)) + sin(radians(?)) 
        * sin(radians(latitude)))) AS distance 
        FROM schools 
        ORDER BY distance ASC;
    `;

    db.query(query, [latitude, longitude, latitude], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(200).json({ schools: results });
    });
});

module.exports = router;
