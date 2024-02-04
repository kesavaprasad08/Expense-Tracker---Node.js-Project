const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate =(req,res,next)=>{
    // console.log('here')
    const token = req.headers.authorization;
    const user = jwt.verify(token,'abc');
    User.findByPk(user.userId).then(ur =>{
        // console.log(user,'urrrrr')
        req.user =ur;
        next();
    }).catch(err =>{
        throw new Error(err)
    })
    .catch(err =>{
        console.log(err)
        return res.status(401).json({success:false})
    })

}

module.exports = { authenticate
};