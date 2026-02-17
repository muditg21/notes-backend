const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
require("dotenv").config();

const notesRoutes=require("./routes/noteRoutes");
const userRoutes=require("./routes/userRoutes");
const errorhandler=require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/notes",notesRoutes);
app.use("/api/user",userRoutes);
app.use("/api/errorhandler",errorhandler);

mongoose.connect(process.env.MONGO_URI)
     .then(()=>console.log("MongoDB connected"))
     .catch(err=>console.log(err));


app.listen(5000,()=>console.log("server running on port 5000"));
