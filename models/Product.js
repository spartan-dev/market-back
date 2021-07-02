const mongoose = require("mongoose");
const { isEmail } = require("validator");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    lowercase: true,
  },
  sku: {
    type: String,
    required: [true, "SKU is required"],
  },
  qty: {
    type: Number,
    required: [true, "Quantity is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
});
const Product = mongoose.model("product", productSchema);
module.exports = Product;
