var parser = require('./parser')
var stutter = require("nodejieba");
var fs = require("fs");
var db = require('./db')
var search = require('./search')



var docs = parser.format_docs('songs.txt')

// //console.log(docs)
var token = parser.tokenize_docs(docs,"lyrics")
// //console.log(token)
var index = parser.index_docs(token)
var weight = parser.calculate_weight(docs,token,index)
console.log(weight)
// //console.log(index)
// console.log(idf)

// db.connect()
// var Song = db.create_model("Song",db.Schema.doc)
// var Index = db.create_model("Index",db.Schema.index)
// var Token = db.create_model("Token",db.Schema.token)
// db.save(docs,Song)
// db.save(token,Token)
// db.save(index,Index)

//search.search(Index,"陪你去看流星雨")