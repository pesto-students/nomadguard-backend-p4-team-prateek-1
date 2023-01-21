const express = require('express');
const res = require('express/lib/response');
const app = express();

app.use('/apiv1/user', require('./apiv1/userRoutes'))
app.use('/apiv1/admin', require('./apiv1/adminRoutes'))


module.exports = app;
