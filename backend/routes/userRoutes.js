const express=require("express")
const router=express.Router()
const userController=require("../controller/userController")

router.post("/register",userController.userRegister)
router.post("/login",userController.loginUser)
router.post("/addtocart",userController.addToCart)
router.get("/getcart",userController.getCart)
router.post("/updatecart",userController.updateCart)

module.exports=router