const express = require("express");
const router = express.Router();


const {
 getDoctorInfoById,
 getDoctorDetails,
 updateDoctorProfile

} = require("../controllers/doctorControllers");





router.post("/get-doctor-info-by-user-id",getDoctorInfoById);

router.post("/get-doctor-info-by-id",getDoctorDetails);

router.patch("/update-doctor-profile",updateDoctorProfile);





module.exports = router;