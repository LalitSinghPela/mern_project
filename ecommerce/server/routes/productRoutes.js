const router = require("express").Router();
const protect = require("../middleware/auth");
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductStats,
    getFeaturedProducts
} = require("../controllers/productController");

router.get("/",getProducts);
router.get("/featured/list",getFeaturedProducts);
router.get("/stats",getProductStats);
router.get("/:id",getProduct);

router.post("/",protect,createProduct);
router.put("/:id",protect,updateProduct);
router.delete("/:id",protect,deleteProduct);

module.exports = router;