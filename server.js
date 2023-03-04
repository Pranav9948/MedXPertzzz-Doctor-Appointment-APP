const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const dbConfig = require("./Backend/config/dbConfig");
app.use(express.json());


app.use(
  cors({
    origin: "*",
  })
);


// const userRoute = require("./routes/userRoute");
// const adminRoute = require("./routes/adminRoute");
// const doctorRoute = require("./routes/doctorsRoute");
// const path = require("path");

// app.use("/api/user", userRoute);
// app.use("/api/admin", adminRoute);
// app.use("/api/doctor", doctorRoute);




const port = process.env.PORT || 5000;







app.listen(port, () => console.log(`Node Express Server Started at ${port}!`));
