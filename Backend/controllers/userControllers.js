const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctorModel");



// const protect = require("../middleware/authMiddleware");
// const Doctors = require("../models/doctorModel");
// const Appointments = require("../models/appointmentModel");
;

const registration = async (req, res) => {
  try {
    console.log("entered...");
    const userExist = await Users.findOne({ email: req.body.email });

    if (userExist) {
      res.status(200).send({ message: "User Already Exist", success: false });
    } else {
      const { password } = req.body;
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPassword = await bcrypt.hashSync(password, salt);

      req.body.password = hashPassword;

      const newUser = await new Users(req.body);

      const createdUser = await newUser.save();

      if (createdUser) {
        res
          .status(200)
          .send({ message: "user created successfully...", success: true });
      } else {
        res
          .status(200)
          .send({ message: "user creation failed", success: false });
      }
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "something went wrong", success: false, err });
  }
};

const loginDetails=async(req,res)=>{

try {

    console.log("s reachedd...");

    const { email, password } = req.body;

    const User = await Users.findOne({ email: email });

    console.log("mm", User);

    if (!User) {
      res.status(200).send({ message: " incorrect email", success: false });
    } else {
      const isMatch = await bcrypt.compare(password, User.password);

      if (!isMatch) {
        res.status(200).send({ message: "password misMatch", success: false });
      } else if (User.isBlocked === true) {
        res.status(200).send({ message: "user Blocked...", success: false });
      } else {
        console.log("234", process.env.JWT_SECRET_KEY);

        const token = jwt.sign({ userId: User._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: "2D",
        });

        res
          .status(200)
          .send({ message: "login successfull", success: true, token, User });
      }
    }
  } catch (err) {

    console.log("2222",err);

    res
      .status(500)
      .send({ message: "login failed", success: false,err});

 

}


}
  
  const getUserInfoById=async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting user info", success: false, error });
  }
}

const applyForDoctorAccount= async (req, res) => {
  try {
    const newdoctor = new Doctor({ ...req.body, status: "pending" });
    await newdoctor.save();
    const adminUser = await Users.findOne({ isAdmin: true });

    const unseenNotifications = adminUser.unseenNotifications;
    unseenNotifications.push({
      type: "new-doctor-request",
      message: `${newdoctor.firstName} ${newdoctor.lastName} has applied for a doctor account`,
      data: {
        doctorId: newdoctor._id,
        name: newdoctor.firstName + " " + newdoctor.lastName,
      },
      onClickPath: "/admin/doctorslist",
    });
    await Users.findByIdAndUpdate(adminUser._id, { unseenNotifications });
    res.status(200).send({
      success: true,
      message: "Doctor account applied successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
}



const markAllAsSeen=async (req, res) => {
    try {

      console.log("22222reached");

      const user = await Users.findOne({ _id: req.body.userId });
      const unseenNotifications = user.unseenNotifications;
      const seenNotifications = user.seenNotifications;
      seenNotifications.push(...unseenNotifications);
      user.unseenNotifications = [];
      user.seenNotifications = seenNotifications;
      const updatedUser = await user.save();
      updatedUser.password = undefined;
      res.status(200).send({
        success: true,
        message: "All notifications marked as seen",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error applying doctor account",
        success: false,
        error,
      });
    }
  }


const deleteAllNotifications = async (req, res) => {
  try {
    console.log("4444helloreached");
    const user = await Users.findOne({ _id: req.body.userId });
    user.seenNotifications = [];
    user.unseenNotifications = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "All notifications cleared",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
};



 const getApprovedDoctorsList=async (req, res) => {


  try {
             

    const getApprovedDoctors = await Doctor.find({ status: "Approved" });

    console.log("8777", getApprovedDoctors);

    res.status(200).send({
      message: "fetching doctor details successfull",
      success: true,
      getApprovedDoctors,
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "cannot fetch approved doctors", success: false, err });
  }
};









    

module.exports = {
  registration,
  loginDetails,
  getUserInfoById,
  applyForDoctorAccount,
  markAllAsSeen,
  deleteAllNotifications,
  getApprovedDoctorsList,
};










