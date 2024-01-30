const express = require("express");

const router = express.Router();

const expenseController = require("../controllers/expenseController");

router.get("/", expenseController.getExpensePage);

router.post('/add-expense',expenseController.addExpense)

router.get('/get-expense',expenseController.getExpense)

module.exports = router;
