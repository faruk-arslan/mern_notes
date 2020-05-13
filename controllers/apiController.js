
exports.getTestData = function(req,res){
    const testData=[
        {id:1, data:"Test data 1"},
        {id:2, data:"Test data 2"}
    ];
    res.json(testData)
}