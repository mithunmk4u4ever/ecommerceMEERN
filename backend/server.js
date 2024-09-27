const express=require("express")
const connectDB=require("./config/db")
const app=express()
const productRoute=require("./routes/productRoutes")
const userRoutes=require("./routes/userRoutes")
const cors=require("cors")

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
app.use(express.json())

const port=3330

connectDB()

app.use("/api/products",productRoute)
app.use("/api/users",userRoutes)

app.listen(port,()=>console.log((`server listening on port ${port}`)))