exports.addUser = async(req,res,next)=>{
    try{
        const name= req.body.name;
        const email= req.body.email;
        const password=req.body.password;
        res.json({name,email,password})
    }
    catch(e){
        console.log(e);
    }
}