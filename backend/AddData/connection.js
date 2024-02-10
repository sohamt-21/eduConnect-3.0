const mongoose=require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/Hackfusion_NeverSelected").then(()=>{
    console.log("Db Connected")
})