const User = require('../models/user');


exports.addUser = async(req,res,next)=>{
    try{
        const name= req.body.name;
        const email= req.body.email;
        const password=req.body.password;
        const check = await User.findAll({
            attributes:['Name','Email','Password'],
            where:{
                Email:email,
            }
        });
        if(check.length === 0){
        const response = await User.create({
            Name:name,
            Email:email,
            Password:password,
        })
        res.status(200).json({message:'User Added'})
    }else{
        res.status(403).json({message:'User Already Exist'})
    }
    }
    catch(e){
        console.log(e);
    }
}