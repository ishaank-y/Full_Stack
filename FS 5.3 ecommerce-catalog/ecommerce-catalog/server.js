import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import catalogRoutes from "./routes/catalogRoutes.js";
const app = express();
app.use(bodyParser.json());
mongoose.connect("mongodb://127.0.0.1:27017/ecommerceCatalog");
app.use("/api/catalog", catalogRoutes);
app.listen(3000, () => console.log("Server running on port 3000"));