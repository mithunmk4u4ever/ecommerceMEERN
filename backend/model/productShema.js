// const mongoose = require("mongoose");

// const sizeSchema = new mongoose.Schema({
//     size: {
//         type: String,
//         required: true,
//         enum: ["small", "medium", "large", "extralarge"] // Specify the allowed size values
//     },
//     quantity: {
//         type: Number,
//         required: true
//     }
// });

// const productSchema = new mongoose.Schema({
//     productBrand: {
//         type: String,
//         required: true,
//     },
//     productName: {
//         type: String,
//         required: true,
//     },
//     productPrice: { 
//         type: Number, 
//         required: true 
//     },
//     productModel: {
//         type: String, 
//         required: true
//     },
//     productImage: {
//         type: String,
//         required: true
//     },
//     productCategory: {
//         type: String,
//         required: true
//     },
//     productDescription: {
//         type: String,
//         required: true
//     },
//     productColor: {
//         type: String,
//         required: true
//     },
//     productSizes: [sizeSchema] // Array of size subdocuments
// });

// const Product = mongoose.model("Product", productSchema);

// module.exports = Product;
