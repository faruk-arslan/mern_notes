const express = require('express');

const app = express();

app.get('/api/test', (req,res)=>{
    const testData=[
        {id:1, data:"Test data 1"},
        {id:2, data:"Test data 2"}
    ];
    res.json(testData);
});

const port = 5000;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});
