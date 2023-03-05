const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

const dbConfig = require("./Backend/config/dbConfig");
app.use(express.json());

const {
  notFound,
  errorHandler,
} = require("./Backend/Middleware/errorHandlingMiddleware");

app.use(
  cors({
    origin: "*",
  })
);

const userRoute = require("./Backend/routes/userRoute");
// const adminRoute = require("./routes/adminRoute");
// const doctorRoute = require("./routes/doctorsRoute");
// const path = require("path");

app.use("/api/users", userRoute);
// app.use("/api/admin", adminRoute);
// app.use("/api/doctor", doctorRoute);

app.get("/", function (req, res) {
  res.json({
    name: "pranav",
  });
});

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Node Express Server Started at ${port}!`));
