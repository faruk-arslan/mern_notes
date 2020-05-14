const express=require('express')
var router=express.Router()

router.get('/', (req,res)=>{
     if(req.user) res.send(`Index - GET - USER: ${req.user}`)
     else res.send("Index - GET")
})
    

module.exports=router;