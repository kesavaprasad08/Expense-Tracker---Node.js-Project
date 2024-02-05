const express = require("express");

require('dotenv').config();

const bodyParser = require("body-parser");

const cors = require("cors");

const homePage = require("./routes/home");

const sequelize = require("./util/database");

const app = express();

const userRoutes = require("./routes/user");
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes =require('./routes/premium');

const User = require("./models/user");
const Expense = require("./models/expense");

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(express.static("public"));
app.use("/user", userRoutes);
app.use('/expense', expenseRoutes);
app.use('/purchase', purchaseRoutes)
app.use('/premium',premiumRoutes)
app.use(homePage);

User.hasMany(Expense);
Expense.belongsTo(User);
sequelize
  .sync({ force: true })
  .then(() => {
    app.listen(3000);
  })
  .catch((e) => console.log(e));
