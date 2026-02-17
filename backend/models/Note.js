const mongoose = require("mongoose");

const noteSchema= new mongoose.Schema({
    title:{
        type:String,
        required:[true,"title is required"],
        trim:true,
        minlength:[3,"title must be atleast 3 characters"]
    },
    content:{
        type:String,
        required:[true,"content is reequired"],
        trim:true,
        minlength:[5,"content must be atleast 5 characters"]
    }

}, {timestamps:true});

module.exports = mongoose.model("Note",noteSchema);