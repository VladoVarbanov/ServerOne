const Product = require("../models/product.model.js");
const asyncHandler = require("express-async-handler");

//@desc Get all products
//@route GET /api/products
//@access private
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user_id: req.user.id });
  res.status(200).json(products);
});

//@desc Get one product
//@route GET /api/products
//@access private
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
//@access private
const createProduct = asyncHandler(async (req, res) => {
  const { name, quantity, price } = req.body;
  if (!name || !quantity || !price) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const product = await Product.create({
    name,
    quantity,
    price,
    user_id: req.user.id,
  });
  res.status(201).json(product);
});

//@desc Update product
//@route PUT /api/products/:id
//@access private
const updatedProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (product.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update this product");
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
//@access private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  if (product.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to delete this product");
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
