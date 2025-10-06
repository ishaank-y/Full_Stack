import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();
app.use(bodyParser.json());
mongoose.connect("mongodb://127.0.0.1:27017/studentDB");

app.use("/students", studentRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
