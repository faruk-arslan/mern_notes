const express=require('express')
var router=express.Router()

router.get('/', (req,res)=>{
     if(req.user) res.send(`Index - GET - USER: ${req.user}`)
     else res.send("Index - GET")
})

router.get('/success', (req,res)=>{
     res.send(true);
})

router.get('/failure', (req,res)=>{
     res.send(false);
})
    

module.exports=router;