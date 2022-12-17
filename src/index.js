const express = require("express")
const mongoose = require("mongoose")
const List = require("../Models/list.model")
const cors = require("cors")
const connect = require("../Connect/Connect")
const req = require("express/lib/request")
const PORT = process.env.PORT || 8000
mongoose.set('strictQuery', true)



const app = express()

app.use(express.json())

app.use(cors())

app.get("/",async(req,res)=>{
     try {
         let data=await List.find()
         res.send({data:data})
        
     } catch (error) {
        res.status(501).send(error.message)
     }
})



app.post("/data",async(req,res)=>{
     
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
   
    let postedAt = `${day}-${month}-${year}`
      console.log(typeof(postedAt))
    let list = {...req.body,postedAt}
    console.log(list)
    try {
       const data = await List.create(list)
       res.send({message:"Data added successfully",data:data})
    } catch (error) {
        res.status(501).send(error.message)
    }
      
    
    
})





//  For  data ******************************************

app.get("/data",async(req,res)=>{
     
    const {page=1,limit=10,sort='asc'}=req.query
    try {
        const data=await List.find({})
        .sort({['postedAt']: sort==='asc' ? 1 : -1})
        .skip((page-1)*limit)
        .limit(limit)

        res.send({data:data})
    } catch (error) {
        res.status(501).send(error.message)
    }
})








app.listen(PORT, async () => {
    await connect()
    console.log(`Database Connected and app listening on port ${PORT}`)
})