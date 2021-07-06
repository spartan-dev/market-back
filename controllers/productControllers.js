const Product = require("../models/Product");
const uploadCloud = require("../cloudinary");
const handleProductErrors = (error) => {
  let errors = { name: "", price: "", sku: "", qty: "" };
  console.log(error, "donde estamos");
  if (error.message === "Nombre es requerido") {
    errors.name = "Nombre es requerido";
  }
  if (error.message === "SKU es requerido") {
    errors.sku = "SKU es requerido";
  }
  if (error.message === "Cantidad es requerido") {
    errors.qty = "Cantidad es requerido";
  }
  if (error.message === "Precio es requerido") {
    errors.price = "Precio es requerido";
  }
  if (error._message.includes("product validation failed")) {
    Object.values(error.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};
module.exports.createProduct = async (req, res) => {
  const { name, price, sku, qty } = req.body;
  //const { image } = req.files;
  try {
    const product = await new Product({
      name,
      price,
      sku,
      qty,
    });
    await product.save();
    res.status(200).json({ message: "Producto creado con exito", product });
  } catch (error) {
    const errors = handleProductErrors(error);
    console.log(errors, "en el catch");
    res.status(400).json({ errors });
  }
};

module.exports.getProducts = async (req, res, next) => {
  try {
    const allProducts = await Product.find({});
    res.status(201).json({ allProducts });
  } catch (error) {
    console.log(error);
    const errors = handleProductErrors(error);
    res.status(400).json({ errors });
  }
};
