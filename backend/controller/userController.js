const User = require("../models/user");

const jwt=require("jsonwebtoken");

const generateToken = (userId)=>{
    return jwt.sign(
        {id: userId},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    );
};

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

exports.userLogin = async(req,res,next)=>{
  try{
    const{email,password}=req.body;

    const user = await User.findOne({email});

    if(!user){
        return res.status(400).json({message : "invalid creds"});
    }
    
    const isMatch = await user.matchPassword(password);

    if(!isMatch){
        return res.status(400).json({message:"incorrect password"});
    }

    res.json({
        _id:user._id,
        name:user.name,
        email:user.email,
        token:generateToken(user._id)
    });
  }
  catch(error){
    next(error);
  }
};