const Product = require("../models/product.model.js");
const asyncHandler = require("express-async-handler");

//@desc Get all products
//@route GET /api/products
//@access private
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

//@desc Get one product
//@route GET /api/products
//@access public
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404).json();
    throw new Error("Product not found");
  }
  res.status(200).json(product);
});

//@desc Create new product
//@route POST /api/products
//@access public
const createProduct = asyncHandler(async (req, res) => {
  const { name, quantity, price } = req.body;
  if (!name || !quantity || !price) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

//@desc Update product
//@route PUT /api/products/:id
//@access public
const updatedProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  // Updated product.
  res.status(200).json(updatedProduct);
});

//@desc Delete product
//@route DELETE /api/products/:id
//@access public
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Product deleted successfully" });
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updatedProduct,
  deleteProduct,
};
