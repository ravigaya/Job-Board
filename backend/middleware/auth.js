const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const User = require('../schema/user');

const authMiddleware = async(req,res,next) =>{

    try{ 
        const token = req.header("auth-token");
        
        if(token){
                const verified = jwt.verify(token,process.env.TOKEN_SECRET)
                if(verified){
                    const user = await User.findOne({_id:verified._id})  //Does this token belong to a user body
                    if(user){
                        req.user = user;
                        next();
                    }
                    else{
                        res.status(401).send("Access Denied")
                    }
                }
        }else{
            res.status(401).send("Acces Denied")
        }
    }
    catch(err){
            next(err)
    }
    
}

module.exports = authMiddleware;