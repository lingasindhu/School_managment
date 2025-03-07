const express=require('express');
const router=express.Router();
const db=require('../db');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

router.post("/addSchool",(req,res)=>{
    console.log(req.body);
    const {name,address,latitude,longitude}=req.body;
   
    if ( !name || !address || !latitude || !longitude) {
        return res.status(400).json({ error: "All fields are required" });
      }
      const query = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
      db.query(query, [name, address, latitude, longitude], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "School added successfully!", id: result.insertId });
      });
})

module.exports=router; 