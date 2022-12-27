const express = require("express");
const router = express.Router();
const user_controller = require("../../controllers/apiv1/userController");


router.post("/register", user_controller.registerUser);
router.post("/login", user_controller.loginUser);

router.post("/generateOTP", user_controller.generateOTP);



module.exports = router;
