import Student from "../models/Student.js";

export const createStudent = async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.send(student);
};

export const getStudents = async (req, res) => {
  const students = await Student.find();
  res.send(students);
};

export const getStudentById = async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.send(student);
};

export const updateStudent = async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(student);
};

export const deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.send({ message: "Student deleted" });
};
