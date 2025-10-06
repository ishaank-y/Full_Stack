import mongoose from "mongoose";
import Product from "../models/Product.js";
mongoose.connect("mongodb://127.0.0.1:27017/ecommerceCatalog");
const docs = [
  {
    title: "Cotton T-Shirt",
    slug: "cotton-tshirt",
    description: "Soft cotton tee",
    categories: [{ id: null, name: "Apparel", slug: "apparel" }],
    tags: ["tshirt","cotton"],
    price: { amount: 19.99, currency: "USD" },
    inventory: { totalQuantity: 100 },
    variants: [
      { title:"Blue / M", sku:"TS-BL-M", attributes:[{name:"color",value:"blue"},{name:"size",value:"M"}], price:{amount:19.99} }
    ]
  },
  {
    title: "Running Shoes",
    slug: "running-shoes",
    description: "Lightweight running shoes",
    categories: [{ id: null, name: "Footwear", slug: "footwear" }],
    tags: ["shoes","running"],
    price: { amount: 79.99, currency: "USD" },
    inventory: { totalQuantity: 50 }
  }
];
await Product.deleteMany({});
await Product.insertMany(docs);
console.log("seeded");
process.exit(0);