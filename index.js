require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const addroutes = require('./routes/addSchool');
const getroutes = require('./routes/listSchools');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use("/api", addroutes);
app.use("/api", getroutes);

// Frontend routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/addSchool', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'addSchool.html'));
});

app.get('/listSchools', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'listSchools.html'));
});

// Catch-all route
app.get('*', (req, res) => {
    res.redirect('/');
});

// Port listen
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT} port`);
});