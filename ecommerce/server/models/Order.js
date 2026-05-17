const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    products: Array,
    totalPrice: Number,
    customerName: String,
    customerWhatsapp: String,
    status: {
        type: String,
        enum: ["pending", "in progress", "completed"],
        default: "pending"
    }
});

module.exports = mongoose.model("Order", orderSchema);