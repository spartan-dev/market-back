const { Router } = require("express-router");
const router = Router();
const productController = require("../controllers/productControllers");
const { requireAuth, checkUser } = require("../middleware/authMiddleware");
router.post("/createproduct", requireAuth, productController.createProduct);
router.get("/products", requireAuth, productController.getProducts);
