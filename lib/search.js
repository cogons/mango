
var stutter = require("nodejieba");
var db = require('./db')

exports.search = function(Model,query){

    Model.find({term:{ $in: stutter.cutForSearch(query.replace(/[^\u4e00-\u9fa5]/gi, "")) }},(err,doc)=>console.log(doc))

}

