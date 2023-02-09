process.env.NODE_ENV = 'production';
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 8080;
const connectDB = require('./config/db');
const path = require('path');
const app = express();


connectDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// routes
app.use('/api', require('./routes/routes'));

// Serve frontend
//  "SERVER_URL": "https://nomadguard.onrender.com",
app.use(express.static('https://nomadguard.netlify.app'));

app.listen(port, () => console.log('BackEnd Server Is On=', port));
