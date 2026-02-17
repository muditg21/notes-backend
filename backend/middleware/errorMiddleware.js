const errorhandler=(err,req,res,next)=>{
    if(err.name === "ValidationError"){
        return res.status(400).json({message:err.message});
    }
    res.status(500).json({message:"server error"})
};

module.exports=errorhandler;