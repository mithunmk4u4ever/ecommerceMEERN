const {Product}=require("../model/userSchema")
const Category=require("../model/categorySchema")

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

const getSomeProducts=async (req, res) => {
  const { page = 1, limit = 10, sort, ...filters } = req.query;

  try {
    const query = {}; // Build the query object based on filters
    if (filters.category) query.category = filters.category;
    if (filters.priceRange) {
      query.price = { $gte: filters.priceRange[0], $lte: filters.priceRange[1] };
    }
    // Add other filters as needed...

    const sortCriteria = sort === 'low-to-high' ? { price: 1 } : { price: -1 };

    const products = await Product.find(query)
      .sort(sortCriteria)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);

    res.json({ products, totalPages });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
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

// const getSome= async (req, res) => {
//   const { page = 1, limit = 10, sort, ...filters } = req.query;

//   try {
//     // Parse filters if needed (e.g., price range)
//     const query = {}; // Build MongoDB query based on filters
//     if (filters.category) query.category = filters.category;
//     if (filters.priceRange) {
//       query.price = { $gte: filters.priceRange[0], $lte: filters.priceRange[1] };
//     }
//     // Add more filter conditions here if needed

//     // Handle sorting
//     let sortCriteria = {};
//     if (sort === 'low-to-high') {
//       sortCriteria = { price: 1 };
//     } else if (sort === 'high-to-low') {
//       sortCriteria = { price: -1 };
//     }

//     // Fetch paginated products with filters and sorting
//     const products = await Product.find(query)
//       .sort(sortCriteria)
//       .skip((page - 1) * limit)
//       .limit(parseInt(limit));

//     const totalProducts = await Product.countDocuments(query);
//     const totalPages = Math.ceil(totalProducts / limit);

//     res.json({ products, totalPages });
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     res.status(500).json({ message: 'Error fetching products' });
//   }
// }



// Route to get products with pagination
const getSome=async (req, res) => {
  try {
    const { page, limit, category, sort } = req.query;
    const query = {};

    if (category) {
      query.productCategory = category;
    }

    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort);

    const totalPages = Math.ceil(await Product.countDocuments(query) / limit);

    res.json({ products, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};



const getCategories = async (req, res) => {
  try {
      console.log('Fetching categories...');
      const categories = await Category.find();

      // Prepare the subCategories and types objects
      const subCategories = {};
      const types = {};

      // Loop through each category and populate subCategories and types
      categories.forEach(category => {
          subCategories[category._id] = category.subCategories.map(subCategory => ({
              _id: subCategory._id,
              name: subCategory.name,
              types: subCategory.types.map(type => ({
                  _id: type._id,
                  name: type.name
              }))
          }));

          // Populate types object
          subCategories[category._id].forEach(subCategory => {
              if (!types[subCategory._id]) {
                  types[subCategory._id] = [];
              }
              subCategory.types.forEach(type => {
                  types[subCategory._id].push({
                      _id: type._id,
                      name: type.name
                  });
              });
          });
      });

      // Return categories, subCategories, and types in the response
      res.json({ categories, subCategories, types });
  } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).json({ message: 'Failed to retrieve categories', error: error.message });
  }
};
  

module.exports={addProduct,getProducts,getSome,getCategories}