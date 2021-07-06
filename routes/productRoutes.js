const { Router } = require("express");
const router = Router();
const productController = require("../controllers/productControllers");
const uploadCloud = require("../cloudinary");
const { requireAuth, checkUser } = require("../middleware/authMiddleware");

//middleware
//router.use(uploadCloud.single("image"));
//router.use(requireAuth);

//routes
router.post("/createproduct", productController.createProduct);
router.get("/products", productController.getProducts);

module.exports = router;
