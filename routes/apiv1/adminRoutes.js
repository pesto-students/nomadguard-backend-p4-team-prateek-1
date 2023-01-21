const express = require('express');
const router = express.Router();
const admin_controller = require('../../controllers/apiv1/adminController');
const { protect } = require("../../middleware/authMiddleware");

router.get('/allUsers', protect, admin_controller.allUsers);
router.get('/getInsuranceList', protect, admin_controller.getAllInsurance);
router.post("/approveInsurance", protect, admin_controller.approveInsurance);
router.get('/getInsuredUsers', protect, admin_controller.getInsuredUsers);
router.get('/getDashNumbers', protect, admin_controller.getDashNumbers);


module.exports = router;

