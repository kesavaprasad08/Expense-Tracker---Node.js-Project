const Expense = require("../models/expense");

exports.getExpensePage = async(req,res,next) =>{
try{
res.sendFile('expense.html',{root:'views'})
}
catch(e){
    res.status(500).json({ error: e });
}
};

exports.addExpense = async(req,res,next) =>{
    try{
        const expAmt = req.body.amount ;
        const des = req.body.description;
        const cat = req.body.category;
        await Expense.create({
            expenseAmount:expAmt,
            description:des,
            category:cat,
        });
        return res.status(200).json({message:'Expense Added'})

    }
    catch(e){
console.log(e);
    }
};

exports.getExpense = async(req,res,next)=>{
    try{
        const expenses = await Expense.findAll();
        res.status(200).json(expenses)
    }
    catch(e){
        res.status(500).json({message:e})
    }
};

exports.deleteExpense = async(req,res,next)=>{
    try{
    const id =req.params.id;
    const del = await Expense.destroy({where:{id:id}});
    res.status(200).json({message:'deleted Successfully'})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}