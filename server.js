process.env.NODE_ENV = 'production';
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 8080;
const connectDB = require('./config/db');
const path = require('path');
const app = express();

// cron
// console.log("devvvvv")
// const cron_jobs = require("./cron_job");
// cron_jobs.startJobs();

//database connect
connectDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// routes
app.use('/api', require('./routes/routes'));

// app.use(express.static('https://nomadguard.netlify.app'));


// Serve frontend
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "client/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, "client", "build", "index.html")
//     )
//   );
// } else {
//   app.get("/", (req, res) => res.send("Please set to production"));
// }

app.listen(port, () => console.log('BackEnd Server Is On=', port));
