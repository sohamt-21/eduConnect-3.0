const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    workexperience:String,
    address:String,
    linkdin:String,
    Resume:String,

    
})


const usermodel=mongoose.model("adminforms",userSchema)

module.exports=usermodel