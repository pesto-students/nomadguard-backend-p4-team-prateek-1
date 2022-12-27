const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 8080;
const connectDB = require('./config/db');
const path = require('path');
const app = express();

//database connect
connectDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.listen(port, () => console.log('BackEnd Server Is On=', port));
