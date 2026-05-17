const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    // single legacy image field kept for backward compatibility
    image: String,
    // thumbnail image (recommended small image used in lists)
    thumbnail: String,
    // array of additional images / gallery (store URLs or base64 strings)
    images: [String],
    category: {
        type: String,
        required: true
    },
    description: String,
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

module.exports = mongoose.model("Product", productSchema);