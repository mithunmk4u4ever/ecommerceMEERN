const {Product}=require("../model/userSchema")

const addProduct=async (req,res)=>{
    try {
        const {productBrand,productName, productDescription,productPrice,productModel,productImage,productColor,productCategory,prodtDescription,productSize}=req.body

        const product=new Product({productBrand,productName, productDescription,productPrice,productModel,productImage,productColor,productCategory,prodtDescription,productSize})
        await product.save()
        res.send("Product added successfully")
    } catch (error) {
        console.log(error);
    }
}

const getProducts=async (req,res)=>{
    try {
        const products=await Product.find()
        res.send(products)
    } catch (error) {
        console.log(error);
    }
}

// In your controller, e.g., productController.js
// const getProducts = async (req, res) => {
//     const { sortBy, priceRange, brand, category, color } = req.query;

//     let sort = {};
//     if (sortBy === 'priceLowToHigh') {
//         sort.price = 1;
//     } else if (sortBy === 'priceHighToLow') {
//         sort.price = -1;
//     }

//     try {
//         const query = {};
        
//         if (priceRange) {
//             const [min, max] = priceRange.split('-').map(Number);
//             query.price = { $gte: min, $lte: max };
//         }
//         if (brand) {
//             query.brand = brand;
//         }
//         if (category) {
//             query.category = category;
//         }
//         if (color) {
//             query.color = color;
//         }

//         const products = await Product.find(query).sort(sort);
//         res.status(200).send(products);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ message: 'An error occurred while fetching products' });
//     }
// };

module.exports={addProduct,getProducts}