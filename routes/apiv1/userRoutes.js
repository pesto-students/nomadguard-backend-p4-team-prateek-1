const express = require("express");
const router = express.Router();
const user_controller = require("../../controllers/apiv1/userController");
const { protect } = require("../../middleware/authMiddleware");


router.post("/register", user_controller.registerUser);
router.post("/login", user_controller.loginUser);
router.post("/updateProfile", user_controller.updateProfile);

router.post("/generateOTP", user_controller.generateOTP);
router.get("/me", protect, user_controller.getMe);


router.get("/getCountries", user_controller.getCountries);
router.get("/getStates", user_controller.getStates);
router.get("/getCities", user_controller.getCities);


router.get("/getMyInsurance", protect, user_controller.getMyInsurance);

router.post("/updateInsurance", protect, user_controller.updateInsurance);




module.exports = router;
