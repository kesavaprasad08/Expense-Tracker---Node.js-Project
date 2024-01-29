const User = require('../models/user');

exports.getLoginPage = async(req,res,next)=>{
    try {
        res.sendFile("login.html", { root: "views" });
      } catch (e) {
        res.status(500).json({ error: e });
      }
}


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

exports.loginUser = async(req,res,next)=>{
    try{
    const email = req.body.email;
    const password = req.body.password;

    const check = await User.findAll({
        attributes:['Name','Email','Password'],
        where:{
            Email:email,
        }
    });
    
    if(check.length !== 0){
        if(check[0].dataValues.Password === password){
        res.status(200).json({message:'user found'})
        }else{
            res.status(401).json({message:'User not authorized'})
        }
        
   
    }else{
        res.status(404).json({message:'User not found'})
    }

}
catch(e){
    console.log(e)
}
}