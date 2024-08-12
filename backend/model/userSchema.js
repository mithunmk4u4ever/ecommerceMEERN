const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for product sizes
const sizeSchema = new Schema({
    size: {
        type: String,
        required: true,
        enum: ["small", "medium", "large", "extralarge"]
    },
    quantity: {
        type: Number,
        required: true
    }
});

// Define the schema for products
const productSchema = new Schema({
    productBrand: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    productPrice: { 
        type: Number, 
        required: true 
    },
    productModel: {
        type: String, 
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    productCategory: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productColor: {
        type: String,
        required: true
    },
    productSizes: [sizeSchema] // Array of size subdocuments
});

// Define the schema for cart items
const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    selectedSize: { type: String, required: true },
    quantity: { type: Number, required: true }
});

// Define the schema for users
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    cart: [cartItemSchema],
    password: {
        type: String,
        required: true
    }
    // Array of cart item subdocuments
});

// Create the models
const Product = mongoose.model("Product", productSchema);
const User = mongoose.model("User", userSchema);

module.exports = { Product, User };
