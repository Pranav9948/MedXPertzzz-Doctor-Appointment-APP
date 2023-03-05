const express = require("express");
const router = express.Router();
const authMiddleware=require('../Middleware/authmiddleware')

const {
 registration,loginDetails, getUserInfoById
} = require("../controllers/userControllers");
const authmiddleware = require("../Middleware/authmiddleware");

router.post("/register",registration)
router.post('/login',loginDetails)
router.post("/getUserInfoById",authmiddleware,getUserInfoById);
 



module.exports = router;
