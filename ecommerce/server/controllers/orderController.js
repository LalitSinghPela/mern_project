const Order = require("../models/Order");

exports.createOrder = async(req,res)=>{
    const order = await Order.create(req.body);
    res.json(order);
};

exports.getOrders = async(req,res)=>{
    const orders = await Order.find().populate("user");
    res.json(orders);
};

exports.getOrderStats = async(req,res)=>{
    try {
        const totalOrders = await Order.countDocuments();
        const orders = await Order.find();
        const totalSales = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
        
        res.json({
            totalOrders,
            totalSales
        });
    } catch(err) {
        res.status(500).json({message: err.message});
    }
};

exports.updateOrderStatus = async(req,res)=>{
    try {
        const { id } = req.params;
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
};

exports.deleteOrder = async(req,res)=>{
    try {
        const { id } = req.params;
        const order = await Order.findByIdAndDelete(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json({ message: "Order deleted successfully" });
    } catch(err) {
        res.status(500).json({message: err.message});
    }
};