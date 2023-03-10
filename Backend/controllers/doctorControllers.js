const Doctor = require("../models/doctorModel");
// const authMiddleware = require("../middlewares/authMiddleware");
// const Appointment = require("../models/appointmentModel");
// const User = require("../models/userModel");



  const getDoctorInfoById = async (req, res) => {
   try {
     const doctor = await Doctor.findOne({ userId: req.body.userId });
     res.status(200).send({
       success: true, 
       message: "Doctor info fetched successfully",
       data: doctor,
     });
   } catch (error) {
     res
       .status(500)
       .send({ message: "Error getting doctor info", success: false, error });
   }
 };


const getDoctorDetails = async (req, res) => {
  
  console.log("224466");
  try {
    const doctor = await Doctor.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: "Doctor info fetched successfully",
      data: doctor,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting doctor info", success: false, error });
  }
};


 
   const updateDoctorProfile= async (req, res) => {
     try {

        console.log("555Reached");

       const doctor = await Doctor.findOneAndUpdate(
         { userId: req.body.userId },
         req.body
       );
       res.status(200).send({
         success: true,
         message: "Doctor profile updated successfully",
         data: doctor,
       });
     } catch (error) {
       res
         .status(500)
         .send({ message: "Error getting doctor info", success: false, error });
     }
   };

 module.exports = {
  getDoctorInfoById,
  getDoctorDetails,
  updateDoctorProfile
 };
