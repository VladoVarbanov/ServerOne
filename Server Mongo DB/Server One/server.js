const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const productRoute = require("./routes/product.routes.js");
const app = express();

const port = process.env.PORT || 5001;

// Middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes.
app.use("/api/products", productRoute);

// Get Home Page.
app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

mongoose
  .connect(
    "mongodb+srv://vladovarbanov:leZoyK5RgJjSJ0uZ@backenddb.0efjw.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(() => {
    console.log("Connection Failed!");
  });
