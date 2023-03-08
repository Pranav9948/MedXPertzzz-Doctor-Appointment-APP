const express = require("express");
const router = express.Router();
const authMiddleware=require('../Middleware/authmiddleware')

const {
  registration,
  loginDetails,
  getUserInfoById,
  applyForDoctorAccount,
  markAllAsSeen,
  deleteAllNotifications,
  getApprovedDoctorsList,
} = require("../controllers/userControllers");

const authmiddleware = require("../Middleware/authmiddleware");

router.post("/register",registration)
router.post('/login',loginDetails)
router.post("/getUserInfoById",authmiddleware,getUserInfoById);
 
router.post("/apply-doctor-account", authMiddleware, applyForDoctorAccount);

router.post("/mark-all-notifications-as-seen",authMiddleware,markAllAsSeen);
  
router.post("/delete-all-notifications", authMiddleware,deleteAllNotifications);

router.get("/getAllApprovedDoctors", getApprovedDoctorsList)


module.exports = router;
