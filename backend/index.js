const express = require('express');
const mongoose = require('mongoose');
const cors =  require('cors');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(cookieParser());

const corsOptions = {
    // origin: 'http://:5173', 
    // 'access-control-allow-origin': true,
    // origin: 'http://10.10.234.179:5173',
    origin: 'http://127.0.0.1:5173',
    methods: 'GET,POST,PUT,DELETE', 
    credentials: true,
    // 'Access-Control-Allow-Credentials':true
    // allowedHeaders: 'Content-Type'
  };
  
app.use(cors(corsOptions));


mongoose.connect(process.env.MONGO_URI);

// check if connection is successfull
const db = mongoose.connection;
db.on("error",(error)=>{console.error(error)});
db.once("open",()=>{console.log("database connected")});

// middleware to parse json data
app.use(express.json());


// app.get("/",(req,res)=>{
//     res.send("Hello World");
// })

app.listen(PORT,()=>{
    console.log(`listening to port ${PORT}`);
})

const userRoutes = require('./routes/courseRoute');
app.use('/',userRoutes);