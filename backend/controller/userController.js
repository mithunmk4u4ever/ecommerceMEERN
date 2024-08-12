const {User,Product} = require("../model/userSchema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwtScretKey = "secretkey"
const mongoose=require("mongoose")

const userRegister = async (req, res) => {
    try {
        const { email, password } = req.body

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.findOne({ email })

        if (user) {
            return res.status(409).send("User already exists")
        } else {
            const newUser = new User({ email, password:hashedPassword })
            await newUser.save()
            res.status(200).send("User created successfully")
        }

    } catch (error) {
        console.log(error);
    }
}
const loginUser=async (req,res)=>{
    try {
        const {email,password}=req.body

        const user=await User.findOne({email})
        if(!user){
            return res.status(404).send("User not found")
        }else{
            const isMatch=await bcrypt.compare(password,user.password)
            if(!isMatch){
                return res.status(400).send("Invalid credentials")
            }else{
                const token=jwt.sign({email:user.email},jwtScretKey,{expiresIn:"1d"})
                res.status(200).json({success:true,token,user})
            }
        }
    } catch (error) {
        console.log(error);
    }
}
const addToCart = async (req, res) => {
    const { email, productId, selectedSize, quantity } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Find the product by ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }

        // Check if the product is already in the cart
        const existingCartItem = user.cart.find(item => item.product._id.toString() === productId && item.size === selectedSize);

        if (existingCartItem) {
            // If the product with the same size is already in the cart, update the quantity
            existingCartItem.quantity += quantity;
        } else {
            // If not, add the new product to the cart
            user.cart.push({
                product: product._id,
                selectedSize,
                quantity
            });
        }

        // Save the updated user document
        await user.save();

        res.status(200).send({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while adding the product to the cart' });
    }
};



// const getCart = async (req, res) => {
//     const { email } = req.query;

//     try {
//         // Find the user by email
//         // const user = await User.findOne({ email }).populate('cart.productId');
        
//        const user=await User.findOne({ email })
//     .populate({
//         path: 'cart.productId',
//         model: 'Product',
//         strictPopulate: false
//     })
//     .exec((err, user) => {
//         if (err) {
//             console.error(err);
//         }
//         console.log(user);
//     });
//         if (!user) {
//             return res.status(404).send({ message: 'User not found' });
//         }

//         // Calculate the total amount
//         const totalAmount = user.cart.reduce((total, item) => {
//             return total + (item.productPrice * item.quantity);
//         }, 0);

//         res.status(200).send({ cart: user.cart, totalAmount });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ message: 'An error occurred while fetching the cart' });
//     }
// };

const getCart = async (req, res) => {
    const { email } = req.query;

    try {
        // Find the user by email and populate product details in the cart
        const user = await User.findOne({ email }).populate({
            path: 'cart.product',  // Assuming cart.product is the reference field
            model: 'Product'
        });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Calculate the total amount using the product price from the populated data
        const totalAmount = user.cart.reduce((total, item) => {
            const product = item.product; // Access the populated product
            if (product) {
                return total + (product.productPrice * item.quantity);
            }
            return total;
        }, 0);

        res.status(200).send({ cart: user.cart, totalAmount });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while fetching the cart' });
    }
};



const updateCart = async (req, res) => {
    const { email, productId, size, quantity } = req.body;
    console.log('Received update request:', { email, productId, size, quantity }); // Add this line

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Find the item in the cart
        const cartItem = user.cart.find(item => item.product._id.toString() === productId && item.selectedSize === size);

        console.log('Found cart item:', cartItem); // Add this line

        if (cartItem) {
            // Update quantity
            cartItem.quantity = quantity;

            // Remove the item if the quantity is 0
            if (cartItem.quantity <= 0) {
                user.cart = user.cart.filter(item => !(item.product._id.toString() === productId && item.selectedSize === size));
            }
        } else {
            // If the item doesn't exist, respond with an error
            return res.status(404).send({ message: 'Item not found in cart' });
        }

        // Save the updated user document
        await user.save();

        res.status(200).send({ message: 'Cart updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while updating the cart' });
    }
};






module.exports = {userRegister,loginUser, addToCart,getCart,updateCart };