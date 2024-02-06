const express = require("express");

require("dotenv").config();

const bodyParser = require("body-parser");

const cors = require("cors");

const homePage = require("./routes/home");

const sequelize = require("./util/database");

const app = express();

const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");
const purchaseRoutes = require("./routes/purchase");
const premiumRoutes = require("./routes/premium");
const passwordRoutes = require("./routes/password");

const User = require("./models/user");
const Expense = require("./models/expense");
const ForgotPassword = require("./models/forgotPasswordRequests");

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(express.static("public"));
app.use("/user", userRoutes);
app.use("/expense", expenseRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/premium", premiumRoutes);
app.use("/password", passwordRoutes);
app.use(homePage);

User.hasMany(Expense);
Expense.belongsTo(User);
sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(3000);
  })
  .catch((e) => console.log(e));
