const Expense = require("../models/expense");
const User = require("../models/user");
const sequelize = require("../util/database");
const AWS = require("aws-sdk");

exports.getExpensePage = async (req, res, next) => {
  try {
    res.sendFile("expense.html", { root: "views" });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

exports.addExpense = async (req, res, next) => {
  const transac = await sequelize.transaction();
  try {
    const expAmt = req.body.amount;
    const des = req.body.description;
    const cat = req.body.category;
    await Expense.create(
      {
        expenseAmount: expAmt,
        description: des,
        category: cat,
        UserId: req.user.id,
      },
      {
        transaction: transac,
      }
    );
    const user = await User.findOne({ where: { id: req.user.id } });
    // user.totalExpenses= Number(user.totalExpenses)+Number(expAmt);
    // await user.save();
    await User.update(
      { totalExpenses: Number(user.totalExpenses) + Number(expAmt) },
      { where: { id: req.user.id }, transaction: transac }
    );
    await transac.commit();

    return res.status(200).json({ message: "Expense Added" });
  } catch (e) {
    transac.rollback();
    console.log(e);
  }
};

exports.getExpense = async (req, res, next) => {
  try {
    // console.log(req.user)
    const expenses = await Expense.findAll({ where: { UserId: req.user.id } });
    const userRes = await User.findOne({ where: { id: req.user.id } });
    res.status(200).json({ expenses: expenses, user: userRes.isPremiumMember });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
};

exports.deleteExpense = async (req, res, next) => {
  const user = await User.findOne({ where: { id: req.user.id } });
  const transac = await sequelize.transaction();
  try {
    const id = req.params.id;
    const deletedExpense = await Expense.findOne({
      where: { id: id },
    });
    if (!deletedExpense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found!" });
    }
    await Expense.destroy({
      where: { id: id },
      transaction: transac,
    });
    const updatedTotalExpenses =
      Number(user.totalExpenses) -
      Number(deletedExpense.dataValues.expenseAmount);

    // console.log(deletedExpense,"user total expenses")
    await user.update(
      {
        totalExpenses: updatedTotalExpenses,
      },
      { where: { id: req.user.id }, transaction: transac }
    );
    await transac.commit();

    res.status(200).json({ message: "deleted Successfully" });
  } catch (err) {
    await transac.rollback();
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const uploadToS3 = async (data, fileName) => {
  const BUCKET_NAME = "expensetracker456";
  const IAM_USER_KEY_ = "AKIA6GBMEIKIWRXQIVVP";
  const IAM_USER_SECRET = "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";

  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY_,
    secretAccessKey: IAM_USER_SECRET,
  });

  var params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: data,
    ACL: "public-read",
  };
  return new Promise((resolve, reject) => {
    s3bucket.upload(params, (err, s3response) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        // console.log("success", s3response);
        resolve(s3response.Location);
      }
    });
  });
};

exports.downloadExpense = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    if(!user.isPremiumMember){
      throw new Error('Not a Premium User');
    }
    else{
    const expenses = await Expense.findAll({ where: { UserId: userId } });
    const stringifiedExpenses = JSON.stringify(expenses);
    const fileName = `Expenses${userId}/${new Date()}.txt`;
    const fileURL = await uploadToS3(stringifiedExpenses, fileName);
    res.status(200).json({ fileURL });
    }
  } catch (err) {
    // console.log(err)
    return res.status(500).json({fileUrl:'',success:false,err:err})
  }
};
