const router = require("express").Router();
const protect = require("../middleware/auth");
const {
    createOrder,
    getOrders,
    getOrderStats,
    updateOrderStatus,
    deleteOrder
} = require("../controllers/orderController");

router.post("/",createOrder);
router.get("/",protect,getOrders);
router.get("/stats",protect,getOrderStats);
router.put("/:id/status",protect,updateOrderStatus);
router.delete("/:id",protect,deleteOrder);

module.exports = router;