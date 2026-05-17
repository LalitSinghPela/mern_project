const Product = require("../models/Product");
const mongoose = require("mongoose");

exports.getProducts = async(req,res)=>{
    try {
        const { category } = req.query;
        let query = {};
        
        if (category) {
            query.category = category;
        }
        
        const products = await Product.find(query);
        res.json(products);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
};

exports.getFeaturedProducts = async(req,res)=>{
    try {
        const products = await Product.find({featured: true});
        res.json(products);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
};

exports.getProduct = async(req,res)=>{
    try {
        // Validate if ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: "Invalid product ID"});
        }
        
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }
        res.json(product);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
};

exports.createProduct = async(req,res)=>{
    try {
        // Validate required fields
        if (!req.body.name || !req.body.price || !req.body.category) {
            return res.status(400).json({message: "Name, price, and category are required"});
        }
        
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
};

exports.updateProduct = async(req,res)=>{
    try {
        // Validate if ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: "Invalid product ID"});
        }
        
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }
        res.json(product);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
};

exports.deleteProduct = async(req,res)=>{
    try {
        // Validate if ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: "Invalid product ID"});
        }
        
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }
        res.json({message: "Product deleted"});
    } catch(err) {
        res.status(500).json({message: err.message});
    }
};

exports.getProductStats = async(req,res)=>{
    try {
        const totalProducts = await Product.countDocuments();
        const outOfStockProducts = await Product.countDocuments({countInStock: 0});
        
        res.json({
            totalProducts,
            outOfStockProducts
        });
    } catch(err) {
        res.status(500).json({message: err.message});
    }
};