const Note = require("../models/Note");

exports.createNote = async (req,res,next)=>{
    try{
        const note = await Note.create(req.body);
        res.status(201).json(note);
    }catch(error){
      next(error);
    }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } 
  catch (error) {
    next(error);
  }
};

exports.updateNote = async(req,res)=>{
  try{
    const updateNote=await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new:true,
        runValidators:true
      }
    );
    if(!updateNote){
      return res.status(404).json({message:"Note not found"});
    }
    res.json(updateNote);
  }
  catch(error){
    next(error);
  }
};

exports.deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } 
  catch (error) {
   next(error);
  }
};