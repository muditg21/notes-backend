const { title } = require("process");
const Note = require("../models/Note");
const asyncHandler = require("../middleware/asyncHandler");

exports.createNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error("Title and content are required");
  }

  const note = await Note.create({
    title,
    content,
    user: req.user._id
  });

  res.status(201).json(note);
});


exports.getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });

  res.json(notes);
});


exports.updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to update this note");
  }

  if (req.body.title !== undefined) {
    note.title = req.body.title;
  }

  if (req.body.content !== undefined) {
    note.content = req.body.content;
  }

  const updatedNote = await note.save();

  res.json(updatedNote);
});


exports.deleteNote =asyncHandler( async (req, res) => {
   
    const note = await Note.findById(req.params.id);

    if (!note) {
      res.status(404);
      throw new Error("Note not found");
    }

    if (note.user.toString() !== req.user._id.toString()) {
       res.status(401);
       throw new Error( "Not authorized");
    }

    await note.deleteOne();

    res.json({ message: "Note deleted successfully" });
  
});