const express = require("express");
const router=express.Router();
const protect = require("../middleware/authMiddleware");

const {
    createNote,
    getNotes,
    deleteNote,
    updateNote
}=require("../controller/noteController");

router.post("/",protect,createNote);
router.get("/",protect,getNotes);
router.put("/:id",protect,updateNote);
router.delete("/:id",protect,deleteNote);

module.exports = router;