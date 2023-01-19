const express = require('express');
const router = express.Router();
const admin_controller = require('../../controllers/apiv1/adminController');

router.get('/allUsers', admin_controller.allUsers);
router.get('/getInsuranceList', admin_controller.getAllInsurance);
router.post("/approveInsurance", admin_controller.approveInsurance);
router.get('/getInsuredUsers', admin_controller.getInsuredUsers);




module.exports = router;

