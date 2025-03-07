require('dotenv').config();
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const db=require('./db');
const addroutes=require('./routes/addSchool');
const getroutes=require('./routes/listSchools');
const app=express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", addroutes);
app.use("/api", getroutes);
//middleware



// port listen
app.listen(8000,()=>{
    console.log('server running on 8000 port');
})