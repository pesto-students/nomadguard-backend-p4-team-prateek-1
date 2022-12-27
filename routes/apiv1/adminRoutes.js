const express = require('express');
const router = express.Router();
const admin_controller = require('../../controllers/apiv1/adminController');

router.get('/allUsers', admin_controller.allUsers);

module.exports = router;

