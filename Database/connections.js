const mongoose= require("mongoose")
const connectDB=async()=>{
    try {
        const con= await mongoose.connect(process.env.DATABASE_URL)
    } catch (error) {
        console.log('error in db connsction ',error);
        process.exit(1)        
    }
}
module.exports=connectDB
