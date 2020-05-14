const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

router.get('/', notesController.index);
router.get('/all', notesController.getNotes);
router.post('/add', notesController.addNote);
router.put('/update', notesController.updateNote);
router.delete('/delete', notesController.deleteNote);


// router.get('/',(req,res)=>{
//     res.send("Notes route indec path");
// })

module.exports=router;