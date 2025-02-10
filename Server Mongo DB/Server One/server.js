const express = require("express");
const dotenv = require("dotenv").config();
const productRoute = require("./routes/product.routes.js");
const userRoute = require("./routes/user.routes.js");
const errorHandler = require("./middleware/errorHandler.js");
const connectDb = require("./config/dbConnection.js");
const app = express();
connectDb();

const port = process.env.PORT || 5001;

// Middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

// Routes.
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Get Home Page.
app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});
