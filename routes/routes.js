const express = require('express');
const res = require('express/lib/response');
const app = express();

app.use('/apiv1/user', require('./apiv1/userRoutes'))


module.exports = app;
