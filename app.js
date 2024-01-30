const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const homePage = require("./routes/home");

const sequelize = require("./util/database");

const app = express();
const userRoutes = require("./routes/user");
const expenseRoutes = require('./routes/expense');

const User = require("./models/user");
const Expense = require("./models/expense");

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(express.static("public"));
app.use("/user", userRoutes);
app.use('/expense', expenseRoutes);
app.use(homePage);

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(3000);
  })
  .catch((e) => console.log(e));
