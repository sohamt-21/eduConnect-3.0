
const express=require("express");

const app=express();
app.use(express.json());

const cors=require('cors');
app.use(cors());

require('./connection');
const Users=require('./user')
app.post("/",async(req,resp)=>{
    let user=new Users(req.body);
    let result=await user.save();
    resp.send(result);
})


app.listen(9000,()=>{
    console.log("Server On");
});