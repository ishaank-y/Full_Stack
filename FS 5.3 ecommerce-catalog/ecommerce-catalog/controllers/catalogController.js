import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  const p = new Product(req.body);
  await p.save();
  res.send(p);
};

export const getProduct = async (req, res) => {
  const p = await Product.findOne({ slug: req.params.slug });
  res.send(p);
};

export const getProducts = async (req, res) => {
  const { page = 1, limit = 20, q, category, minPrice, maxPrice, attrs } = req.query;
  const filter = {};
  if (q) filter.$text = { $search: q };
  if (category) filter["categories.slug"] = category;
  if (minPrice || maxPrice) filter["price.amount"] = {};
  if (minPrice) filter["price.amount"].$gte = Number(minPrice);
  if (maxPrice) filter["price.amount"].$lte = Number(maxPrice);
  if (attrs) {
    const pairs = Array.isArray(attrs) ? attrs : attrs.split(",");
    filter.$and = pairs.map(p => {
      const [name, value] = p.split(":");
      return { attributes: { $elemMatch: { name, value } } };
    });
  }
  const products = await Product.find(filter)
    .skip((page-1)*limit)
    .limit(Number(limit));
  res.send(products);
};

export const updateProduct = async (req, res) => {
  const p = await Product.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true });
  res.send(p);
};

export const deleteProduct = async (req, res) => {
  await Product.findOneAndDelete({ slug: req.params.slug });
  res.send({ message: "deleted" });
};

export const facets = async (req, res) => {
  const agg = [
    { $match: {} },
    { $facet: {
      byCategory: [
        { $unwind: "$categories" },
        { $group: { _id: "$categories.slug", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ],
      priceRanges: [
        { $bucket: { groupBy: "$price.amount", boundaries: [0,50,100,250,500,1000], default: "1000+" } }
      ]
    }},
    { $limit: 1 }
  ];
  const out = await Product.aggregate(agg);
  res.send(out[0]);
};