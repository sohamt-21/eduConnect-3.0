const mongoose=require("mongoose");

const usersSchema=new mongoose.Schema({
    name:String,
    email:String,
    workexperience:String,
    address:String,
    linkdin:String,
    Resume:String,
    
});

module.exports=mongoose.model("adminforms",usersSchema);