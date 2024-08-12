const mongoose=require("mongoose")

const connectDB= async (req,res)=>{
    try {
        mongoose.connect("mongodb://127.0.0.1:27017/newProductDB")

        // mongoose.connect("mongodb+srv://mithun123:mithun123@cluster0.hc5wwt6.mongodb.net/stylecorner?retryWrites=true&w=majority&appName=Cluster0")
        .then(()=>{
            console.log("DB connected")
        })
    } catch (error) {
        console.log("error")
    }
}
module.exports=connectDB