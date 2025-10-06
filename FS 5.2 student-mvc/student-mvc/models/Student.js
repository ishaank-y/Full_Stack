import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  course: String
});

export default mongoose.model("Student", studentSchema);
