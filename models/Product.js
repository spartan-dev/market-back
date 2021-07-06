const mongoose = require("mongoose");
const { isEmail } = require("validator");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nombre es requerido"],
    lowercase: true,
  },
  sku: {
    type: String,
    required: [true, "SKU es requerido"],
  },
  qty: {
    type: String,
    required: [true, "Cantidad es requerido"],
  },
  price: {
    type: String,
    required: [true, "Precio es requerido"],
  },
  image: [{ path: String, filename: String }],
  vendedor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
});
const Product = mongoose.model("product", productSchema);
module.exports = Product;
