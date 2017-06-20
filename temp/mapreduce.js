var parser = require('./parser')
var stutter = require("nodejieba");
var fs = require("fs");
var db = require('./db')
var search = require('./search')
db.connect()
var Song = db.create_model("Song",db.Schema.doc)
var Index = db.create_model("Index",db.Schema.index)
var Token = db.create_model("Token",db.Schema.token)
var option = {};
option.map = function()
{
    var doc_id = this.doc_id;
    this.terms.forEach(function(term)
    {
        emit(term,
        {
            postings: [doc_id]
        });
    });
};
option.reduce = function(key, values)
{
    var postings = [];
    values.forEach(function(value)
    {   
        postings.push(value.postings[0]);
    });
    return {
        postings: postings
    };
};
Token.mapReduce(option, function(err, results)
{
    if (err)
    {
        console.log(err);
        process.exit(1);
    }
    console.log("create inverted index success:\n");
    //console.log(JSON.stringify(results, null, 4));
    process.exit(0);
});