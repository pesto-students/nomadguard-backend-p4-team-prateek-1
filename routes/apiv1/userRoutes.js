const express = require("express");
const router = express.Router();
const user_controller = require("../../controllers/apiv1/userController");
const { protect } = require("../../middleware/authMiddleware");


router.post("/register", user_controller.registerUser);
router.post("/login", user_controller.loginUser);

router.post("/generateOTP", user_controller.generateOTP);
router.get("/me", protect, user_controller.getMe);



module.exports = router;
