var express = require('express');
var router = express.Router();
const apiController = require('../controllers/apiController')

router.get('/test', apiController.getTestData)
// router.get('/test', (req,res,next)=>{
//     const testData=[
//         {id:1, data:"Test data 1"},
//         {id:2, data:"Test data 2"}
//     ];
//     res.json(testData);
// });

module.exports = router;