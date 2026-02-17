const User = require("../models/user");

exports.userRegister = async(req,res,next)=>{
    try{
        const {name,email,password}= req.body;

        const userExists = await User.findOne({email});

        if(userExists){
            return res.status(400).json({message:"user exists"});
        }
        const user=await User.create({
            name,
            email,
            password
        });
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email
        });
    }
    catch(error){
        next(error);
    }
} ;