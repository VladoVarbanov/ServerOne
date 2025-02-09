const express = require("express");
const productController = require("../controllers/product.controller.js");
const router = express.Router();

// Get all products
router.get("/", productController.getProducts);

// Get single product
router.get("/:id", productController.getProduct);

// Create product
router.post("/", productController.createProduct);

// Update product
router.put("/:id", productController.updatedProduct);

// Delete product
router.delete("/:id", productController.deleteProduct);

module.exports = router;
