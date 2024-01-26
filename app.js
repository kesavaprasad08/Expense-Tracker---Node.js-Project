const express = require("express");

// const bodyParser = require("body-parser");

// const cors = require("cors");

const homePage = require("./routes/home");

// const sequelize = require("./util/database");

const app = express();

// const attendanceRoutes = require("./routes/attendance");

// const Attendance = require('./models/attendance');
// const Students = require('./models/students');

// app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.use(cors());

app.use(express.static("public"));
// app.use("/attendance", attendanceRoutes);
app.use(homePage);

// Students.hasMany(Attendance);
// Attendance.belongsTo(Students);

// sequelize
//   .sync({ force: false })
//   .then(() => {
    app.listen(3000);
//   })
//   .catch((e) => console.log(e));