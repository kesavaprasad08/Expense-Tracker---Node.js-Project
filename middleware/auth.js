const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate =(req,res,next)=>{
    // console.log('headers',req.headers.authorization)
    // const token =req.header('Authentication');
    const token = req.headers.authorization;
    // console.log('header tokeeeeeeeeeeeen',token)
    const user = jwt.verify(token,'abc');
    // console.log(user.userId,'dawwwwww')
    User.findByPk(user.userId).then(ur =>{
        // console.log(ur,'aaaaaaaaaaaaaaaaaaa')
        req.user =ur;
        // console.log(req.user.id,'adwwww')
        next();
    }).catch(err =>{
        throw new Error(err)
    })
    .catch(err =>{
        return res.status(401).json({success:false})
    })

}

module.exports = { authenticate
};