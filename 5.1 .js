import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/productsDB");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String
});

const Product = mongoose.model("Product", productSchema);

app.post("/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.send(product);
});

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

app.get("/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.send(product);
});

app.put("/products/:id", async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(product);
});

app.delete("/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.send({ message: "Product deleted" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
