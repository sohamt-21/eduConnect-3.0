const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const usermodel=require('./Users')

const app=express()
app.use(cors())
mongoose.connect("mongodb://0.0.0.0:27017/Hackfusion_NeverSelected")

app.use(express.json())

app.get('/getUsers',(req,res)=>{
   usermodel.find().then((user)=>{
     res.send(user)
   })
})


app.listen(3001,()=>{
    console.log("Server is running")
})