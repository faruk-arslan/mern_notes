const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

router.get('/', notesController.index)

// router.get('/',(req,res)=>{
//     res.send("Notes route indec path");
// })

module.exports=router;