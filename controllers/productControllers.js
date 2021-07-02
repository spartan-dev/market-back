const Product = require("../models/Product");
const handleProductErrors = () => {};
module.exports.createProduct = async (req, res) => {
  try {
  } catch (error) {
    const errors = handleProductErrors(error);
    res.status(400).json({ errors });
  }
};

module.exports.getProducts = () => {
  try {
  } catch (error) {
    const errors = handleProductErrors(error);
    res.status(400).json({ errors });
  }
};
