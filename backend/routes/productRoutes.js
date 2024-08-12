const express=require("express")
const router=express.Router()
const productController=require("../controller/productController")

router.post("/add",productController.addProduct)
router.get("/get",productController.getProducts)

module.exports=router