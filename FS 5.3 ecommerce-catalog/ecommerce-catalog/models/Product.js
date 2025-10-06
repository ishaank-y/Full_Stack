import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  url: String,
  alt: String,
  order: Number
}, { _id: false });

const PriceSchema = new mongoose.Schema({
  amount: Number,
  currency: { type: String, default: "USD" },
  effectiveFrom: { type: Date, default: Date.now }
}, { _id: false });

const InventorySchema = new mongoose.Schema({
  sku: String,
  quantity: Number,
  warehouse: String
}, { _id: false });

const AttributeSchema = new mongoose.Schema({
  name: String,
  value: String
}, { _id: false });

const VariantSchema = new mongoose.Schema({
  title: String,
  sku: String,
  attributes: [AttributeSchema],
  price: PriceSchema,
  inventory: InventorySchema,
  images: [ImageSchema]
}, { _id: true });

const ReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: Number,
  title: String,
  body: String,
  createdAt: { type: Date, default: Date.now }
}, { timestamps: false });

const CategoryRefSchema = new mongoose.Schema({
  _id: false,
  id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  name: String,
  slug: String
}, { _id: false });

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  shortDescription: String,
  categories: [CategoryRefSchema],
  tags: [String],
  brand: { id: mongoose.Schema.Types.ObjectId, name: String },
  attributes: [AttributeSchema],
  variants: [VariantSchema],
  images: [ImageSchema],
  price: PriceSchema,
  inventory: {
    totalQuantity: Number,
    reserved: { type: Number, default: 0 }
  },
  reviews: [ReviewSchema],
  ratings: {
    avg: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  metadata: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

ProductSchema.index({ title: "text", description: "text", tags: "text" });
ProductSchema.index({ "variants.sku": 1 });
ProductSchema.index({ slug: 1 });
ProductSchema.pre("save", function(next){ this.updatedAt = Date.now(); next(); });

export default mongoose.model("Product", ProductSchema);