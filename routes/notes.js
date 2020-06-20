const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

router.use(function (req, res, next) {
    // if (!req.user) res.redirect('/user/login');
    if (!req.user) res.send({value: false, msg:"Redirect to login."});
    else next();
  })

router.get('/', notesController.index);
router.get('/all', notesController.getNotes);
router.post('/add', notesController.addNote);
router.put('/update', notesController.updateNote);
router.delete('/delete', notesController.deleteNote);


// router.get('/',(req,res)=>{
//     res.send("Notes route indec path");
// })

module.exports=router;